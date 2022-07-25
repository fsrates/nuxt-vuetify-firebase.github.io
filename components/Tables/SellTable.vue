<template>
  <v-card light color="#004d75" elevation="12">
    <v-card-title class="white--text">
			<v-spacer />
      ราคาที่รับซื้อ
			<v-spacer />
    </v-card-title>
    <v-card-text>
      <v-simple-table
        class="justify-center"
        color="#004d75"
      >
        <tr class="d-table-row thead-tr">
          <th class="d-table-cell px-2 py-1">
            <v-btn
              class="ma-auto py-2 dark-bd"
              text
              block
            >
              ดอลลาร์สหรัฐ&nbsp;&nbsp;:&nbsp;&nbsp;ราคาต่อหน่วย
            </v-btn>
          </th>
        </tr>
        <tr
          v-for="sellItem in sellItems"
          :key="sellItem.id"
          class="d-table-row thead-tr"
        >
          <td class="d-table-cell px-2 py-1">
            <v-btn
              class="ma-auto py-2 dark-bd"
              block
							outlined
            >
              ${{ sellItem.min }}-${{ sellItem.max }}&nbsp;&nbsp;:&nbsp;&nbsp;฿{{ getDecimal(sellItem.price) }}
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
        แจ้งโอนขาย
      </v-btn>
      <v-spacer />
      <v-btn
        color="teal"
				class="mb-2"
				dark
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
  name: 'SellTable',

  props: {
    sellItems: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    getDecimal
  }
};
</script>
