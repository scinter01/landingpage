import type React from "react"
import { motion } from "framer-motion"
import Logo from "./logo"

const AnimatedLogo: React.FC = () => {
  return (
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 360, 0],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      }}
    >
      <Logo />
    </motion.div>
  )
}

export default AnimatedLogo