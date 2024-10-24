import Quiz from "../../client/src/components/Quiz";

const questions = [
    {
        "question": "Sample Question 1",
        "answers": [
            { "text": "Answer A", "isCorrect": false },
            { "text": "Answer B", "isCorrect": true },
            { "text": "Answer C", "isCorrect": false },
            { "text": "Answer D", "isCorrect": false }
        ]
    },
    {
        "question": "Sample Question 2",
        "answers": [
            { "text": "Answer E", "isCorrect": false },
            { "text": "Answer F", "isCorrect": false },
            { "text": "Answer G", "isCorrect": true },
            { "text": "Answer H", "isCorrect": false }
        ]
    }
]

describe('<Quiz />', () => {

    beforeEach(() => {
        cy.intercept('GET', '/api/questions/random', (req) => {
            req.reply({
                statusCode: 200,
                body: questions
            });
        }).as('getQuestions');
    })

    it("Should start the quiz and display the first question", () => {
        cy.mount(<Quiz />)
        cy.get('[data-cy=start]').click();
        cy.wait('@getQuestions');
        cy.get('h2').should('have.text', 'Sample Question 1')
    }
    );

    it("should answer questions and complete the quiz", () => {
        cy.mount(<Quiz />)
        cy.get('[data-cy=start]').click();
        cy.wait('@getQuestions');
        cy.get('button').first().click();
        cy.get('button').first().click();
        cy.get('[data-cy=end]').should('be.visible')
    });

    it('should restart the quiz after completion', () => {
        cy.mount(<Quiz />)
        cy.get('[data-cy=start]').click();
        cy.wait('@getQuestions');
        cy.get('button').first().click();
        cy.get('button').first().click();
        cy.get('button').click();
        cy.wait('@getQuestions');
        cy.get('h2').should('have.text', 'Sample Question 1')
    })
})
