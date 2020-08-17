<template>
  <v-row class="form_section_container" data-cy="ApplicationBaseInfomation">
    <v-col cols="12" sm="6" md="4">
      <v-text-field
        persistent-hint
        data-cy="firstname"
        label="primer nombre"
        v-model="firstname"
        :rules="[requireFirstname]"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" md="4">
      <v-text-field
        persistent-hint
        data-cy="middlename"
        label="segundo nombre"
        v-model="middlename"
        :rules="[requireMiddlename]"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" md="4">
      <v-text-field
        persistent-hint
        data-cy="lastname"
        label="apellido"
        v-model="lastname"
        :rules="[requireLastname]"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="8">
      <v-text-field
        persistent-hint
        data-cy="email"
        label="Correo Electronico"
        v-model="EmailAddress"
        :rules="[requireEmail]"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="4">
      <v-text-field
        persistent-hint
        data-cy="phonenumber"
        v-mask="'(###) ###-####'"
        @keyup="parsePhoneNumber(applicants_phone_number)"
        label="número de teléfono"
        v-model="applicants_phone_number"
        :rules="[requirePhonenumber]"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="4">
      <v-text-field
        persistent-hint
        data-cy="ssn"
        :append-icon="show1 ? 'visibility' : 'visibility_off'"
        :type="show1 ? 'text' : 'password'"
        v-mask="socialmask"
        v-model="ssn"
        label="SSN / ITIN"
        @click:append="show1 = !show1"
        :rules="[requiressn]"
      >
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="4">
      <v-row>
        <v-text-field
          data-cy="dateofbirth"
          label="cumpleaños"
          persistent-hint
          v-model="DateOfBirth"
          placeholder="03/01/1983"
          v-mask="'##/##/####'"
        ></v-text-field>
      </v-row>
    </v-col>

    <v-col cols="12" sm="12" md="4">
      <v-text-field
        data-cy="driverslicense"
        persistent-hint
        v-model="driverslicense"
        label="Licencia de conducir"
      >
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import { mask } from 'vue-the-mask'


export default {
  name: 'ApplicationBaseInfomation',
  directives: {
    mask
  },
  watch: {
    selected_month_of_birth (val) {
      this.DateOfBirth = this.calculateBirthDay()
    },
    selected_day_of_birth (val) {
      this.DateOfBirth = this.calculateBirthDay()
    },
    selected_year_of_birth (val) {
      this.DateOfBirth = this.calculateBirthDay()
    }
  },
  data () {
    return {
      requireFirstname: v => v && v.length > 0 || 'Debes ingresar el primer nombre',
      requireMiddlename: v => v && v.length > 0 || 'Debes ingresar el segundo nombre',
      requireLastname: v => v && v.length > 0 || 'Debes ingresar el apellido',
      requireEmail: v => v && v.length > 0 || 'Debes ingresar el Correo Electronico',
      requirePhonenumber: v => v && v.length > 0 || 'Debes ingresar el número de teléfono',
      requiressn: v => v && v.length > 0 || 'Debes ingresar el SSN/ITIN',
      selected_day_of_birth: 1,
      phonemask: '###-###-####',
      socialmask: '###-##-####',
      birthday_mask: '##/##/####',
      selected_month_of_birth: 1,
      selected_year_of_birth: 1970,
      applicants_phone_number: null,
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      months: [{
        value: 1,
        text: 'enero'
      },
      {
        value: 2,
        text: 'febrero'
      },
      {
        value: 3,
        text: 'marzo'
      },
      {
        value: 4,
        text: 'abril'
      },
      {
        value: 5,
        text: 'mayo'
      },
      {
        value: 6,
        text: 'junio'
      },
      {
        value: 7,
        text: 'julio'
      },
      {
        value: 8,
        text: 'agosto'
      },
      {
        value: 9,
        text: 'septiembre'
      },
      {
        value: 10,
        text: 'octubre'
      },
      {
        value: 11,
        text: 'noviembre'
      },
      {
        text: 'dicembre'
      }

      ]

    }
  },
  mounted () {

  },

  computed: {

    firstname: {
      get () {
        return this.$store.state.applicant.firstname
      },
      set (value) {
        this.$store.commit('SET_VALUE', { value: value, name: 'firstname' })
      }
    },
    middlename: {
      get () {
        return this.$store.state.applicant.middlename
      },
      set (value) {
        this.$store.commit('SET_VALUE', { value: value, name: 'middlename' })
      }
    },
    lastname: {
      get () {
        return this.$store.state.applicant.lastname
      },
      set (value) {
        this.$store.commit('SET_VALUE', { value: value, name: 'lastname' })
      }
    },
    EmailAddress: {
      get () {
        return this.$store.state.applicant.EmailAddress
      },
      set (value) {
        this.$store.commit('SET_VALUE', { value: value, name: 'EmailAddress' })
      }
    },
    social: {
      get () {
        return this.$store.state.applicant.IDs[0].value
      },
      set (value) {
        this.$store.commit('SET_SOCIAL', value)
      }
    },
    areacode: {
      get () {
        return this.$store.state.applicant.PhoneNumbers[0].areaCode
      },
      set (value) {
        this.$store.commit('SET_PHONE_NUMBER_AREA_CODE', value)
      }
    },
    prefix: {
      get () {
        return this.$store.state.applicant.PhoneNumbers[0].prefix
      },
      set (value) {
        this.$store.commit('SET_PHONE_NUMBER_PREFIX', value)
      }
    },
    suffix: {
      get () {
        return this.$store.state.applicant.PhoneNumbers[0].suffix
      },
      set (value) {
        this.$store.commit('SET_PHONE_NUMBER_SUFFIX', value)
      }
    },
    DateOfBirth: {
      get () {
        return this.$store.state.applicant.DateOfBirth;
      },
      set (value) {
        if (value.length < 10) { return false };
        value = value.replace(/[/\/]/g, '-')
        this.$store.commit('SET_DATE_OF_BIRTH', value)
      }
    },
    ssn: {
      get () {
        return this.$store.state.applicant.IDs[0].value
      },
      set (value) {
        this.$store.commit('SET_SSN', value)
      }
    },
    driverslicense: {
      get () {
        return this.$store.state.applicant.IDs[1].value
      },
      set (value) {
        this.$store.commit('SET_DRIVERSLICENSE', value)
      }
    }

  },

  methods: {
    /**
     * Test if date is valid
     * @function
     * @params {string} date 
     */
    checkIfValidDate: (date) => {
      return date !== 'Invalid Date' ? true : false
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
    calculateBirthDay: function () {
      return new Date(this.selected_year_of_birth, this.selected_month_of_birth, this.selected_day_of_birth)
    },
    parsePhoneNumber: function (phonenumber) {
      if (phonenumber === null) return
      phonenumber = phonenumber.replace(/[() -]/g, '')
      if (phonenumber.length === 10) {
        phonenumber = phonenumber.split('')
        this.areacode = phonenumber.slice(0, 3).join('')
        this.prefix = phonenumber.slice(3, 6).join('')
        this.suffix = phonenumber.slice(6, 10).join('')
      }
    },
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