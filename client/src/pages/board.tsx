import { useEffect, useState } from 'react';
import { useQuery, gql } from "@apollo/client"
import { useParams } from 'react-router';

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

  const { data } = useQuery(BOARD, {
    variables: { id }
  });

  useEffect(() => {
    if (data) {
      setBoard(data.board);
    }
  }, [data])

  return (
    <div className="boards">
      <h1>{board?.title}</h1>
      <ul>
        {board?.Column?.map(column =>
          <li key={column.id}>
            <h2>{column.name}</h2>
            <ul>
              {column.Card.map(card =>
                <li key={card.id}>
                  <h3>{card.name}</h3>
                  <div>{card.content}</div>
                </li>
              )}
            </ul>
          </li>
        )}
      </ul>
    </div>
  );
}

export default BoardPage
