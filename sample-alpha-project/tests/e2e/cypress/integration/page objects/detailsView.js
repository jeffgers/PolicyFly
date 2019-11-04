/// <reference types="cypress" />


export const details = {
    //Validates the Details View
    detailsView() {
        this.detailsViewSetup()
        cy.contains('Total Additions')
        cy.contains('Total Deletions')
        cy.contains('Total Overall')
        cy.get('.v-image__image').should('exist')
        cy.get('.font-weight-bold').should('exist')

        cy.get('.v-btn__content').click()
        cy.url().should('include', '/commits?page=1&per_page=10', {timeout: 3000})
        cy.contains('Commits', {timeout: 3000})

    },

    //Sets up the details view for validation
    detailsViewSetup() {
        cy.get('tbody > :nth-child(1) > :nth-child(2)').then(($firstSHAResult) => {
            const firstSHAResult = $firstSHAResult.text()
            cy.log(firstSHAResult)
        
            cy.get('tbody > :nth-child(1) > :nth-child(2)').click()
            cy.url().should('include', firstSHAResult, {timeout: 3000})
            cy.contains(firstSHAResult, {timeout: 3000})
        })  
    }
}