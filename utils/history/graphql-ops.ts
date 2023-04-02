import { Amplify } from 'aws-amplify';


export function initAppsync() {
  const awsconfig = {
    "aws_project_region": "ap-southeast-1",
    "aws_appsync_graphqlEndpoint": process.env.HISTORY_API,
    "aws_appsync_region": "ap-southeast-1",
    "aws_appsync_authenticationType": "API_KEY",
    "aws_appsync_apiKey": process.env.API_KEY
  };
  
  Amplify.configure(awsconfig);  
}


export const createGptInteraction = /* GraphQL */ `
  mutation CreateGptInteraction($input: GptInteraction!) {
    createGptInteraction(input: $input) {
      userId
      messageId
      listMessage {
        content
        role
      }
    }
  }
`;


export const getGptInteraction = /* GraphQL */ `
  query GetGptInteraction($userId: String, $messageId: String) {
    getGptInteraction(userId: $userId, messageId: $messageId) {
      items {
        userId
        messageId
        submitAt
        listMessage {
          content
          role
        }
      }
    }
  }
`;
