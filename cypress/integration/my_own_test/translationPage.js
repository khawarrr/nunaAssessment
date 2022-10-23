/// <reference types="cypress" />

  /*
    initializing sourceLanguage, translationLanguage, initialText
    and expectedText so that we’re able to use them later and verify when we perform the swap action
    */
    var sourceLanguage = '';
    var translationLanguage = '';
    var initialText = '';
    var expectedText = '';


class TranslateLanguage {

visit() {
    cy.visit("https://translate.google.com/");
}

sourceLanguage() {
    cy.get('div.akczyd > [jsname="RCbdJd"]').eq(0).click()
    cy.fixture('word')
        .then( word => {
            cy.get('input[placeholder="Search languages"]').eq(0).type(`${word.source_language}{enter}`)
        })
}

translationLanguage() {
    cy.get('div.akczyd > [jsname="zumM6d"]').eq(0).click()
    cy.fixture('word')
        .then( word => {
            cy.get('input[placeholder="Search languages"]').eq(1).type(`${word.translation_language}{enter}`)
        })
}

typeTextArea(){
    cy.fixture('word')
        .then( word => {
            cy.get('textarea').type(word.initial_text)
            cy.get('[aria-label="Source text"]').parents().eq(0)
            .contains(word.initial_text, {timeout: 10000}).should('exist')

            // updating the global variables from the json file
            sourceLanguage = word.source_language
            translationLanguage = word.translation_language
            initialText = word.initial_text
            expectedText = word.expected_text     
        })
}

swapLanguage(){
    cy.get('[aria-label="Swap languages (Cmd+Shift+S)"]').eq(0).click()

    /* After clicking on the swap button, we want to verify the swap took place successfully. 
    In order to do so, I’ve added a method which checks to see that the initial text is converted 
    into the expected text and vice versa. The following method handles that.*/
    cy.get('[aria-label="Source text"]').parents().eq(0)
    .contains(expectedText, {timeout: 10000}).should('exist')
}
inputToolButton(){
    cy.get('[aria-label="Show the Input Tools menu"]').click()
    cy.get('.ita-kd-dropdown-menu').click()
    cy.get('div[jsaction="touchend:.CLIENT"]').should('be.visible')
}
clearTextArea(){
    cy.get('[aria-label="Clear source text"]').eq(0).click()
    cy.get('span[aria-label="0 of 5,000 characters used"]').should('exist')
}
screenKeyboard(){
    cy.get('#K16').click()
    cy.get('#K72').click()
    cy.get('#K73').click()
    cy.get('#K16').click()
    cy.get('#K49').click()

    //following two steps verify successful input of "Hi!"
    cy.get('[aria-label="Source text"]').parents().eq(0).contains('Hi!', {timeout: 10000}).should('exist')
    cy.get('span[aria-label="3 of 5,000 characters used"]').should('exist')
}
}

export default TranslateLanguage;

