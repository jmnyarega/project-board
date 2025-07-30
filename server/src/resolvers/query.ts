const user = {
  name: "josiah"
}
const cards = [
  {
    name: "one",
    content: "This is a content",
    position: 0,
  },
  {
    name: "two",
    content: "This is a content",
    position: 1,
  },
  {
    name: "two",
    content: "This is a content",
    position: 2,
  }
]

const columns = [
  {
    name: "one",
    position: 0,
    cards: [
      cards[1],
      cards[2]
    ]
  },
  {
    name: "two",
    position: 1,
    cards: [
      cards[0],
    ]
  }
]

const boards = [
  {
    title: 'The Awakening',
    user,
    columns: [
      columns[0]
    ]
  },
  {
    title: 'City of Glass',
    user,
    columns: [
      columns[1]
    ]
  },
];

const query = {
  board: () => boards,
  column: () => columns,
  card: () => cards,
};
export default query;