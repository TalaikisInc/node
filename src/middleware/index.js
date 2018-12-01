import express from 'express'
import cors from 'cors'
import { json } from 'body-parser'
import StatsD from 'node-statsd'
import helmet from 'helmet'
import errorhandler from 'errorhandler'
import compression from 'compression'
import { ApolloServer } from 'apollo-server-express'

import typeDefs from '../typedefs'
import resolvers from '../resolvers'
const stats = new StatsD()
const app = express()
const graphql = new ApolloServer({ typeDefs, resolvers, playground: true })
const path = '/graphql'
graphql.applyMiddleware({ app, path })

stats.socket.on('error', (error) => {
  console.error(error.stack)
})

app.use(errorhandler())

app.use(compression())

app.use(json())

app.use(cors({
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false,
  'optionsSuccessStatus': 204
}))

app.use(helmet())

export default app
