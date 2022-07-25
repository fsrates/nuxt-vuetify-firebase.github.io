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
        <v-card-title>
          <v-spacer />
          รีเซ็ตระหัสผ่าน
          <v-spacer />
        </v-card-title>
        <v-card-text>
          <p>
            <v-alert
						  v-if="success !== ''"
              type="success"
            >
              {{ success }}
            </v-alert>
          </p>
          <p>
            <v-text-field
              v-model="email"
              label="อีเมลล์"
              prepend-inner-icon="mdi-email"
              clearable
              aria-autocomplete
            ></v-text-field>
          </p>
        </v-card-text>
        <v-card-actions class="light">
          <v-spacer />
          <v-btn
            color="error"
            class="mb-3"
            nuxt
            to="/login-email"
          >
            ยกเลิก
          </v-btn>
          <v-btn
            color="primary"
            class="mb-3"
            @click.stop="forgetPassword"
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
import { sendPasswordResetEmail, confirmPasswordReset } from 'firebase/auth';
import { auth } from '~/plugins/firebase';

export default {
  name: 'ResetPasswordPage',

  data () {
    return {
      email: '',
			success: ''
    };
  },

  methods: {
    async forgetPassword () {
      try {
        const actionCodeSettings = {
          url: `http://localhost:3000/login-email?email=${this.email}`
        };
        await sendPasswordResetEmail(auth, this.email, actionCodeSettings);
        this.success = 'ระบบได้ส่งลิ้งไปยังอีเมลล์ท่านแล้ว!';
				await confirmPasswordReset(auth, oobCode, newPassword);
				this.$nuxt.refresh();
      } catch (e) {
        alert(e.response.data.message);
      }
    }
  }
};
</script>
