<template>
  <v-container fluid>
    <v-row dense>
      <v-col
        v-for="currency in currencies"
        :key="currency.title"
        cols="6"
        class="mx-auto"
      >
        <v-card light elevation="16">
          <nuxt-link :to="currency.to">
            <v-img
              :src="currency.src"
              :alt="currency.title"
              height="auto"
            />
          </nuxt-link>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CurrenciesComponent',

  data () {
    return {
      currencies: [
        {
          title: 'Paypal',
          to: '/currencies/paypals',
          src: 'https://res.cloudinary.com/dzre5cq2d/image/upload/v1655845613/public/L640-pp_uqnz1x.jpg'
        },
        {
          title: 'WebMoney',
          to: '/currencies/webmonies',
          src: 'https://res.cloudinary.com/dzre5cq2d/image/upload/v1655845613/public/L640-wm_ckc3ac.jpg'
        },
        {
          title: 'PerfectMoney',
          to: '/currencies/perfectmonies',
          src: 'https://res.cloudinary.com/dzre5cq2d/image/upload/v1656787745/public/pm_tsgu4v.jpg'
        },
        {
          title: 'Neteller',
          to: '/currencies/netellers',
          src: 'https://res.cloudinary.com/dzre5cq2d/image/upload/v1655845613/public/L640-ntl_wtvco9.jpg'
        },
        {
          title: 'Skrill',
          to: '/currencies/skrills',
          src: 'https://res.cloudinary.com/dzre5cq2d/image/upload/v1655845613/public/L640-skr_j26tat.jpg'
        },
        {
          title: 'Calculater',
          to: '/calculater',
          src: 'https://res.cloudinary.com/dzre5cq2d/image/upload/v1656789861/public/cal_owznv3.jpg'
        }
      ]
    };
  }
};
</script>
