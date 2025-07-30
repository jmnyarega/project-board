import {pubsub} from "../pubsub";

const mutation = {
  updateBoard: async (_, cardId: number) => {
    console.log("card updated");
    pubsub.publish(`CARD-MOVED-ON-BOARD-${cardId}`, {
      cardUpdated: {board: ""},
    })
  }
}

export default mutation;
