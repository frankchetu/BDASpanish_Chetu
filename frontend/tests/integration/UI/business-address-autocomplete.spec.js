// source:  /src/components/elend-credit-app/BusinessAddressAutoComplete.vue
describe('BusinessAddressAutoComplete.vue', () => {
  beforeEach(() => {
    cy.window().then(window => {
      window.sessionStorage.setItem('bda_elend_app', '')
    })
  })
  it('checks that the business autocomplete returns a business', function() {
    cy.visit(Cypress.env('HOST'))
    cy.get('[data-cy="changeStepForward"]').click()
    cy.get('[data-cy="changeStepForward"]').click()

    cy.get('[data-cy="businessAddressaddressAutoComplete"]').type(`Rick case hyundai`)
    cy.wait(1500)
    cy.get('[data-cy="businessAddressaddressAutoComplete"]').type(`{downarrow}{downarrow}{enter}`)
    cy.wait(1500)
    cy.get('[data-cy="businessAddressaddressAutoComplete"]').then(elem => {
      const selectedSearchValue = elem[0].value
      cy.wait(500)
      console.log(selectedSearchValue)
      cy.window()
        .its('app.$store')
        .its('state.autocomplete_business_select.description')
        .should('contain', selectedSearchValue)
    })
  })
})
