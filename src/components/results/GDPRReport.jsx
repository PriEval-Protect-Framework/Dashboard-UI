import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa'
import Card from '../common/Card'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const GDPRReport = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const chartData = {
    labels: ['Fully Covered', 'Partially Covered', 'Not Covered', 'Below Threshold'],
    datasets: [
      {
        data: [
          data.fullyCovered,
          data.partiallyCovered,
          data.notCovered,
          data.belowThreshold
        ],
        backgroundColor: [
          'rgba(52, 211, 153, 0.8)', // success
          'rgba(245, 158, 11, 0.8)', // warning
          'rgba(239, 68, 68, 0.8)',  // danger
          'rgba(156, 163, 175, 0.8)' // gray
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(217, 119, 6)',
          'rgb(220, 38, 38)',
          'rgb(107, 114, 128)'
        ],
        borderWidth: 1,
      },
    ],
  }
  
  const chartOptions = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  }
  
  return (
    <Card 
      title="📚 GDPR Articles Coverage" 
      animationType="fadeInUp"
      delay={0.2}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Weighted Compliance Score
            </h4>
            <div className="text-2xl font-bold text-primary-500">
              {data.weightedScore}%
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Based on article importance</p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Coverage-Based Score
            </h4>
            <div className="text-2xl font-bold text-primary-500">
              {data.coverageScore}%
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Based on number of articles covered</p>
          </div>
        </div>
        
        <div className="h-48">
          <Bar data={chartData} options={chartOptions} />
        </div>
        
        <div>
          <button
            className="w-full flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span>Textual Compliance Report</span>
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          
          {isExpanded && (
            <motion.div
              className="mt-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                The policy document was analyzed against key GDPR articles with the following findings:
              </p>
              
              <ul className="space-y-2">
                <li className="text-success-600 dark:text-success-400">
                  ✓ Strong compliance with Articles 12-14 (Transparency and Information)
                </li>
                <li className="text-success-600 dark:text-success-400">
                  ✓ Adequate coverage of Articles 15-20 (Individual Rights)
                </li>
                <li className="text-warning-600 dark:text-warning-400">
                  ! Partial compliance with Articles 25-32 (Security and Privacy by Design)
                </li>
                <li className="text-danger-600 dark:text-danger-400">
                  ✗ Insufficient coverage of Articles 33-34 (Breach Notification)
                </li>
              </ul>
              
              <button className="mt-3 inline-flex items-center text-primary-600 dark:text-primary-400 text-sm hover:underline">
                <FaSearch className="mr-1" size={12} />
                View Legal Mapping
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  )
}

export default GDPRReport