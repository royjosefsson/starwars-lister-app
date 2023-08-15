import React from 'react'
import { Header } from "@/components/header"

describe('<Header />', () => {
  it('renders', () => {
    cy.mount(<Header />)
  })
})