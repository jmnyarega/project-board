import { useEffect, useState } from 'react';
import { useQuery, gql } from "@apollo/client"
import { Link } from 'react-router';

const BOARDS = gql`
{
  boards {
    id
    title
    Column {
      position
      name
      Card {
        name
        position
        content
      }
    }
  }
}
`;

type User = {
    name: string;
}

type Card = {
    name: string;
    content: string;
    position: number;
}
type Column = {
    name: string;
    position: number;
    cards: [Card]
}
type Board = {
    id: string
    title: string;
    user: User;
    columns: [Column];
}

const Home = () => {
    const [boards, setBoards] = useState<Board[]>([])
    const { data } = useQuery(BOARDS);
    console.log(data);

    useEffect(() => {
        if (data) {
            setBoards(data.boards);
        }
    }, [data]);

    return (
        <div className="boards">
            {
                boards.map((board) =>
                    <Link to={`/board/${board.id}`} key={board.title} >
                        {board.title}
                    </Link>
                )
            }
        </div >
    );
}


export default Home;