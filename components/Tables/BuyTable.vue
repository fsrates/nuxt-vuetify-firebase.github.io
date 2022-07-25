<template>
  <v-card light color="#e9e9e9" elevation="12">
    <v-card-title>
			<v-spacer />
      ราคาที่ขาย
			<v-spacer />
    </v-card-title>
    <v-card-text>
      <v-simple-table
        class="justify-center"
        color="#e9e9e9"
      >
        <tr class="d-table-row thead-tr-light">
          <th class="d-table-cell px-2 py-1">
            <v-btn
              class="ma-auto py-2 white-bd"
              text
              block
            >
              ดอลลาร์สหรัฐ&nbsp;&nbsp;:&nbsp;&nbsp;ราคาต่อหน่วย
            </v-btn>
          </th>
        </tr>
        <tr
          v-for="buyItem in buyItems"
          :key="buyItem.id"
          class="d-table-row thead-tr-light"
        >
          <td class="d-table-cell px-2 py-1">
            <v-btn
              class="ma-auto py-2 white-bd"
              block
							outlined
            >
              ${{ buyItem.min }}-${{ buyItem.max }}&nbsp;&nbsp;:&nbsp;&nbsp;฿{{ getDecimal(buyItem.price) }}
            </v-btn>
          </td>
        </tr>
      </v-simple-table>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
				class="mb-2"
        nuxt
        to="/neworder"
        exact
      >
        แจ้งโอนซื้อ
      </v-btn>
      <v-spacer />
      <v-btn
        color="teal"
				dark
				class="mb-2"
        nuxt
        to="/calculater"
        exact
      >
        เครื่องคำณวน
      </v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
import { getDecimal } from '~/utils/utils';

export default {
  name: 'BuyTable',

  props: {
    buyItems: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    getDecimal
  }
};
</script>
