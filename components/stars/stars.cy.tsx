import React from 'react'
import Stars from './stars'

describe('<Stars />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Stars amount={3} />)
  })
})