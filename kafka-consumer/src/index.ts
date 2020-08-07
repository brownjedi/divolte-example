// tslint:disable: no-console
import 'reflect-metadata'

// import env
import dotEnvExpand from 'dotenv-expand'
import dotEnv from 'dotenv'
dotEnvExpand(dotEnv.config())

// configure kafka js compression
import { Kafka, CompressionTypes, CompressionCodecs } from 'kafkajs'
import LZ4Codec from 'kafkajs-lz4'
CompressionCodecs[CompressionTypes.LZ4] = new LZ4Codec().codec

// import avro parser
import { Type } from 'avsc'
import fs from 'fs'

// import config
import config from './utils/config'

const data = fs.readFileSync(config.avscSchemaFilePath, { encoding: 'utf-8' })
const schema = JSON.parse(data)
const type = Type.forSchema(schema)

const kafka = new Kafka({
  clientId: `${config.kafka.topic}-consumer`,
  brokers: config.kafka.brokers,
  ssl: config.kafka.ssl,
  sasl: {
    mechanism: config.kafka.mechanism,
    username: config.kafka.username,
    password: config.kafka.password,
  },
})

const consumer = kafka.consumer({ groupId: `${config.kafka.topic}-group` })

const run = async () => {
  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: config.kafka.topic })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: type.fromBuffer(message.value),
      })
    },
  })
}

run().catch(console.error)
