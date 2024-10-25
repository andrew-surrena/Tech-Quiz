describe('Tech Quiz Cycle', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:3001/');
        cy.intercept({
            method: 'GET',
            url: '/api/questions/random'
          }, {
            fixture: 'questions.json',
            statusCode: 200,
          }).as('fixtureQuestions');
    });

    it("should start the quiz and display the first fixture question", () => {
        cy.contains('button', 'Start Quiz').should('be.visible');
    cy.get('[data-cy=start]').click();
    cy.wait('@fixtureQuestions');
    cy.get('h2').should('have.text', 'Sample Question 1')
    }
    );

    it("should answer questions and complete the quiz", () => {
        cy.get('[data-cy=start]').click();
        cy.wait('@fixtureQuestions');
        cy.get('button').first().click();
        cy.get('button').first().click();
        cy.get('[data-cy=end]').should('be.visible')
            });

    it('should restart the quiz after completion', () => {
        cy.get('[data-cy=start]').click();
        cy.wait('@fixtureQuestions');
        cy.get('button').first().click();
        cy.get('button').first().click();
        cy.contains('button', 'Take New Quiz').should('be.visible');
        cy.get('button').click();
        cy.wait('@fixtureQuestions');
        cy.get('h2').should('have.text', 'Sample Question 1')
    })
;})