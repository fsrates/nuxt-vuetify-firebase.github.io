<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
				class="align-center"
      >
        <v-card light color="white">
          <v-card-title class="text-h6 bg-white">
					  <v-spacer />
            สถานที่ตั้ง
						<v-spacer />
          </v-card-title>
          <v-card-subtitle class="white">
            บริษัท ฟาสต์ แอนด์ เซฟ เอ็กซ์เชนจ์ จำกัด
          </v-card-subtitle>
          <v-card-text class="white">
            เลขที่: 313/85 <br>
            หมู่ที่: 10 <br>
            ถนน: เฉลิมพระเกียรติ <br>
            ตำบล: หนองปรือ <br>
            อำเภอ: บางละมุง <br>
            จังหวัด: ชลบุรี <br>
            ประเทศ: ไทย <br>
            รหัสไปรษณีย์: 20150
          </v-card-text>
        </v-card>
      </v-col>
			<v-col
        v-for="(contact, i) in contacts"
        :key="i"
        cols="12"
      >
        <v-card
          :color="contact.color"
          dark
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-subtitle>
							  <v-spacer />
								{{ contact.title }}
								<v-spacer />
							</v-card-subtitle>
							<v-divider />
              <v-card-title class="text-h6" align="center">
								<v-spacer />
								{{ contact.subtitle }}
								<v-spacer />
							</v-card-title>
              <v-card-actions>
                <v-btn
                  v-if="contact.title === 'ไลน์ไอดี'"
                  class="ml-2 my-auto"
                  color="white"
                  right
                  block
									outlined
									rounded
                >
                  <a
                    href="https://lin.ee/ZygrScM"
                    class="white--text"
                    target="_blank"
                  >
									  ไลน์หาเรา!
									</a>
                </v-btn>
                <v-btn
                  v-if="contact.title === 'ไลน์แสกน'"
                  class="ml-2 my-auto"
                  color="white"
                  right
                  block
									outlined
									rounded
									@click.stop="dialogLineScan = true"
                >
                  แสกนเพิ่มเพื่อน!
                </v-btn>
                <v-btn
                  v-else-if="contact.title === 'สายด่วน 24/7'"
                  class="ml-2 mt-3"
                  color="white"
                  right
                  block
									outlined
									rounded
                >
									<a
                    href="tel: +66829914824"
                    class="white--text"
                  >
									  โทรหาเรา
									</a>
                </v-btn>
                <v-btn
                  v-else-if="contact.title === 'เฟสบุ้ค แฟนเพจ'"
                  class="ml-2 mt-3"
                  color="white"
                  right
                  block
									outlined
									rounded
                >
									<a
                    href="https://www.facebook.com/fsexchanger"
                    class="white--text"
                    target="_blank"
                  >
									  ไปยังแฟนเพจ!
									</a>
                </v-btn>
                <v-btn
                  v-else
                  class="ml-2 mt-3"
                  color="white"
                  right
                  block
									outlined
									rounded
									nuxt
									:to="contact.to"
                >
                  {{ contact.text }}
                </v-btn>
                <v-dialog
                  v-model="dialogLineScan"
                  max-width="360"
                >
                  <v-card light>
                    <v-img
                      src="https://res.cloudinary.com/dzre5cq2d/image/upload/v1657976806/public/L_gainfriends_qr_m8uvp8.png"
                      max-height="360"
                    ></v-img>
										<v-card-actions>
										  <v-btn
											  color="error"
												@click="dialogLineScan = false"
											>
											  ปิด
											</v-btn>
										</v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card-actions>
            </div>
            <v-avatar
              class="ma-3"
              size="180"
              tile
            >
              <v-img :src="contact.src"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
	name: 'ContactComponent',

	data () {
		return {
      dialogLineScan: false,
			contacts: [
				{
					title: 'ไลน์ไอดี',
					subtitle: '@406wdswe',
					text: 'ไลน์หาเรา คลิก!',
					color: 'green darken3',
					to: 'https://lin.ee/ZygrScM',
					src: 'https://res.cloudinary.com/dzre5cq2d/image/upload/v1657903774/public/lineAddAuto_htuoyd.png'
				},
				{
					title: 'ไลน์แสกน',
					subtitle: '@406wdswe',
					text: 'เพิ่มเพื่อน คลิก!',
					color: 'green darken2',
					to: '#',
					src: 'https://res.cloudinary.com/dzre5cq2d/image/upload/v1657976832/public/M_gainfriends_qr_tz3dcj.png'
				},
				{
					title: 'สายด่วน 24/7',
					subtitle: '0829914824',
					text: 'โทรหาเรา',
					color: 'lightgrey',
					to: '#',
					src: 'https://res.cloudinary.com/dzre5cq2d/image/upload/v1657914570/public/contact-call_qeenar.jpg'
				},
				{
					title: 'WhatsApp',
					subtitle: '+66829914824',
					text: 'แชทกับเรา คลิก!',
					color: 'green darken-1',
					to: '#',
					src: 'https://res.cloudinary.com/dzre5cq2d/image/upload/v1657905194/public/contact-whatsapp_p9hdqb.png'
				},
				{
					title: 'เฟสบุ้ค แฟนเพจ',
					subtitle: '@fsexchanger',
					text: 'ดูเพจ คลิก!',
					color: '#004a75',
					to: '#',
					src: 'https://res.cloudinary.com/dzre5cq2d/image/upload/v1656623894/public/contact-fb_k0ggtb.png'
				},
				{
					title: 'Skype',
					subtitle: '@fs-exchanger',
					text: 'skypeหาเรา คลิก!',
					color: 'blue darken-1',
					to: '#',
					src: 'https://res.cloudinary.com/dzre5cq2d/image/upload/v1656623284/public/contact-skype_wqyh0e.png'
				},
				{
					title: 'Twitter',
					subtitle: '@VALUERENCY',
					text: 'ทวิตหาเรา คลิก!',
					color: 'blue darken-3',
					to: 'https://twitter.com/@VALUERENCY',
					src: 'https://res.cloudinary.com/dzre5cq2d/image/upload/v1657906454/public/contact-twitter_xqj6kn.png'
				},
				{
					title: 'Messenger',
					subtitle: '@fs-exchanger',
					text: 'ส่งข้อความหาเรา',
					color: '#004e75',
					to: '#',
					src: 'https://res.cloudinary.com/dzre5cq2d/image/upload/v1658582038/public/contact-messenger_xix3ms.png'
				},
				{
					title: 'อีเมลล์',
					subtitle: 'info@fs-rates.com',
					text: 'ส่งอีเมลล์ คลิก!',
					color: '#004d75cc',
					to: '/sendmail',
					src: 'https://res.cloudinary.com/dzre5cq2d/image/upload/v1657916893/public/contact-email_lekdtt.png'
				}
			]
		};
	},

  methods: {
    copyTextToClipboard () {
      const text = '0829914824';
      return new ClipboardEvent('copy', text);
    }
  }
};
</script>
