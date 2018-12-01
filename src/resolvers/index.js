const defaultState = [
  { id: 1, name: 'Name One' },
  { id: 2, name: 'Name two' }
]

const resolvers = {
  Query: {
    allUsers: () => {
      return defaultState
    },
    user: (root, { id }) => {
      return defaultState.filter((instance) => {
        return (instance.id = id);
      })[0]
    }
  }
}

export default resolvers
