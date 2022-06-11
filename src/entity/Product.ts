import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import Category from './Category'
import User from './User'

@ObjectType()
@Entity()
class Product extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
    id!: number

  @Field({ nullable: false })
  @Column({ nullable: false })
    name!: string

  @Field({ defaultValue: true })
  @Column({ default: true })
    state!: boolean

  // Qué usuario creó el producto
  @OneToOne(() => User)
  @Field()
  @JoinColumn()
    user!: User

  @Field({ nullable: false })
  @Column({ nullable: false, type: 'float' })
    price!: number

  @OneToMany(() => Category, 'category')
  @Field()
  @JoinColumn()
    category!: Category
}

export default Product
