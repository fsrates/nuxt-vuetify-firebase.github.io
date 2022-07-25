<template>
  <v-row justify="center" align="center">
    <v-col
      cols="12"
      sm="12"
      md="6"
      lg="6"
      align="center"
      class="py-4 px-4"
      background-color="ghostwhite"
    >
      <v-card light>
        <v-card-title>
				  <v-spacer />
          แจ้งโอน
					<v-spacer />
        </v-card-title>
        <v-card-text>
          <p>
            <v-select
              v-model="type"
              label="บริการ"
              :items="typeItems"
              item-text="text"
              item-value="value"
              required
            />
          </p>
          <p>
            <v-select
              v-model="title"
              label="ช่องทาง"
              :items="titleItems"
              item-text="text"
              item-value="value"
              required
              :disabled="type === null"
            />
          </p>
          <p>
            <v-text-field
              v-model="amount"
              type="number"
              label="ดอลลาร์ฯ"
              prepend-inner-icon="mdi-currency-usd"
              placeholder="ขั้นต่ำ 100, สูงสุด 10,000"
							:disabled="title === null"
              required
              @change="findPrice"
            />
          </p>
          <p>
            ราคา {{ price }} บาทต่อ 1 ดอลลาร์ฯ
          </p>
					<p>
            ราคารวม {{ total }} บาท
          </p>
					<p>
            <v-file-input
              v-model="file"
              label="รูปสลิป/หลักฐานการโอน"
              prepend-inner-icon="mdi-upload"
              placeholder="อับโหลดรูปสลิป/หลักฐานการโอน"
							except="image/jpeg, image/jpg, image/png"
							:rules="uploadRules"
							:disabled="total === 0"
							show-size
              required
            ></v-file-input>
          </p>
        </v-card-text>
        <v-card-actions>
				  <v-spacer />
          <v-btn
            type="reset"
            color="info"
            @click="reset"
          >
            เริ่มใหม่
          </v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            @click.stop="createOrder"
          >
            แจ้งโอน
          </v-btn>
          <v-spacer />
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
    </v-col>
  </v-row>
</template>

<script>
import { push, update } from '@firebase/database';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '~/plugins/firebase';
import { dbRef } from '~/utils/database';
import { multiply } from '~/utils/utils';

export default {
  name: 'NeworderPage',

	middleware: 'auth',

  data () {
    return {
			uploadRules: [
				value => !value || value.size < 2000000 || 'ต้องเป็นภาพนามสกุล .jpg, .jpeg, .png ที่มีขนาดไม่เกิน 2MB.'
			],
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
      total: 0,
			file: Object
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
          this.price = 27.00;
          this.total = multiply(amount, 27.00);
        } else if (type === 'sell' && title === 'webmonies' && amount >= 501 && amount <= 1000) {
          this.price = 27.25;
          this.total = multiply(amount, 27.25);
        } else if (type === 'sell' && title === 'webmonies' && amount >= 1001 && amount <= 1500) {
          this.price = 27.50;
          this.total = multiply(amount, 27.50);
        } else if (type === 'sell' && title === 'webmonies' && amount >= 1501 && amount <= 2000) {
          this.price = 27.75;
          this.total = multiply(amount, 27.75);
        } else if (type === 'sell' && title === 'webmonies' && amount >= 2001 && amount <= 10000) {
          this.price = 28.00;
          this.total = multiply(amount, 28.00);
        } else if (type === 'sell' && title === 'perfectmonies' && amount >= 100 && amount <= 500) {
          this.price = 27.00;
          this.total = multiply(amount, 27.00);
        } else if (type === 'sell' && title === 'perfectmonies' && amount >= 501 && amount <= 1000) {
          this.price = 27.25;
          this.total = multiply(amount, 27.25);
        } else if (type === 'sell' && title === 'perfectmonies' && amount >= 1001 && amount <= 1500) {
          this.price = 27.50;
          this.total = multiply(amount, 27.50);
        } else if (type === 'sell' && title === 'perfectmonies' && amount >= 1501 && amount <= 2000) {
          this.price = 27.75;
          this.total = multiply(amount, 27.75);
        } else if (type === 'sell' && title === 'perfectmonies' && amount >= 2001 && amount <= 10000) {
          this.price = 28.00;
          this.total = multiply(amount, 28.00);
        } else if (type === 'sell' && title === 'netellers' && amount >= 100 && amount <= 500) {
          this.price = 27.00;
          this.total = multiply(amount, 27.00);
        } else if (type === 'sell' && title === 'netellers' && amount >= 501 && amount <= 1000) {
          this.price = 27.25;
          this.total = multiply(amount, 27.25);
        } else if (type === 'sell' && title === 'netellers' && amount >= 1001 && amount <= 1500) {
          this.price = 27.50;
          this.total = multiply(amount, 27.50);
        } else if (type === 'sell' && title === 'netellers' && amount >= 1501 && amount <= 2000) {
          this.price = 27.75;
          this.total = multiply(amount, 27.75);
        } else if (type === 'sell' && title === 'netellers' && amount >= 2001 && amount <= 10000) {
          this.price = 28.00;
          this.total = multiply(amount, 28.00);
        } else if (type === 'sell' && title === 'skrills' && amount >= 100 && amount <= 500) {
          this.price = 27.00;
          this.total = multiply(amount, 27.00);
        } else if (type === 'sell' && title === 'skrills' && amount >= 501 && amount <= 1000) {
          this.price = 27.25;
          this.total = multiply(amount, 27.25);
        } else if (type === 'sell' && title === 'skrills' && amount >= 1001 && amount <= 1500) {
          this.price = 27.50;
          this.total = multiply(amount, 27.50);
        } else if (type === 'sell' && title === 'skrills' && amount >= 1501 && amount <= 2000) {
          this.price = 27.75;
          this.total = multiply(amount, 27.75);
        } else if (type === 'sell' && title === 'skrills' && amount >= 2001 && amount <= 10000) {
          this.price = 28.00;
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
          this.price = 27.00;
          this.total = multiply(amount, 27.00);
        } else if (type === 'buy' && title === 'webmonies' && amount >= 501 && amount <= 1000) {
          this.price = 27.25;
          this.total = multiply(amount, 27.25);
        } else if (type === 'buy' && title === 'webmonies' && amount >= 1001 && amount <= 1500) {
          this.price = 27.50;
          this.total = multiply(amount, 27.50);
        } else if (type === 'buy' && title === 'webmonies' && amount >= 1501 && amount <= 2000) {
          this.price = 27.75;
          this.total = multiply(amount, 27.75);
        } else if (type === 'buy' && title === 'webmonies' && amount >= 2001 && amount <= 10000) {
          this.price = 28.00;
          this.total = multiply(amount, 28.00);
        } else if (type === 'buy' && title === 'perfectmonies' && amount >= 100 && amount <= 500) {
          this.price = 27.00;
          this.total = multiply(amount, 27.00);
        } else if (type === 'buy' && title === 'perfectmonies' && amount >= 501 && amount <= 1000) {
          this.price = 27.25;
          this.total = multiply(amount, 27.25);
        } else if (type === 'buy' && title === 'perfectmonies' && amount >= 1001 && amount <= 1500) {
          this.price = 27.50;
          this.total = multiply(amount, 27.50);
        } else if (type === 'buy' && title === 'perfectmonies' && amount >= 1501 && amount <= 2000) {
          this.price = 27.75;
          this.total = multiply(amount, 27.75);
        } else if (type === 'buy' && title === 'perfectmonies' && amount >= 2001 && amount <= 10000) {
          this.price = 28.00;
          this.total = multiply(amount, 28.00);
        } else if (type === 'buy' && title === 'netellers' && amount >= 100 && amount <= 500) {
          this.price = 27.00;
          this.total = multiply(amount, 27.00);
        } else if (type === 'buy' && title === 'netellers' && amount >= 501 && amount <= 1000) {
          this.price = 27.25;
          this.total = multiply(amount, 27.25);
        } else if (type === 'buy' && title === 'netellers' && amount >= 1001 && amount <= 1500) {
          this.price = 27.50;
          this.total = multiply(amount, 27.50);
        } else if (type === 'buy' && title === 'netellers' && amount >= 1501 && amount <= 2000) {
          this.price = 27.75;
          this.total = multiply(amount, 27.75);
        } else if (type === 'buy' && title === 'netellers' && amount >= 2001 && amount <= 10000) {
          this.price = 28.00;
          this.total = multiply(amount, 28.00);
        } else if (type === 'buy' && title === 'skrills' && amount >= 100 && amount <= 500) {
          this.price = 27.00;
          this.total = multiply(amount, 27.00);
        } else if (type === 'buy' && title === 'skrills' && amount >= 501 && amount <= 1000) {
          this.price = 27.25;
          this.total = multiply(amount, 27.25);
        } else if (type === 'buy' && title === 'skrills' && amount >= 1001 && amount <= 1500) {
          this.price = 27.50;
          this.total = multiply(amount, 27.50);
        } else if (type === 'buy' && title === 'skrills' && amount >= 1501 && amount <= 2000) {
          this.price = 27.75;
          this.total = multiply(amount, 27.75);
        } else if (type === 'buy' && title === 'skrills' && amount >= 2001 && amount <= 10000) {
          this.price = 28.00;
          this.total = multiply(amount, 28.00);
        }
      }
    },
		async createOrder () {
			const uid = this.$store.state.authUser.uid;
      try {
				// Get the new key from db.
				const ordersRef = dbRef('/orders');
        const orderId = push(ordersRef).key;
				// Upload image to storage.
				const filePath = `/orders/${uid}/${orderId}/${this.file.name}`;
				const storageRef = ref(storage, filePath);
				const newImage = await uploadBytesResumable(storageRef, this.file);
				const publicUrl = await getDownloadURL(storageRef);
				// Save to db.
        const order = {
					tag: orderId,
          type: this.type,
          title: this.title,
          amount: this.amount,
          price: this.price,
          total: this.total,
          status: 'Pending',
          userId: uid,
					orderURL: publicUrl,
					storageURL: newImage.metadata.fullPath,
          date: Date.now()
        };
				const orderRef = dbRef('/orders/' + orderId);
        await update(orderRef, order);
        this.$router.push('/orders');
      } catch (e) {
        alert(e.response.data.message);
      }
    },
    reset () {
      this.type = null;
      this.title = null;
      this.amount = 0;
      this.price = 0;
      this.total = 0;
			this.file = Object;
    }
  }
};
</script>
