<template>
  <v-btn
    color="#004d75"
		dark
    small
		rounded
    nuxt
    :to="previous"
    exact
  >
    <v-icon>
      mdi-arrow-left
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'PreviousButton',

  props: {
    previous: {
      type: String,
      default: ''
    }
  }
};
</script>
