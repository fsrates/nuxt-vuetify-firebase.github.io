<template>
  <v-row justify="center" align="center">
    <v-col
      cols="12"
			sm="12"
			md="8"
			lg="8"
      align="center"
      class="py-4 px-4"
      background-color="ghostwhite"
    >
      <v-card light color="ghostwhite" elevation="0">
        <v-card-title class="light">
          <previous-button :previous="previous" />
					<v-spacer />
          Web Money
          <v-spacer />
        </v-card-title>
				<v-card-text class="light">
        	<v-container fluid>
            <v-row>
              <v-col
                class="col-sm-12 col-md-6 col-lg-6"
              >
                <sell-table :sell-items="webmoney.sellItems" />
              </v-col>
              <v-col
                class="col-sm-12 col-md-6 col-lg-6"
              >
                <buy-table :buy-items="webmoney.buyItems" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import SellTable from '~/components/Tables/SellTable.vue';
import BuyTable from '~/components/Tables/BuyTable.vue';
import PreviousButton from '~/components/Buttons/PreviousButton.vue';

export default {
  name: 'CurrenciesWebmoniesPage',

  components: {
    SellTable,
    BuyTable,
		PreviousButton
  },

  data () {
    return {
			previous: '/currencies',
      webmoney: {
        sellItems: [
          {
            id: 'wms1',
            min: '100',
            max: '500',
            price: 26.00
          },
          {
	          id: 'wms2',
	          min: '501',
	          max: '1,000',
	          price: 26.25
	        },
	        {
	          id: 'wms3',
	          min: '1,001',
	          max: '1,500',
	          price: 26.50
	        },
	        {
	          id: 'wms4',
	          min: '1,501',
	          max: '2,000',
	          price: 26.75
	        },
	        {
	          id: 'wms5',
	          min: '2,001',
	          max: '10,000',
	          price: 27.00
	        }
	      ],
	      buyItems: [
	        {
	          id: 'wmb1',
	          min: '100',
	          max: '500',
	          price: 35.00
	        },
	        {
	          id: 'wmb2',
	          min: '501',
	          max: '1,000',
	          price: 34.75
	        },
	        {
	          id: 'wmb3',
	          min: '1,001',
	          max: '1,500',
	          price: 34.50
	        },
	        {
	          id: 'wmb4',
	          min: '1,501',
	          max: '2,000',
	          price: 34.25
	        },
	        {
	          id: 'wmb5',
	          min: '2,001',
	          max: '10,000',
	          price: 34.00
	        }
	      ]
      }
    };
  }
};
</script>
