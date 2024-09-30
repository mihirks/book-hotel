// kafkaClient.js
import { Kafka } from 'kafkajs';
import { NextResponse } from 'next/server';
import type { NextApiRequest, NextApiResponse } from 'next'
// Create a new Kafka instance
const kafka = new Kafka({
  clientId: 'my-nextjs-app',
  brokers: ['localhost:9092'], // Update with your Kafka broker address
});


 const producer = kafka.producer();

export default async function handler (req:NextApiRequest,res:NextApiResponse) {
  if (req.method === 'POST') {
    // Process a POST request
    const {user,msgData} =req.body
    try {
      await producer.connect();
      const timestamp = new Date().toISOString();
      await producer.send({
          topic: 'my-topic', // Specify your topic name
          messages: [{ value: JSON.stringify({user : `${user}`, event:`${msgData}`,timestamp:`${timestamp}`}) ,key: 'loc-update'}],
        });
      // console.log('Kafka connected');
      await producer.disconnect();
  
      // res.json({ message: 'Hello from Producer' })
    } catch (error) {
      // console.error('Error connecting to Kafka:', error);
    }
  } else {
    // Handle any other HTTP method
    // res.status(500).json({ error: 'failed to load data' })
  }

};
