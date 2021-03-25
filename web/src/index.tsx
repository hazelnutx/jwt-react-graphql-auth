import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
// @ts-ignore
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
// import { getAccessToken } from './accessToken'
// import { useLoginMutation, useTestQuery } from './generated/graphql'

const cache = new InMemoryCache()

// const accessToken = getAccessToken()

const client = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
})

// client.query({
//   query: useTestQuery({

//   }) as any,
//   context: {

//   }
// })

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
