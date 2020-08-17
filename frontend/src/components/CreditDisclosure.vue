<template>
  <v-row class="form_main_header" data-cy="creditdisclosure">
    <v-col cols="12" sm="12" md="12" style="background:white" class="pa-5 mb-3">
      {{ this.$store.state.credit_update_message }}
      <p v-if="this.$store.state.credit_update_message">
        Credit update message: {{ this.$store.state.credit_update_message }}
      </p>
      <p v-if="this.$store.state.credit_disclosure">
        Credit Disclosure: {{ this.$store.state.credit_disclosure }}
      </p>
      <p v-if="this.$store.state.credit_disclosure_token">
        Credit Token: {{ this.$store.state.credit_disclosure_token }}
      </p>
    </v-col>
    <v-btn
      data-cy="consentToCreditInquiry"
      v-if="!this.$store.state.credit_update_message"
      color="primary"
      :loading="loading"
      @click="consentToCreditInquiry"
      x-large
      >{{ this.$store.state.credit_disclosure_button_label }}</v-btn
    >
  </v-row>
</template>

<script>

import jQuery from 'jquery'
var axios = require('axios')
export default {
  name: 'CreditDisclosure',
  data () {
    return {
      loading: false,
      ip_address: null
    }
  },
  mounted () {
    let self = this
    jQuery.getJSON(`${process.env.VUE_APP_GEOBYTES_URL}/GetCityDetails?callback=?&key=${process.env.VUE_APP_GEOBYTES_API_KEY}`, function (data) {
      if (data.geobytesipaddress) {
        self.ip_address = data.geobytesipaddress
      }
    })
  },
  methods: {
    consentToCreditInquiry: function () {
      this.$store.commit('SET_LOADER_STATE', true)
      this.$store.commit('SET_CURRENT_LOADING_MESSAGE', 'Submitting credit disclosure acceptance form...')
      let self = this
      self.loading = true
      axios.post(process.env.VUE_APP_API_URL + '/elend/credit-disclosure', {
        elend_application_id: this.$store.state.elend_application_id,
        credit_consent_token: this.$store.state.credit_disclosure_token,
        client_ip_address: this.ip_address
      })
        .then(res => {
          console.log(res)
          setTimeout(() => {
            this.$store.commit('SET_CREDIT_UPDATE_MESSAGE', JSON.parse(res.data.body))
            this.$store.commit('SET_LOADER_STATE', false)
            this.$store.commit('SET_CURRENT_LOADING_MESSAGE', '')
            this.$store.commit('SET_APPLICATION_SUBMIT_STATUS', true)
            this.$store.commit('SET_ELEND_APPLICATION_ID', '')
            this.$store.commit('SET_CREDIT_DISCLOSURE', '')
            this.$store.commit('SET_CREDIT_DISCLOSURE_TOKEN', '')
            this.$store.commit('SET_CREDIT_DISCLOSURE_BUTTON_LABEL', '')
            self.loading = false
          }, 5000)
        })
        .catch(e => {
          console.error(e)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>