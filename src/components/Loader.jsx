import { motion } from "framer-motion"

const containerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export const heartVariants = {
  initial: { y: "0%" },
  animate: { y: "-20%" },
}

export const heartTransition = {
  duration: 0.4,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut",
}
const dotVariants = {
  initial: { y: "0%" },
  animate: { y: "100%" },
}

const dotTransition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut",
}

export const Loader = () => {
  return (

    <div className="w-full flex items-center justify-center pt-10">
      <p className="font-thin text-2xl">Loading</p>
      <motion.div
        className="w-30 h-20 flex justify-around"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.span
          className="w-5 h-5 bg-red-200 rounded-full"
          variants={dotVariants}
          transition={dotTransition}
        />
        <motion.span
          className="w-5 h-5 bg-red-200 rounded-full"
          variants={dotVariants}
          transition={dotTransition}
        />
        <motion.span
          className="w-5 h-5 bg-red-200 rounded-full"
          variants={dotVariants}
          transition={dotTransition}
        />
      </motion.div>
    </div>
  )
}
