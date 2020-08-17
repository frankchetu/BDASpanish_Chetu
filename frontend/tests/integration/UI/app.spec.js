// source ./src/App.vue
describe('App.vue', () => {
  beforeEach(() => {
    cy.window().then(window => {
      window.sessionStorage.setItem('bda_elend_app', '')
    })
  })
  it('checks that the application renders', () => {
    cy.visit(Cypress.env('HOST'))
    cy.window().then(window => {
      window.sessionStorage.setItem('bda_elend_app', '')
      console.log(window)
    })
    const getStore = () => cy.window().its('app.$store')
    getStore()
      .its('state.e1')
      .should('equal', 1)
    cy.get('[data-cy=ApplicationBaseInfomation]')
  })
  it('checks that clicking "continuar" button goes to step 2 of form', function() {
    cy.get('[data-cy="changeStepForward"]').click()
    const getStore = () => cy.window().its('app.$store')
    getStore()
      .its('state.e1')
      .should('equal', 2)
  })
  it('checks that the address autocomplete is returning locations', function() {
    cy.get('[data-cy="changeStepForward"]').click()
    const mainApp = () => cy.window().its('app')
    console.log(mainApp())
  })
})
