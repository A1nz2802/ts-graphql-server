import 'reflect-metadata'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import Category from '../entity/Category'

@Resolver()
class CategoryResolver {
  @Mutation(() => Boolean)
  async createCategory (
    @Arg('name') name: string
  ) {
    await Category.insert({ name })
    return true
  }

  @Query(() => [Category])
  getCategory () {
    return Category.find()
  }
}

export default CategoryResolver
