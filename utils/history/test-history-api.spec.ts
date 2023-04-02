import { API, Amplify, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { test, expect } from 'vitest';
import { createGptInteraction, getGptInteraction, initAppsync } from './graphql-ops';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const awsconfig = {
  "aws_project_region": "ap-southeast-1",
  "aws_appsync_graphqlEndpoint": process.env.HISTORY_API,
  "aws_appsync_region": "ap-southeast-1",
  "aws_appsync_authenticationType": "API_KEY",
  "aws_appsync_apiKey": process.env.API_KEY
};

Amplify.configure(awsconfig);  

const listMessages = [
  { role: "system", content: "You are a helpful assistant, trying to teach a beginner about english speaking." },
  { role: "assistant", content: "Hello! How can I assist you today with learning English?" },
  { role: "user", content: "I want to learn how to speak english." },
];

test('Create new hoigpt row in dynamodb', async () => {
  const epoch_time_now = Date.now()
  const res = await (API.graphql(graphqlOperation(createGptInteraction,
    {
      input: {
        userId: "God",
        listMessage: listMessages,
        messageId: epoch_time_now.toString(),
      }
    }
  )) as Promise<GraphQLResult<any>>);
  expect(res.data.createGptInteraction.userId).toBe("God");
});



test('Get all God user hoigpt chat', async () => {
  const res = await (API.graphql(graphqlOperation(getGptInteraction,
    { userId: "God" }
  )) as Promise<GraphQLResult<any>>);
  expect(res.data.getGptInteraction.items).toBeInstanceOf(Array);
});