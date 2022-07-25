<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      color="#004d75"
      fixed
      app
			prominent
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item
          v-if="authenticated"
          :to="{ name: 'users-id', params: { id: authUser.uid } }"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>
              mdi-account
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              ศูนย์สมาชิด
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="authenticated"
					to="/orders"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>
              mdi-note-multiple
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              ประวัติ
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template #append>
        <div class="pa-2">
          <v-btn
					  v-if="authenticated"
            color="primary"
						class="mb-2"
            block
            @click="logout"
          >
            <v-icon>
              mdi-logout
            </v-icon>
            <span>
              ออกจากระบบ
            </span>
          </v-btn>
					<small class="d-block mx-auto center">
					  &copy; {{ new Date().getFullYear() }} FS-EXCHANGER
					</small>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
      color="#004d75"
      class="pt-auto"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-toolbar-title
        class="text align-center mx-auto"
        v-text="title"
      />
      <v-spacer />

      <template #extension>
        <v-toolbar
          dense
          class="px-auto"
          color="#004d75"
          width="100%"
          justify="center"
          align="end"
        >
          <v-toolbar-items align="center" width="100%" class="mx-auto">
            <v-btn
              class="px-auto"
              color="white"
              width="25%"
              text
              nuxt
              to="/"
              exact
            >
              หน้าหลัก
            </v-btn>
            <v-btn
              class="px-auto"
              color="white"
              width="30%"
              text
              nuxt
              to="/currencies"
              exact
            >
              อัตราแลกเปลี่ยน
            </v-btn>
            <v-btn
              class="px-auto"
              color="white"
              width="20%"
              text
              nuxt
              to="/neworder"
              exact
            >
              แจ้งโอน
            </v-btn>
            <v-btn
              class="px-auto"
              color="white"
              width="25%"
              text
              nuxt
              to="/guides"
              exact
            >
              วิธีซื้อขาย
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <speed-dail />
      </template>
    </v-app-bar>

    <v-main class="bg-light">
      <div hidden>
        {{ offsetTop }}
      </div>
      <v-container
        id="scroll-target"
        background-color="ghostwhite"
      >
        <v-row
          v-scroll:#scroll-target="onScroll"
        ></v-row>
        <Nuxt />
      </v-container>
    </v-main>
    <v-bottom-navigation
      background-color="#004d75"
      dark
      fixed
    >
      <v-btn
        v-if="!authenticated"
        nuxt
        to="/login-email"
        router
        exact
      >
        <span>
          เข้าสู่ระบบ
        </span>
        <v-icon>
          mdi-login
        </v-icon>
      </v-btn>
      <v-btn
        v-if="!authenticated"
        nuxt
        to="/register"
        router
        exact
      >
        <span>
          สมัครสมาชิก
        </span>
        <v-icon>
          mdi-account-plus
        </v-icon>
      </v-btn>
      <v-btn
        v-if="authenticated"
        nuxt
        :to="{ name: 'users-id', params: { id: authUser.uid } }"
        router
        exact
      >
        <span>
          ศูนย์สมาชิก
        </span>
        <v-icon>
          mdi-account
        </v-icon>
      </v-btn>
      <v-btn
        v-if="authenticated"
        nuxt
        to="/orders"
        router
        exact
      >
        <span>
          ประวัติ
        </span>
        <v-icon>
          mdi-notes
        </v-icon>
      </v-btn>
      <v-btn
        nuxt
        to="/contact"
        router
        exact
      >
        <span>
          ติดต่อเรา
        </span>
        <v-icon>
          mdi-account-box
        </v-icon>
      </v-btn>
    </v-bottom-navigation>
		<v-footer
			:absolute="fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
		</v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import SpeedDail from '~/components/SpeedDail.vue';

export default {
  name: 'DefaultLayout',

  components: {
    SpeedDail
  },

  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'หน้าหลัก',
          to: '/'
        },
        {
          icon: 'mdi-currency-usd',
          title: 'อัตราแลกเปลี่ยน',
          to: '/currencies'
        },
				{
          icon: 'mdi-currency-gbp',
          title: 'คำณวนอัตราแลกเปลี่ยน',
          to: '/calculater'
        },
        {
          icon: 'mdi-plus',
          title: 'แจ้งโอน',
          to: '/neworder'
        },
        {
          icon: 'mdi-cash',
          title: 'วิธีซื้อขาย',
          to: '/guides'
        },
        {
          icon: 'mdi-account-box',
          title: 'ติดต่อเรา',
          to: '/contact'
        },
        {
          icon: 'mdi-domain',
          title: 'เกี่ยวกับเรา',
          to: '/about'
        }
      ],
      miniVariant: false,
      title: 'FS Exchanger',
      offsetTop: 0
    };
  },

  head () {
    return {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
        { ref: 'stylesheet', href: 'https://materialdesignicons.com/icon' }
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
      this.$router.push('/');
    },
    onScroll (e) {
			this.offsetTop = e.target.scrollTop;
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');

*,
html,
body {
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  line-height: 1.8;
  text-decoration: none;
  word-spacing: normal;
}

a {
  text-decoration: none;
}

.dark-bd {
	background-color: white !important;
	color: #555555 !important;
	border: 1px solid white !important;
	border-radius: 5px !important;
}

.white {
	background-color: white !important;
	color: #555555 !important;
}

.white-bd {
	background-color: white !important;
	color: #555555 !important;
	border: 1px solid #555555aa !important;
	border-radius: 5px !important;
}

.bg-white {
	background-color: white !important;
}

.bg-light {
  background-color: ghostwhite !important;
}

.light {
  background-color: ghostwhite !important;
  color: #555555 !important;
}

.center {
	text-align: center !important;
	vertical-align: baseline !important;
}

.thead-tr {
	background-color: #004d75 !important;
  border: 1px solid ghostwhite;
}

.thead-tr-light {
	background-color: #e9e9e9 !important;
  border: 1px solid lightgray;
}

.tbody-tr {
	border: 1px solid gray;
}

.medium {
  font-size: 12px;
}

@media screen and (max-width: 600px) {
	html,
	body {
		font-size: 85%;
	}

  .medium {
    font-size: 85%;
  }
}
</style>
