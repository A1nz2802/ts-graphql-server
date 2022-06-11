import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import User from './User'

@ObjectType()
@Entity()
class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
    id!: number

  @Field({ nullable: false })
  @Column({ nullable: false })
    name!: string

  @Field({ defaultValue: true })
  @Column({ default: true })
    state!: boolean

  // Qué usuario creó la categoria
  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @Field()
  @JoinColumn()
    user!: User
}

export default Category
