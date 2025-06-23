
export const SubmitButton = ({ className }) => {
  return (
    <button
      type="submit"
      className={`w-max text-sm bg-red-300 px-4 py-3 rounded-4xl font-medium hover:bg-red-400 shadow ${className}`}
    >
      ❤️Send Happy Thought❤️
    </button>
  )
}

