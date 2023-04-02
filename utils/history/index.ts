import { Message } from '@/types/chat';
import { API, graphqlOperation } from 'aws-amplify';
import { createGptInteraction } from './graphql-ops';
import { GraphQLResult } from '@aws-amplify/api-graphql';

export const SaveHistoryAPI = async (
  userId: string,
  messages: Message[],
) => {
  // extract 2 last messages
  const lastTwoMessages = messages.slice(-2);
  const epoch_time_now = Date.now()
  const res = await (API.graphql(graphqlOperation(createGptInteraction,
    {
      input: {
        userId: userId,
        listMessage: lastTwoMessages,
        messageId: epoch_time_now.toString(),
      }
    }
  )) as Promise<GraphQLResult<any>>);

  return res.data.createGptInteraction;
};
