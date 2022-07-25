<template>
  <div>
    <v-btn
      color="info"
      @click="dialogPhoneAuth = true"
    >
      ด้วยหมายเลขโทรศัพท์
    </v-btn>
    <v-dialog
      v-model="dialogPhoneAuth"
      light
      max-width="400px"
      elevation="16"
    >
      <v-card light>
        <v-card-text>
          <v-text-field
            v-model="phoneNumber"
            label="หมายเลขโทรศัพท์"
            prepend-inner-icon="mdi-phone"
          />
          <v-text-field
            v-model="otp"
            label="รหัสยืนยัน"
            prepend-inner-icon="mdi-key"
            placeholder="รหัสยืนยันที่ท่านได้รับทางมือถือ"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            id="send-otp-code"
            color="success"
            :disabled="phoneNumber === ''"
            @click="sendOtpCode"
          >
            รับรหัส
          </v-btn>
          <v-spacer />
          <v-btn
            type="submit"
            color="primary"
            :disabled="phoneNumber === '' && otp === ''"
            @click.prevent="onSignInSubmit"
          >
            เข้าสู่ระบบ
          </v-btn>
          <v-btn
            color="error"
            block
            @click="dialogPhoneAuth = false"
          >
            ยกเลิก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { RecaptchaVerifier, signInWithPhoneNumber } from '@firebase/auth';
import { auth } from '~/plugins/firebase';

export default {
  name: 'PhoneAuthProviderComponent',

  data () {
    return {
      dialogPhoneAuth: false,
      phoneNumber: '',
      otp: ''
    };
  },

  methods: {
    async sendOtpCode () {
      auth.useDeviceLanguage();
      // Create recaptcha invisible verifier.
      window.recaptchaVerifier = new RecaptchaVerifier('send-otp-code', {
        'size': 'invisible',
        'callback': async (response) => {
          await this.onSignInSubmit();
        }
      }, auth);
      // Send otp to sms phone.
      let confirmationResult;
      try {
        const appVerifier = window.recaptchaVerifier;
        confirmationResult = await signInWithPhoneNumber(auth, this.phoneNumber, appVerifier);
      } catch (e) {
        console.log(e);
        alert(e.response.data.message);
      }
      return window.confirmationResult = confirmationResult;
    },
    async onSignInSubmit () {
      try {
        const confirmationResult = window.confirmationResult;
        const result = await confirmationResult.confirm(this.otp);
        const authUser = result.user;
        this.$router.push(`/users/${authUser.uid}`);
      } catch (e) {
        console.log(e);
        alert(e.response.data.message);
      }
    }
  }
};
</script>
