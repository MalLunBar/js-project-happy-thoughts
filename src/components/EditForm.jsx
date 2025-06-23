import { useEffect, useState } from "react";



export const EditForm = ({ onCancel, messageId, onEdit, initialMessage }) => {
  const [message, setMessage] = useState(initialMessage || "")

  const url = "https://js-project-api-mk0z.onrender.com/thoughts"

  // Local API
  // const url = "http://localhost:8080/thoughts"


  const handleSubmit = (e) => {
    e.preventDefault()
    onEdit(messageId, message)

  }

  return (
    <form
      className="w-full h-full absolute right-0 top-0 z-10 flex flex-col justify-between gap-2 bg-gray-100 p-2"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between items-center">
        <label htmlFor="edit-thought">Edit your text</label>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 p-1"
          aria-label="Close edit form"
        >
          <img
            className="w-4 h-4"
            src="assets/close.png"
            alt=""
          />
        </button>
      </div>

      <label
        className="sr-only"
        htmlFor="edit-thought"
        visibility="hidden">Edit your message</label>
      <textarea
        id="edit-thought"
        name="edit-thought"
        className="bg-white border-2 border-gray-300 focus:outline-red-200 p-2"
        rows="2"
        cols="18"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        autoFocus
      ></textarea>

      <div className="flex gap-2 items-center justify-end">
        <button
          type="submit"
          className="text-sm bg-red-400 text-white px-4 py-2 rounded-2xl hover:bg-red-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}
