<template>
  <v-row>
    <v-alert
      v-if="is_error"
      width="100%"
      border="right"
      colored-border
      type="error"
      elevation="2"
    >
      {{ error_message }}
    </v-alert>
    <v-card-text v-if="show_me">
      <v-progress-linear
        indeterminate
        color="primary accent-4"
      ></v-progress-linear>
      <br />
      <h3 class="currrent_loading_message">
        {{ this.$store.state.current_loading_message }}
      </h3>
    </v-card-text>
  </v-row>
</template>

<script>
export default {
  name: 'LoadingStatus',
  computed: {
    show_me: function () {
      return this.$store.getters.getCurrentLoadingStatus
    },
    is_error: function () {
      return this.$store.state.current_error.is_error
    },
    error_message: function () {
      return this.$store.state.current_error.message
    }
  }
}
</script>

<style lang="scss" scoped>
</style>