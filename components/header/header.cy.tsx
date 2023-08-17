import { Header } from "@/components/header"

describe('<Header />', () => {
  it('renders', () => {
    cy.mount(<Header />)
  })
})
