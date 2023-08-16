import React from 'react'
import { Stars } from "@/components/stars"

describe('<Stars />', () => {
  it('renders', () => {
    cy.mount(<Stars />)
  })
})