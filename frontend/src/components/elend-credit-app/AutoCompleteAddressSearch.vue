
<template>
  <v-autocomplete
    data-cy="addressAutoComplete"
    id="addressAutoComplete"
    no-filter
    v-model="select"
    :loading="loading"
    :items="items"
    item-text="description"
    item-value="description"
    :search-input.sync="search"
    flat
    background-color="transparent"
    @change="addressSelected"
    persistent-hint
    hide-no-data
    return-object
    label="Dirección"
  ></v-autocomplete>
</template>

<script>
//  TODO: create a single function for handling auto-complete fields 
var _ = require('lodash');
var $ = require('jquery');
var axios = require('axios')
export default {
  name: 'AutoCompleteAddressSearch',
  data () {
    return {
      loading: false,
      latitude: '',
      longitude: ''
    }
  },
  computed: {
    search: {
      get () {
        return this.$store.state.autocomplete_search
      },
      set (value) {
        this.$store.commit('SET_GOOGLE_AUTOCOMPLETE_VALUES', { key: 'autocomplete_search', value: value })
      }
    },
    select: {
      get () {
        return this.$store.state.autocomplete_select
      },
      set (value) {
        this.$store.commit('SET_GOOGLE_AUTOCOMPLETE_VALUES', { key: 'autocomplete_select', value: value })
      }
    },
    items: {
      get () {
        return this.$store.state.autocomplete_items
      },
      set (value) {
        this.$store.commit('SET_GOOGLE_AUTOCOMPLETE_VALUES', { key: 'autocomplete_items', value: value })
      }
    }
  },
  watch: {
    search (val) {
      val && val !== this.select && this.querySelections(val)
    }
  },
  mounted () {
    let self = this;
    $.getJSON(`${process.env.VUE_APP_GEOBYTES_URL}/GetCityDetails?callback=?&key=${process.env.VUE_APP_GEOBYTES_API_KEY}`, function (data) {
      console.log(data)
      self.latitude = data.geobyteslatitude ? data.geobyteslatitude : '';
      self.longitude = data.geobyteslongitude ? data.geobyteslongitude : '';
    })
  },
  methods: {
    querySelections (v) {
      this.loading = true
      let self = this;
      if (v.length >= 2) {
        axios.get(process.env.VUE_APP_API_URL + '/search/autocomplete', {
          params: {
            latitude: this.latitude,
            longitude: this.longitude,
            search: this.search,
            type: 'geocode'
          }
        })
          .then(res => {
            self.items = res.data;
            this.loading = false
          })

      }

    },
    searchByPlaceID: async (place_id) => {
      let result = await axios.get(process.env.VUE_APP_API_URL + '/search/autocomplete/place-id', {
        params: {
          place_id: place_id
        }      })
        .then(res => {
          return res.data;
        })
      return result
    },
    addressSelected: async function () {
      this.loading = false;
      if (this.select === null) return;
      let address_components = await this.searchByPlaceID(this.select.place_id)
      this.$store.commit('SET_ADDRESS_FIELD', { key: 'AddressLine1', value: address_components.name })
      this.$store.commit('SET_ADDRESS_FIELD', { key: 'City', value: address_components.vicinity })
      this.$store.commit('SET_ADDRESS_FIELD', { key: 'State', value: address_components.address_components[4].long_name })
      this.$store.commit('SET_ADDRESS_FIELD', { key: 'PostalCode', value: address_components.address_components[6].long_name })
      this.loading = false;
    }
  },
}
</script>
<style>
i.v-icon.notranslate.mdi.mdi-menu-down.theme--light {
  display: none;
}
</style>