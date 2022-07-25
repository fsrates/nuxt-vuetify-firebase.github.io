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
      <v-card light>
        <v-card-title>
          <previous-button :previous="previous" />
					<v-spacer />
					รายละเอียดรายการ
					<v-spacer />
        </v-card-title>
        <v-card-text>
				  <v-card
					  light
						color="ghostwhite"
					>
					  <v-card-text>
						  <v-container>
							  <v-row dense>
								  <v-col
									  cols="7"
										class="d-flex no-wrap align-end px-auto"
									>
									  รหัสรายการ:
									</v-col>
									<v-col
									  v-if="order.tag"
										cols="5"
										class="d-flex no-wrap align-start px-auto"
									>
									  {{ order.tag }}
									</v-col>
								</v-row>
								<v-row dense>
								  <v-col
									  cols="7"
										class="d-flex no-wrap align-end px-auto"
									>
									  ประเภท:
									</v-col>
									<v-col
									  v-if="order.type"
									  cols="5"
										class="d-flex no-wrap align-start px-auto"
									>
									  {{ getType(order.type) }}
									</v-col>
								</v-row>
								<v-row dense>
								  <v-col
									  cols="7"
										class="d-flex no-wrap align-end px-auto"
									>
									  ช่องทาง:
									</v-col>
									<v-col
									  v-if="order.title"
									  cols="5"
										class="d-flex no-wrap align-start px-auto"
									>
									  {{ getTitle(order.title) }}
									</v-col>
								</v-row>
								<v-row dense>
								  <v-col
									  cols="7"
										class="d-flex no-wrap align-end px-auto"
									>
									  จำนวน:
									</v-col>
									<v-col
									  v-if="order.amount"
									  cols="5"
										class="d-flex no-wrap align-start px-auto"
									>
									  {{ getDecimal(order.amount) }}
									</v-col>
								</v-row>
								<v-row dense>
								  <v-col
									  cols="7"
										class="d-flex no-wrap align-end px-auto"
									>
									  อัตรา:
									</v-col>
									<v-col
									  v-if="order.price"
									  cols="5"
										class="d-flex no-wrap align-start px-auto"
									>
									  {{ getDecimal(order.price) }}
									</v-col>
								</v-row>
								<v-row dense>
								  <v-col
									  cols="7"
										class="d-flex no-wrap align-end px-auto"
									>
									  ราคารวม:
									</v-col>
									<v-col
									  v-if="order.total"
									  cols="5"
										class="d-flex no-wrap align-start px-auto"
									>
									  {{ getDecimal(order.total) }}
									</v-col>
								</v-row>
								<v-row dense>
								  <v-col
									  cols="7"
										class="d-flex no-wrap align-end px-auto"
									>
									  วัน/เวลา:
									</v-col>
									<v-col
									  v-if="order.date"
									  cols="5"
										class="d-flex no-wrap align-start px-auto"
									>
									  {{ getDate(order.date) }}
									</v-col>
								</v-row>
								<v-row dense>
								  <v-col
									  cols="7"
										class="d-flex no-wrap align-end px-auto"
									>
									  สถานะ:
									</v-col>
									<v-col
									  v-if="order.status"
									  cols="5"
										class="d-flex no-wrap align-start px-auto"
									>
									  {{ getStatus(order.status) }}
									</v-col>
								</v-row>
							</v-container>
						</v-card-text>
						<v-card-actions>
							<v-spacer />
							<v-btn
								color="#004d75"
								dark
								block
								@click="refresh"
							>
								รีเฟรช
							</v-btn>
							<v-spacer />
						</v-card-actions>
					</v-card>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { getDate, getDecimal, getType, getTitle, getStatus } from '~/utils/utils';
import PreviousButton from '~/components/Buttons/PreviousButton.vue';

export default {
  name: 'OrdersIdPage',

	components: {
		PreviousButton
	},

	middleware: 'auth',

  async asyncData ({ app, params, error }) {
    let data;
    try {
      data = await app.$fire.database.ref(`/orders/${params.id}`).get();
    } catch (e) {
      console.log(e);
    }
    return {
      order: {
				id: data.key,
				...data.val()
			}
    };
  },

	data () {
		return {
			previous: '/orders'
		};
	},

  computed: {
    ...mapState(['authUser']),
    ...mapGetters(['authenticated'])
  },

  methods: {
    getDate,
    getDecimal,
		getType,
		getTitle,
		getStatus,
		refresh () {
			this.$nuxt.refresh();
		}
  }
};
</script>
