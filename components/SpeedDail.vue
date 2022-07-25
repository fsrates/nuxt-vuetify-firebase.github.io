<template>
	<v-speed-dial
		v-model="fab"
    :top="top"
		:bottom="bottom"
		:right="right"
		:left="left"
		:direction="direction"
		:open-on-hover="hover"
		:transition="transition"
	>
		<template #activator>
			<v-btn
				v-model="fab"
				color="blue darken-1"
				dark
				fab
			>
				<v-icon v-if="fab">
					mdi-close
				</v-icon>
				<v-icon v-else>
					mdi-plus-circle
				</v-icon>
			</v-btn>
		</template>
    <!-- buttons items -->
    <v-btn
			fab
			dark
			medium
			color="success"
		>
      <a
        class="white--text medium"
        href="https://lin.ee/ZygrScM"
        target="_blank"
      >
        <v-icon>
          mdi-chat
        </v-icon>
      </a>
		</v-btn>
    <v-btn
			fab
			dark
			medium
			color="blue darken-2"
		>
      <a
        class="white--text medium"
        href="https://facebook.com/sell.paypal"
        target="_blank"
      >
        <v-icon>
          mdi-facebook-messenger
        </v-icon>
      </a>
		</v-btn>
		<v-btn
			fab
			dark
			medium
			color="green darken-1"
		>
      <a
        class="white--text medium"
        href="https://facebook.com/sell.paypal"
        target="_blank"
      >
        <v-icon>
          mdi-whatsapp
        </v-icon>
      </a>
		</v-btn>
		<v-btn
			fab
			dark
			medium
			color="pink"
      nuxt
      to="/sendmail"
      exact
		>
      <v-icon>
        mdi-email
      </v-icon>
		</v-btn>
	</v-speed-dial>
</template>

<script>
export default {
	name: 'SpeedDail',

	data: () => ({
		direction: 'bottom',
		fab: false,
		fling: false,
		hover: false,
		tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    transition: 'slide-y-reverse-transition'
	}),

	watch: {
		top (val) {
      this.bottom = !val;
    },
    right (val) {
      this.left = !val;
    },
    bottom (val) {
      this.top = !val;
    },
    left (val) {
      this.right = !val;
    }
	}
};
</script>

<style>
.speed {
  margin-top: 15px;
  z-index: 4;
}
</style>
