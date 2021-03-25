import { compare, hash } from 'bcryptjs'
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql'
import { getConnection } from 'typeorm'
import { createAccessToken, createRefreshToken } from './auth'
import { User } from './entity/User'
import { isAuth } from './isAuth'
import { MyContext } from './MyContext'
import { sendRefreshToken } from './sendRefreshToken'

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'raul'
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  test(@Ctx() { payload }: MyContext) {
    console.log(payload)
    return `your user id is : ${payload?.userId}`
  }

  @Query(() => [User])
  users() {
    return User.find()
  }

  // Do not make in production only dev
  // As the function states, it revokes / makes the versionToken a different number than the actual token.
  @Mutation(() => Boolean)
  async revokeRefreshTokenForUser(@Arg('userId', () => Int) userId: number) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, 'tokenVersion', 1)

    return true
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({
      where: { email },
    })

    if (!user) {
      throw new Error('Could not find user')
    }

    const valid = await compare(password, user.password)

    if (!valid) {
      throw new Error('Wrong password')
    }

    // Login success

    // Be sure to se the graphql setting (inside /graphql) request.credentials from 'omit' > 'include' so it would save your cookies
    sendRefreshToken(res, createRefreshToken(user))

    return {
      accessToken: createAccessToken(user),
    }
  }
  @Mutation(() => Boolean)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    const hashedPassword = await hash(password, 12)

    try {
      await User.insert({
        email,
        password: hashedPassword,
      })
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}
