import { motion } from 'framer-motion'
import { 
  FaExclamationTriangle, 
  FaLock, 
  FaUserShield, 
  FaServer, 
  FaSyncAlt 
} from 'react-icons/fa'
import Card from '../common/Card'

const FeedbackItem = ({ icon, text, index }) => {
  return (
    <motion.div 
      className="flex items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + (index * 0.1) }}
    >
      <div className="flex-shrink-0 mr-3">{icon}</div>
      <p className="text-sm text-gray-700 dark:text-gray-300">{text}</p>
    </motion.div>
  )
}

const ActionableFeedback = ({ feedbackItems = [] }) => {
  // Randomly return one of the icons
  const getIcon = () => {
    const random = Math.random()
    if (random < 0.25) {
      return <FaExclamationTriangle className="mt-0.5 text-danger-400" />
    } else if (random < 0.5) {
      return <FaLock className="mt-0.5 text-primary-400" />
    } else if (random < 0.75) {
      return <FaUserShield className="mt-0.5 text-success-400" />
    } else {
      return <FaServer className="mt-0.5 text-warning-400" />
    }
  }

  return (
    <Card title="Actionable Feedback" animationType="fadeInUp" delay={0.5}>
      <div className="space-y-3">
        {feedbackItems.length > 0 ? (
          feedbackItems.map((item, index) => (
            <FeedbackItem 
              key={`feedback-${index}`} 
              icon={getIcon()} 
              text={item}
              index={index}
            />
          ))
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No specific feedback available at this time.
          </p>
        )}
        
        <motion.div 
          className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button className="w-full btn btn-primary flex items-center justify-center">
            <FaSyncAlt className="mr-2" />
            Re-analyze with anonymized dataset
          </button>
        </motion.div>
      </div>
    </Card>
  )
}

export default ActionableFeedback
