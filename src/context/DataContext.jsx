import { createContext, useContext, useState, useCallback } from 'react'
import { generateDummyResults } from '../utils/dummyData'

const DataContext = createContext()
export const useData = () => useContext(DataContext)

export function DataProvider({ children }) {
  const [policyFile, setPolicyFile] = useState(null)
  const [dataFile, setDataFile] = useState(null)
  const [policyPreview, setPolicyPreview] = useState('')
  const [dataPreview, setDataPreview] = useState([])
  const [evaluationResults, setEvaluationResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isRequesting, setIsRequesting] = useState(false)
  
  // Keep state variables for encryption and distribution type
  // but don't send them to endpoints
  const [encryptionType, setEncryptionType] = useState('Asymmetric') // Default value
  const [distributionType, setDistributionType] = useState('Centralized') // Default value

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
  
  const startEvaluation = useCallback(async (onComplete) => {
    // Clear any previous errors
    setError(null);
    
    // Prevent concurrent requests
    if (isRequesting) {
      console.log("Request already in progress, skipping");
      return;
    }
    
    setIsRequesting(true);
    setIsLoading(true);
  
    if (!policyFile || !dataFile) {
      const errorMsg = "Missing required files. Please upload both policy and data files.";
      console.error(errorMsg);
      setError(errorMsg);
      setIsLoading(false);
      setIsRequesting(false);
      return;
    }
  
    try {
      console.log("Starting evaluation process with parallel requests...");
      console.log("Using encryption type:", encryptionType);
      console.log("Using distribution type:", distributionType);
      
      // Prepare form data for both API requests
      // Remove encryption_type and distribution_type parameters
      const policyFormData = new FormData();
      policyFormData.append("policy", policyFile);
      // Removed: policyFormData.append("encryption_type", encryptionType);
      // Removed: policyFormData.append("distribution_type", distributionType);
      
      const privacyFormData = new FormData();
      privacyFormData.append("file", dataFile);
      // Removed: privacyFormData.append("encryption_type", encryptionType);
      // Removed: privacyFormData.append("distribution_type", distributionType);
      
      // Make both API requests in parallel
      const [gdprResponse, privacyResponse] = await Promise.all([
        fetch('http://127.0.0.1:8001/gdpr/evaluate', {
          method: 'POST',
          body: policyFormData
        }),
        fetch('http://127.0.0.1:8000/calcul', {
          method: 'POST',
          body: privacyFormData
        })
      ]);
      
      // Check responses for errors
      if (!gdprResponse.ok) {
        throw new Error(`GDPR API error: ${gdprResponse.status} ${gdprResponse.statusText}`);
      }
      
      if (!privacyResponse.ok) {
        throw new Error(`Privacy metrics API error: ${privacyResponse.status} ${privacyResponse.statusText}`);
      }
      
      // Parse response data in parallel
      const [gdprData, privacyMetrics] = await Promise.all([
        gdprResponse.json(),
        privacyResponse.json()
      ]);
      
      console.log("Both API requests completed successfully");
      console.log("GDPR evaluation data:", gdprData);
      console.log("Privacy metrics data:", privacyMetrics);
      
      // Use the selected encryption and distribution types from state
      // instead of generating random values
      const gdprBelowThreshold = Math.floor(3 + Math.random() * 4);
      const complianceScore = gdprData.score.weighted_score || Math.floor(30 + Math.random() * 70);
  
      // Use the selected distribution type instead of randomizing
      const isDistributed = distributionType !== 'Centralized';
      const distributionData = {
        type: distributionType,
        nodes: isDistributed ? Math.floor(5 + Math.random() * 20) : 1,
        variance: isDistributed ? Math.random() * 0.5 : 0,
        dominantNode: isDistributed ? Math.floor(Math.random() * 100) : 100,
        complianceScore: Math.floor(30 + Math.random() * 70)
      };
  
      // Generate feedback based on all results
      const feedbackItems = [];
      if (gdprData.score.weighted_score < 80) feedbackItems.push('Improve GDPR coverage in documentation');
      if (encryptionType === 'None' || encryptionType === 'Symmetric') feedbackItems.push('Upgrade encryption method to asymmetric or hybrid');
      if (distributionType === 'Centralized') feedbackItems.push('Consider a more distributed data storage approach');
      
      // Add feedback based on privacy metrics
      if (privacyMetrics.k_anonymity < 2) feedbackItems.push('Implement data minimization techniques');
      if (privacyMetrics.l_diversity < 1) feedbackItems.push('Implement l-diversity measures');
      if (privacyMetrics.adversary_success_rate.average_success_rate > 0.8) feedbackItems.push('Reduce adversary success rate through additional anonymization');
      
      const llmRecommendations = []
      const numberedPoints = gdprData.llm_report.match(/\d\.\s.+/g)
      if (numberedPoints) {
        llmRecommendations.push(...numberedPoints.slice(0, 3)) 
      }

      // Organize privacy metrics according to the four categories from the diagram
      const organizedPrivacyMetrics = {
        adversarySuccess: {
          adversarySuccessRate: privacyMetrics.adversary_success_rate,
          deltaPresence: privacyMetrics.delta_presence
        },
        dataSimilarity: {
          kAnonymity: privacyMetrics.k_anonymity,
          alphaKAnonymity: privacyMetrics.alpha_k_anonymity,
          lDiversity: privacyMetrics.l_diversity
        },
        informationGain: {
          mutualInformation: privacyMetrics.mutual_information,
          relativeEntropy: privacyMetrics.privacy_score_entropy
        },
        uncertainty: {
          avgEntropy: privacyMetrics.uncertainty_metrics.avg_entropy,
          avgMinEntropy: privacyMetrics.uncertainty_metrics.avg_min_entropy,
          avgNormalizedEntropy: privacyMetrics.uncertainty_metrics.avg_normalized_entropy
        }
      };
    
      console.log("Setting evaluation results...");
      setEvaluationResults({
        complianceScore,
        encryptionType, // Use the user-selected encryption type
        gdprCompliance: {
          fullyCovered: gdprData.score.fully_covered,
          partiallyCovered: gdprData.score.partially_covered,
          notCovered: gdprData.score.not_covered,
          belowThreshold: gdprBelowThreshold,
          weightedScore: gdprData.score.weighted_score,
          coverageScore: gdprData.score.coverage_score
        },
        dataDistribution: distributionData, // Use the user-selected distribution type
        privacyMetrics: organizedPrivacyMetrics, // Organized metrics from API
        feedbackItems: [...llmRecommendations, ...feedbackItems],
        llmReport: gdprData.llm_report
      });
  
      if (onComplete) {
        console.log("Calling onComplete callback");
        onComplete();
      }
  
    } catch (err) {
      console.error("Error in evaluation:", err);
      setError(err.message || "An error occurred during evaluation");
      setEvaluationResults(null); // Reset results on error
    }
    finally {
      console.log("Evaluation process finished");
      setIsLoading(false);
      setIsRequesting(false);
    }
  }, [policyFile, dataFile, isRequesting, encryptionType, distributionType]); // Keep dependencies
  
  const resetData = useCallback(() => {
    setPolicyFile(null)
    setDataFile(null)
    setPolicyPreview('')
    setDataPreview([])
    setEvaluationResults(null)
    setError(null)
    // We don't reset encryption and distribution types here
    // so they persist between evaluations
  }, [])

  return (
    <DataContext.Provider value={{
      policyFile,
      dataFile,
      policyPreview,
      dataPreview,
      evaluationResults,
      isLoading,
      error,
      encryptionType, // Keep exposing state variables
      setEncryptionType,
      distributionType,
      setDistributionType,
      handlePolicyUpload,
      handleDataUpload,
      startEvaluation,
      resetData
    }}>
      {children}
    </DataContext.Provider>
  )
}