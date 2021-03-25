import { MiddlewareFn } from 'type-graphql'
import { MyContext } from './MyContext'
import { verify } from 'jsonwebtoken'

// bearer <token>

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers['authorization']

  if (!authorization) throw new Error('Not authenticated')

  try {
    const token = authorization.split('bearer ')[1].trim()
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!)
    context.payload = payload as any
  } catch (e) {
    console.log(e)
    throw new Error('Not authenticated')
  }

  return next()
}
