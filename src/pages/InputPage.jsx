import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import PolicyUpload from '../components/input/PolicyUpload'
import DataUpload from '../components/input/DataUpload'
import { useData } from '../context/DataContext'

const InputPage = () => {
  const { policyFile, dataFile, startEvaluation, isLoading } = useData()
  const [isPulseAnimating, setIsPulseAnimating] = useState(false)
  const navigate = useNavigate()
  
  // Enable pulse animation on the button when both files are uploaded
  useEffect(() => {
    if (policyFile && dataFile) {
      setIsPulseAnimating(true)
    } else {
      setIsPulseAnimating(false)
    }
  }, [policyFile, dataFile])
  
  const handleStartEvaluation = () => {
    startEvaluation(() => {
      navigate('/results');
    });
  };
      
  return (
    <div className="container mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-bold mb-3">Welcome to PriEval-Protect</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Upload your hospital policy document and data sample to assess GDPR compliance 
          and receive actionable privacy protection recommendations.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <PolicyUpload />
        <DataUpload />
      </div>
      
      <motion.div
        className="text-center mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: policyFile || dataFile ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={handleStartEvaluation}
          disabled={!policyFile || !dataFile}
          className={`
            btn btn-primary px-8 py-3 text-lg ${isPulseAnimating ? 'animate-pulse-slow ring-4 ring-primary-300 dark:ring-primary-700 ring-opacity-50' : ''}
            ${(!policyFile || !dataFile) ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            <span className="flex items-center">
              Start Evaluation
              <FaArrowRight className="ml-2" />
            </span>
          )}
        </button>
        
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          {(!policyFile && !dataFile) ? (
            'Please upload both policy document and data sample'
          ) : (!policyFile) ? (
            'Please upload a policy document'
          ) : (!dataFile) ? (
            'Please upload a data sample'
          ) : (
            'Ready to evaluate compliance'
          )}
        </p>
      </motion.div>
    </div>
  )
}

export default InputPage