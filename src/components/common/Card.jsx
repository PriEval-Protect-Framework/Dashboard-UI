import { motion } from 'framer-motion'

const Card = ({ 
  title, 
  icon, 
  children, 
  delay = 0, 
  className = '',
  animationType = 'fadeInUp',
}) => {
  const animations = {
    fadeInUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 }
    }
  }
  
  const selectedAnimation = animations[animationType] || animations.fadeInUp
  
  return (
    <motion.div
      className={`card h-full ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={selectedAnimation}
      transition={{ duration: 0.5, delay }}
    >
      {(title || icon) && (
        <div className="flex items-center mb-4">
          {icon && <div className="text-primary-400 mr-2">{icon}</div>}
          {title && <h3 className="text-xl font-semibold">{title}</h3>}
        </div>
      )}
      
      {children}
    </motion.div>
  )
}

export default Card