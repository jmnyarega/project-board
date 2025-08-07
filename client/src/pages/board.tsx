import { useEffect, useState } from 'react';
import { useQuery, gql, useMutation, useSubscription } from "@apollo/client"
import { useFetcher, useParams } from 'react-router';
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './sortable-item';

const MOVE_CARD_SUBSCRIPTION = gql`
  subscription {
    moveCards {
      __typename
    }
  }
`;


const CREATE_CARD_SUBSCRIPTION = gql`
  subscription {
    createCard {
      __typename
    }
  }
`;

const BOARD = gql(`
query getBoard($id: String) {
  board(id: $id)  {
    id
    title
    Column {
      id
      name
      position
      Card {
        id
        name
        position
        content
      }
    }
  }
}`
);

const CREATE_CARD = gql`
  mutation createCard($name: String, $position: String, $column: String, $content: String) {
    createCard(name: $name, position: $position, column: $column, content: $content) {
      __typename
    }
  }
`;

const MOVE_CARD = gql`
  mutation moveCard($id: String, $position: String) {
    moveCard(id: $id, position: $position) {
      __typename
    }
  }
`;


type User = {
  name: string;
}

type Card = {
  id: string;
  name: string;
  content: string;
  position: number;
}
type Column = {
  id: string;
  name: string;
  position: number;
  Card: [Card]
}
type Board = {
  id: String;
  title: string;
  user: User;
  Column: [Column];
}
  ;

const BoardPage = () => {
  const { id } = useParams();
  const [board, setBoard] = useState<Board>()

  const { data: boards, refetch: fetchBoards } = useQuery(BOARD, {
    variables: { id }
  });
  const [moveCard, { data: cards }] = useMutation(MOVE_CARD);

  const [addCard, { data: newCard }] = useMutation(CREATE_CARD);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useSubscription(MOVE_CARD_SUBSCRIPTION, {
    onSubscriptionData(options) {
      console.log("Listening", options)
    },
    onSubscriptionComplete() {
      console.log("Complete")
    }
  });

  useSubscription(CREATE_CARD_SUBSCRIPTION, {
    onSubscriptionData(options) {
      console.log("Listening", options)
    },
    onSubscriptionComplete() {
      console.log("Complete")
    }
  });

  useEffect(() => { boards && setBoard(boards.board) }, [boards])
  useEffect(() => { cards && fetchBoards() }, [cards])
  useEffect(() => { fetchBoards() }, [])

  return (
    <div className="boards">
      <h1>{board?.title}</h1>
      <ul className='board'>
        {board?.Column?.map(column =>
          <li key={column.id}>
            <h2>{column.name}</h2>
            <ul className='columns'>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={column.Card}
                  strategy={verticalListSortingStrategy}
                >
                  {[...column.Card].sort((a, b) => {
                    if (a.position < b.position) {
                      return -1;
                    } else {
                      return 0;
                    }
                  }).map(card =>
                    <SortableItem key={card.id} id={`${column.id}:${card.id}`}>
                      <li className='cards'>
                        <h3>{card.name}</h3>
                        <div>{card.content}</div>
                      </li>
                    </SortableItem>
                  )}
                </SortableContext>
              </DndContext>
              <button onClick={() => addCard({
                variables: {
                  name: "Dis is two...s",
                  position: "10",
                  column: column.id,
                  content: "This content test"
                }
              })}>Add Card</button>
            </ul>
          </li>
        )}
      </ul>
    </div >
  );


  function handleDragEnd(event: DragEndEvent) {
    if (event.over) {
      const [activeColumn, activeCard] = event.active.id.toString().split(":");
      const [overColumn, overCard] = event.over.id.toString().split(":");

      if (event.active.id !== event.over.id) {
        setBoard((board) => {
          const currentColumn = board?.Column.findIndex(column => column.id === activeColumn);
          const prevColumn = board?.Column.findIndex(column => column.id === overColumn);

          if (prevColumn === currentColumn) {
            if (prevColumn !== undefined && currentColumn !== undefined) {
              const cCard = board?.Column[prevColumn].Card.find(card => card.id === activeCard);
              const oCard = board?.Column[currentColumn].Card.find(card => card.id === overCard);
              moveCard({
                variables: {
                  id: `${oCard?.id}:${cCard?.id}`,
                  position: `${oCard?.position}:${cCard?.position}`
                },
              });
            }
          }
          return board;
        });
      }
    }
  }
}

export default BoardPage
