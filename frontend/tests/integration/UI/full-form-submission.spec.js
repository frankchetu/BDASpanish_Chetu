// test the the form posts to Elend and that we recieve a Application ID
// source:  /src/components/elend-credit-app/VehicleInformation

describe('Full Submission to Elend', () => {
  beforeEach(() => {
    cy.window().then(window => {
      window.sessionStorage.setItem('bda_elend_app', '')
    })
  })
  it('submits the form to elend', () => {
    cy.visit(Cypress.env('HOST'))
    cy.get('[data-cy="firstname"]').type('Cypress')
    cy.get('[data-cy="middlename"]').type('Test')
    cy.get('[data-cy="lastname"]').type('Lasttest')
    cy.get('[data-cy="email"]').type('testing@gmail.com')
    cy.get('[data-cy="phonenumber"]').type('9549991234')
    cy.get('[data-cy="ssn"]').type('012331234')
    cy.get('[data-cy="dateofbirth"]').type('03/20/1950')
    cy.get('[data-cy="driverslicense"]').type('5555-4444040005045AJFJAFJ')
    cy.get('[data-cy="changeStepForward"]').click()
    cy.get('[data-cy="changeStepForward"]').click()

    cy.get('[data-cy="changeStepForward"]').click()
    cy.get('[data-cy="SubmitApplication"]').click()
    //TODO replace this with a promise
    cy.wait(10000)
    cy.get('[data-cy="creditdisclosure"]')
    cy.window()
      .its('app.$store')
      .its('state.elend_application_id')
      .should('be.a', 'number')

    cy.get('[data-cy="consentToCreditInquiry"]').click()
    //TODO replace this with a promise
    cy.wait(10000)
    cy.get('[data-cy="creditdisclosure"]').should($page => {
      expect($page).to.contain('Success')
    })
  })
})
