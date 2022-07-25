<template>
  <v-btn
    color="primary"
    block
    @click="googleLogIn"
  >
    เข้าสู่ระบบด้วย Google
  </v-btn>
</template>

<script>
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { auth } from '~/plugins/firebase';

export default {
  name: 'GoogleLogInComponent',

  methods: {
    async googleLogIn () {
      auth.useDeviceLanguage();
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      const authData = await signInWithPopup(auth, provider);
      const { uid, email, displayName, emailVerified, photoURL } = authData.user;
      this.$store.commit('setAuthUser', { authUser: { uid, email, displayName, emailVerified, photoURL } });
      this.$router.push(`/users/${uid}`);
    }
  }
};
</script>
