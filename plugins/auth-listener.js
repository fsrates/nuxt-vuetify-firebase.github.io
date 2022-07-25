// Code taken from
// https://levelup.gitconnected.com/using-firebase-authentication-in-a-nuxt-server-side-rendered-application-c2a624a9e999
const buildProfile = (user, claims) => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    emailVerified: user.emailVerified,
    photoURL: user.photoURL,
    claims
  };
};

export default async function ({ app, store }) {
  const isServerAuthenticated = store.getters.authenticated;
  if (!isServerAuthenticated) {
    try {
      await app.$fireAuth.signOut();
    } catch {}
  }
  app.$fireAuth.onIdTokenChanged(async (authUser) => {
    if (authUser) {
      try {
        await _handleAuthSuccess(authUser);
      } catch (e) {
        await _handleAuthError(e);
      }
    } else {
      await _handleSignOut();
    }
  });
};

async function _handleAuthSuccess (authUser) {
  const { claims, token } = await authUser.getIdTokenResult();
  const user = buildProfile(authUser, claims);
  await store.dispatch('setSessionCookie', token);
  store.commit('setAuthUser', { authUser: user });
}

async function _handleSignOut () {
  store.commit('resetStore');
  await store.dispatch('setSessionCookie', null);
}

async function _handleAuthError (error) {
  const onErrorMutation = null;
  const onErrorAction = null;
  if (onErrorMutation) {
    store.commit(onErrorMutation, error);
  }
  if (onErrorAction) {
    store.commit(onErrorAction, error);
  }
}
