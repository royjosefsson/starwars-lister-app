import { Stars } from "@/components/stars"

describe('<Stars />', () => {
  it('renders with stars', () => {
    cy.mount(<Stars amount={3} />)
  })

  it('renders without stars', () => {
    cy.mount(<Stars />)
  })
})
