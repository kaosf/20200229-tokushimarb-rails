class Message < ApplicationRecord
  after_commit -> do
    ActionCable.server.broadcast 'MessageChannel', { event: 'create', id: id, author: author, body: body }
  end, on: [:create]

  after_commit -> do
    ActionCable.server.broadcast 'MessageChannel', { event: 'delete', id: id }
  end, on: [:destroy]
end
