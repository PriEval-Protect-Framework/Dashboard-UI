import { motion } from 'framer-motion'
import Card from '../common/Card'

const MetricGauge = ({ label, value, description }) => {
  // Value is expected to be between 0 and 1
  const percentage = Math.min(Math.max(value * 100, 0), 100)
  
  let color = 'bg-success-400'
  if (percentage < 60) {
    color = 'bg-danger-400'
  } else if (percentage < 80) {
    color = 'bg-warning-400'
  }
  
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="text-xs font-medium">{Math.round(percentage)}%</span>
      </div>
      
      <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`absolute top-0 left-0 h-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
      
      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {description}
      </div>
    </div>
  )
}

const PrivacyMetrics = ({ metrics }) => {
  return (
    <Card title="Privacy Metrics" animationType="fadeInUp" delay={0.4}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <MetricGauge 
          label="Uncertainty" 
          value={metrics.uncertainty}
          description="How much information remains hidden"
        />
        
        <MetricGauge 
          label="Information Gain" 
          value={1 - metrics.informationGain}
          description="Resistance to information extraction"
        />
        
        <MetricGauge 
          label="Indistinguishability" 
          value={metrics.indistinguishability}
          description="Ability to blend with other records"
        />
        
        <MetricGauge 
          label="Data Similarity" 
          value={1 - metrics.dataSimilarity}
          description="How unique each record appears"
        />
        
        <MetricGauge 
          label="Adversary Success" 
          value={1 - metrics.adversarySuccess}
          description="Resistance against attacks"
        />
        
        <MetricGauge 
          label="Precision" 
          value={metrics.precision}
          description="Balance of utility and privacy"
        />
      </div>
      
      <motion.div 
        className="mt-4 text-sm p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <p className="text-gray-700 dark:text-gray-300">
          These metrics evaluate your privacy implementation against theoretical models and statistical measures.
          Higher percentages indicate better privacy protection.
        </p>
      </motion.div>
    </Card>
  )
}

export default PrivacyMetrics