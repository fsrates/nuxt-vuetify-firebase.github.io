<template>
  <v-row justify="center" align="center">
    <v-col
      cols="12"
      sm="12"
      md="8"
      lg="6"
      align="center"
      class="py-4 px-4"
      background-color="ghostwhite"
    >
      <v-card light color="ghostwhite" elevation="0">
        <v-card-title class="light">
				  <v-spacer />
          เข้าสู่ระบบ
					<v-spacer />
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="email"
            class="pa-auto white center"
						label="อีเมลล์"
            prepend-inner-icon="mdi-email"
						autocomplete
						clearable
            required
          />
          <v-text-field
            v-model="password"
            class="pa-auto white center"
            label="รหัสผ่าน"
            prepend-inner-icon="mdi-key"
						clearable
            required
          />
          <nuxt-link to="/reset-password">
            ลืมรหัสผ่าน ?
          </nuxt-link>
        </v-card-text>
        <v-card-actions>
				  <v-spacer />
          <v-btn
            color="error"
            @click="reset"
          >
            ยกเลิก
          </v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            @click.prevent="login"
          >
            เข้าสู่ระบบ
          </v-btn>
					<v-spacer />
        </v-card-actions>
				<v-card-actions>
          <google-log-in />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '~/plugins/firebase';
import GoogleLogIn from '~/components/GoogleLogIn.vue';

export default {
  name: 'LoginEmailPage',

	components: {
		GoogleLogIn
	},

  data () {
    return {
      email: '',
      password: ''
    };
  },

  methods: {
    async login () {
      try {
				const authData = await signInWithEmailAndPassword(auth, this.email, this.password);
				const uid = authData.user.uid;
				this.$router.push(`/users/${uid}`);
			} catch (e) {
				alert(e.response.data.message);
			}
    },
    reset () {
      this.email = '';
      this.password = '';
      this.$router.push('/');
    }
  }
};
</script>
