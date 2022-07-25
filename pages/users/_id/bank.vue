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
          ธนาคาร
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
											ดูหรือแกไขธนาคาร
										</v-toolbar-title>
										<v-spacer />
										<v-btn
											color="primary"
											fab
											small
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
										<div v-if="bank.bankVerified === false">
											<p v-if="!isEditing">
												สถานะ: &nbsp;
												<span class="red--text">
													{{ getBankStatus(bank.bankStatus) }}
												</span>
											</p>
											<p v-if="isEditing">
												<v-autocomplete
													v-model="bankName"
													label="ธนาคาร"
													:items="bankItems"
													item-text="text"
													item-value="value"
												></v-autocomplete>
												<v-text-field
													v-if="bankName === 'other'"
													v-model="bankName2"
													label="ธนาคาร(โปรดระบุ)"
													placeholder="ธนาคาร(โปรดระบุ)"
													clearable
												></v-text-field>
											</p>
											<p v-if="!isEditing">
												<span v-if="bank.bankName === 'other'">
													ธนาคาร: &nbsp; {{ bank.bankName2 }}
												</span>
												<span v-else>
													ธนาคาร: &nbsp; {{ getBankName(bank.bankName) }}
												</span>
											</p>
											<p>
												<v-text-field
													v-if="isEditing"
													v-model="bankNumber"
													label="เลขที่บันชีธนาคาร"
													clearable
												></v-text-field>
												<span v-if="!isEditing">
													เลขที่บัญชีธนาคาร: &nbsp; {{ bank.bankNumber }}
												</span>
											</p>
											<p>
												<v-file-input
													v-if="isEditing"
													v-model="file"
													label="ภาพหน้าสมุดบัญชีธนาคาร"
													:rules="uploadRules"
													except="image/jpeg, image/jpg, image/png"
													show-size
												></v-file-input>
												<v-img
													v-if="!isEditing"
													:src="bank.bankURL"
													class="mx-auto"
													max-width="200px"
													height="auto"
												></v-img>
											</p>
										</div>
										<div v-else>
											<p v-if="!isEditing">
												สถานะ: &nbsp;
												<span class="green--text">
													{{ getBankStatus(bank.bankStatus) }}
												</span>
											</p>
											<p v-if="!isEditing">
												<span v-if="bank.bankName === 'other'">
													ธนาคาร: &nbsp; {{ bank.bankName2 }}
												</span>
												<span v-else>
													ธนาคาร: &nbsp; {{ getBankName(bank.bankName) }}
												</span>
											</p>
											<p v-if="!isEditing">
												<span>
													เลขที่บัญชีธนาคาร: &nbsp; {{ bank.bankNumber }}
												</span>
											</p>
											<p v-if="!isEditing">
												<v-img
													:src="bank.bankURL"
													class="mx-auto"
													max-width="200px"
													height="auto"
												></v-img>
											</p>
											<p v-if="isEditing">
												ท่านได้เพิ่มข้อมูลธนาคารไว้แล้ว โปรดติดต่อเจ้าหน้าที่หากต้องการแก้ไขบัญชีธนาคาร.
											</p>
										</div>
									</v-card-text>
									<v-card-actions>
										<v-spacer />
										<div v-if="bank.bankVerified === false">
											<v-btn
												v-if="isEditing"
												color="primary"
												@click.prevent="updateBank(authUser)"
											>
												บันทึก
											</v-btn>
										</div>
										<v-btn
											v-if="!isEditing"
											color="primary"
											@click="refresh"
										>
											รีเฟรช
										</v-btn>
										<v-spacer />
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
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '~/plugins/firebase';
import { dbRef } from '~/utils/database';
import { getBankName, getBankStatus } from '~/utils/utils';
import PreviousButton from '~/components/Buttons/PreviousButton.vue';

export default {
  name: 'UsersIdBankPage',

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
      bank: data.val().bank
    };
  },

	data () {
		return {
			previous: `/users/${this.$route.params.id}`,
      hasSaved: false,
      isEditing: null,
      model: null,
			bankItems: [
				{ text: 'เลือกธนาคาร', value: '' },
				{ text: 'กสิกรไทย', value: 'KBANK' },
				{ text: 'กรุงเทพฯ', value: 'BBL' },
				{ text: 'กรุงไทย', value: 'KTB' },
				{ text: 'เกียรตินาคินภทร', value: 'KKP' },
				{ text: 'กรุงศรีอยุธยา', value: 'BOA' },
				{ text: 'ไทยพานิชย์', value: 'SCB' },
				{ text: 'ทหารไทยธนชาติ', value: 'TTB' },
				{ text: 'ออมสิน', value: 'GSB' },
				{ text: 'ยูโอบีฯ', value: 'UOB' },
				{ text: 'ซีไอเอ็มบี', value: 'CIMB' },
				{ text: 'ธ.ก.ส.', value: 'BAAC' },
				{ text: 'อื่นๆ(ระบุบรรทัดล่าง)', value: 'other' }
			],
			bankName: null,
			bankName2: '',
      bankNumber: '',
			bankURL: '',
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
		getBankName,
		getBankStatus,
		async updateBank (authUser) {
			const uid = authUser.uid;
			try {
				const filePath = `/users/${uid}/${this.file.name}`;
				const storageRef = ref(storage, filePath);
				const newImage = await uploadBytesResumable(storageRef, this.file);
				const publicUrl = await getDownloadURL(storageRef);
				const userRef = dbRef(`/users/${uid}/bank`);
				await update(userRef, {
					bankName: this.bankName,
          bankNumber: this.bankNumber,
					bankVerified: true,
					bankStatus: 'checking',
					bankURL: publicUrl,
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
