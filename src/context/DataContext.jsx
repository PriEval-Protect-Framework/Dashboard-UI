import { createContext, useContext, useState, useCallback } from 'react'
import { generateRandomMetrics, generateDummyResults } from '../utils/dummyData'

const DataContext = createContext()

export const useData = () => useContext(DataContext)

export function DataProvider({ children }) {
  const [policyFile, setPolicyFile] = useState(null)
  const [dataFile, setDataFile] = useState(null)
  const [policyPreview, setPolicyPreview] = useState('')
  const [dataPreview, setDataPreview] = useState([])
  const [evaluationResults, setEvaluationResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const handlePolicyUpload = useCallback((file) => {
    setPolicyFile(file)
    
    // Create text preview for policy file
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target.result
      setPolicyPreview(text.slice(0, 500) + (text.length > 500 ? '...' : ''))
    }
    reader.readAsText(file)
  }, [])
  
  const handleDataUpload = useCallback((file) => {
    setDataFile(file)
    
    // Create table preview for data file
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target.result
      try {
        // Try to parse as JSON first
        const json = JSON.parse(text)
        if (Array.isArray(json)) {
          setDataPreview(json.slice(0, 5))
        } else {
          setDataPreview([json])
        }
      } catch {
        // Try to parse as CSV
        const lines = text.split('\n').filter(line => line.trim())
        const headers = lines[0].split(',')
        const rows = []
        
        for (let i = 1; i < Math.min(6, lines.length); i++) {
          const values = lines[i].split(',')
          const row = {}
          headers.forEach((header, index) => {
            row[header.trim()] = values[index]?.trim() || ''
          })
          rows.push(row)
        }
        
        setDataPreview(rows)
      }
    }
    reader.readAsText(file)
  }, [])
  
  const startEvaluation = useCallback(() => {
    setIsLoading(true)
    
    // Simulate evaluation process
    setTimeout(() => {
      setEvaluationResults(generateDummyResults())
      setIsLoading(false)
    }, 2000)
  }, [])
  
  const resetData = useCallback(() => {
    setPolicyFile(null)
    setDataFile(null)
    setPolicyPreview('')
    setDataPreview([])
    setEvaluationResults(null)
  }, [])
  
  const value = {
    policyFile,
    dataFile,
    policyPreview,
    dataPreview,
    evaluationResults,
    isLoading,
    handlePolicyUpload,
    handleDataUpload,
    startEvaluation,
    resetData
  }
  
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}