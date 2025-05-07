import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaLock, FaUnlock, FaExchangeAlt, FaKey, FaServer, FaNetworkWired, FaProjectDiagram } from 'react-icons/fa'
// Import directly from the context - make sure path is correct
import { useData } from '../../context/DataContext'

const PrivacySettings = () => {
  const { setEncryptionType, setDistributionType, encryptionType, distributionType } = useData()
  
  // Set default values on component mount if not already set
  useEffect(() => {
    if (!encryptionType) {
      setEncryptionType('Asymmetric')
    }
    
    if (!distributionType) {
      setDistributionType('Centralized')
    }
  }, [encryptionType, distributionType, setEncryptionType, setDistributionType])
  
  // Define encryption options matching your existing EncryptionType component
  const encryptionOptions = [
    { 
      id: 'Asymmetric', 
      icon: <FaKey className="text-4xl text-success-400" />,
      label: 'Asymmetric Encryption', 
      description: 'Uses different keys for encryption and decryption, providing high security.',
      strength: 'Strong',
      color: 'text-success-400',
      bgColor: 'bg-success-100 dark:bg-success-900/20'
    },
    { 
      id: 'Symmetric', 
      icon: <FaLock className="text-4xl text-warning-400" />,
      label: 'Symmetric Encryption', 
      description: 'Uses same key for encryption and decryption, potentially less secure but faster.',
      strength: 'Moderate',
      color: 'text-warning-400',
      bgColor: 'bg-warning-100 dark:bg-warning-900/20'
    },
    { 
      id: 'Hybrid', 
      icon: <FaExchangeAlt className="text-4xl text-primary-400" />,
      label: 'Hybrid Encryption', 
      description: 'Combines symmetric and asymmetric methods for optimized security and performance.',
      strength: 'Strong',
      color: 'text-primary-400',
      bgColor: 'bg-primary-100 dark:bg-primary-900/20'
    },
    { 
      id: 'None', 
      icon: <FaUnlock className="text-4xl text-danger-400" />,
      label: 'No Encryption', 
      description: 'Data is not encrypted, presenting significant security risks.',
      strength: 'None',
      color: 'text-danger-400',
      bgColor: 'bg-danger-100 dark:bg-danger-900/20'
    }
  ]

  // Define distribution options matching your existing DataDistribution component
  const distributionOptions = [
    { 
      id: 'Centralized', 
      icon: <FaServer className="text-4xl text-warning-400" />,
      label: 'Centralized Storage', 
      description: 'All data is stored in a single central repository.',
      color: 'text-warning-400',
      bgColor: 'bg-warning-100 dark:bg-warning-900/20'
    },
    { 
      id: 'Federated', 
      icon: <FaProjectDiagram className="text-4xl text-primary-400" />,
      label: 'Federated Distribution', 
      description: 'Data is distributed across multiple nodes with central coordination.',
      color: 'text-primary-400',
      bgColor: 'bg-primary-100 dark:bg-primary-900/20'
    },
    { 
      id: 'Distributed', 
      icon: <FaNetworkWired className="text-4xl text-success-400" />,
      label: 'Fully Distributed', 
      description: 'Data is decentralized across independent nodes without central authority.',
      color: 'text-success-400',
      bgColor: 'bg-success-100 dark:bg-success-900/20'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700"
      >
        <div className="flex items-center mb-4">
          <FaLock className="text-primary-400 mr-2" />
          <h2 className="text-xl font-semibold">Encryption Type</h2>
        </div>
        
        <p className="text-gray-400 mb-4 text-sm">
          Select the encryption method used in your system
        </p>
        
        <div className="space-y-3">
          {encryptionOptions.map((option) => (
            <div 
              key={option.id}
              className={`
                p-4 rounded-md cursor-pointer border transition-colors
                ${encryptionType === option.id 
                  ? 'border-primary-500 bg-gray-700' 
                  : 'border-gray-700 hover:border-primary-600 hover:bg-gray-700/50'}
              `}
              onClick={() => setEncryptionType(option.id)}
            >
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full mr-3 border-2 ${encryptionType === option.id ? 'border-primary-500 bg-primary-500' : 'border-gray-500'}`}></div>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full ${option.bgColor} flex items-center justify-center mr-3`}>
                    {option.icon}
                  </div>
                  <div>
                    <h3 className={`font-medium ${option.color}`}>{option.label}</h3>
                    <p className="text-xs text-gray-400 mt-1">{option.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700"
      >
        <div className="flex items-center mb-4">
          <FaServer className="text-primary-400 mr-2" />
          <h2 className="text-xl font-semibold">Data Distribution</h2>
        </div>
        
        <p className="text-gray-400 mb-4 text-sm">
          Select how your data is distributed across systems
        </p>
        
        <div className="space-y-3">
          {distributionOptions.map((option) => (
            <div 
              key={option.id}
              className={`
                p-4 rounded-md cursor-pointer border transition-colors
                ${distributionType === option.id 
                  ? 'border-primary-500 bg-gray-700' 
                  : 'border-gray-700 hover:border-primary-600 hover:bg-gray-700/50'}
              `}
              onClick={() => setDistributionType(option.id)}
            >
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full mr-3 border-2 ${distributionType === option.id ? 'border-primary-500 bg-primary-500' : 'border-gray-500'}`}></div>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full ${option.bgColor} flex items-center justify-center mr-3`}>
                    {option.icon}
                  </div>
                  <div>
                    <h3 className={`font-medium ${option.color}`}>{option.label}</h3>
                    <p className="text-xs text-gray-400 mt-1">{option.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default PrivacySettings