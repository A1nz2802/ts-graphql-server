import Category from '../entity/Category'
import { DataSource } from 'typeorm'
import Product from '../entity/Product'
import User from '../entity/User'

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.RDS_POSTGRESQL!,
  port: process.env.RDS_PORT!,
  username: process.env.RDS_USERNAME!,
  password: process.env.RDS_PASSWORD!,
  database: process.env.RDS_DATABASE_NAME!,
  synchronize: true,
  logging: true,
  entities: [User, Category, Product]
})

export default AppDataSource
