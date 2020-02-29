class MessageChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'MessageChannel'

    messages = Message.order(id: :desc).limit(10).map do |message|
      { id: message.id, author: message.author, body: message.body }
    end
    ActionCable.server.broadcast 'MessageChannel', { event: 'initialize', messages: messages }
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
