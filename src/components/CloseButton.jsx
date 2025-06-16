import { useNavigate } from "react-router-dom"

export const CloseButton = ({ onClick }) => {
  const navigate = useNavigate()

    const handleClick = () => {
    if (onClick) {
      onClick() // Use passed function if provided
    } else {
      navigate("/") // Default to navigate home
    }
  }

  return (
    <button
      type="button"
      className="p-1 max-w-6 max-h-6 self-end"
      onClick={handleClick}
      aria-label="Go back to all thoughts">
      <img
        className="w-4 h-4"
        src="assets/close.png"
        alt=""
      />
    </button>
  )
}