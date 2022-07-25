<template>
  <v-row justify="center" align="center">
    <v-col
      cols="12"
			sm="10"
			md="8"
			lg="6"
      align="center"
      class="py-4 px-4"
      background-color="ghostwhite"
    >
      <v-card light>
        <v-card-title>
				  <v-spacer />
          ยืนยันอีเมลล์
					<v-spacer />
        </v-card-title>
        <v-card-text>
          <p v-if="authenticated && authUser.emailVerified === false">
            ท่านต้องการให้ระบบส่งลิ้งก์ยืนยันไปยัง {{ authUser.email }} หรือไม่?
          </p>
					<notification v-if="success" :message="success.message" />
          <p v-if="authenticated && authUser.emailVerified === true">
            {{ response }}
          </p>
        </v-card-text>
				<v-card-actions v-if="authenticated && authUser.emailVerified === false">
				  <v-btn
            color="error"
						nuxt
						:to="{ name: 'users-id', params: { id: authUser.uid } }"
            >
              ยกเลิก
            </v-btn>
						<v-spacer />
						<v-btn
              color="primary"
              @click.prevent="emailVerify"
            >
              ยืนยันและส่งอีเมลล์หาฉัน
            </v-btn>
				</v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { sendEmailVerification, applyActionCode, updateCurrentUser } from '@firebase/auth';
import { ref, update } from '@firebase/database';
import { auth, database } from '~/plugins/firebase';
import Notification from '~/components/Notification.vue';

export default {
  name: 'EmailVerifyPage',

	components: {
		Notification
	},

	middleware: 'auth',

	data () {
		return {
			response: null,
			success: {
				message: ''
			}
		};
	},

	computed: {
		...mapState(['authUser']),
		...mapGetters(['authenticated'])
	},

	methods: {
		async emailVerify () {
			const authUser = auth.currentUser;
			if (authUser.emailVerified === true) {
				this.success.message = 'อีเมลล์ของท่านถูกยืนยันแล้ว';
				return;
			}
			try {
				const actionCodeSettings = {
					url: `http://localhost:3000/email-verify?email=${authUser.email}`
				};
				await sendEmailVerification(authUser, actionCodeSettings);
				this.success.message = `ส่งลิ้งยืนยันไปยัง ${authUser.email} แล้ว โปรดกดยืนยันจากลิ้งที่ท่านได้รับ`;
        await applyActionCode(auth, oobCode);
				await updateCurrentUser(auth, authUser);
			} catch (e) {
				console.log(e);
				alert(e.response.data.message);
			}
		}
	}
};
</script>
