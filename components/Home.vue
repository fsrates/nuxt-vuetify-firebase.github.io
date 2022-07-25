<template>
  <v-container fluid class="light">
    <v-row class="light">
      <v-col
			  cols="12"
        align="center"
			>
			  <v-card light color="white">
          <div class="d-flex flex-no-wrap justify-space-between white">
            <div>
              <v-card-title class="text-h6 white">
    					  บริการของเรา
    					</v-card-title>
              <v-card-text align="start">
    					  ศูนย์แลกเปลี่ยนเงินตราต่างประเทศออนไลน์ FS-EXCHANGER
    						บริการรับ ซื้อ ขาย แลกเปลี่ยน ดอลลาร์สหรัฐฯ ผ่านช่องทางออนไลน์ต่างๆ
    						&nbsp;เช่น Paypal, Web Money, Perfect Money, Neteller, Skrill
  					  </v-card-text>
            </div>
            <v-avatar
              size="160"
							class="my-3 mr-3"
              tile
            >
              <v-img src="https://res.cloudinary.com/dzre5cq2d/image/upload/v1658488440/public/cats2_htrmgk.jpg"></v-img>
            </v-avatar>
          </div>
				</v-card>
			</v-col>
			<v-col
			  cols="12"
        align="center"
			>
			  <v-card light color="white">
				  <div class="d-flex flex-no-wrap justify-space-between white">
            <v-avatar
              size="160"
							class="my-3 ml-3"
              tile
            >
              <v-img src="https://res.cloudinary.com/dzre5cq2d/image/upload/v1658490569/public/bank2_setp1z.jpg"></v-img>
            </v-avatar>
            <div>
              <v-card-title class="text-h6 white">
                ธนาคาร และ วอเลท...
              </v-card-title>
              <v-card-text align="start">
                &nbsp;เรารองรับทุกธนาคารและใช้ระบบโอนเงินออนไลน์
                ที่สามารถโอนเงินไปยังลูกค้าได้ 24 ชั่วโมง
                &nbsp;นอกจากนี้ เรายังรองรับการโอนเงินผ่านวอเลทชั้นนำต่างๆ
                &nbsp;เช่น ทรูวอเลท, ดอลฟิน, ไลน์บีเค, แรบบิทไลน์เพย์,
                &nbsp;ช้อปปี้เพย์, วีแชท, เฟสบุ้คเพย์
              </v-card-text>
            </div>
          </div>
				</v-card>
			</v-col>
      <v-col
        cols="12"
      >
        <v-card light color="ghostwhite">
          <div class="d-flex flex-no-wrap justify-space-between white">
            <div>
              <v-card-title class="text-h6 white">
                เปิด 24 ชั่วโมง...
              </v-card-title>
              <v-card-text align="start">
                เราให้บริการทุกวันและตลอด 24 ชั่วโมง
                &nbsp;ไม่ว่าท่านจะซื้อหรือขาย แลกเปลี่ยนเงิน บาท-ดอลลาร์ หรือเงิน
                &nbsp;ดอลลาร์-บาท เราก็พร้อมให้บริการตลอด
              </v-card-text>
            </div>
            <v-avatar
              size="160"
							class="my-3 mr-3"
              tile
            >
              <v-img src="https://res.cloudinary.com/dzre5cq2d/image/upload/v1658490569/public/bank_tplmc3.jpg"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="6"
        class="mx-auto"
      >
        <v-card color="transparent">
          <nuxt-link to="/currencies">
            <v-img
              src="https://res.cloudinary.com/dzre5cq2d/image/upload/v1658071885/public/currencies2bg2_ushtfj.png"
              class="white--text align-center"
              height="auto"
              elevation="16"
            >
              <v-card-title class="medium">
                <v-spacer />
                อัตรา <br> แลก <br> เปลี่ยน
                <v-spacer />
              </v-card-title>
            </v-img>
          </nuxt-link>
        </v-card>
      </v-col>
      <v-col
        cols="6"
        class="mx-auto"
      >
        <v-card color="transparent">
          <nuxt-link to="/guides">
            <v-img
              src="https://res.cloudinary.com/dzre5cq2d/image/upload/v1658071888/public/guides2bg2_jfwkxt.png"
              class="white--text align-center"
              height="auto"
            >
              <v-card-title class="medium">
                <v-spacer />
                วิธีการ <br> ซื้อ-ขาย
                <v-spacer />
              </v-card-title>
            </v-img>
          </nuxt-link>
        </v-card>
      </v-col>
      <v-col
        cols="6"
        class="mx-auto"
      >
        <v-card color="transparent">
          <nuxt-link to="/neworder">
            <v-img
              src="https://res.cloudinary.com/dzre5cq2d/image/upload/v1658071881/public/neworder2bg2_l5kljr.png"
              class="white--text align-center"
              height="auto"
            >
              <v-card-title class="medium">
                <v-spacer />
                แจ้งโอน
                <v-spacer />
              </v-card-title>
            </v-img>
          </nuxt-link>
        </v-card>
      </v-col>
      <v-col
        cols="6"
        class="mx-auto"
      >
        <v-card color="transparent">
          <nuxt-link to="/contact">
            <v-img
              src="https://res.cloudinary.com/dzre5cq2d/image/upload/v1658071884/public/contact22_bgxrea.png"
              class="white--text align-center"
              height="auto"
            >
              <v-card-title class="medium">
                <v-spacer />
                ติดต่อ <br> เรา
                <v-spacer />
              </v-card-title>
            </v-img>
          </nuxt-link>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HomePage'
};
</script>

<style>
.middle {
  vertical-align: middle;
}

.medium {
  font-size: medium;
}
</style>
