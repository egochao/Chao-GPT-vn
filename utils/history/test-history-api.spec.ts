import { test, expect } from 'vitest';
import { createGptInteraction, getGptInteraction } from './graphql-ops';
import { SaveHistoryAPI, FetchAppsync } from '.';
import { Message } from '@/types/chat';

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });


const listMessages: Message[] = [
  { role: "assistant", content: "Hello! How can I assist you today with learning English?" },
  { role: "user", content: "I want to learn how to speak english." },
  { role: "assistant", content: "I can help you with that. What is your name?" },
  { role: "user", content: "My name is John." },
];
test("Save message to dynamodb with fetch", async () => {
  if (!process.env.HISTORY_API || !process.env.API_KEY) {
    throw new Error("Missing HISTORY_API env");
  }

  const url = process.env.HISTORY_API as string;
  const apiKey = process.env.API_KEY as string;
  const query = createGptInteraction;
  const variables = {
    input: {
      userId: "FE God",
      listMessage: listMessages,
      messageId: Date.now().toString(),
    }
  };

  const resjson = await FetchAppsync(query, variables, url, apiKey)

  expect(resjson.data.createGptInteraction.userId).toBe("FE God");
});

test("Retrieve all messages for FE God from dynamodb with fetch", async () => {
  if (!process.env.HISTORY_API || !process.env.API_KEY) {
    throw new Error("Missing HISTORY_API env");
  }

  const url = process.env.HISTORY_API as string;
  const apiKey = process.env.API_KEY as string;
  const query = getGptInteraction;
  const input = {
    userId: "FE God"
  };

  const resjson = await FetchAppsync(query, input, url, apiKey)

  expect(resjson.data.getGptInteraction.items).toBeInstanceOf(Array);
});

test('Save history to dynamodb', async () => {
  const res = await SaveHistoryAPI(
    "FE God",
    listMessages);
  expect(res.data.createGptInteraction.userId).toBe("FE God");
  expect(res.data.createGptInteraction.listMessage.length).toBe(2);
});
