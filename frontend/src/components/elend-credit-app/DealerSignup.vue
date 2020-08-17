<template>
  <v-row class="form_section_container" data-cy="ApplicationBaseInfomation">
    <v-col cols="12" sm="6" md="12">
      <v-text-field
        persistent-hint
        data-cy="dealername"
        label="nombre de empresa"
        v-model="dealername"
        :rules="[requiredealername]"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" md="12">
      <v-text-field
        persistent-hint
        data-cy="contactname"
        label="nombre de contacto del distribuidor"
        v-model="contactname"
        :rules="[requirecontactname]"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="12">
      <v-text-field
        persistent-hint
        data-cy="phonenumber"
        v-mask="'(###) ###-####'"
        label="número de contacto del distribuidor"
        v-model="contactnumber"
        :rules="[requirecontactnumber]"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="12">
      <v-text-field
        persistent-hint
        data-cy="emailaddress"
        label="dirección de correo electrónico"
        v-model="emailaddress"
        :rules="[requireemailaddress]"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" md="12">
      <v-text-field
        persistent-hint
        data-cy="address"
        label="dirección"
        v-model="address"
        :rules="[requireaddress]"
      ></v-text-field>
    </v-col>
    
    
    <v-col cols="12" sm="12" md="4">
      <v-text-field
        persistent-hint
        data-cy="city"
        v-model="city"
        label="ciudad"
        :rules="[requirecity]"
      >
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="4">
      <v-row>
        <v-text-field
          data-cy="state"
          label="estado"
          persistent-hint
          v-model="state"
          :rules="[requirestate]"
        ></v-text-field>
      </v-row>
    </v-col>

    <v-col cols="12" sm="12" md="4">
      <v-text-field
        data-cy="zipcode"
        persistent-hint
        v-model="zipcode"
        label="código postal"
        :rules="[requirezipcode]"
      >
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="12">
      <v-text-field
        data-cy="inventoryprovider"
        persistent-hint
        v-model="inventoryprovider"
        label="Proveedor de inventario"
        :rules="[requireinventoryprovider]"
      >
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import { mask } from 'vue-the-mask'


export default {
  name: 'DealerSignup',
  directives: {
    mask
  },
  watch: {
    
  },
  data () {
    return {
      // dealername: '',
      // contactname: '',
      // contactnumber: '',
      // emailaddress: '',
      // address: '',
      // city: '',
      // state: '',
      // zipcode: '',
      // inventoryprovider: '',
      requiredealername: v => v && v.length > 0 || 'Debes ingresar el nombre de empresa',
      requirecontactname: v => v && v.length > 0 || 'Debes ingresar el nombre de contacto del distribuidor',
      requirecontactnumber: v => v && v.length > 0 || 'Debes ingresar el número de contacto del distribuidor',
      requireemailaddress: v => /.+@.+/.test(v) || 'por favor ingrese una dirección de correo electrónico válida',
      requireaddress: v => v && v.length > 0 || 'Debes ingresar el dirección',
      requirecity: v => v && v.length > 0 || 'Debes ingresar el ciudad',
      requirestate: v => v && v.length > 0 || 'Debes ingresar el estado',
      requirezipcode: v => /^\d+$/.test(v) || 'por favor ingrese un código postal válido',
      requireinventoryprovider: v => v && v.length > 0 || 'Debes ingresar el Proveedor de inventario',
      phonemask: '###-###-####',

    }
  },
  mounted () {

  },
  computed: {

    dealername: {
      get () {
        return this.$store.state.dealers.dealername
      },
      set (value) {
        this.$store.commit('SET_VALUE', { value: value, name: 'dealername' })
      }
    },
    contactname: {
      get () {
        return this.$store.state.dealers.contactname
      },
      set (value) {
        this.$store.commit('SET_VALUE', { value: value, name: 'contactname' })
      }
    },
    contactnumber: {
      get () {
        return this.$store.state.dealers.contactnumber
      },
      set (value) {
        this.$store.commit('SET_VALUE', { value: value, name: 'contactnumber' })
      }
    },
    emailaddress: {
      get () {
        return this.$store.state.dealers.emailaddress
      },
      set (value) {
        this.$store.commit('SET_VALUE', { value: value, name: 'emailaddress' })
      }
    },
    address: {
      get () {
        return this.$store.state.dealers.address
      },
      set (value) {
        this.$store.commit('SET_VALUE', { value: value, name: 'address' })
      }
    },
    city: {
      get () {
        return this.$store.state.dealers.city
      },
      set (value) {
        this.$store.commit('SET_VALUE', { value: value, name: 'city' })
      }
    },
    state: {
      get () {
        return this.$store.state.dealers.state
      },
      set (value) {
        this.$store.commit('SET_VALUE', { value: value, name: 'state' })
      }
    },
    zipcode: {
      get () {
        return this.$store.state.dealers.zipcode
      },
      set (value) {
        this.$store.commit('SET_VALUE', { value: value, name: 'zipcode' })
      }
    },
    inventoryprovider: {
      get () {
        return this.$store.state.dealers.inventoryprovider
      },
      set (value) {
        this.$store.commit('SET_VALUE', { value: value, name: 'inventoryprovider' })
      }
    }

  },

  methods: {
    /**
     * Test if date is valid
     * @function
     * @params {string} date 
     */
    // checkIfValidDate: (date) => {
    //   return date !== 'Invalid Date' ? true : false
    // },
    // getNumberRange (lowEnd, highEnd, descending) {
    //   var list = []
    //   for (var i = lowEnd; i <= highEnd; i++) {
    //     list.push(i)
    //   }
    //   if (descending !== true) {
    //     return list.sort(function (a, b) {
    //       return a - b
    //     })
    //   } else {
    //     return list.sort(function (a, b) {
    //       return b - a
    //     })
    //   }
    // },
    // calculateBirthDay: function () {
    //   return new Date(this.selected_year_of_birth, this.selected_month_of_birth, this.selected_day_of_birth)
    // },
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
    // changeStepForward: function () {
    //   this.$store.commit('SET_FORM_STEP', this.$store.getters.getCurrentStep)
    // },
    // changeStepBack: function () {
    //   this.$store.commit('REDUCE_FORM_STEP', this.$store.getters.getCurrentStep)
    // }
  }
}
</script>

<style lang="scss" scoped>
</style>