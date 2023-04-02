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
