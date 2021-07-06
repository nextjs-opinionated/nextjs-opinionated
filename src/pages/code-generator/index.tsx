import Head from 'next/head'
import * as React from 'react'
import Link from 'next/link'
import { Layout } from '../../components/Layout/Layout'
import { LinksList } from '../../model/site/LinksList'

const Page: React.FunctionComponent = () => {
  return (
    <>
      <Head>
        <title>Code Generators : {process.env.NEXT_PUBLIC_SITE_NAME}</title>
      </Head>

      <Layout
        title={
          <div className='flex items-baseline flex-grow px-2 mx-2 space-x-3'>
            <div className='text-base font-bold'>Code Generators</div>
            <div className='text-sm'>{process.env.NEXT_PUBLIC_SITE_NAME}</div>
          </div>
        }
        menuItems={Object.values(LinksList)}
      >
        <main className='mx-8'>
          <h3 className='text-lg italic'>Only works on localhost</h3>
          <hr className='my-4' />
          <div>
            <Link href='/code-generator/generate-component'>
              <a className='link'>Component</a>
            </Link>
          </div>
        </main>
      </Layout>
    </>
  )
}

export default Page
