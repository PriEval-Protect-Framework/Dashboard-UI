import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaArrowRight, FaExclamationCircle } from 'react-icons/fa'
import PolicyUpload from '../components/input/PolicyUpload'
import DataUpload from '../components/input/DataUpload'
import PrivacySettings from '../components/input/PrivacySettings' // Import from correct path
import { useData } from '../context/DataContext'

const InputPage = () => {
  const { 
    policyFile, 
    dataFile, 
    startEvaluation, 
    isLoading, 
    error,
    encryptionType,
    distributionType
  } = useData()
  
  const [isPulseAnimating, setIsPulseAnimating] = useState(false)
  const navigate = useNavigate()
  const isProcessingRef = useRef(false)
  
  // Check if all required data is available before enabling the button
  const isFormComplete = policyFile && 
                         dataFile && 
                         encryptionType && 
                         distributionType &&
                         !isLoading && 
                         !isProcessingRef.current
  
  // Enable pulse animation on the button when all requirements are met
  useEffect(() => {
    if (isFormComplete) {
      setIsPulseAnimating(true)
    } else {
      setIsPulseAnimating(false)
    }
  }, [isFormComplete])
  
  const handleStartEvaluation = () => {
    // Prevent multiple clicks and requests
    if (isLoading || isProcessingRef.current) {
      console.log("Processing already in progress, ignoring click");
      return;
    }
    
    // Validate all required inputs
    if (!policyFile || !dataFile || !encryptionType || !distributionType) {
      console.log("Form incomplete, cannot start evaluation");
      return;
    }
    
    // Set processing flag to prevent duplicate calls
    isProcessingRef.current = true;
    console.log("Starting evaluation from InputPage");
    console.log("Using encryption type:", encryptionType);
    console.log("Using distribution type:", distributionType);
    
    startEvaluation(() => {
      console.log("Evaluation complete, navigating to results");
      navigate('/results');
      // Reset processing flag after navigation
      isProcessingRef.current = false;
    });
  }
  
  // Generate validation message based on missing inputs
  const getValidationMessage = () => {
    const missing = [];
    
    if (!policyFile) missing.push('policy document');
    if (!dataFile) missing.push('data sample');
    if (!encryptionType) missing.push('encryption type');
    if (!distributionType) missing.push('distribution type');
    
    if (missing.length === 0) {
      return 'Ready to evaluate privacy metrics and GDPR compliance';
    } else {
      return `Please provide: ${missing.join(', ')}`;
    }
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
      
      {/* Add the PrivacySettings component */}
      <PrivacySettings />
      
      {error && (
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-md mb-6">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      <motion.div
        className="text-center mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: isFormComplete ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
      >
        {!isFormComplete && (
          <div className="bg-blue-100 dark:bg-blue-900/20 border border-blue-400 dark:border-blue-700 text-blue-700 dark:text-blue-400 px-4 py-3 rounded-md mb-4 inline-flex items-center">
            <FaExclamationCircle className="mr-2" />
            <p className="text-sm">All settings are required before starting evaluation</p>
          </div>
        )}
        
        <button
          onClick={handleStartEvaluation}
          disabled={!isFormComplete}
          className={`
            btn btn-primary px-8 py-3 text-lg ${isPulseAnimating ? 'animate-pulse-slow ring-4 ring-primary-300 dark:ring-primary-700 ring-opacity-50' : ''}
            ${!isFormComplete ? 'opacity-50 cursor-not-allowed' : ''}
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
          {getValidationMessage()}
        </p>
      </motion.div>
    </div>
  )
}

export default InputPage