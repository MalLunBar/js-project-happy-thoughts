import { useState } from "react"
import { SubmitButton } from "./SubmitButton"

export const FormCard = ({ onSubmit, apiError }) => {

  const [message, setMessage] = useState("")
  const [localError, setLocalError] = useState("")
  const [count, setCount] = useState(0)
  const maxChars = 140
  const minChars = 5

  const validateMessage = (text) => {

    if (text.trim().length < minChars) {
      setLocalError(`Message have to be at least ${minChars} character`)
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLocalError("")

    if (!validateMessage(message)) {
      return
    }

    onSubmit(message)
    setMessage("");
    setCount(0);

  }

  const handleInputChange = (e) => {
    const newValue = e.target.value
    setMessage(newValue)
    setCount(newValue.length)

    if (localError) {
      setLocalError("")
    }
  }

  const handleKeyDown = (event) => {

    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleSubmit(event)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 bg-gray-100 p-4 border rounded-xs shadow-[10px_10px] shadow-black">
        <div className="flex items-end gap-5">
          <label
            htmlFor="happy">What's making you happy right now?
          </label>
          <p className={`text-xs ${count === maxChars ? 'text-red-500' : 'text-slate-600'}`}>
            {count}/{maxChars}
          </p>
        </div>

        <textarea
          id="happy"
          className="resize-none bg-white w-full border-2 border-gray-300 focus:outline-red-200"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={message}
          maxLength={maxChars}
          autoFocus="true"
        >
        </textarea>

        <div className="flex flex-col w-full">
          {localError && (<p className="text-red-500 text-xs" >
            {localError}
          </p>)}
          {apiError && <p className="text-red-500">{apiError}</p>}
          <SubmitButton className={localError ? "mt-3" : ""} />
        </div>
      </form>
    </>
  )
}