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

  const handlePolicyUpload = (file) => {
    setPolicyFile(file)
    const reader = new FileReader()
    reader.onload = () => setPolicyPreview(reader.result)
    reader.readAsText(file)
  }

  const handleDataUpload = useCallback((file) => {
    setDataFile(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target.result
      try {
        const json = JSON.parse(text)
        setDataPreview(Array.isArray(json) ? json.slice(0, 5) : [json])
      } catch {
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

  const startEvaluation = useCallback(async (onComplete) => {  // Added onComplete parameter
    setIsLoading(true);
  
    if (!policyFile) {
      console.error("No policy file uploaded");
      setIsLoading(false);
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("policy", policyFile);
  
      const response = await fetch('http://127.0.0.1:8001/gdpr/evaluate', {
        method: 'POST',
        body: formData
      });
  
      const data = await response.json();
  
      const encryptionTypes = ['Asymmetric', 'Symmetric', 'Hybrid', 'None'];
      const encryptionType = encryptionTypes[Math.floor(Math.random() * encryptionTypes.length)];
      const gdprBelowThreshold = Math.floor(3 + Math.random() * 4);
      
      const complianceScore = data.score.weighted_score || Math.floor(30 + Math.random() * 70);
  
      const isDistributed = Math.random() > 0.5;
      const distributionData = {
        type: isDistributed ? (Math.random() > 0.5 ? 'Federated' : 'Distributed') : 'Centralized',
        nodes: isDistributed ? Math.floor(5 + Math.random() * 20) : 1,
        variance: isDistributed ? Math.random() * 0.5 : 0,
        dominantNode: isDistributed ? Math.floor(Math.random() * 100) : 100,
        complianceScore: Math.floor(30 + Math.random() * 70)
      };
  
      const feedbackItems = [];
      if (data.score.weighted_score < 80) feedbackItems.push('Improve GDPR coverage in documentation');
      if (encryptionType === 'None' || encryptionType === 'Symmetric') feedbackItems.push('Upgrade encryption method to asymmetric or hybrid');
      if (distributionData.type === 'Centralized') feedbackItems.push('Consider a more distributed data storage approach');
      if (Math.random() > 0.7) feedbackItems.push('Add anonymization of sensitive fields');
      if (Math.random() > 0.6) feedbackItems.push('Implement data minimization techniques');
      if (feedbackItems.length === 0) feedbackItems.push('Maintain current compliance practices');

      const llmRecommendations = []
      const numberedPoints = data.llm_report.match(/\d\.\s.+/g)
      if (numberedPoints) {
        llmRecommendations.push(...numberedPoints.slice(0, 3)) 
      }

    
      setEvaluationResults({
        complianceScore,
        encryptionType,
        gdprCompliance: {
          fullyCovered: data.score.fully_covered,
          partiallyCovered: data.score.partially_covered,
          notCovered: data.score.not_covered,
          belowThreshold: gdprBelowThreshold,
          weightedScore: data.score.weighted_score,
          coverageScore: data.score.coverage_score
        },
        dataDistribution: distributionData,
        privacyMetrics: generateRandomMetrics(),
        feedbackItems: [...llmRecommendations],
        llmReport: data.llm_report
      });
  
      if (onComplete) onComplete();  // Call onComplete if provided
  
    } catch (err) {
      console.error("Error evaluating GDPR:", err);
    }
  
    setIsLoading(false);
  }, [policyFile]);
  

  const resetData = useCallback(() => {
    setPolicyFile(null)
    setDataFile(null)
    setPolicyPreview('')
    setDataPreview([])
    setEvaluationResults(null)
  }, [])

  return (
    <DataContext.Provider value={{
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
    }}>
      {children}
    </DataContext.Provider>
  )
}
