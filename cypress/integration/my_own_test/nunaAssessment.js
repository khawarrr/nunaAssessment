/// <reference types="cypress" />

import TranslateLanguage from './translationPage'

describe('browser action', () => {
    const tp = new TranslateLanguage();

    //load and visit the google translate website
    it('Verify the website loads successfully', () => {
        tp.visit()
    });
    
    //Following test step selects source language from the menu drop down on the left
    it('Verify user is able to select the given source language', () => {
        tp.sourceLanguage()
    });

    //Following test step selects translation language from the menu drop down on the right
    it('Verify user is able to select the given translation language ', () => {
        tp.translationLanguage()
    });

    //Following test step tests entering the initial text in the input field
    it('Verify user is able to type in source language text area', () => {
        tp.typeTextArea()
    });
    
    it('Verify Swap button swaps source and translation languages', () => {
        tp.swapLanguage()
    });

    it('Verify User is able to select Screen Keyboard via input tool button', () => {
       tp.inputToolButton()
    });

    it('Verify user is able to clear source output', () => {
        tp.clearTextArea()
    });

    it('Verify user is able to click on the screen keyboard keys', () => {
        tp.screenKeyboard()
    });
});
