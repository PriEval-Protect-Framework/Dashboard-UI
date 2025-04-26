import { FaExclamationTriangle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa'
import Card from '../common/Card'
import ProgressRing from '../common/ProgressRing'

const ComplianceScore = ({ score = 0 }) => {
  let status = 'Compliant'
  let icon = <FaCheckCircle className="text-xl text-success-400" />
  let description = 'Your system meets GDPR compliance requirements.'
  
  if (score < 50) {
    status = 'Critical Risk'
    icon = <FaExclamationTriangle className="text-xl text-danger-400" />
    description = 'Urgent action needed to address significant privacy concerns.'
  } else if (score < 80) {
    status = 'Moderate Risk'
    icon = <FaInfoCircle className="text-xl text-warning-400" />
    description = 'Several areas require improvement to achieve compliance.'
  }
  
  return (
    <Card title="Final Compliance Score" animationType="scaleIn">
      <div className="flex flex-col items-center">
        <ProgressRing
          percentage={score}
          className="mb-4"
        />
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            {icon}
            <span className="font-bold ml-2">{status}</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </Card>
  )
}

export default ComplianceScore