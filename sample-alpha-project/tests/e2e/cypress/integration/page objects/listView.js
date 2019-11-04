/// <reference types="cypress" />

import { help } from '../utilities/helpers'

export const list = {

    //Sets up the filter tests by verifying you're on the right screen first
    listViewSetup() {
        cy.contains('Commits', {timeout: 3000})
        cy.get('.v-list__tile__title', {timeout: 3000}).contains('Commits')
            .click()
        cy.url().should('include', '/commits', {timeout: 3000})
        cy.wait(500)        

    },

    //Filters based on the contributor supplied to the parameter
    filterContributor(name) {
        //Filters based on the contributor supplied to the parameter
        this.listViewSetup()

        cy.get('.v-select__selections', {timeout: 3000})
            .click()        
        cy.get('div[role=listitem]', {timeout: 3000})
            .children()
            .contains('.v-list__tile__content', name, {timeout: 3000})
            .click()

        cy.get('.v-select__selections', {timeout: 3000})
            .should('contain', name)

        cy.wait(500)

        cy.get('tbody > :nth-child(1) > :nth-child(1)').then(($firstAuthorResult) => {
        const firstAuthorResult = $firstAuthorResult.text()
        expect(firstAuthorResult).to.contain(name)
        })
    },

    //Filters based on the SHA supplied to the parameter
    filterSHA(sha) {
        this.listViewSetup()

        cy.get('.v-text-field__slot', {timeout: 3000})
            .type(sha)

        cy.wait(500)

        cy.get('tbody > :nth-child(1) > :nth-child(2)').then(($firstSHAResult) => {
        const firstSHAResult = $firstSHAResult.text()
        expect(firstSHAResult).to.contain(sha)
        })
    },

    //Paginates forwards and backwards on list view
    paginate() {
        this.listViewSetup()

        cy.get('.font-weight-bold', {timeout: 3000}).then(($firstPage) => {
            const firstPage = $firstPage.text()
            const firstPageNumber = Number(firstPage.slice(4))

            expect(firstPageNumber).to.equal(1)

            help.tapButton('Next')
            
        cy.get('.font-weight-bold', {timeout: 3000}).then(($nextPage) => {
            const nextPage = $nextPage.text()
            const nextPageNumber = Number(nextPage.slice(4))

            expect(nextPageNumber).to.equal(firstPageNumber +1)
            cy.url().should('include',`/commits?page=${nextPageNumber}&per_page=10`)

            help.tapButton('Previous')

        cy.get('.font-weight-bold', {timeout: 3000}).then(($originalPage) => {
            const originalPage = $originalPage.text()
            const originalPageNumber = Number(originalPage.slice(4))
            
            expect(originalPageNumber).to.equal(firstPageNumber)
            cy.url().should('include',`/commits?page=${originalPageNumber}&per_page=10`)

        })
        })
        })
    }

    
}