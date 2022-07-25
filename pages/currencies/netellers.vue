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
          Neteller
          <v-spacer />
        </v-card-title>
				<v-card-text class="light">
        	<v-container fluid>
            <v-row>
              <v-col
                class="col-sm-12 col-md-6 col-lg-6"
              >
                <sell-table :sell-items="neteller.sellItems" />
              </v-col>
              <v-col
                class="col-sm-12 col-md-6 col-lg-6"
              >
                <buy-table :buy-items="neteller.buyItems" />
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
  name: 'CurrenciesNetellersPage',

  components: {
    SellTable,
    BuyTable,
    PreviousButton
  },

  data () {
    return {
      previous: '/currencies',
      neteller: {
        sellItems: [
          {
            id: 'pps1',
            min: 100,
            max: 500,
            price: 27.00
          },
          {
	          id: 'pps2',
	          min: 501,
	          max: 1000,
	          price: 27.25
	        },
	        {
	          id: 'pps3',
	          min: 1001,
	          max: 1500,
	          price: 27.50
	        },
	        {
	          id: 'pps4',
	          min: 1501,
	          max: 2000,
	          price: 27.75
	        },
	        {
	          id: 'pps5',
	          min: 2001,
	          max: 10000,
	          price: 28.00
	        }
	      ],
	      buyItems: [
	        {
	          id: 'ppb1',
	          min: 100,
	          max: 500,
	          price: 36.00
	        },
	        {
	          id: 'ppb2',
	          min: 501,
	          max: 1000,
	          price: 35.75
	        },
	        {
	          id: 'ppb3',
	          min: 1001,
	          max: 1500,
	          price: 35.50
	        },
	        {
	          id: 'ppb4',
	          min: 1501,
	          max: 2000,
	          price: 35.25
	        },
	        {
	          id: 'ppb5',
	          min: 2001,
	          max: 10000,
	          price: 35.00
	        }
	      ]
      }
    };
  }
};
</script>
