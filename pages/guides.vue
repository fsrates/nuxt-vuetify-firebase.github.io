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
				  <v-spacer />
          วิธีซื้อขาย
					<v-spacer />
        </v-card-title>
        <v-card-text class="light">
          <guides />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Guides from '~/components/Guides.vue';

export default {
  name: 'GuidesPage',

  components: {
    Guides
  }
};
</script>
