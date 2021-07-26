import React, { FC } from 'react'
import { Layout, PageBlock } from "vtex.styleguide";



const AdminApp: FC = () => {

  return (
    <Layout>

      <section className="pt8 pl4">
        <h1>Admin app</h1>
      </section>
      <section className="pt7 pl4 pr4 ">
        <PageBlock
        variation="full"
        >
          <p>Admin App template</p>
        </PageBlock>
      </section>
    </Layout>
  )
}

export default AdminApp
