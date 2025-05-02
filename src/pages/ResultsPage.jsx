import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaFileDownload } from 'react-icons/fa'
import ComplianceScore from '../components/results/ComplianceScore'
import EncryptionType from '../components/results/EncryptionType'
import GDPRReport from '../components/results/GDPRReport'
import DataDistribution from '../components/results/DataDistribution'
import PrivacyMetrics from '../components/results/PrivacyMetrics'
import ActionableFeedback from '../components/results/ActionableFeedback'
import { useData } from '../context/DataContext'

const ResultsPage = () => {
  const { evaluationResults, resetData, startEvaluation, isLoading, error } = useData();
  const navigate = useNavigate();
  const hasStartedEvaluation = useRef(false);
  
  useEffect(() => {
    // Only call startEvaluation if evaluationResults is null, it's not already loading,
    // there's no error, and we haven't already started an evaluation
    if (!evaluationResults && !isLoading && !error && !hasStartedEvaluation.current) {
      // Set the ref to true to prevent additional evaluations
      hasStartedEvaluation.current = true;
      
      startEvaluation(() => {
        // This callback will be executed after evaluation is complete
        console.log("Evaluation completed");
      });
    }
  }, [evaluationResults, startEvaluation, isLoading, error]);
  
  const handleGoBack = () => {
    navigate('/')
    resetData()
  }
  
  if (error) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Error</h2>
          <p className="text-gray-300">{error}</p>
          <button
            onClick={handleGoBack}
            className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  if (!evaluationResults) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600 dark:text-gray-400">Generating privacy evaluation results...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto max-w-7xl px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 mt-6"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Privacy Compliance Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            GDPR compliance assessment results and recommended actions
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
          <button
            onClick={handleGoBack}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Return to Input
          </button>
          
          <button
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            <FaFileDownload className="mr-2" />
            Download Report
          </button>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ComplianceScore score={evaluationResults.complianceScore} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <EncryptionType type={evaluationResults.encryptionType} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <GDPRReport data={evaluationResults.gdprCompliance} llmReport={evaluationResults.llmReport} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:col-span-2 lg:col-span-3"
        >
          <PrivacyMetrics metrics={evaluationResults.privacyMetrics} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <DataDistribution data={evaluationResults.dataDistribution} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="md:col-span-1 lg:col-span-2"
        >
          <ActionableFeedback feedbackItems={evaluationResults.feedbackItems} />
        </motion.div>
      </div>
      
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        
        <button
          onClick={handleGoBack}
          className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-md font-medium transition-colors shadow-lg"
        >
          Start New Evaluation
        </button>
      </motion.div>
    </div>
  )
}

export default ResultsPage