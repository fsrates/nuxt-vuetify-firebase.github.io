import {
	signInWithPhoneNumber,
	RecaptchaVerifier
} from 'firebase/auth';
import {
	update,
	query,
  orderByChild,
  equalTo,
	get
} from 'firebase/database';

import { auth } from '~/plugins/firebase';
import { dbRef } from '~/utils/database';
import cookie from 'cookie';
import JWTDecode from 'jwt-decode';

const COOKIE_NAME = '__session';

export const state = () => ({
  authUser: null,
	isUser: false
});

export const mutations = {
  setAuthUser: (state, { authUser }) => {
    const { uid, email, displayName, emailVerified, photoURL, phoneNumber } = authUser;
    state.authUser = { uid, email, displayName, emailVerified, photoURL, phoneNumber };
  },
  resetStore: (state) => {
    state.authUser = null;
  },
	setIsUser: (state, isUser) => {
		state.isUser = isUser;
	}
};

export const actions = {
  nuxtServerInit: (process.server && !process.static) ? async function ({ commit }, { req, store }) {
    if (!req.headers.cookie) {
      return;
    }

    const parseCookies = cookie.parse(req.headers.cookie);
    if (!parseCookies) {
      return;
    }

    let session = null;
    if (parseCookies[COOKIE_NAME]) {
      session = JSON.parse(parseCookies[COOKIE_NAME]);
    }

    const idToken = session && session.idToken;
    let decodedAuthUserClaims = null;
    decodedAuthUserClaims = JWTDecode(idToken);
    if (decodedAuthUserClaims === null) {
      return;
    }

    const admin = require('firebase-admin');
    const decodedToken = await admin.auth().verifyIdToken(idToken, true);
    const { uid } = decodedToken;
    if (uid) {
      const authUser = {
        email: decodedAuthUserClaims.email,
        displayName: decodedAuthUserClaims.name,
        uid: decodedAuthUserClaims.user_id,
        photoURL: decodedAuthUserClaims.picture
      };
      store.commit('setAuthUser', { authUser });
    }
  } : () => {},

  setSessionCookie (ctx, idToken) {
    // This is a little bit different than Austin's solution:
    // this.$cookies is from 'cookie-universal-nuxt',
    // js-cookie doesn't set cookie correctly on the client side
    // according to my experience.
    const secure = process.env.NODE_ENV === 'production';
    let session = { idToken };
    if (this.$cookies.get(COOKIE_NAME)) {
      session = JSON.parse(this.$cookies.get(COOKIE_NAME));
      session.idToken = idToken;
    }

    let expires = 3600;
    if (idToken === null) {
      delete session.idToken;
    }
    if (Object.keys(session).length === 0) {
      // Expire the cookie if no properties are stored in it.
      expires = 0;
    }
    this.$cookies.set(COOKIE_NAME, JSON.stringify(session), {
      maxAge: expires,
      secure
    });
  },

	async _nuxtServerInit ({ dispatch }, ctx) {
		const authClient = auth;
    if (authClient && authClient !== null) {
      await dispatch('onAuthStateChanged');
    }

    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
			await dispatch('onAuthStateChanged');
    }
  },

  onAuthStateChanged ({ commit, dispatch }) {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { uid, email, displayName, emailVerified, photoURL, phoneNumber } = user;
        commit('setAuthUser', { authUser: { uid, email, displayName, emailVerified, photoURL, phoneNumber } });
				await dispatch('updateAuthUser');
			} else {
        commit('resetStore');
      }
    });
  },

	async updateAuthUser ({ state }) {
		if (state.authUser.uid === null) {
			return;
		}
		const userRef = dbRef('/users/' + state.authUser.uid + '/account');
		try {
			const res = await update(userRef, {
				emailVerified: state.authUser.emailVerified
			});
			console.log(res);
		} catch (error) {
			if (error) {
				colsole.log(error);
			}
		}
	},

  async userSignOut ({ commit }) {
    await auth.signOut();
    commit('resetStore');
  },

  async phoneSignIn ({ commit }, { phoneNumberInput, code }) {
		try {
			const recaptchaVerifier = new RecaptchaVerifier('send-otp-code', {
				'size': 'invisible',
				'callback': (response) => {
					sendOtpCode();
				}
			}, auth);
			const widgetId = await recaptchaVerifier.render();
			window.recaptchaWidgetId = widgetId;
			const appVerifier = recaptchaVerifier;
			const confirmationResult = await signInWithPhoneNumber(auth, phoneNumberInput, appVerifier);
			const result = await confirmationResult.confirm(code);
			const { uid, email, displayName, emailVerified, photoURL, phoneNumber } = result.user;
			commit('setAuthUser', { authUser: { uid, email, displayName, emailVerified, photoURL, phoneNumber } });
		} catch (error) {
			if (error) {
				console.log(error);
				commit('resetStore');
			}
		}
	},

	async userListener ({ commit }, { email, fullName, phoneNumber }) {
		const usersRef = dbRef('/users');
		// create queries.
		const queryEmail = query(usersRef, orderByChild('account/email') & equalTo(email));
		const queryName = query(usersRef, orderByChild('account/fullName') & equalTo(fullName));
		const queryPhone = query(usersRef, orderByChild('account/phoneNumber') & equalTo(phoneNumber));
		// excutes.
		const res = await Promise.all([
			get(queryEmail),
			get(queryName),
			get(queryPhone)
		]);
		// get snaps.
		const emailSnap = res[0];
		const nameSnap = res[1];
		const phoneSnap = res[2];
		// makes return results.
		if (emailSnap.exists() || nameSnap.exists() || phoneSnap.exists()) {
			commit('setIsUser', true);
			return true;
		} else {
			commit('setIsUser', false);
			return false;
		}
	}
};

export const getters = {
  authenticated (state) {
    try {
      return state.authUser.uid !== null && state.authUser.uid !== undefined;
    } catch {
      return false;
    }
  },
  getUser (state) {
    return state.isUser;
  }
};
