import 'reflect-metadata'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import User from '../entity/User'

@Resolver()
class UserResolver {
  @Mutation(() => Boolean)
  async createUser (
    @Arg('name') name: string,
    @Arg('mail') mail: string,
    @Arg('password') password: string
  ) {
    await User.insert({ name, mail, password })
    return true
  }

  @Query(() => [User])
  getUser () {
    return User.find()
  }
}

export default UserResolver
