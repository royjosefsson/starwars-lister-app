import React from 'react'
import Header from './header'

describe('<Header />', () => {
  it('renders', () => {
    cy.mount(<Header />)
  })
})