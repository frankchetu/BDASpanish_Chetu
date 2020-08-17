import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import LogRocket from 'logrocket'
LogRocket.init('jbbj30/elend-credit-application')
import createPlugin from 'logrocket-vuex'
const logrocketPlugin = createPlugin(LogRocket)
// This is an example script - don't forget to change it!

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'bda_elend_app',
      storage: window.sessionStorage,
    }),
    logrocketPlugin,
  ],
  state: {
    work_phone: null,
    autocomplete_business_search: '',
    autocomplete_business_select: '',
    autocomplete_business_items: [],
    autocomplete_search: '',
    autocomplete_select: '',
    autocomplete_items: [],
    autocomplete_loading: false,
    submitting_form: false,
    credit_update_message: null,
    show_loader: false,
    current_loading_message: 'Enviando solicitud ... Por favor espere',
    elend_application_id: null,
    show_action_buttons: true,
    credit_disclosure: null,
    credit_disclosure_button_label: null,
    credit_disclosure_token: null,
    current_error: {
      is_error: false,
      message: 'Error',
      application_submitted: false,
    },
    count: 1,
    e1: 1,
    Employer: [],
    address: {
      type: 'Current',
      AddressLine1: '',
      AddressLine2: '',
      City: '',
      State: '',
      PostalCode: '',
      YearsAtAddress: '',
      MonthsAtAddress: '',
    },

    VehicleRequest: {
      Type: '',
      IsCertifiedPreOwned: '',
      VIN: '',
      StockID: '',
      Year: '',
      Make: '',
      Model: '',
      Trim: '',
    },
    employment_information: {
      Type: 'Primary',
      Class: 'Fulltime',
      YearsAtEmployer: '',
      MonthsAtEmployer: '',
      Name: '',
      PositionTitle: '',
      PhoneNumber: '',
      Address: '',
    },
    dealers: {
      type: 'primary',
      dealername: '',
      contactname: '',
      contactnumber: '',
      emailaddress: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      inventoryprovider: ''
    },
    applicant: {
      type: 'primary',
      EmailAddress: '',
      firstname: '',
      lastname: '',
      middlename: '',
      DateOfBirth: '',
      Employers: [],
      Housing: {
        Type: '',
        Payment: '',
      },
      PhoneNumbers: [
        {
          type: 'Cell',
          areaCode: '',
          prefix: '',
          suffix: '',
        },
      ],
      IDs: [
        {
          Type: 'SSN',
          issuer: '',
          value: '',
        },
        {
          Type: 'DL',
          issuer: '',
          value: '',
        },
      ],
      Addresses: [],
    },
  },
  getters: {
    getCurrentStep: state => {
      return state.e1
    },
    getCurrentState: state => {
      return state
    },
    getCurrentAddress: state => {
      return state.address.AddressLine1
    },
    getCurrentSubmissionStatus: state => {
      return state.submitting_form
    },
    getCurrentLoadingStatus: state => {
      return state.show_loader
    },
  },
  mutations: {
    SET_VALUE(state, data) {
      state.applicant[data.name] = data.value
    },
    SET_VALUE(state, data) {
      state.dealers[data.name] = data.value
    },
    SET_SUBMITTING_FORM(state, data) {
      state.submitting_form = data
    },
    SET_ERROR_MESSAGE(state, data) {
      state.current_error.message = data
    },
    SET_ERROR_STATUS(state, data) {
      state.current_error.is_error = data
    },
    SET_APPLICATION_SUBMIT_STATUS(state, data) {
      state.application_submitted = data
    },

    SET_SOCIAL(state, data) {
      state.applicant.IDs[0].value = data
    },
    REDUCE_FORM_STEP(state, data) {
      state.e1 = data - 1
    },

    SET_FORM_STEP(state, data) {
      state.e1 = data + 1
    },
    SET_PHONE_NUMBER_AREA_CODE(state, data) {
      state.applicant.PhoneNumbers[0].areaCode = data
    },
    SET_PHONE_NUMBER_PREFIX(state, data) {
      state.applicant.PhoneNumbers[0].prefix = data
    },
    SET_PHONE_NUMBER_SUFFIX(state, data) {
      state.applicant.PhoneNumbers[0].suffix = data
    },
    SET_DATE_OF_BIRTH(state, data) {
      state.applicant.DateOfBirth = data
    },
    SET_EMPLOYEMENT_INFO(state, data) {
      state.employment_information[data.key] = data.value
    },
    SET_ADDRESS_FIELD(state, data) {
      state.address[data.key] = data.value
    },
    SET_EMPLOYEMENT_FIELD(state, data) {
      // state.applicant.Employer[data.key] = data.value
    },
    SET_VEHICLE_DATA(state, data) {
      state.VehicleRequest[data.key] = data.value
    },
    SET_SSN(state, data) {
      state.applicant.IDs[0].value = data
    },
    SET_DRIVERSLICENSE(state, data) {
      state.applicant.IDs[1].value = data
    },
    UPDATE_ADDRESS_ARRAY(state, data) {
      state.applicant.Addresses[0] = data
    },
    UPDATE_EMPLOYEMENT_ARRAY(state, data) {
      state.applicant.Employers[0] = data
    },
    UPDATE_EMPLOYEMENT_OBJECT(state, data) {
      state.applicant.Employe[0] = data
    },
    SET_HOUSING_VALUES(state, data) {
      state.applicant.Housing[data.key] = data.value
    },
    SET_CREDIT_UPDATE_MESSAGE(state, data) {
      state.credit_update_message = data
    },
    SET_ELEND_APPLICATION_ID(state, data) {
      state.elend_application_id = data
    },
    SET_CREDIT_DISCLOSURE(state, data) {
      state.credit_disclosure = data
    },
    SET_CREDIT_DISCLOSURE_TOKEN(state, data) {
      state.credit_disclosure_token = data
    },
    SET_CREDIT_DISCLOSURE_BUTTON_LABEL(state, data) {
      state.credit_disclosure_button_label = data
    },
    SET_LOADER_STATE(state, data) {
      state.show_loader = data
    },
    SET_CURRENT_LOADING_MESSAGE(state, data) {
      state.current_loading_message = data
    },
    SET_SHOW_ACTION_BUTTONS(state, data) {
      state.show_action_buttons = data
    },
    SET_GOOGLE_AUTOCOMPLETE_VALUES(state, data) {
      state[data.key] = data.value
    },
    SET_CURRENT_WORK_PHONE(state, data) {
      state.work_phone = data
    },
    SET_PARSED_WORK_PHONE(state, data) {
      state.applicant.PhoneNumber = data
    },
  },
  actions: {},
})
