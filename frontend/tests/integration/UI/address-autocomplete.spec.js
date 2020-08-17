// source:  /src/components/elend-credit-app/AutoCompleteAddressSearch.vue

describe('AutoCompleteAddressSearch.vue', () => {
  beforeEach(() => {
    cy.window().then(window => {
      window.sessionStorage.setItem('bda_elend_app', '')
    })
  })
  it('checks that the address autocomplete is returning locations', function() {
    cy.visit(Cypress.env('HOST'))
    cy.get('[data-cy="changeStepForward"]').click()

    cy.get('[data-cy="addressAutoComplete"]').type(`1200 nw`)
    cy.wait(500)
    cy.get('[data-cy="addressAutoComplete"]').type(`{downarrow}{downarrow}{enter}`)
    cy.wait(500)
    cy.get('[data-cy="addressAutoComplete"]').then(elem => {
      const selectedSearchValue = elem[0].value
      cy.wait(500)

      console.log(selectedSearchValue)
      cy.window()
        .its('app.$store')
        .its('state.autocomplete_select.description')
        .should('contain', selectedSearchValue)
    })
  })
})
