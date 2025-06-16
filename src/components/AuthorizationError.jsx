import { Link } from "react-router-dom"
import { CloseButton } from "./CloseButton"

export const AuthorizationError = ({ errMessage, onClose }) => {


  return (
    <div className="flex flex-col bg-white border rounded-1 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 p-4 text-center shadow-2xl">
      <CloseButton onClick={onClose} />
      <p>{errMessage}</p>
      <button className="bg-black mt-4 py-1 px-2 rounded-xl">
        <Link
          className="text-white"
          to="/login">Go to Login</Link>
      </button>
    </div>
  )
}

