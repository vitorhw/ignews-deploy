import { render } from '@testing-library/react'
import { useSession } from 'next-auth/client'
import React from 'react'
import { mocked } from 'ts-jest/utils'
import { SignInButton } from '.'


jest.mock('next-auth/client')

describe('Header component', () => {
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    const { getByText } = render(
      <SignInButton />
    )

    expect(getByText('Sign in with Github')).toBeInTheDocument()
  })

  it('renders correctly when user is authenticated', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([
      { user: { 
        name: 'John Doe', 
        email: 'john.doe@example.com' }, 
        expires: 'never'
      }, 
      false])

    const { getByText } = render(
      <SignInButton />
    )

    expect(getByText('John Doe')).toBeInTheDocument()
  })
})

