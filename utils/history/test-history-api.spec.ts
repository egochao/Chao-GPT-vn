import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { test, expect } from 'vitest';
import { createGptInteraction, getGptInteraction, initAppsync } from './graphql-ops';
import { SaveHistoryAPI } from '.';
import { Message } from '@/types/chat';

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

initAppsync()  

const listMessages: Message[] = [
  { role: "assistant", content: "Hello! How can I assist you today with learning English?" },
  { role: "user", content: "I want to learn how to speak english." },
  { role: "assistant", content: "I can help you with that. What is your name?" },
  { role: "user", content: "My name is John." },
];

test('Create new hoigpt row in dynamodb', async () => {
  const epoch_time_now = Date.now()
  const res = await (API.graphql(graphqlOperation(createGptInteraction,
    {
      input: {
        userId: "FE God",
        listMessage: listMessages,
        messageId: epoch_time_now.toString(),
      }
    }
  )) as Promise<GraphQLResult<any>>);
  expect(res.data.createGptInteraction.userId).toBe("FE God");
});



test('Get all God user hoigpt chat', async () => {
  const res = await (API.graphql(graphqlOperation(getGptInteraction,
    { userId: "FE God" }
  )) as Promise<GraphQLResult<any>>);
  expect(res.data.getGptInteraction.items).toBeInstanceOf(Array);
});


test('Save history to dynamodb', async () => {
  const res = await SaveHistoryAPI(
    "FE God", 
    listMessages);
  expect(res.userId).toBe("FE God");
  expect(res.listMessage.length).toBe(2);
});
