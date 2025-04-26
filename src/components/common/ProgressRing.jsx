import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// A circular progress indicator component
const ProgressRing = ({ 
  percentage = 0, 
  size = 180, 
  strokeWidth = 12, 
  color = 'success',
  showText = true,
  className = ''
}) => {
  const [colorClass, setColorClass] = useState('text-success-400')
  
  useEffect(() => {
    if (percentage >= 80) {
      setColorClass('text-success-400')
    } else if (percentage >= 50) {
      setColorClass('text-warning-400')
    } else {
      setColorClass('text-danger-400')
    }
    
    if (color === 'primary') {
      setColorClass('text-primary-400')
    }
  }, [percentage, color])
  
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const dash = (percentage * circumference) / 100
  const dashOffset = circumference - dash
  
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={`transform -rotate-90 ${colorClass}`}
        style={{ "--dash-offset": dashOffset }}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeOpacity={0.1}
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      
      {showText && (
        <motion.div 
          className="absolute flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <span className={`text-3xl font-bold ${colorClass}`}>{percentage}%</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">Compliance</span>
        </motion.div>
      )}
    </div>
  )
}

export default ProgressRing