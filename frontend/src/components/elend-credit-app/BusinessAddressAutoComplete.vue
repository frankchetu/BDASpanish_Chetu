
<template>
  <v-autocomplete
    data-cy="businessAddressaddressAutoComplete"
    id="businessAddressaddressAutoComplete"
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
    label="nombre de compañía"
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


    }
  },
  computed: {
    search: {
      get () {
        return this.$store.state.autocomplete_business_search
      },
      set (value) {

        this.$store.commit('SET_GOOGLE_AUTOCOMPLETE_VALUES', { key: 'autocomplete_business_search', value: value ? value : '' })
      }
    },
    select: {
      get () {

        return this.$store.state.autocomplete_business_select
      },
      set (value) {
        this.$store.commit('SET_GOOGLE_AUTOCOMPLETE_VALUES', { key: 'autocomplete_business_select', value: value ? value : '' })
      }
    },
    items: {
      get () {
        return this.$store.state.autocomplete_business_items
      },
      set (value) {
        this.$store.commit('SET_GOOGLE_AUTOCOMPLETE_VALUES', { key: 'autocomplete_business_items', value: value ? value : [] })
      }
    }
  },
  watch: {
    search (val) {
      val && val !== this.select && this.querySelections(val)
    }
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
            search: self.search,
            type: 'establishment'
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
          place_id: place_id,
          type: 'establishment'
        }      })
        .then(res => {
          return res.data;
        })
      return result
    },
    addressSelected: async function () {
      this.loading = false;
      if (this.select === null) return;
      let location_info = await this.searchByPlaceID(this.select.place_id)
      console.log(location_info);

      var address_components = location_info.address_components;
      var components = {};
      $.each(address_components, function (k, v1) { $.each(v1.types, function (k2, v2) { components[v2] = v1.long_name }); });
      console.log(components)

      this.$store.commit('SET_EMPLOYEMENT_INFO', {
        key: 'Address', value: {
          AddressLine1: components.street_number + ' ' + components.route,
          City: components.locality ? components.locality : '',
          State: components.administrative_area_level_1 ? components.administrative_area_level_1 : '',
          PostalCode: components.postal_code ? components.postal_code : '',
        }
      })
      this.$store.commit('SET_EMPLOYEMENT_INFO', { key: 'Name', value: location_info.name })
      this.$store.commit('SET_CURRENT_WORK_PHONE', location_info.formatted_phone_number)
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