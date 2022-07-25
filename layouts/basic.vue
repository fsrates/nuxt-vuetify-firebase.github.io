<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
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
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>
          mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}
        </v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>
          mdi-application
        </v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>
          mdi-minus
        </v-icon>
      </v-btn>
      <v-toolbar-title
        class="align-center my-auto"
        v-text="title"
      />
    </v-app-bar>
    <v-toolbar
      dark
      color="blue darken-1"
      justify="center"
      class="my-auto"
      fixed
    >
      <v-toolbar-items>
        <v-btn
          v-for="toolbar in toolbars"
          :key="toolbar.name"
          color="white"
          class="mx-2"
          text
          nuxt
          :to="toolbar.to"
          exact
        >
          <v-toolbar-title
            v-if="toolbar.name === 'IndexPage'"
            class="white--text medium"
          >
            หน้าหลัก
          </v-toolbar-title>
          <v-toolbar-title
            v-else-if="toolbar.name === 'Currencies'"
            class="white--text medium"
          >
            อัตรา <br> แลกเปลี่ยน
          </v-toolbar-title>
          <v-toolbar-title
            v-else-if="toolbar.name === 'New Order'"
            class="medium"
          >
            แจ้งโอน
          </v-toolbar-title>
          <v-toolbar-title
            v-else-if="toolbar.name === 'Guides'"
            class="medium"
          >
            วิธีซื้อขาย
          </v-toolbar-title>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-main class="light">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-bottom-navigation
      v-model="value"
      :background-color="color"
      dark
      fixed
    >
      <v-btn
        v-if="!authenticated"
        nuxt
        to="/login"
        router
        exact
      >
        <span>
          เข้าสู่ระบบ
        </span>
        <v-icon>
          mdi-account-arrow-right
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
          mdi-contact
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

export default {
  name: 'DefaultLayout',

  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      title: 'FS Exchanger',
      value: 1,
      toolbars: [
        { name: 'IndexPage', to: '/' },
        { name: 'Currencies', to: '/currencies' },
        { name: 'New Order', to: '/neworder' },
        { name: 'Guides', to: '/guides' }
      ]
    };
  },

  head () {
    return {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
      ]
    };
  },

  computed: {
    ...mapState(['authUser']),
    ...mapGetters(['authenticated']),
    color () {
      switch (this.value) {
        case 0: return 'blue darken-1';
        case 1: return 'deeppink';
        case 2: return 'brown';
        case 3: return 'teal';
        case 4: return 'green darken2';
        case 5: return 'darkgrey';
        case 6: return 'yellow darken-1';
        default: return 'blue darken-1';
      };
    }
  },

  methods: {
    async logout () {
      await this.$store.dispatch('userSignOut');
    }
  }
};
</script>

<style>
* {
  font-family: 'Roboto', sans-serif;
  font-size: 11px;
  line-height: 1.8;
  text-decoration: none;
  word-spacing: normal;
}

a {
  text-decoration: none;
}

.thead-tr {
  border: 1px solid ghostwhite;
}

.th1 {
	width: 70%;
	border-left: 1px solid ghostwhite;
	border-right: 1px transparent;
	border-top: 1px transparent;
	border-bottom: 1px transparent;
	color: ghostwhite;
	padding: auto auto;
	text-align: right;
	vertical-align: middle;
}

.th2 {
	width: 2%;
	border-left: 1px transparent;
	border-right: 1px transparent;
	border-top: 1px transparent;
	border-bottom: 1px transparent;
	color: ghostwhite;
	padding: auto auto;
	text-align: center;
	vertical-align: middle;
}

.th3 {
	width: 28%;
	border-left: 1px transparent;
	border-right: 1px solid ghostwhite;
	border-top: 1px transparent;
	border-bottom: 1px transparent;
	color: ghostwhite;
	padding: auto auto;
	text-align: center;
	vertical-align: middle;
}

.tbody {
	background-color: ghostwhite;
}

.tbody-tr {
	border: 1px solid gray;
}

.td1 {
	width: 70%;
	border-left: 1px solid gray;
	border-right: 1px transparent;
	border-top: 1px transparent;
	border-bottom: 1px transparent;
	color: #555555;
	padding: auto auto;
	text-align: right;
	vertical-align: middle;
}

.td2 {
	width: 2%;
	border-left: 1px transparent;
	border-right: 1px transparent;
	border-top: 1px transparent;
	border-bottom: 1px transparent;
	color: #555555;
	padding: auto auto;
	text-align: center;
	vertical-align: middle;
}

.td3 {
	width: 28%;
	border-left: 1px transparent;
	border-right: 1px solid gray;
	border-top: 1px transparent;
	border-bottom: 1px transparent;
	color: #555555;
	padding: auto auto;
	text-align: center;
	vertical-align: middle;
}
</style>
