import React from 'react'
import Stars from './stars'

describe('<Stars />', () => {
  it('renders', () => {
    cy.mount(<Stars amount={3} />)
  })
})