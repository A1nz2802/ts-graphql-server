import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import HelloResolver from '../resolvers/helloResolver'
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
  }

  middlewares (): void {
    // CORS
    this.app.use(cors())

    // Lectura y parseo del body
    this.app.use(express.json())

    // Directorio público a servir
    this.app.use(express.static('src/public'))
  }

  async startApolloServer (): Promise<void> {
    const schema = await buildSchema({
      resolvers: [HelloResolver]
    })

    const apolloServer = new ApolloServer({
      schema,
      csrfPrevention: true,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer })]
    })
    await apolloServer.start()

    apolloServer.applyMiddleware({
      app: this.app, path: '/'
    })

    await new Promise<void>(resolve => this.httpServer.listen({ port: 4000 }, resolve))
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT!}${apolloServer.graphqlPath}`)
  }
}
