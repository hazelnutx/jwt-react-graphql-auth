import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { setAccessToken } from 'src/accessToken'
import { useLoginMutation } from 'src/generated/graphql'

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const [login] = useLoginMutation()

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        console.log('form submited', email, password)
        const response = await login({
          variables: {
            email,
            password,
          },
        })
        console.log(response)

        if (response && response.data) {
          setAccessToken(response.data.login.accessToken)
        }

        history.push('/')
      }}
    >
      <div>
        <input
          type='email'
          value={email}
          placeholder='email'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type='password'
          value={password}
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}
