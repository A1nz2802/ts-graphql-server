import 'reflect-metadata'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import Product from '../entity/Product'

@Resolver()
class ProductResolver {
  @Mutation(() => Boolean)
  async createProduct (
    @Arg('name') name: string,
    @Arg('price') price: number
  ) {
    await Product.insert({ name, price })
    return true
  }

  @Query(() => [Product])
  getProduct () {
    return Product.find()
  }
}

export default ProductResolver
