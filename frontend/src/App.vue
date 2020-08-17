<template>

  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-flex md8 offset-md2 id="mainElendFormContainer">
          <v-row v-if="!showMessage" class="form_main_header">
            <v-col cols="12" sm="12" md="12">
              <v-card-title class="form_header">
                <h1 class="pb-5">formulario de registro de distribuidores</h1>
              </v-card-title>
            </v-col>
          </v-row>
          <v-row v-if="showMessage">
              <thankyou />
          </v-row>
          <v-row v-if="!showMessage">
          <DealerSignup />
           <v-btn
              @click="submitApplication"
              data-cy="SubmitApplication"
              color="primary"
              dark
              large
              min-width="200"
              >Enviar</v-btn>
          </v-row>
          
          <!-- <v-row class="form_main_header">
            <v-col cols="12" sm="12" md="12">
              <v-card-title class="form_header">
                <h1 class="pb-5">Solicitud de crédito</h1>
              </v-card-title>
              <loading-status />
            </v-col>
          </v-row> -->
          <!-- <v-row
            class="form_main_header"
            v-if="this.$store.state.application_submitted"
          >
            <v-col cols="12" sm="12" md="12">
              <credit-disclosure />
            </v-col>
          </v-row> -->

          <v-stepper
            v-model="e1"
            v-if="!show_me && !this.$store.state.application_submitted"
          >
            <!-- <v-stepper-header>
              <v-stepper-step
                :complete="this.$store.getters.currentStep > 1"
                step="1"
                >Información del aplicante</v-stepper-step
              >

              <v-divider></v-divider>

              <v-stepper-step
                :complete="this.$store.getters.currentStep > 2"
                step="2"
                >Dirección</v-stepper-step
              >

              <v-divider></v-divider>
              <v-stepper-step
                :complete="this.$store.getters.currentStep > 3"
                step="3"
                >Ocupación</v-stepper-step
              >

              <v-divider></v-divider>

              <v-stepper-step step="4">
                Información del vehículo</v-stepper-step
              >
            </v-stepper-header> -->
            <v-stepper-items>
              <!-- <v-stepper-content step="1">
                <applicant-base-information />
              </v-stepper-content> -->
              <!-- ------------------- START FORM GROUP 2  / ADDRESS INFORMATION ----------------- -->
              <!-- <v-stepper-content step="2">
                <address-information />
              </v-stepper-content> -->
              <!-------------------------- EMPLOYEMENT  INFORMATION ---------------------------------->
              <!-- <v-stepper-content step="3">
                <v-row class="form_section_container">
                  <employement-information />
                </v-row>
              </v-stepper-content> -->
              <!---- VEHICLE INFORMATION SELECTIONS -->
              <!-- <v-stepper-content step="4">
                <vehicle-information />
              </v-stepper-content> -->
            </v-stepper-items>
          </v-stepper>
          <v-row justify="end" class="pr-5 pt-10">
            <!-- <v-btn
              text
              data-cy="changeStepBack"
              @click="changeStepBack"
              v-if="show_action_buttons && e1 >= 2"
              large
              color="error"
              >de vuelta</v-btn
            >
            <v-btn
              v-if="e1 !== 4 && show_action_buttons"
              large
              color="primary"
              @click="changeStepForward"
              data-cy="changeStepForward"
            >
              continuar
            </v-btn> -->
            <!-- <v-btn
              @click="submitApplication"
              data-cy="SubmitApplication"
              :loading="loading"
              v-if="e1 === 4 && show_action_buttons"
              color="primary"
              dark
              large
              min-width="200"
              >Enviar</v-btn
            > -->
          </v-row>
        </v-flex>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
var axios = require('axios')
import { mask } from 'vue-the-mask'
import LoadingStatus from './components/LoadingStatus'
import CreditDisclosure from './components/CreditDisclosure'
import Thankyou from './components/Thankyou'
import DealerSignup from './components/elend-credit-app/DealerSignup'
import EmployementInformation from './components/elend-credit-app/EmployementInformation'
import AddressInformation from './components/elend-credit-app/AddressInformation'
import ApplicantBaseInformation from './components/elend-credit-app/ApplicantBaseInformation'
import VehicleInformation from './components/elend-credit-app/VehicleInformation'
import LogRocket from 'logrocket'
LogRocket.init('jbbj30/elend-credit-application')
var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};
export default {
  name: 'App',
  components: {
    LoadingStatus,
    EmployementInformation,
    VehicleInformation,
    AddressInformation,
    ApplicantBaseInformation,
    CreditDisclosure,
    DealerSignup,
    Thankyou
  },
  mounted () {

    let params = (new URL(document.location)).searchParams
    let name = params.get("dealer-id");
    this.dealer_elend_key = name ? name : this.dealer_elend_key



  },
  data: () => ({

    dealer_elend_key: 33333,
    credit_update_message: null,
    loading: false,
    show1: false,
    show2: true,
    show3: false,
    show4: false,
    showMessage: false,
    timemask: '##',
    areacode: null,
    prefix: null,
    suffix: null,
    phonemask: '(###)###-####',

  }),
  computed: {
    show_action_buttons: {
      get () {
        return this.$store.state.show_action_buttons
      },
    },
    e1: {
      get () {
        return this.$store.getters.getCurrentStep
      },
      set (value) {
        this.$store.commit('SET_FORM_STEP', value)
      }
    },
    show_me: {
      get () {
        return this.$store.getters.getCurrentLoadingStatus
      }
    },
    submission_status: {
      get () {
        return this.$store.state.application_submitted
      }
    }
  },
  methods: {
    changeStepForward: function () {
      LogRocket.identify(ID(), {
        name: this.$store.state.applicant.firstname + ' ' + this.$store.state.applicant.lastname,
        email: this.$store.state.applicant.EmailAddress
      })
      this.$store.commit('SET_FORM_STEP', this.$store.getters.getCurrentStep)
    },
    changeStepBack: function () {
      this.$store.commit('REDUCE_FORM_STEP', this.$store.getters.getCurrentStep)
    },
    parsePhoneNumber: function (phonenumber) {
      if (phonenumber === null) return
      phonenumber = phonenumber.replace(/[()]/g, '')
      phonenumber = phonenumber.split('')
      return {
        AreaCode: phonenumber.slice(0, 3).join(''),
        Prefix: phonenumber.slice(4, 7).join(''),
        Suffix: phonenumber.slice(8, 12).join('')
      }
    },
    checkIfValidDate: (date) => {
      return date !== 'Invalid Date' ? true : false
    },
    saveApplicationToAirTable: (app) => {
      let application = {
        FirstName: app[0].firstname,
        LastName: app[0].lastname,
        Type: 'Primary',
        EmailAddress: app[0].EmailAddress,
        MiddleName: app[0].middlename,
      }
      // save the application to airtable 
      axios.post(process.env.VUE_APP_API_URL + '/elend/create/airtable', { application });
    },
    submitApplication () {
      let self = this
      // this.saveApplicationToAirTable([this.$store.getters.getCurrentState.dealers])
      axios.post(process.env.VUE_APP_API_URL + '/insertDealerInformation', {
        data: this.$store.getters.getCurrentState.dealers
      })
        .then(res => {
          console.log('result', this.$store.getters.getCurrentState.dealers = {})
          
          // this.$toasted.show("Gracias por contactar con nosotras.")
          const status = res.status;
          if (status == '200') {
            this.showMessage = true;
            // this.$router.go('/thankyou')
            // this.$router.push({ path : '/thankyou' });
          // self.$router.push('/thankyou');
          }
          self.$store.commit('SET_APPLICATION_SUBMIT_STATUS', true)
        })
        .catch(e => {
          console.error(e);
        })
    },
    // submitApplication () {
    //   let self = this
    //   let phone = this.parsePhoneNumber(this.$store.state.work_phone)
    //   let birthday = this.$store.state.applicant.DateOfBirth;
    //   if (birthday.length === 10) {
    //     birthday = new Date(birthday)
    //     this.$store.commit('SET_DATE_OF_BIRTH', birthday)
    //   }
    //   this.$store.commit('SET_PARSED_WORK_PHONE', phone);
    //   this.$store.commit('SET_LOADER_STATE', true)
    //   this.$store.commit('SET_SHOW_ACTION_BUTTONS', false)
    //   this.$store.commit('UPDATE_ADDRESS_ARRAY', this.$store.getters.getCurrentState.address)
    //   this.$store.commit('UPDATE_EMPLOYEMENT_ARRAY', this.$store.getters.getCurrentState.employment_information)
    //   this.saveApplicationToAirTable([this.$store.getters.getCurrentState.applicant])
    //   axios.post(process.env.VUE_APP_API_URL + '/insertDealerInformation', {
    //     elend_dealer_id: this.dealer_elend_key,
    //     data: this.$store.getters.getCurrentState.applicant,
    //     VehicleRequest: this.$store.getters.getCurrentState.VehicleRequest
    //   })
    //     .then(res => {
    //       console.log('result', res)
    //       self.$store.commit('SET_APPLICATION_SUBMIT_STATUS', true)
    //       self.$store.commit('SET_ELEND_APPLICATION_ID', res.data.application_id)
    //       self.$store.commit('SET_APPLICATION_SUBMIT_STATUS', true)
    //       self.$store.commit('SET_CREDIT_DISCLOSURE', res.data.creditConsentDisclosures.Text)
    //       self.$store.commit('SET_CREDIT_DISCLOSURE_TOKEN', res.data.creditConsentDisclosures.Token)
    //       self.$store.commit('SET_CREDIT_DISCLOSURE_BUTTON_LABEL', res.data.creditConsentDisclosures.ButtonLabel)
    //       self.$store.commit('SET_LOADER_STATE', false)
    //     })
    //     .catch(e => {
    //       //TODO Add error checking - THROW NEW ERROR FROM SERVER SIDE and add to catch 
    //         // self.$store.commit('SET_LOADER_STATE', false)
    //         // self.$store.commit('SET_ERROR_STATUS', true)
    //         // self.$store.commit('SET_ERROR_MESSAGE', res.data.applicationStatus.response_body)
    //         // self.$store.commit('SET_SHOW_ACTION_BUTTONS', true)
    //       console.error(e);
    //       // self.$store.commit('SET_LOADER_STATE', false)
    //       // self.$store.commit('SET_ERROR_STATUS', true)
    //       // self.$store.commit('SET_SHOW_ACTION_BUTTONS', true)
    //     })
    // }
  },
};
</script>


<style>
.theme--light.v-stepper {
  background: none !important;
}

.theme--light.v-stepper .v-stepper__label {
  font-family: futura-pt, sans-serif;
}
.v-application .pb-5 {
  font-family: futura-pt, sans-serif;
  font-weight: normal;
}
.v-text-field {
  font-size: 1.2em;
  padding-left: 20px;
  padding-right: 0px;
}
body {
  font-family: futura-pt, sans-serif;
}
body .v-stepper__header {
  background: none !important;
  box-shadow: none;
  margin-bottom: 25px;
  box-shadow: none;
}
.v-messages__message {
  font-size: 1.5em;
}
.v-stepper.theme--light {
  background: none;
  box-shadow: none;
}

body .v-stepper__content {
  background: white;
  font-family: futura-pt, sans-serif;
  box-shadow: 1px 1px 1px 1px #c0c0c03b;
  padding: 30px 30px;
}
.v-stepper.theme--light {
  background: none;
}
.v-text-field {
  font-size: 1.2em;
}
.v-application {
  font-family: futura-pt, sans-serif;
  font-weight: normal;
}
.theme--light.v-stepper .v-stepper__step--active .v-stepper__label {
  font-size: 1.5em;
}

.theme--light.v-stepper .v-stepper__label {
  font-size: 1.2em;
}
h3.currrent_loading_message {
  font-family: futura-pt, sans-serif;
  font-size: 1.3em;
  font-weight: 300;
}

.v-application p {
  font-family: futura-pt, sans-serif;
  font-size: 1.1em;
}
.theme--light.v-label {
  font-size: 1.1em;
}
</style>
