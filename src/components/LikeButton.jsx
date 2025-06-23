import { motion } from "framer-motion"

export const LikeButton = ({ onLike, likes }) => {
  return (
    <motion.button
      type="button"
      onClick={onLike}
      whileTap={{ scale: 0.8 }}
      whileHover={{ scale: 1.2 }}
      className={`rounded-4xl p-3 shadow ${likes > 0 ? "bg-red-300" : "bg-gray-200"}`}
      aria-label="Like thought">
      ❤️
    </motion.button>
  )
}