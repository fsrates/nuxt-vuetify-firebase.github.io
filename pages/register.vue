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
          สมัครสมาชิก
          <v-spacer />
        </v-card-title>
        <v-card-text class="white">
					<p>
            <v-text-field
              v-model="email"
              class="px-auto white center"
              label="อีเมลล์"
              prepend-inner-icon="mdi-email"
              clearable
              required
            />
          </p>
          <p>
            <v-text-field
              v-model="password"
              class="px-auto white center"
              label="รหัสผ่าน"
              prepend-inner-icon="mdi-key"
              :disabled="email === ''"
              clearable
              required
            />
            <small class="red--text">
              ตัวเลขหรือตัวอักษรภาษาอังกฤษจำนวน 8-20 ตัว
            </small>
          </p>
          <p>
            <v-text-field
              v-model="fullName"
              class="px-auto white center"
              label="ชื่อ-นามสกุล (ภาษาไทย)"
              prepend-inner-icon="mdi-account"
              :disabled="password === ''"
              clearable
              required
            />
            <small class="red--text">
              ต้องตรงกับบัตรประชาชนและบัญชีธนาคาร
            </small>
          </p>
          <p>
            <v-text-field
              v-model="phoneNumber"
              class="px-auto white center"
              label="หมายเลขโทรศัพท์มือถือ 10 หลัก"
              prepend-inner-icon="mdi-phone"
              :disabled="fullName === ''"
              clearable
              required
            />
          </p>
					<p>
						โปรดตรวจสอบข้อมูลให้ถูกต้องก่อนส่งข้อมูล การกดปุ่ม "สมัครสมาชิก"
						&nbsp;ถือว่าท่านได้ยอมรับข้อตกลงในการใช้บริการของเว็บไซต์แล้ว
						&nbsp;ดูรายละเอียดเพิ่มเติมได้
						<a
							href="/guides/#guide-register"
							target="_self"
						>
							ที่นี่
						</a>
					</p>
        </v-card-text>
        <v-card-actions>
				  <v-spacer />
          <v-btn
            color="error"
						class="mb-2"
            @click="reset"
          >
            ยกเลิก
          </v-btn>
          <v-spacer />
          <v-btn
            color="primary"
						class="mb-2"
            @click.prevent="register"
          >
            สมัครสมาชิก
          </v-btn>
					<v-spacer />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { update } from 'firebase/database';
import { auth } from '~/plugins/firebase';
import { childRef } from '~/utils/database';

export default {
  name: 'RegisterPage',

  data () {
    return {
      email: '',
      password: '',
      fullName: '',
      phoneNumber: ''
    };
  },

  methods: {
    async register () {
      this.error = null;
      try {
        const response = await createUserWithEmailAndPassword(auth, this.email, this.password);
        const response1 = await signInWithEmailAndPassword(auth, response.user.email, this.password);
        const { uid, email, emailVerified } = response1.user;
        const newUser = {
          account: {
            email,
            emailVerified,
            fullName: this.fullName,
            phoneNumber: this.phoneNumber,
            phoneVerified: false,
            passport: 'NA',
            passportVerified: false,
            passportURL: 'NA'
          },
          bank: {
            bankName: 'NA',
            bankNumber: 'NA',
            bankVerified: false,
            bankStatus: 'request',
            bankURL: 'NA'
          },
          tags: 'unverified',
          date: Date.now()
        };
        const userRef = childRef('/users', '/' + uid);
        await update(userRef, newUser);
        this.$router.push(`/users/${uid}`);
      } catch (e) {
        console.log(e);
        alert(e.response.data.message);
      }
    },
		reset () {
      this.email = '';
      this.password = '';
      this.fullName = '';
      this.phoneNumber = '';
      this.$router.push('/');
    }
  }
};
</script>
