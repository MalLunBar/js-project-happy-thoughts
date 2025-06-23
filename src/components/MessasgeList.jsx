import { MessageCard } from "./MessageCard"

export const MessageList = ({ messages, onLike, onDelete, onEdit, userId }) => {

  return (
    <div className="flex flex-col gap-4 mt-8">

      {messages.map(msg => (

        <MessageCard
          key={msg._id}
          message={msg}
          onLike={() => onLike(msg._id)}
          onDelete={() => onDelete(msg._id)}
          onEdit={(id, message) => onEdit(id, message)}
          userId={userId} />
      ))}
    </div>
  )
}