import 'reflect-metadata'
import { Query, Resolver } from 'type-graphql'

@Resolver()
class HelloResolver {
  @Query(() => String, { nullable: true, description: 'First query :3' })
  async hello () {
    return 'Hello World!'
  }
}

export default HelloResolver
