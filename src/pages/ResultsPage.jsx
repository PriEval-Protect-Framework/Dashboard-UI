import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import ComplianceScore from '../components/results/ComplianceScore'
import EncryptionType from '../components/results/EncryptionType'
import GDPRReport from '../components/results/GDPRReport'
import DataDistribution from '../components/results/DataDistribution'
import PrivacyMetrics from '../components/results/PrivacyMetrics'
import ActionableFeedback from '../components/results/ActionableFeedback'
import { useData } from '../context/DataContext'

const ResultsPage = () => {
  const { evaluationResults, resetData, startEvaluation } = useData()
  const navigate = useNavigate()
  
  // If no results available, redirect to input page
  useEffect(() => {
    if (!evaluationResults) {
      startEvaluation()
    }
  }, [evaluationResults, startEvaluation])
  
  const handleGoBack = () => {
    navigate('/')
  }
  
  if (!evaluationResults) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-primary-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600 dark:text-gray-400">Generating privacy evaluation results...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Privacy Compliance Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            GDPR compliance assessment results and recommended actions
          </p>
        </div>
        
        <button
          onClick={handleGoBack}
          className="mt-4 md:mt-0 flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Return to Input
        </button>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <ComplianceScore score={evaluationResults.complianceScore} />
        <EncryptionType type={evaluationResults.encryptionType} />
        <GDPRReport data={evaluationResults.gdprCompliance} />
        <DataDistribution data={evaluationResults.dataDistribution} />
        <PrivacyMetrics metrics={evaluationResults.privacyMetrics} />
        <ActionableFeedback feedbackItems={evaluationResults.feedbackItems} />
      </div>
      
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <button
          onClick={resetData}
          className="btn btn-primary px-6 py-2"
        >
          Start New Evaluation
        </button>
        
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Generate a detailed PDF report with all metrics and recommendations
        </p>
      </motion.div>
    </div>
  )
}

export default ResultsPage