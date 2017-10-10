var client = require('./client')
var gql = require('graphql-tag')
var values = require('lodash/values')

function fetchItems() {
  return client.query({
    query: gql`
      query {
        todos: allTodoes {
          id
          text
          done
        }
      }
    `
  })
  .then(({ data }) => data.todos)
  .catch(error => console.error(error));
}

function addItem(item) {
  return client.mutate({
    mutation: gql`
      mutation ($text: String!) {
        createTodo(text: $text, done: false) { id text done }
      }
    `,
    variables: item
  })
  .then(({ data }) => data.createTodo)
  .catch(error => console.error(error));
}

function deleteItems(items) {
  return client.mutate({
    mutation: gql`
      mutation {
        ${items.map((item, i) => `
          ${item.id}: deleteTodo(id: "${item.id}") {
            id
            text
          }
        `)}
      }
    `
  })
  .then(({ data }) => values(data))
}

function updateItem(item) {
  var params = `id: "${item.id}"`
  // support dynamic params
  if (item.text !== undefined)
    params += `, text: "${item.text}"`
  if (item.done !== undefined)
    params += `, done: ${item.done}`

  return client.mutate({
    mutation: gql`
      mutation {
        updateTodo(${params}) {
          id
          text
          done
        }
      }
    `
  })
  .then(({ data }) => data.updateTodo)
}

module.exports = {
  fetchItems, addItem, deleteItems, updateItem
}
