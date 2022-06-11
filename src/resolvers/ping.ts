import 'reflect-metadata'
import { Query, Resolver } from 'type-graphql'

@Resolver()
class PingResolver {
  @Query(() => String, { nullable: true, description: 'PingQuery' })
  async ping () {
    return 'Pong!'
  }
}

export default PingResolver
