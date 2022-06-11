import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import AppDataSource from '../database/typeorm'

import CategoryResolver from '../resolvers/categoryResolver'
import PingResolver from '../resolvers/ping'
import ProductResolver from '../resolvers/productResolver'
import UserResolver from '../resolvers/userResolver'
import { buildSchema } from 'type-graphql'

import cors from 'cors'
import express from 'express'
import http from 'http'

export default class Server {
  constructor (
    private readonly app = express(),
    private readonly port = process.env.PORT!,
    private readonly paths = {},

    private readonly httpServer = http.createServer(app)
  ) {
    this.middlewares()

    this.connectDB()
  }

  middlewares (): void {
    // CORS
    this.app.use(cors())

    // Lectura y parseo del body
    this.app.use(express.json())

    // Directorio público a servir
    this.app.use(express.static('src/public'))
  }

  async connectDB (): Promise<void> {
    await AppDataSource.initialize()
      .then(() => {
        console.log('AWS Database is online!')
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err)
      })
  }

  async startApolloServer (): Promise<void> {
    const schema = await buildSchema({
      resolvers: [
        PingResolver,
        UserResolver,
        CategoryResolver,
        ProductResolver
      ]
    })

    const apolloServer = new ApolloServer({
      schema,
      csrfPrevention: true,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer })]
    })
    await apolloServer.start()

    apolloServer.applyMiddleware({
      app: this.app,
      path: '/'
    })

    await new Promise<void>(resolve => this.httpServer.listen({ port: 4000 }, resolve))
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT!}${apolloServer.graphqlPath}`)
  }
}
