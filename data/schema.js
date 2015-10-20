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
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLNonNull,
}
from 'graphql';

import {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    fromGlobalId,
    globalIdField,
    mutationWithClientMutationId,
    nodeDefinitions,
}
from 'graphql-relay';

import {
    // Import methods that your schema can use to interact with your database
    Message,
    getViewer,
    getMessage,
    getMessages,
}
from './database';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */

var {
    nodeInterface, nodeField
} = nodeDefinitions(
    (globalId) => {
        var {
            type, id
        } = fromGlobalId(globalId);
        if (type === 'Message') {
            return getMessage(id);
        } else {
            return null;
        }
    }, (obj) => {
        if (obj instanceof Message) {
            return messageType;
        } else {
            return null;
        }
    }
);

/**
 * Define messageType and fields available for this object
 */

var messageType = new GraphQLObjectType({
    name: 'Message',
    description: 'A treasure search game',
    fields: () => ({
        id: globalIdField('Message'),
        content: {
            type: GraphQLString,
            description: "Content of the message",
            resolve: (message) => message.content

        },
        timestamp: {
            type: GraphQLInt,
            description: "Timestamp when message was created",
            resolve: (message) => message.timestamp
        },
    }),
    interfaces: [nodeInterface],
});


var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        node: nodeField,
        // Add your own root fields here
        viewer: {
            type: messageType,
            resolve: () => getViewer()
        }
    })
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
var UpdateMessagesMutation = mutationWithClientMutationId({
    name: "UpdateMessages",
    inputFields: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
    },
    outputFields: {
        message: {
            type: messageType,
            resolve: () => getMessage(),
        }
    },
    mutateAndGetPayload: ({id}) => {
        var localID = fromGlobalId(id).id;
        return {
            localID
            }
        }
});

var mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        updateMessages: UpdateMessagesMutation
    })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export
var Schema = new GraphQLSchema({
    query: queryType,
    // Uncomment the following after adding some mutation fields:
     mutation: mutationType
});
