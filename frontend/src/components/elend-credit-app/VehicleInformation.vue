<template>
  <div>
    {{ this.$store.state.application_submitted }}
    <v-row class="form_section_container" data-cy="VehicleInformationTab">
      <v-col cols="12" sm="12" md="4">
        <v-select
          persistent-hint
          :items="vehicle_conditions"
          v-model="Type"
          label="condición"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="12" md="4" class="pl-1 pr-1">
        <v-select
          persistent-hint
          data-cy="vehicle_year"
          :items="getNumberRange(1970, 2020, true)"
          v-model="Year"
          label="anos"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="12" md="4" v-show="vehicle_makes">
        <v-select
          data-cy="vehicle_makes_selector"
          persistent-hint
          :items="vehicle_makes"
          v-model="Make"
          label="marcas"
          @change="getVehicleModels(Make)"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="12" md="6" v-show="vehicle_makes">
        <v-select
          persistent-hint
          data-cy="vehicle_models_selector"
          :disabled="vehicle_models[0] === '' ? true : false"
          :items="vehicle_models"
          v-model="Model"
          label="modelo"
          @change="getVehicleTrims"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="12" md="6" v-show="vehicle_makes">
        <v-select
          data-cy="vehicle_trims"
          persistent-hint
          :disabled="vehicle_trims[0] === '' ? true : false"
          :items="vehicle_trims"
          v-model="Trim"
          label="trim"
        ></v-select>
      </v-col>
    </v-row>
    <!-- <v-row justify="end" class="pr-5 pt-10">
      <v-btn text @click="changeStepBack" large color="error">de vuelta</v-btn>
      <v-btn
        @click="submitApplication"
        :loading="loading"
        color="primary"
        dark
        large
        min-width="200"
        >Enviar</v-btn
      >
    </v-row> -->
  </div>
</template>

<script>
import LoadingStatus from '../LoadingStatus'
var axios = require('axios')
export default {
  name: 'VehicleInformation',
  components: {
    LoadingStatus
  },
  data () {
    return {
      applicants: [],
      loading: false,
      vehicle_makes: [''],
      vehicle_models: [''],
      vehicle_trims: [''],
      vehicle_conditions: [
        {
          value: 'New',
          text: 'nuevo'
        },
        {
          value: 'Used',
          text: 'usado'
        },
        {
          value: 'Certified',
          text: 'certificado'
        }
      ]
    }
  },
  mounted () {
    this.getVehicleMakes()

  },
  computed: {
    Type: {
      get () {
        return this.$store.state.VehicleRequest.Type
      },
      set (value) {
        this.$store.commit('SET_VEHICLE_DATA', { key: 'Type', value: value })
      }
    },
    IsCertifiedPreOwned: {
      get () {
        return this.$store.state.VehicleRequest.IsCertifiedPreOwned
      },
      set (value) {
        this.$store.commit('SET_VEHICLE_DATA', { key: 'IsCertifiedPreOwned', value: value })
      }
    },
    VIN: {
      get () {
        return this.$store.state.VehicleRequest.Type
      },
      set (value) {
        this.$store.commit('SET_VEHICLE_DATA', { key: 'VIN', value: value })
      }
    },
    StockID: {
      get () {
        return this.$store.state.VehicleRequest.StockID
      },
      set (value) {
        this.$store.commit('SET_VEHICLE_DATA', { key: 'StockID', value: value })
      }
    },
    Year: {
      get () {
        return this.$store.state.VehicleRequest.Year
      },
      set (value) {
        this.$store.commit('SET_VEHICLE_DATA', { key: 'Year', value: value })
      }
    },
    Make: {
      get () {
        return this.$store.state.VehicleRequest.Make
      },
      set (value) {
        this.$store.commit('SET_VEHICLE_DATA', { key: 'Make', value: value })
      }
    },
    Model: {
      get () {
        return this.$store.state.VehicleRequest.Model
      },
      set (value) {
        this.$store.commit('SET_VEHICLE_DATA', { key: 'Model', value: value })
      }
    },
    Trim: {
      get () {
        return this.$store.state.VehicleRequest.Trim
      },
      set (value) {
        this.$store.commit('SET_VEHICLE_DATA', { key: 'Trim', value: value })
      }
    }
  },
  methods: {
    getVehicleMakes: function () {
      let self = this
      return axios.get(process.env.VUE_APP_API_URL + '/data/vehicles/makes')
        .then(res => {
          self.vehicle_makes = res.data
        })
    },
    getVehicleModels: function (make) {
      let self = this
      axios.get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${make}?format=json`
      )
        .then(models => {
          self.vehicle_models = models.data.Results.map(function (m) {
            return m.Model_Name
          })
        })
        .catch(e => {
          console.error(e)
        })
    },
    getVehicleTrims: function () {
      if (this.Year === null) return
      let data = {
        year: this.Year,
        make: this.Make,
        model: this.Model
      }
      let self = this
      axios.get(process.env.VUE_APP_API_URL + '/data/vehicles/trims', { params: data })
        .then(res => {
          self.vehicle_trims = res.data.map(function (m) {
            return m.Text
          })
        })
    },
    getNumberRange (lowEnd, highEnd, descending) {
      var list = []
      for (var i = lowEnd; i <= highEnd; i++) {
        list.push(i)
      }
      if (descending !== true) {
        return list.sort(function (a, b) {
          return a - b
        })
      } else {
        return list.sort(function (a, b) {
          return b - a
        })
      }
    },
    copyObject: (src) => {
      return Object.assign({}, src)
    },
    // changeStepForward: function () {
    //   this.$store.commit('SET_FORM_STEP', this.$store.getters.getCurrentStep)
    // },
    // changeStepBack: function () {
    //   this.$store.commit('REDUCE_FORM_STEP', this.$store.getters.getCurrentStep)
    // },
    // submitApplication () {
    //   let self = this

    //   this.$store.commit('SET_LOADER_STATE', true)
    //   this.$store.commit('UPDATE_ADDRESS_ARRAY', this.$store.getters.getCurrentState.address)
    //   this.$store.commit('UPDATE_EMPLOYEMENT_OBJECT', this.$store.getters.getCurrentState.employment_information)
    //   this.applicants.push(this.$store.getters.getCurrentState.applicant)
    //   axios.post(process.env.VUE_APP_API_URL + '/elend', {
    //     data: [this.$store.getters.getCurrentState.applicant],
    //     VehicleRequest: this.$store.getters.getCurrentState.VehicleRequest
    //   })
    //     .then(res => {
    //       if (res.data.applicationStatus.result === 'error') {
    //         this.$store.commit('SET_LOADER_STATE', false)
    //         self.$store.commit('SET_ERROR_STATUS', true)
    //         self.$store.commit('SET_ERROR_MESSAGE', res.data.applicationStatus)
    //       } else {
    //         let disclosure = JSON.parse(res.data.creditConsentDisclosures)
    //         this.$store.commit('SET_LOADER_STATE', false)
    //         this.$store.commit('SET_APPLICATION_SUBMIT_STATUS', true)
    //         this.$store.commit('SET_ELEND_APPLICATION_ID', res.data.applicationStatus.applicationID)
    //         this.$store.commit('SET_CREDIT_DISCLOSURE', disclosure.disclosures[0].Text)
    //         this.$store.commit('SET_CREDIT_DISCLOSURE_TOKEN', disclosure.disclosures[0].Token)
    //         this.$store.commit('SET_CREDIT_DISCLOSURE_BUTTON_LABEL', disclosure.disclosures[0].ButtonLabel)
    //       }
    //     })
    // }
  }
}
</script>

<style lang="scss" scoped>
</style>