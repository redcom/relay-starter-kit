/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
    /* Import methods that your schema can use to interact with your database */

    MessageList,
    Message,

    getMessageList,
    getViewer,
    getMessage,
    getMessages,

    addMessage

} from './database';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'MessageList') {
      return getMessageList(id);
    } else if (type === 'Message') {
      return getMessage(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof MessageList) {
      return messageListType;
    } else if (obj instanceof Message)  {
      return messageType;
    } else {
      return null;
    }
  }
);

/**
 * Define your own types here
 */

var messageListType = new GraphQLObjectType({
  name: 'MessageList',
  description: 'A list which contains messages',
  fields: () => ({
    id: globalIdField('Message'),
    messages: {
      type: messageConnection,
      description: 'A collection of messages',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getMessages(), args),
    },
  }),
  interfaces: [nodeInterface],
});

var messageType = new GraphQLObjectType({
  name: 'Message',
  description: 'A singe message',
  fields: () => ({
    id: globalIdField('Message'),
    content: {
        type: GraphQLString,
        description: 'The content of the message',
    },
    timestamp: {
        type: GraphQLInt,
        description: 'The timestamp of the message',
    },
  }),
  interfaces: [nodeInterface],
});

/**
* Define your own connection types here
* A MessageList has many messages
 */
var {connectionType: messageConnection} =
  connectionDefinitions({name: 'Message', nodeType: messageType});

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    // Add your own root fields here
    viewer: {
      type: messageListType,
      resolve: () => getViewer()
    }
  })
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */

var AddMessageMutation = mutationWithClientMutationId({
    name: 'AddMessage',
    inputFields: {
        content: { type: new GraphQLNonNull(GraphQLString) },
        timestamp: { type: GraphQLInt }
    },
    outputFields: {
        message: {
            type: messageType,
            resolve: ({localMutationId}) => getMessage(localMutationId)
        }
    },
    mutateAndGetPayload: ({content}) => {
        var localMutationId = addMessage(content);
        return {localMutationId};
    }
});



var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addMessage: AddMessageMutation
    // Add your own mutations here
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export var Schema = new GraphQLSchema({
  query: queryType,
   mutation: mutationType
});
