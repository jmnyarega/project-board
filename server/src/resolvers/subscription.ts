import { subscribe } from "diagnostics_channel";
import { pubsub } from "../pubsub";

export const subscription = {
  moveCards: {
    subscribe: () => pubsub.asyncIterator(["CARDS_MOVED"]),
  },
  createCard: {
    subscribe: () => pubsub.asyncIterator(["CARD_CREATED"])
  }
};