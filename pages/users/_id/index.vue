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
				  <v-spacer />
          ศูนย์สมาชิก
					<v-spacer />
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row v-if="authenticated">
              <v-col
                v-if="authenticated"
                cols="12"
                class="mx-auto"
              >
                <v-card class="d-inline-flex justify-center">
                  สถานะ: &nbsp;
                  <v-btn
                    v-if="user.tags === 'unverified'"
                    class="mx-1"
                    color="error"
                    text
                    outlined
                    rounded
                    small
                    nuxt
                    :to="{ name: 'users-id-account', params: { id: authUser.uid } }"
                    exact
                  >
                    ยังไม่ยืนยัน!
                  </v-btn>
                  <v-btn
                    v-else
                    class="mx-1"
										color="error"
                    text
                    outlined
                    rounded
                    small
                  >
                    ยืนยันตัวตนแล้ว!
                  </v-btn>
                </v-card>
              </v-col>
              <v-col
                v-for="userItem in userItems"
                :key="userItem.name"
                :cols="userItem.flex"
                class="mx-auto"
              >
                <v-card>
                  <nuxt-link :to="{ name: userItem.name, params: { id: authUser.uid } }">
                    <v-btn
                      class="white--text align-center user-bg py-4"
											block
                      height="auto"
                    >
                      <v-spacer />
											<span class="text">
                        {{ userItem.title }}
                      </span>
											<v-spacer />
                    </v-btn>
                  </nuxt-link>
                </v-card>
              </v-col>
              <v-col
                v-if="authenticated"
                cols="12"
                class="mx-auto"
              >
                <v-card>
                  <v-card-actions>
                    <v-btn
                      class="white--text align-center user-bg"
                      max-height="100"
                      block
                      nuxt
                      to="/update-password"
                      exact
                    >
                      เปลี่ยนรหัสผ่าน
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
              <v-col
                v-if="authenticated"
                cols="12"
                class="mx-auto"
              >
                <v-card>
                  <v-card-actions>
                    <v-btn
                      class="white--text align-center user-bg"
                      max-height="100"
                      block
                      @click="logout"
                    >
                      ออกจากระบบ
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'UsersIdPage',

	middleware: 'auth',

  async asyncData ({ app, params, error }) {
    let data;
    try {
      data = await app.$fire.database.ref('/users/' + params.id).get();
    } catch (e) {
      alert(e);
    }
    return {
      user: data.val()
    };
  },

  data () {
    return {
			userItems: [
        {
          title: 'ข้อมูลส่วนตัว',
          name: 'users-id-account',
          flex: 6
        },
        {
          title: 'ธนาคาร',
          name: 'users-id-bank',
          flex: 6
        }
      ]
    };
  },

  computed: {
    ...mapState(['authUser']),
    ...mapGetters(['authenticated'])
  },

  methods: {
    async logout () {
      await this.$store.dispatch('userSignOut');
      this.$router.push('/login-email');
    }
  }
};
</script>

<style>
.user-bg {
	background-image: url('https://res.cloudinary.com/dzre5cq2d/image/upload/v1656256278/public/profile_xjmvdq.jpg');
	background-size: cover;
	background-position: center;
	color: white;
}
</style>
