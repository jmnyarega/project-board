import { pubsub } from "../pubsub";

export const subscription = {
  cardUpdated: {
    subscribe: (_: any, { boardId }: { boardId: string }) => {
      return pubsub.asyncIterator(`CARD-MOVED-ON-BOARD-${boardId}`);
    },
  },
};