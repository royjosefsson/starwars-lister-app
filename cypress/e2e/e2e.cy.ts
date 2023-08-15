describe('End to end', () => {

  const URL = "http://localhost:3000"

  it('Should contain 6 children', () => {
    cy.visit(URL)

    cy.get('ul.movies-result__list')
      .children()
      .should('have.length', 6)
  })

  it('Each title should follow the format "Episode [roman letters] - [title of movie]"', () => {
    cy.visit(URL)

    cy.get('ul.movies-result__list')
      .children()
      .each((child) => {

        cy.wrap(child)
          .find('.movies-result__list__li__content__title')
          .invoke('text')
          .should('match', /^Episode [IVXLCDM]+ - .+$/)
      })
  })

  it('Button should initially have text "Sort by..."', () => {
    cy.visit(URL)

    cy.get('.sorter__button')
      .should('have.text', 'Sort by...')
  })

  it('Clicking the button should make the options visible', () => {
    cy.visit(URL)

    cy.get('.sorter__button')
      .click()

    cy.get('ul.sorter__options')
      .should('have.class', 'visible')
  })

  it('Clicking on sorting option should rearrange "ul.movies-result__list" in ascending order based on episode', () => {
    cy.visit(URL)

    cy.get('.sorter__button')
      .click()

    cy.get('ul.sorter__options')
      .should('have.class', 'visible')

    cy.contains('.sorter__options__li', 'Episode')
      .click()

    cy.window().then((window) => {
      return window.Array.from(
        window.document.querySelectorAll(".movies-result__list .movies-result__list__li__content__episode")
      ).map((x: Element) => (x as HTMLElement).innerText).map(x => x?.split(" ")[1]).map(x => Number(x))
    }).then((episodeArray) => {
      const isSorted = episodeArray.every((value, index, array) => index === 0 || value >= array[index - 1])
      expect(isSorted).to.be.true
    })
  })

  it('Clicking on a movie updates the title', () => {
    cy.visit(URL)

    cy.get('.movies-result__information h1')
      .should('have.text', 'Select a movie!')

    cy.get('.movies-result__list__li')
      .first()
      .click()

    cy.get('.movies-result__information h1')
      .should('have.text', 'Episode IV - A New Hope')
  })

  it('Typing "George Lucas" should filter the movie list', () => {
    cy.visit(URL)

    cy.get('input.search-input__input')
      .type('George Lucas')

    cy.get('ul.movies-result__list')
      .children()
      .should('have.length', 4)
  })

})