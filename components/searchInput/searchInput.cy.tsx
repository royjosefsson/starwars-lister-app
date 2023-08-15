import React from 'react'
import SearchInput from './searchInput'

describe('<SearchInput />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SearchInput />)
  })
})