import consumer from "./consumer"
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const Message = props => (
  <tr>
    <td>{props.author}</td>
    <td>{props.body}</td>
    <td><a href={`/messages/${props.id}`} data-method="delete" data-remote="true" data-confirm="Are you sure?">Destroy</a></td>
  </tr>
);

Message.propTypes = {
  id: PropTypes.number.isRequired,
  author: PropTypes.string,
  body: PropTypes.string,
};

const Messages = props => {
  const [messages, setMessages] = useState(props.messages);

  consumer.subscriptions.create("MessageChannel", {
    async connected() {
      const res = await fetch('/messages.json');
      const messages = await res.json();
      setMessages(messages);
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      console.log(data);
      switch(data.event) {
        case 'create':
          setMessages([{ key: data.id, id: data.id, author: data.author, body: data.body }].concat(messages));
          break;
        case 'delete':
          setMessages(messages.filter(x => x.id !== data.id));
          break;
        default:
          console.error(`invalid event: ${data.event}`);
      }
    }
  });

  return messages.map(x => <Message key={x.id} id={x.id} author={x.author} body={x.body} />);
};

document.addEventListener('DOMContentLoaded', async () => {
  ReactDOM.render(
    <Messages messages={[]} />,
    document.getElementById('messages'),
  )
})