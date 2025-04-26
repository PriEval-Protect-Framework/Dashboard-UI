import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { FaTable, FaUpload } from 'react-icons/fa'
import { useData } from '../../context/DataContext'
import Card from '../common/Card'
import { dummyDataSample } from '../../utils/dummyData'

const DataUpload = () => {
  const { dataFile, dataPreview, handleDataUpload } = useData()
  
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles[0]) {
      handleDataUpload(acceptedFiles[0])
    }
  }, [handleDataUpload])
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/json': ['.json'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    maxFiles: 1
  })
  
  // Render table from either uploaded data preview or dummy data
  const previewData = dataPreview.length > 0 ? dataPreview : dummyDataSample
  
  return (
    <Card 
      title="📊 Enter a sample of your data" 
      className="h-full" 
      animationType="fadeInUp"
      delay={0.1}
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
              ? "Drop the data file here"
              : "Drag & drop your data sample here, or click to select"}
          </p>
          
          <p className="text-xs text-center text-gray-500 dark:text-gray-500 mt-2">
            Supports CSV, JSON, XLS, and XLSX files
          </p>
          
          {dataFile && (
            <motion.div 
              className="mt-3 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm flex items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FaTable className="mr-1" size={12} />
              {dataFile.name}
            </motion.div>
          )}
        </div>
        
        <div className="mt-4 flex-grow overflow-hidden">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Data Preview:</h4>
          
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 h-64 overflow-x-auto overflow-y-auto border border-gray-200 dark:border-gray-700">
            {previewData.length > 0 && (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                <thead>
                  <tr>
                    {Object.keys(previewData[0]).map((key) => (
                      <th
                        key={key}
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {previewData.map((row, rowIndex) => (
                    <tr 
                      key={rowIndex}
                      className={rowIndex % 2 === 0 ? 'bg-white dark:bg-transparent' : 'bg-gray-50 dark:bg-gray-800/30'}
                    >
                      {Object.values(row).map((value, colIndex) => (
                        <td
                          key={colIndex}
                          className="px-3 py-2 whitespace-nowrap text-gray-600 dark:text-gray-300"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default DataUpload