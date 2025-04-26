import { motion } from 'framer-motion'
import { 
  FaLock, 
  FaUnlock, 
  FaExchangeAlt, 
  FaKey, 
  FaShieldAlt,
  FaExclamationTriangle,
  FaCheckCircle,
} from 'react-icons/fa'
import Card from '../common/Card'

const EncryptionType = ({ type = 'None' }) => {
  const getEncryptionContent = () => {
    switch (type) {
      case 'Asymmetric':
        return {
          icon: <FaKey className="text-4xl text-success-400" />,
          title: 'Asymmetric Encryption',
          tooltip: 'Uses different keys for encryption and decryption, providing high security.',
          color: 'text-success-400',
          bgColor: 'bg-success-100 dark:bg-success-900/20',
          strength: 'Strong',
          recommendation: 'Currently using best practice encryption.',
        }
      case 'Symmetric':
        return {
          icon: <FaLock className="text-4xl text-warning-400" />,
          title: 'Symmetric Encryption',
          tooltip: 'Uses same key for encryption and decryption, potentially less secure but faster.',
          color: 'text-warning-400',
          bgColor: 'bg-warning-100 dark:bg-warning-900/20',
          strength: 'Moderate',
          recommendation: 'Consider upgrading to asymmetric or hybrid encryption.',
        }
      case 'Hybrid':
        return {
          icon: <FaExchangeAlt className="text-4xl text-primary-400" />,
          title: 'Hybrid Encryption',
          tooltip: 'Combines symmetric and asymmetric methods for optimized security and performance.',
          color: 'text-primary-400',
          bgColor: 'bg-primary-100 dark:bg-primary-900/20',
          strength: 'Strong',
          recommendation: 'Currently using best practice encryption.',
        }
      case 'None':
      default:
        return {
          icon: <FaUnlock className="text-4xl text-danger-400" />,
          title: 'No Encryption',
          tooltip: 'Data is not encrypted, presenting significant security risks.',
          color: 'text-danger-400',
          bgColor: 'bg-danger-100 dark:bg-danger-900/20',
          strength: 'None',
          recommendation: 'Implement encryption immediately to protect sensitive data.',
        }
    }
  }
  
  const content = getEncryptionContent()
  
  return (
    <Card title="Encryption Type" animationType="scaleIn" delay={0.1}>
      <div className="flex flex-col items-center">
        <motion.div 
          className={`p-6 rounded-full ${content.bgColor} mb-4`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          {content.icon}
        </motion.div>
        
        <motion.h4 
          className={`text-xl font-semibold ${content.color} mb-2`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {content.title}
        </motion.h4>
        
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center">
            <FaShieldAlt className={`mr-2 ${content.color}`} />
            <span className="font-medium">Strength: {content.strength}</span>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {content.tooltip}
          </p>
          
          <div className="text-sm p-2 rounded bg-gray-50 dark:bg-gray-800 mt-2">
            <div className="flex items-start">
              {type === 'None' || type === 'Symmetric' ? (
                <FaExclamationTriangle className="text-warning-400 mt-0.5 mr-2 flex-shrink-0" />
              ) : (
                <FaCheckCircle className="text-success-400 mt-0.5 mr-2 flex-shrink-0" />
              )}
              <p>{content.recommendation}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default EncryptionType