/// <reference types="cypress" />

import { auth } from '../page objects/githubLogin'
import { help } from '../utilities/helpers'
import { list } from '../page objects/listView'
import { details } from '../page objects/detailsView'

describe('Cypress tests for sample-alpha-project', () => {
    beforeEach(() => {
        help.setup()
    })

    //This test doesn't work because of a Content Security Policy with GitHub (but you can see how I would set it up)
    it.skip('Authenticates to GitHub', () => {
        cy.fixture('data').then((data) => {
        help.tapButton('GitHub Login')
        auth.githubLogin(data.githubLogin.username,data.githubLogin.password)
        })
       }) 

    //This test filters the 'Contributor search...' based on the argument passed to the parameter
    it('Filters based on an Author/Contributor', () => {
        cy.fixture('data').then((data) => {
            list.filterContributor(data.commit.contributor)
        })


    })

    //This test filters the 'SHA search...' based on the argument passed to the parameter
    it('Filters based on a SHA', () => {
        cy.fixture('data').then((data) => {
            list.filterSHA(data.commit.sha)
        })
    })

    //This test checks that the page number increments and decrements correctly with pagination controls
    it('Validates pagination', () => {
        list.paginate()

    })

    //This test validates the Details View
    it('Validates details view', () => {
        cy.fixture('data').then((data) => {
            list.listViewSetup()
            details.detailsView(data.commit.sha)
    
        })
    })


})