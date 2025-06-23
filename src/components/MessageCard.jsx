import { formatDistanceToNow } from "date-fns"
import { LikeButton } from "./LikeButton"
import { EditForm } from "./EditForm"
import { useState } from "react"

export const MessageCard = ({ message, onLike, onDelete, onEdit, userId }) => {

  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  return (
    <div className="relative flex flex-col gap-5 bg-white p-5 border rounded-xs shadow-[10px_10px] shadow-black h-max break-words">
      {isEditing && (
        <EditForm
          onCancel={() => setIsEditing(false)}
          messageId={message._id}
          initialMessage={message.message}
          onEdit={(id, newMessage) => {
            onEdit(id, newMessage)
            setIsEditing(false)
          }}

        />
      )}

      <div className="flex justify-between">
        <p className="max-w-60">{message.message}</p>
        <div className="flex gap-3">
          {message.user === userId && (
            <>
              <button
                className="p-2 bg-blue-100 rounded-xl w-max h-max"
                type="button"
                onClick={handleEditClick}
                aria-label="Edit message"
              >
                <img
                  className="max-w-5 max-h-5"
                  src="assets/edit.png"
                  alt=""
                />
              </button>
              <button
                className="p-2 bg-blue-100 rounded-xl w-max h-max"
                type="button"
                onClick={onDelete}
                aria-label="Delete message">
                <img
                  className="w-5 h-5"
                  src="assets/set.png"
                  alt="" />
              </button>
            </>
          )}

        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2" >

          <LikeButton
            onLike={onLike}
            likes={message.hearts}
          />
          <p className="text-slate-500 text-sm">x {message.hearts}</p>
        </div>

        <p className="text-slate-500 text-sm max-w-1/2 text-right" >{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</p>
      </div>
    </div>
  )
}