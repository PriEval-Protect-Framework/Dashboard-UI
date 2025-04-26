import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { FaFileAlt, FaUpload } from 'react-icons/fa'
import { useData } from '../../context/DataContext'
import Card from '../common/Card'
import { dummyPolicyText } from '../../utils/dummyData'

const PolicyUpload = () => {
  const { policyFile, policyPreview, handlePolicyUpload } = useData()
  
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles[0]) {
      handlePolicyUpload(acceptedFiles[0])
    }
  }, [handlePolicyUpload])
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1
  })
  
  return (
    <Card 
      title="📄 Enter your policy" 
      className="h-full"
      animationType="fadeInUp"
    >
      <div className="h-full flex flex-col">
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
            isDragActive 
              ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/20' 
              : 'border-gray-300 dark:border-gray-700 hover:border-primary-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
          }`}
        >
          <input {...getInputProps()} />
          
          <FaUpload className="text-4xl text-gray-400 dark:text-gray-500 mb-3" />
          
          <p className="text-center text-gray-600 dark:text-gray-400">
            {isDragActive
              ? "Drop the policy document here"
              : "Drag & drop your policy document here, or click to select"}
          </p>
          
          <p className="text-xs text-center text-gray-500 dark:text-gray-500 mt-2">
            Supports PDF, DOC, DOCX, and TXT files
          </p>
          
          {policyFile && (
            <motion.div 
              className="mt-3 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm flex items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FaFileAlt className="mr-1" size={12} />
              {policyFile.name}
            </motion.div>
          )}
        </div>
        
        <div className="mt-4 flex-grow overflow-hidden">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Policy Preview:</h4>
          
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 h-64 overflow-y-auto text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
            {policyPreview ? (
              <p className="whitespace-pre-line">{policyPreview}</p>
            ) : (
              <p className="whitespace-pre-line opacity-60">{dummyPolicyText.slice(0, 500)}...</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default PolicyUpload