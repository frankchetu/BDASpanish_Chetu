// source:  /src/components/elend-credit-app/VehicleInformation

describe('VehicleInformation.vue', () => {
  beforeEach(() => {
    cy.window().then(window => {
      window.sessionStorage.setItem('bda_elend_app', '')
    })
  })
  it('checks that the vehicle information tab displays', () => {
    cy.visit(Cypress.env('HOST'))
    cy.get('[data-cy="changeStepForward"]').click()
    cy.get('[data-cy="changeStepForward"]').click()
    cy.get('[data-cy="changeStepForward"]').click()
    cy.get('[data-cy="VehicleInformationTab"] .v-input__control')
  })
  it('checks that the vehicle makes have loaded', () => {
    cy.get('[data-cy="vehicle_makes_selector"]')
      .closest('.v-input__control')
      .click()
    cy.get('.v-menu__content.theme--light.menuable__content__active')
      .find('.v-list-item')
      .children()
      .should('have.length', 20)
    // cy.get('[data-cy="vehicle_makes_selector"]').click()
    cy.get('[data-cy="vehicle_makes_selector"]').type('{downarrow}{downarrow}{downarrow}{downarrow}{enter}')
  })
  it('selects a vehicle year', () => {
    cy.get('[data-cy="vehicle_year"]')
      .closest('.v-input__control')
      .click()
    cy.get('[data-cy="vehicle_year"]').type('{downarrow}{downarrow}{enter}')
  })
  it('selects a vehicle model', () => {
    cy.get('[data-cy="vehicle_models_selector"]')
      .closest('.v-input__control')
      .click()
    cy.get('[data-cy="vehicle_models_selector"]').type('{downarrow}{downarrow}{enter}')
    cy.get('[data-cy="vehicle_models_selector"]')
      .parent()
      .should($input => {
        expect($input).to.contain('A4')
      })
  })
  it('selects a vehicle trim', () => {
    cy.get('[data-cy="vehicle_trims"]')
      .closest('.v-input__control')
      .click()
    cy.get('[data-cy="vehicle_trims"]').type('{downarrow}{enter}')
    cy.get('[data-cy="vehicle_trims"]')
      .parent()
      .should($input => {
        expect($input).to.contain('2.0T FWD S tronic® Premium')
      })
  })
})
