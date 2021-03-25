import React from 'react'
import { useUsersQuery } from 'src/generated/graphql'

interface Props {}

export const Home: React.FC<Props> = () => {
  const { data, loading } = useUsersQuery({ fetchPolicy: 'network-only' })

  if (!data || loading) return <div>loading...</div>

  return (
    <div>
      <div>users:</div>
      <ul>
        {data.users.map((x) => {
          return (
            <li key={x.id}>
              {x.email}, {x.id}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
