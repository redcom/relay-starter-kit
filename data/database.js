/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

// Model types
class Message extends Object {}

var viewer = new Message();
viewer.id = '1';
viewer.content = 'Anonymous';
viewer.timestamp = Date.now();

var messages = ['What', 'Who', 'How'].map((content, i) => {
    var message = new Message();
    message.content = content;
    message.timestamp = Date.now();
    message.id = `${i}`;
    return message;
});

module.exports = {
    // Export methods that your schema can use to interact with your database
    getViewer: () => viewer,
    getMessage: (id) => messages.find(m => m.id === id),
    getMessages: () => messages,
    Message,
};
