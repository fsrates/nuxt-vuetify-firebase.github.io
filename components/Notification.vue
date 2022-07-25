<template>
  <div>
    <div v-if="error" class="red--text">
      {{ message }}
    </div>
    <div v-else class="green--text">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationComponent',

  props: {
    error: {
      type: Object,
      validator: (val) => ['error', 'success'].includes(val),
      default: null
    },
    message: {
      type: String,
      default: ''
    }
  }
};
</script>
