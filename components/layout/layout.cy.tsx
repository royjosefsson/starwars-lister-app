import { Layout } from "@/components/layout"

describe('<Layout />', () => {
  it('renders', () => {

    cy.mount(<Layout>
      <h1>Heading in Layout</h1>
    </Layout>)
  })
})
