/// <reference types="cypress" />

export const help = {
    
    //Sets up the state for all of the tests 
    setup() {
        cy.visit('/' + '/commits', {timeout: 2000})
        cy.clearCookies()
        cy.clearLocalStorage()
    },

    //Taps a button based on the string passed through to the parameter
    tapButton(name) {
        cy.get('button[type=button]', {timeout: 5000})
            .contains(name)
            .click()

    },
}