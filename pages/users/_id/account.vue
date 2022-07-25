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
				  <previous-button :previous="previous" />
					<v-spacer />
          บัญชี
					<v-spacer />
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
								align="center"
								class="px-auto"
              >
							  <v-card
									class="overflow-hidden"
									color="ghostwhite"
									light
								>
									<v-toolbar>
										<v-toolbar-title>
											ดูหรือแกไขบัญชี
										</v-toolbar-title>
										<v-spacer />
										<v-btn
											color="primary"
											fab
											small
											dark
											@click="isEditing = !isEditing"
										>
											<v-icon v-if="isEditing">
												mdi-close
											</v-icon>
											<v-icon v-else>
												mdi-pencil
											</v-icon>
										</v-btn>
									</v-toolbar>
									<v-card-text>
										<p>
											<span
												v-if="!isEditing"
											>
												ชื่อ-นามสกุล: &nbsp; {{ account.fullName }}
											</span>
										</p>
										<p v-if="!isEditing">
											<span>
												อีเมลล์: &nbsp; {{ account.email }}
											</span>
											<v-btn
												v-if="account.emailVerified === false"
												color="error"
												fab
												small
												dark
												nuxt
												to="/email-verify"
												exact
											>
												ยืนยันอีเมลล์
											</v-btn>
											<v-icon
												v-if="account.emailVerified === true"
												color="green"
											>
												mdi-tick
											</v-icon>
										</p>
										<p v-if="account.phoneVerified === false">
											<v-text-field
												v-if="isEditing"
												v-model="phoneNumber"
												label="หมายเลขโทรศัพท์"
											></v-text-field>
											<span v-if="!isEditing">
												หมายเลขโทรศัพท์: &nbsp; {{ account.phoneNumber }}
											</span>
										</p>
										<p v-if="account.phoneVerified === true">
											<span v-if="!isEditing">
												หมายเลขโทรศัพท์: &nbsp; {{ account.phoneNumber }}
											</span>
										</p>
										<p v-if="!isEditing">
											<span v-if="account.passportVerified === true">
												หมายเลขบัตรประชาชน: &nbsp; {{ account.passport }}
											</span>
										</p>
										<p v-if="!isEditing">
											<v-img
												v-if="account.passportVerified === true"
												:src="account.passportURL"
												class="mx-auto"
												max-width="200px"
												height="auto"
											></v-img>
										</p>
										<p v-if="isEditing">
											<v-file-input
												v-if="account.passportVerified === false"
												v-model="file"
												label="ภาพบัตรประชาชนด้านหน้า"
												:rules="uploadRules"
												except="image/jpeg, image/jpg, image/png"
												show-size
											></v-file-input>
										</p>
										<p v-if="isEditing">
											<v-text-field
												v-if="account.passportVerified === false"
												v-model="passport"
												label="หมายเลขบัตรประชาชน"
											></v-text-field>
										</p>
										<p>
											<v-text-field
												v-if="isEditing"
												v-model="line"
												label="ไลน์ไอดี"
											></v-text-field>
											<span v-if="!isEditing">
												ไลน์ไอดี(ถ้ามี): &nbsp; {{ account.line }}
											</span>
										</p>
                  </v-card-text>
									<v-card-actions>
										<v-spacer />
										<v-btn
											v-if="isEditing"
											color="primary"
											@click.prevent="updateAccount(authUser)"
										>
											บันทึก
										</v-btn>
										<v-btn
											v-if="!isEditing"
											color="primary"
											@click="refresh"
										>
											รีเฟรช
										</v-btn>
									</v-card-actions>
									<v-snackbar
							      v-model="hasSaved"
							      :timeout="2000"
							      absolute
							      bottom
							      left
							    >
							      บันทึกข้อมูล สำเร็จ!
							    </v-snackbar>
								</v-card>
              </v-col>
						</v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { update } from 'firebase/database';
import { ref, getDownloadURL, uploadBytesResumable } from '@firebase/storage';
import { storage } from '~/plugins/firebase';
import { dbRef } from '~/utils/database';
import PreviousButton from '~/components/Buttons/PreviousButton.vue';

export default {
  name: 'UsersIdAccountPage',

	components: {
		PreviousButton
	},

  middleware: 'auth',

  async asyncData ({ app, params, error }) {
    let data;
    try {
      data = await app.$fire.database.ref('/users/' + params.id).get();
    } catch (e) {
      alert(e);
    }
    return {
      account: data.val().account
    };
  },

	data () {
		return {
			previous: `/users/${this.$route.params.id}`,
      hasSaved: false,
      isEditing: null,
      model: null,
      phoneNumber: '',
			line: '',
			passport: '',
			passportURL: '',
			file: Object,
			uploadRules: [
				value => !value || value.size < 2000000 || 'ต้องเป็นภาพนามสกุล .jpg, .jpeg, .png ที่มีขนาดไม่เกิน 2MB.'
			]
		};
	},

  computed: {
    ...mapState(['authUser']),
    ...mapGetters(['authenticated'])
  },

	methods: {
		async updateAccount (authUser) {
			const uid = authUser.uid;

			try {
				const filePath = `/users/${uid}/${this.file.name}`;
				const storageRef = ref(storage, filePath);
				const newImage = await uploadBytesResumable(storageRef, this.file);
				const publicUrl = await getDownloadURL(storageRef);
				const userRef = dbRef(`/users/${uid}/account`);
				await update(userRef, {
          phoneNumber: this.phoneNumber,
					phoneVerified: true,
          line: this.line,
					passport: this.passport,
					passportVerified: true,
					passportURL: publicUrl,
					storageURL: newImage.metadata.fullPath,
					lastUpdatePhoto: Date.now()
				});
        this.isEditing = !this.isEditing;
        this.hasSaved = true;
			} catch (e) {
				alert(e.response.data.message);
			}
		},
		refresh () {
			this.$nuxt.refresh();
		}
	}
};
</script>
