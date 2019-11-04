/// <reference types="cypress" />

export const help = {
    
    //Sets up state of test
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

    //Picks a random value from an array
    randomValue(array) {
        return array[Math.floor(Math.random() * array.length)];
      }

}