class MessageChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'MessageChannel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
