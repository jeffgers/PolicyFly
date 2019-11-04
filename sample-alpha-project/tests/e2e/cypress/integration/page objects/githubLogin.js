/// <reference types="cypress" />

export const auth = {
    //Logs into GitHub. (NOTE:  This won't authenticate due to their Security Policy)
     githubLogin(username, password) {
        cy.wait(3000)
        cy.url().should('include', 'github.com/login')
        this.enterUsername(username)
        this.enterPassword(password)
        this.submitLoginForm()
        this.verifyGitHubLogin()
    },

    enterUsername(username) {
         //Clear out content of username textField and enter new one based on argument passed to parameter
         cy.get('input[type=text')
            .should('have.id', 'login_field').and().should('be.visible').clear()
            .type(username).should('have.value', username)

    },

    enterPassword(password) {
        //Clear out content of password textField and enter new one based on argument passed to parameter
         cy.get('input[type=password')
            .should('have.id', 'password').and().should('be.visible').clear()
            .type(password).should('have.value', password)
    },

    submitLoginForm() {
        //Submits the login form
        cy.get('input[type=submit')
        .should('have.value', 'Sign in')
        .and()
        .should('be.visible')
        .click()
    

    },

    verifyGitHubLogin() {
        cy.url().should('include', '/auth?code=')
        cy.contains('Authenticated')
    }

}