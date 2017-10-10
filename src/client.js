var { ApolloClient, createNetworkInterface } = require('apollo-client')
var { apiUrl } = require('./config')

const networkInterface = createNetworkInterface({ uri: apiUrl })

module.exports = new ApolloClient({ networkInterface })
