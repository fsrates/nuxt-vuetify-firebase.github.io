<template>
  <v-row justify="center" align="center">
    <v-col
      cols="12"
      sm="12"
      md="8"
      lg="6"
      align="center"
    >
      <v-card light color="ghostwhite" elevation="0">
        <v-card-title class="light">
          <v-spacer />
          เปลี่ยนรกัสผ่าน
          <v-spacer />
        </v-card-title>
        <v-card-text class="light">
          <p>
            <v-text-field
              v-model="newPassword"
              label="รหัสผ่านใหม่"
              prepend-inner-icon="mdi-key"
              clearable
              aria-autocomplete
            ></v-text-field>
          </p>
        </v-card-text>
        <v-card-actions class="light">
          <v-spacer />
          <v-btn
            v-if="authenticated"
            color="error"
            class="mb-3"
            nuxt
            :to="{ name: 'users-id', params: { id: authUser.uid } }"
          >
            ยกเลิก
          </v-btn>
          <v-btn
            v-if="authenticated"
            color="primary"
            class="mb-3"
            @click.stop="updateNewPassword"
          >
            ตกลง
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { updatePassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '~/plugins/firebase';

export default {
  name: 'UpdatePasswordPage',

  middleware: 'auth',

  data () {
    return {
      newPassword: ''
    };
  },

  computed: {
    ...mapGetters(['authenticated']),
    ...mapState(['authUser'])
  },

  methods: {
    async updateNewPassword () {
      const currentUser = auth.currentUser;
      try {
        await updatePassword(currentUser, this.newPassword);
        const authData = await signInWithEmailAndPassword(auth, currentUser.email, this.newPassword);
        this.$router.push(`/users/${authData.user.uid}`);
      } catch (e) {
        alert(e.response.data.message);
      }
    }
  }
};
</script>
