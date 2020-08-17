<template>
  <v-row class="form_section_container">
    <v-col cols="12" sm="12" md="12">
      <business-address-auto-complete />
    </v-col>
    <v-col cols="12" sm="12" md="8">
      <v-text-field
        v-model="Address"
        placeholder="ex: 123 E Biscayne Blvd, Miami FL 33161"
        label="dirección"
        persistent-hint
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="4">
      <v-text-field
        v-model="PhoneNumber"
        v-mask="phonemask"
        label="número de teléfono empleadores"
        :rules="[requirePhonenumber]"
        persistent-hint
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="12">
      <v-text-field
        persistent-hint
        v-model="PositionTitle"
        label="título profesional"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="4">
      <v-select
        :items="income_type"
        v-model="Class"
        label="tipo de ingreso"
        persistent-hint
      ></v-select>
    </v-col>
    <v-col cols="12" sm="12" md="4">
      <v-select
        persistent-hint
        :items="employment_type"
        v-model="Type"
        label="presente / anterior"
      ></v-select>
    </v-col>

    <v-col cols="12" sm="12" md="2">
      <v-text-field
        type="number"
        persistent-hint
        v-model="YearsAtEmployer"
        label="años en la ocupación"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="2">
      <v-text-field
        type="number"
        persistent-hint
        v-model="MonthsAtEmployer"
        label="meses en la ocupación"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
<script>
import BusinessAddressAutoComplete from './BusinessAddressAutoComplete'
import { mask } from 'vue-the-mask'

export default {
  name: 'EmployementInformation',
  components: {
    BusinessAddressAutoComplete
  },
  directives: {
    mask
  },
  computed: {
    Name: {
      get () {
        console.log('test');
        return this.$store.state.applicant.employment_information
      },
      set (value) {
        this.$store.commit('SET_EMPLOYEMENT_FIELD', { key: 'Name', value: value })
      }
    },
    Address: {
      get () {
        return this.$store.state.employment_information.Address.AddressLine1 + ', ' + this.$store.state.employment_information.Address.City + ', ' + this.$store.state.employment_information.Address.State + ' ' + this.$store.state.employment_information.Address.PostalCode
      },
      set (value) {
        this.$store.commit('SET_EMPLOYEMENT_FIELD', { key: 'Address', value: value })
      }
    },
    PhoneNumber: {
      get () {
        return this.$store.state.work_phone
      },
      set (value) {
        this.$store.commit('SET_CURRENT_WORK_PHONE', value)
      }
    },
    PositionTitle: {
      get () {
        return this.$store.state.employment_information.PositionTitle
      },
      set (value) {
        this.$store.commit('SET_EMPLOYEMENT_FIELD', { key: 'PositionTitle', value: value })
      }
    },
    Type: {
      get () {
        return this.$store.state.employment_information.Type
      },
      set (value) {
        this.$store.commit('SET_EMPLOYEMENT_FIELD', { key: 'Type', value: value })
      }
    },
    Class: {
      get () {
        return this.$store.state.employment_information.Class
      },
      set (value) {
        this.$store.commit('SET_EMPLOYEMENT_FIELD', { key: 'Class', value: value })
      }
    },
    YearsAtEmployer: {
      get () {
        return this.$store.state.employment_information.YearsAtEmployer
      },
      set (value) {
        this.$store.commit('SET_EMPLOYEMENT_FIELD', { key: 'YearsAtEmployer', value: value })
      }
    },
    MonthsAtEmployer: {
      get () {
        return this.$store.state.employment_information.MonthsAtEmployer
      },
      set (value) {
        this.$store.commit('SET_EMPLOYEMENT_FIELD', { key: 'MonthsAtEmployer', value: value })
      }
    }

  },

  data () {
    return {
      phonemask: '(###) ###-####',
      requirePhonenumber: v => v && v.length > 0 || 'Debes ingresar el número de teléfono empleadores',
      income_type: [
        {
          value: 'Full-Time',
          text: 'puesto de plena dedicación'
        },
        {
          value: 'PartTime',
          text: 'puesto a tiempo parcial'
        },
        {
          value: 'Retired',
          text: 'jubilación'
        },
        {
          value: 'Military',
          text: 'Militar'
        },
        {
          value: 'Self-Employed',
          text: 'trabajador independiente'
        }

      ],
      employment_type: [
        {
          value: 'Current',
          text: 'presente'
        },
        {
          value: 'Previous',
          text: 'anterior'
        }
      ]
    }
  },
  methods: {

    changeStepForward: function () {
      this.$store.commit('SET_FORM_STEP', this.$store.getters.getCurrentStep)
    },
    changeStepBack: function () {
      this.$store.commit('REDUCE_FORM_STEP', this.$store.getters.getCurrentStep)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>