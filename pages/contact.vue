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
      <v-card light color="ghostwhite" elevation="0">
        <v-card-title class="light">
				  <v-spacer />
          ติดต่อเรา
					<v-spacer />
        </v-card-title>
        <v-card-text class="light">
          <contact />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Contact from '~/components/Contact.vue';

export default {
  name: 'ContactPage',

  components: {
    Contact
  }
};
</script>
