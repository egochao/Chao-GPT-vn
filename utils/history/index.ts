import { Message } from '@/types/chat';
import { createGptInteraction } from './graphql-ops';


export const SaveHistoryAPI = async (
  userId: string,
  messages: Message[],
) => {
  // extract 2 last messages
  const lastTwoMessages = messages.slice(-2);
  const url = process.env.HISTORY_API as string;
  const apiKey = process.env.API_KEY as string;

  const query = createGptInteraction;

  const variables = {
    input: {
      userId: userId,
      listMessage: lastTwoMessages,
      messageId: Date.now().toString(),
    }
  };

  const res = await FetchAppsync(query, variables, url, apiKey)
  return res;
};


export const FetchAppsync = async (
  query: string,
  variables: any,
  url: string,
  apiKey: string,
) => {

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey
    },
    body: JSON.stringify({
      query: query,
      variables: variables
    })
  });
  return res.json();
}


