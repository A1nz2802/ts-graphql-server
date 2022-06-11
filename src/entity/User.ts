import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'

enum Role {
  ADMIN = 'ADMIN_ROLE',
  USER = 'USER_ROLE'
}

@ObjectType()
@Entity()
class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
    id!: number

  @Field({ nullable: false })
  @Column({ nullable: false })
    name!: string

  @Field({ nullable: false })
  @Column({ nullable: false, unique: true })
    mail!: string

  @Field({ nullable: false })
  @Column({ nullable: false })
    password!: string

  @Field({ nullable: true })
  @Column({ nullable: true })
    img!: string

  @Field({ defaultValue: 'USER_ROLE' })
  @Column({ type: 'enum', enum: Role, default: Role.USER })
    role!: Role

  @Field({ defaultValue: true })
  @Column({ default: true })
    state!: boolean

  @Field({ defaultValue: false })
  @Column({ default: false })
    google!: boolean
}

export default User
