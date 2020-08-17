<template>
  <!-- testing commit comments-->
  <v-row class="form_section_container">
    <v-col cols="12" sm="12" md="10">
      <auto-complete-address-search />
    </v-col>
    <v-col cols="12" sm="12" md="2">
      <v-text-field persistent-hint label="Apt / Unit" v-model="AddressLine2">
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="3">
      <v-text-field
        persistent-hint
        type="number"
        v-mask="timemask"
        v-model="YearsAtAddress"
        label="años en la dirección"
      ></v-text-field>
    </v-col>

    <v-col cols="12" sm="12" md="3">
      <v-text-field
        data-cy="MonthsAtAddress"
        persistent-hint
        v-mask="timemask"
        type="number"
        v-model="MonthsAtAddress"
        label="años en la dirección"
      ></v-text-field>
    </v-col>

    <v-col cols="12" sm="12" md="3">
      <v-select
        data-cy="HousingType"
        :items="ownership_type"
        :value="ownership_type"
        v-model="HousingType"
        label="tipo de propiedad"
      ></v-select>
    </v-col>
    <v-col cols="12" sm="12" md="3">
      <v-text-field
        persistent-hint
        data-cy="HousingPayment"
        v-model="HousingPayment"
        label="alquiler mensual o pago de hipoteca"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import { mask } from 'vue-the-mask'
import { mapState } from 'vuex'
import AutoCompleteAddressSearch from '../elend-credit-app/AutoCompleteAddressSearch'
export default {
  name: 'AddressInformation',
  directives: {
    mask
  },
  components: {
    AutoCompleteAddressSearch
  },
  computed: {

    AddressLine1: {
      get () {
        return this.$store.state.address.AddressLine1
      },
      set (value) {
        this.$store.commit('SET_ADDRESS_FIELD', { key: 'AddressLine1', value: value })
      }
    },
    AddressLine2: {
      get () {
        return this.$store.state.address.AddressLine2
      },
      set (value) {
        this.$store.commit('SET_ADDRESS_FIELD', { key: 'AddressLine2', value: value })
      }
    },
    City: {
      get () {
        return this.$store.state.address.City
      },
      set (value) {
        this.$store.commit('SET_ADDRESS_FIELD', { key: 'City', value: value })
      }
    },
    State: {
      get () {
        return this.$store.state.address.State
      },
      set (value) {
        this.$store.commit('SET_ADDRESS_FIELD', { key: 'State', value: value })
      }
    },
    PostalCode: {
      get () {
        return this.$store.state.address.PostalCode
      },
      set (value) {
        this.$store.commit('SET_ADDRESS_FIELD', { key: 'PostalCode', value: value })
      }
    },
    YearsAtAddress: {
      get () {
        return this.$store.state.address.YearsAtAddress
      },
      set (value) {
        this.$store.commit('SET_ADDRESS_FIELD', { key: 'YearsAtAddress', value: value })
      }
    },
    MonthsAtAddress: {
      get () {
        return this.$store.state.address.MonthsAtAddress
      },
      set (value) {
        this.$store.commit('SET_ADDRESS_FIELD', { key: 'MonthsAtAddress', value: value })
      }
    },
    HousingType: {
      get () {
        return this.$store.state.applicant.Housing.Type
      },
      set (value) {
        this.$store.commit('SET_HOUSING_VALUES', { key: 'Type', value: value })
      }
    },
    HousingPayment: {
      get () {
        return this.$store.state.applicant.Housing.Payment
      },
      set (value) {
        this.$store.commit('SET_HOUSING_VALUES', { key: 'Payment', value: value })
      }
    }

  },
  data () {
    return {
      timemask: '##',
      ownership_type: [
        {
          value: 'Rent',
          text: 'alquilar'
        },
        {
          value: 'Owner',
          text: 'propia'
        }
      ]
    }
  },

}
</script>

<style lang="scss" scoped>
</style>