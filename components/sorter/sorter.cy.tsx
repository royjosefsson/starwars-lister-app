import React from 'react'
import Sorter from './sorter'

describe('<Sorter />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Sorter />)
  })
})