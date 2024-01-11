describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Arto Hellas',
      username: 'hellas',
      password: '12345678'
    }

    cy.request('POST', `${Cypress.config('BACKEND')}/users`, user)

    const user2 = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: '87654321'
    }

    cy.request('POST', `${Cypress.config('BACKEND')}/users`, user2)

    cy.visit('') //la direccion se encuentra en el config de cypress
    cy.contains('login').click()
  })

  it('Login form is shown', function () {
    cy.get('#username_input')
    cy.get('#password_input')
    cy.get('#button_input')
  })

  describe('Login', function () {
    it('success with the correct credentials', function () {
      cy.get('#username_input').type('hellas')
      cy.get('#password_input').type('12345678')
      cy.get('#button_input').click()
      cy.contains('Arto Hellas logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username_input').type('pepito')
      cy.get('#password_input').type('123')
      cy.get('#button_input').click()
      cy.get('#notification')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'hellas', password: '12345678' }) //Esta funcion esta definida en ./support//commands.js
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Blog of Cyphress Testing')
      cy.get('#author').type('Author of testing')
      cy.get('#url').type('www.url_cyphres_testing.com')
      cy.get('#create').click()
      cy.contains('a new blog \'Blog of Cyphress Testing\' by Author of testing added')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'New Blog', author: 'Somebody', url: 'www.testing.com', likes: 10 })
        cy.createBlog({ title: 'Another Blog', author: 'Random author', url: 'www.blogs.com', likes: 5 })
        cy.createBlog({ title: 'Last Blog', author: 'Final author', url: 'www.publications.com', likes: 0 })
      })

      it('one of those can be got liked', function () {
        cy.contains('Last Blog').parent().find('button').as('setOfButtons')
        cy.get('@setOfButtons').eq(0).click()
        cy.get('@setOfButtons').eq(1).click()
        cy.get('@setOfButtons').eq(1).parent().should('contain', 'likes 1')
      })

      it('only the creator of the blog can delete it', function () {
        cy.contains('Another Blog').parent().find('button').as('setOfButtons')
        cy.get('@setOfButtons').eq(0).click()
        cy.get('@setOfButtons').eq(2).click()
        cy.contains('\'Another Blog\' by Random author was deleted')
      })

      it('the users only can delete the blogs created by them (the delete button doesn\'t appear to user who doesn\'t created the blog)', function () {
        cy.contains('logout').click()
        cy.login({ username: 'mluukkai', password: '87654321' }) //Esta funcion esta definida en ./support//commands.js
        cy.contains('New Blog Somebody').find('button').as('theButtons')
        cy.get('@theButtons').eq(0).click()
        cy.get('@theButtons').eq(2).should('have.css', 'display', 'none')
      })

      it('the blog with the highest quantity is the first one and the the blog with the lowest quantity is the last one (they are ordered)', function () {
        cy.get('.blog').eq(0).within(() => {
          cy.contains('likes 10')
        })
        
        cy.get('.blog').eq(2).within(() => {
          cy.contains('likes 0')
        })
      })
    })
  })
})