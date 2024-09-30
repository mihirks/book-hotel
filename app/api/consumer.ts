// kafkaClient.js
import { Kafka } from 'kafkajs';
import { NextResponse } from 'next/server';
import type { NextApiRequest, NextApiResponse } from 'next'
// Create a new Kafka instance
const kafka = new Kafka({
  clientId: 'my-nextjs-app',
  brokers: ['localhost:9092'], // Update with your Kafka broker address
});


 const consumer = kafka.consumer({groupId:'myreq'});

 export default async function handler (req:NextApiRequest,res:NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await consumer.connect();
      await consumer.subscribe({topic:'my-topic',fromBeginning:true})
      // console.log('Kafka connected');
      await consumer.run({
          eachMessage: async ({ topic, partition, message }) => {
            console.log(`${topic} : ${message.value?.toString()}`);
          },
        });
        // await consumer.disconnect();
        // res.json({ message: 'Hello from Consumer' })
    } catch (error) {
      console.error('Error connecting to Kafka:', error);
    }
  }
  else{
    // res.status(500).json({ error: 'failed to load data' })
  }

};
