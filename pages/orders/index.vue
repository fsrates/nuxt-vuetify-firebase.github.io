<template>
  <v-row justify="center" align="center">
    <v-col
      cols="12"
      align="center"
      class="py-2 px-2"
      background-color="ghostwhite"
    >
      <v-card light>
        <v-card-title>
          <v-spacer />
					ประวัติการซื้อขาย
					<v-spacer />
        </v-card-title>
        <v-card-text>
					<v-simple-table
					  color="#e9e9e9"
						max-width="100%"
					>
					  <thead>
					    <tr class="d-table-row thead-tr">
						    <th
							    v-for="(header, i) in headers"
								  :key="i"
								  :colspan="header.flex"
								  class="d-table-cell px-auto py-1 white--text"
							  >
							    {{ header.text }}
							  </th>
						  </tr>
						</thead>
						<tbody>
					    <tr
							  v-for="order in orders"
								:key="order.tag"
							  class="d-table-row thead-tr-light"
							>
						    <td
							    v-if="order.date"
								  colspan="2"
								  class="d-table-cell px-auto py-1 lightgrey--text"
							  >
							    {{ getDate(order.date) }}
							  </td>
								<td
							    v-if="order.type && order.title"
								  colspan="3"
								  class="d-table-cell px-auto py-1 lightgrey--text"
							  >
							    {{ getType(order.type) }}-{{ getTitle(order.title) }}
							  </td>
								<td
							    v-if="order.amount"
								  colspan="1"
								  class="d-table-cell px-auto py-1 lightgrey--text"
							  >
							    {{ getDecimal(order.amount) }}
							  </td>
								<td
							    v-if="order.status"
								  colspan="2"
								  class="d-table-cell px-auto py-1 lightgrey--text"
							  >
								  {{ getStatus(order.status) }}
							  </td>
								<td
                  v-if="order.price"
							    colspan="2"
								  class="d-table-cell px-auto py-1"
							  >
							    <v-btn
                    color="primary"
                    small
										dark
										rounded
										nuxt
                    :to="{ name: 'orders-id', params: { id: order.tag } }"
                    exact
									>
									  รายละเอียด
									</v-btn>
							  </td>
						  </tr>
							<tr class="d-table-row thead-tr-light">
								<td
								  colspan="12"
								  class="d-table-cell px-auto py-1"
								>
								  <v-btn
									  color="info"
										class="d-inline-flexl mx-auto"
										dark
										block
										rounded
										@click="refresh"
									>
									  <v-icon>
										  mdi-refresh
										</v-icon>
										<span>
										  โหลดข้อมูล
										</span>
									</v-btn>
								</td>
						  </tr>
						</tbody>
					</v-simple-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { getDate, getDecimal, getType, getTitle, getStatus } from '~/utils/utils';

export default {
  name: 'OrdersPage',

	middleware: 'auth',

  async asyncData ({ app, store, error }) {
    const uid = store.state.authUser.uid;
    let data;
    try {
      data = await app.$fire.database.ref('orders').orderByChild('userId').equalTo(uid).limitToLast(20).get();
    } catch (e) {
      console.log(e);
    }
    return {
      orders: {
        id: data.key,
        ...data.val()
      }
    };
  },

  data () {
    return {
			dialogOrder: false,
      headers: [
        { text: 'วัน/เวลา', flex: 2 },
        { text: 'รายการ', flex: 3 },
        { text: 'จำนวน', flex: 1 },
        { text: 'สถานะ', flex: 2 },
				{ text: 'รายละเอียด', flex: 2 }
      ]
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
