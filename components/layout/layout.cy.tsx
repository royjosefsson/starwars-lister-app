import React from 'react'
import Layout from './layout'

describe('<Layout />', () => {
  it('renders', () => {

    const onSorterOrderChange = () => {};
    const onSearchInputChange = () => {};

    cy.mount(<Layout
      onSorterOrderChange={onSorterOrderChange}
      onSearchInputChange={onSearchInputChange}
      seo={{
        title: 'Test Title',
        description: 'Test Description',
      }}
    >
      <h1>Heading in Layout</h1>
    </Layout>)
  })
})