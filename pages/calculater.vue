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
					คำณวนอัตราแลกเปลี่ยน
					<v-spacer />
        </v-card-title>
        <v-card-text class="light">
          <v-spacer />
          <v-card
            light
            color="white"
            class="px-2 mx-auto pt-1 pb-2"
            elevation="20"
          >
            <v-card-text>
	            <v-select
	              v-model="type"
								class="align-center medium"
	              label="บริการ"
	              :items="typeItems"
	              item-text="text"
	              item-value="value"
	              clearable
	            />
	            <v-select
	              v-model="title"
								class="align-center medium"
	              label="ช่องทาง"
	              :items="titleItems"
	              item-text="text"
	              item-value="value"
                clearable
	            />
	            <v-text-field
	              v-model="amount"
								class="align-center medium"
	              type="number"
	              label="ดอลลาร์ฯ"
	              prepend-inner-icon="mdi-currency-usd"
	              placeholder="ขั้นต่ำ 100, สูงสุด 10,000"
	              clearable
	            />
	            <h6>
								ราคา <strong class="blue--text text-h6">{{ price }}</strong> บาทต่อ 1 ดอลลาร์ฯ
	            </h6>
	            <h3>
								ราคารวม <strong class="blue--text text-h6"> {{ total }} </strong> บาท
	            </h3>
            </v-card-text>
						<v-card-actions>
						  <v-spacer />
	            <v-btn
	              color="secondary"
	              @click="reset"
	            >
								เริ่มใหม่
							</v-btn>
							<v-spacer />
	            <v-btn
                color="primary"
	              @click.stop="findPrice"
	            >
								คำณวน
							</v-btn>
							<v-spacer />
            </v-card-actions>
						<v-card-actions>
	            <v-btn
	              color="info"
								block
	              nuxt
								to="/neworder"
								exact
	            >
								แจ้งโอน
							</v-btn>
            </v-card-actions>
						<v-card-actions>
	            <v-btn
	              color="error"
								block
	              nuxt
								to="/"
								exact
	            >
								ยกเลิก
							</v-btn>
            </v-card-actions>
          </v-card>
          <v-spacer />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { multiply } from '~/utils/utils';
import PreviousButton from '~/components/Buttons/PreviousButton.vue';

export default {
  name: 'CalculaterPage',

	components: {
    PreviousButton
  },

  data () {
    return {
			previous: '/currencies',
			typeItems: [
				{ text: 'โปรดเลือกบริการ', value: '' },
        { text: 'แจ้งโอนเพื่อขาย', value: 'sell' },
        { text: 'แจ้งโอนเพื่อซื้อ', value: 'buy' }
			],
			titleItems: [
        { text: 'ประเภท', value: '' },
        { text: 'PayPal', value: 'paypals' },
        { text: 'Web Money', value: 'webmonies' },
        { text: 'Perfect Money', value: 'perfectmonies' },
        { text: 'Neteller', value: 'netellers' },
        { text: 'Skrill', value: 'skrills' }
      ],
			type: null,
			title: null,
			amount: 0,
			price: 0,
			total: 0
    };
  },

	methods: {
    findPrice () {
      const type = this.type;
      const title = this.title;
      const amount = this.amount;
      if (type !== null && title !== null && amount !== null) {
        if (type === 'sell' && title === 'paypals' && amount >= 100 && amount <= 500) {
          this.price = 27.00;
          this.total = multiply(amount, 27.00);
        } else if (type === 'sell' && title === 'paypals' && amount >= 501 && amount <= 1000) {
          this.price = 27.25;
          this.total = multiply(amount, 27.25);
        } else if (type === 'sell' && title === 'paypals' && amount >= 1001 && amount <= 1500) {
          this.price = 27.50;
          this.total = multiply(amount, 27.50);
        } else if (type === 'sell' && title === 'paypals' && amount >= 1501 && amount <= 2000) {
          this.price = 27.75;
          this.total = multiply(amount, 27.75);
        } else if (type === 'sell' && title === 'paypals' && amount >= 2001 && amount <= 10000) {
          this.price = 28.00;
          this.total = multiply(amount, 28.00);
        } else if (type === 'sell' && title === 'webmonies' && amount >= 100 && amount <= 500) {
          this.price = 26.00;
          this.total = multiply(amount, 27.00);
        } else if (type === 'sell' && title === 'webmonies' && amount >= 501 && amount <= 1000) {
          this.price = 26.25;
          this.total = multiply(amount, 27.25);
        } else if (type === 'sell' && title === 'webmonies' && amount >= 1001 && amount <= 1500) {
          this.price = 26.50;
          this.total = multiply(amount, 27.50);
        } else if (type === 'sell' && title === 'webmonies' && amount >= 1501 && amount <= 2000) {
          this.price = 26.75;
          this.total = multiply(amount, 27.75);
        } else if (type === 'sell' && title === 'webmonies' && amount >= 2001 && amount <= 10000) {
          this.price = 27.00;
          this.total = multiply(amount, 28.00);
        } else if (type === 'sell' && title === 'perfectmonies' && amount >= 100 && amount <= 500) {
          this.price = 26.50;
          this.total = multiply(amount, 27.00);
        } else if (type === 'sell' && title === 'perfectmonies' && amount >= 501 && amount <= 1000) {
          this.price = 26.75;
          this.total = multiply(amount, 27.25);
        } else if (type === 'sell' && title === 'perfectmonies' && amount >= 1001 && amount <= 1500) {
          this.price = 27.00;
          this.total = multiply(amount, 27.50);
        } else if (type === 'sell' && title === 'perfectmonies' && amount >= 1501 && amount <= 2000) {
          this.price = 27.25;
          this.total = multiply(amount, 27.75);
        } else if (type === 'sell' && title === 'perfectmonies' && amount >= 2001 && amount <= 10000) {
          this.price = 27.50;
          this.total = multiply(amount, 28.00);
        } else if (type === 'sell' && title === 'netellers' && amount >= 100 && amount <= 500) {
          this.price = 26.25;
          this.total = multiply(amount, 27.00);
        } else if (type === 'sell' && title === 'netellers' && amount >= 501 && amount <= 1000) {
          this.price = 26.50;
          this.total = multiply(amount, 27.25);
        } else if (type === 'sell' && title === 'netellers' && amount >= 1001 && amount <= 1500) {
          this.price = 26.75;
          this.total = multiply(amount, 27.50);
        } else if (type === 'sell' && title === 'netellers' && amount >= 1501 && amount <= 2000) {
          this.price = 27.00;
          this.total = multiply(amount, 27.75);
        } else if (type === 'sell' && title === 'netellers' && amount >= 2001 && amount <= 10000) {
          this.price = 27.25;
          this.total = multiply(amount, 28.00);
        } else if (type === 'sell' && title === 'skrills' && amount >= 100 && amount <= 500) {
          this.price = 27.25;
          this.total = multiply(amount, 27.00);
        } else if (type === 'sell' && title === 'skrills' && amount >= 501 && amount <= 1000) {
          this.price = 27.50;
          this.total = multiply(amount, 27.25);
        } else if (type === 'sell' && title === 'skrills' && amount >= 1001 && amount <= 1500) {
          this.price = 27.75;
          this.total = multiply(amount, 27.50);
        } else if (type === 'sell' && title === 'skrills' && amount >= 1501 && amount <= 2000) {
          this.price = 28.00;
          this.total = multiply(amount, 27.75);
        } else if (type === 'sell' && title === 'skrills' && amount >= 2001 && amount <= 10000) {
          this.price = 28.25;
          this.total = multiply(amount, 28.00);
        } else if (type === 'buy' && title === 'paypals' && amount >= 100 && amount <= 500) {
          this.price = 36.00;
          this.total = multiply(amount, 36.00);
        } else if (type === 'buy' && title === 'paypals' && amount >= 501 && amount <= 1000) {
          this.price = 35.75;
          this.total = multiply(amount, 35.75);
        } else if (type === 'buy' && title === 'paypals' && amount >= 1001 && amount <= 1500) {
          this.price = 35.50;
          this.total = multiply(amount, 35.50);
        } else if (type === 'buy' && title === 'paypals' && amount >= 1501 && amount <= 2000) {
          this.price = 35.25;
          this.total = multiply(amount, 35.25);
        } else if (type === 'buy' && title === 'paypals' && amount >= 2001 && amount <= 10000) {
          this.price = 35.00;
          this.total = multiply(amount, 35.00);
        } else if (type === 'buy' && title === 'webmonies' && amount >= 100 && amount <= 500) {
          this.price = 35.00;
          this.total = multiply(amount, 27.00);
        } else if (type === 'buy' && title === 'webmonies' && amount >= 501 && amount <= 1000) {
          this.price = 34.75;
          this.total = multiply(amount, 27.25);
        } else if (type === 'buy' && title === 'webmonies' && amount >= 1001 && amount <= 1500) {
          this.price = 34.50;
          this.total = multiply(amount, 27.50);
        } else if (type === 'buy' && title === 'webmonies' && amount >= 1501 && amount <= 2000) {
          this.price = 34.25;
          this.total = multiply(amount, 27.75);
        } else if (type === 'buy' && title === 'webmonies' && amount >= 2001 && amount <= 10000) {
          this.price = 34.00;
          this.total = multiply(amount, 28.00);
        } else if (type === 'buy' && title === 'perfectmonies' && amount >= 100 && amount <= 500) {
          this.price = 36.50;
          this.total = multiply(amount, 27.00);
        } else if (type === 'buy' && title === 'perfectmonies' && amount >= 501 && amount <= 1000) {
          this.price = 36.25;
          this.total = multiply(amount, 27.25);
        } else if (type === 'buy' && title === 'perfectmonies' && amount >= 1001 && amount <= 1500) {
          this.price = 36.00;
          this.total = multiply(amount, 27.50);
        } else if (type === 'buy' && title === 'perfectmonies' && amount >= 1501 && amount <= 2000) {
          this.price = 35.75;
          this.total = multiply(amount, 27.75);
        } else if (type === 'buy' && title === 'perfectmonies' && amount >= 2001 && amount <= 10000) {
          this.price = 35.50;
          this.total = multiply(amount, 28.00);
        } else if (type === 'buy' && title === 'netellers' && amount >= 100 && amount <= 500) {
          this.price = 36.25;
          this.total = multiply(amount, 27.00);
        } else if (type === 'buy' && title === 'netellers' && amount >= 501 && amount <= 1000) {
          this.price = 36.00;
          this.total = multiply(amount, 27.25);
        } else if (type === 'buy' && title === 'netellers' && amount >= 1001 && amount <= 1500) {
          this.price = 35.75;
          this.total = multiply(amount, 27.50);
        } else if (type === 'buy' && title === 'netellers' && amount >= 1501 && amount <= 2000) {
          this.price = 35.50;
          this.total = multiply(amount, 27.75);
        } else if (type === 'buy' && title === 'netellers' && amount >= 2001 && amount <= 10000) {
          this.price = 35.25;
          this.total = multiply(amount, 28.00);
        } else if (type === 'buy' && title === 'skrills' && amount >= 100 && amount <= 500) {
          this.price = 37.25;
          this.total = multiply(amount, 27.00);
        } else if (type === 'buy' && title === 'skrills' && amount >= 501 && amount <= 1000) {
          this.price = 37.00;
          this.total = multiply(amount, 27.25);
        } else if (type === 'buy' && title === 'skrills' && amount >= 1001 && amount <= 1500) {
          this.price = 36.75;
          this.total = multiply(amount, 27.50);
        } else if (type === 'buy' && title === 'skrills' && amount >= 1501 && amount <= 2000) {
          this.price = 36.50;
          this.total = multiply(amount, 27.75);
        } else if (type === 'buy' && title === 'skrills' && amount >= 2001 && amount <= 10000) {
          this.price = 36.25;
          this.total = multiply(amount, 28.00);
        }
      }
    },
		reset () {
			this.type = null;
			this.title = null;
			this.amount = 0;
			this.price = 0;
			this.total = 0;
		}
	}
};
</script>
