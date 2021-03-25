import React from 'react'
import { getAccessToken } from 'src/accessToken'
import { useTestQuery } from 'src/generated/graphql'

interface Props {}

export const Test: React.FC<Props> = () => {
  const accessToken = getAccessToken()
  const { data, loading, error } = useTestQuery({
    fetchPolicy: 'network-only',
    context: {
      headers: {
        authorization: accessToken ? `bearer ${accessToken}` : '',
      },
    },
  })

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    console.log(error.message)
    return <div>{error.message}</div>
  }

  if (!data) {
    return <div>no data!</div>
  }

  return <div>{data?.test}</div>
}
