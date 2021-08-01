import { render, screen } from '@testing-library/react'
import Post, { getServerSideProps } from '../../pages/posts/[slug]'
import { stripe } from '../../services/stripe'
import { mocked } from 'ts-jest/utils'
import { getPrismicClient } from "../../services/prismic"
import { getSession } from 'next-auth/client'


const post = 
  {
    slug: 'my-new-post',
    title: 'my new post',
    content: 'post excerpt',
    updatedAt: 'April 01, 2021'
  }

jest.mock('next-auth/client')
jest.mock('../../services/prismic')

describe('Post page', () => {
  it('renders correctly', async () => {
    render(<Post post={post} />)

    expect(screen.getByText('my new post')).toBeInTheDocument()
  })

  it('redirects user if not subscribed', async () => {
    const getSessionMocked = mocked(getSession)
    
    getSessionMocked.mockResolvedValueOnce(null)

    const response = await getServerSideProps({ params: {slug: 'my-new-post'}} as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/'
        })
      })
    )
  })

  it('loads initial data', async() => {
    const getSessionMocked = mocked(getSession)
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{
            type: 'heading',
            text: 'my new post'
          }],
          content: [{
            type: 'paragraph',
            text: 'post content'
          }]
        },
        last_publication_date: '04-01-2021'
      })
    } as any)

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription'
    } as any)

    const response = await getServerSideProps({
      params: {slug: 'my-new-post'}
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'my new post',
            content: '<p>post content</p>',
            updatedAt: 'April 01, 2021'
          }
        }
      })
    )
  })
})