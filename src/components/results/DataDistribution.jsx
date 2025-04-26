import { motion } from 'framer-motion'
import { FaServer, FaNetworkWired, FaProjectDiagram } from 'react-icons/fa'
import Card from '../common/Card'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend)

const DataDistribution = ({ data }) => {
  // Get icon and content based on distribution type
  const getDistributionContent = () => {
    switch (data.type) {
      case 'Federated':
        return {
          icon: <FaProjectDiagram className="text-primary-400" />,
          title: 'Federated Distribution',
          description: 'Data is distributed across multiple nodes with central coordination.',
          color: 'text-primary-400',
          recommendation: 'Current federated architecture provides good balance between performance and privacy.',
        }
      case 'Distributed':
        return {
          icon: <FaNetworkWired className="text-success-400" />,
          title: 'Fully Distributed',
          description: 'Data is decentralized across independent nodes without central authority.',
          color: 'text-success-400',
          recommendation: 'Fully distributed architecture provides excellent privacy protection.',
        }
      case 'Centralized':
      default:
        return {
          icon: <FaServer className="text-warning-400" />,
          title: 'Centralized Storage',
          description: 'All data is stored in a single central repository.',
          color: 'text-warning-400',
          recommendation: 'Consider adopting a more distributed approach to enhance privacy and reduce single-point vulnerabilities.',
        }
    }
  }
  
  const content = getDistributionContent()
  
  // Create pie chart data based on distribution
  const chartData = {
    labels: data.type === 'Centralized' 
      ? ['Main Server'] 
      : ['Node 1', 'Node 2', 'Node 3', 'Other Nodes'],
    datasets: [
      {
        data: data.type === 'Centralized'
          ? [100]
          : [
              30 + Math.floor(Math.random() * 20),
              20 + Math.floor(Math.random() * 15),
              15 + Math.floor(Math.random() * 15),
              35 - Math.floor(Math.random() * 20),
            ],
        backgroundColor: data.type === 'Centralized'
          ? ['rgba(245, 158, 11, 0.8)']
          : [
              'rgba(51, 102, 255, 0.8)',
              'rgba(0, 159, 227, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(99, 102, 241, 0.8)',
            ],
        borderColor: data.type === 'Centralized'
          ? ['rgb(217, 119, 6)']
          : [
              'rgb(45, 85, 255)',
              'rgb(0, 144, 206)',
              'rgb(13, 148, 136)',
              'rgb(79, 70, 229)',
            ],
        borderWidth: 1,
      },
    ],
  }
  
  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  }
  
  return (
    <Card title="Data Distribution" animationType="fadeInUp" delay={0.3}>
      <div className="flex flex-col">
        <div className="flex items-center mb-3">
          {content.icon}
          <h4 className={`ml-2 font-semibold ${content.color}`}>{content.title}</h4>
        </div>
        
        <div className="h-44 my-2">
          <Pie data={chartData} options={chartOptions} />
        </div>
        
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
          <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
            <span className="font-medium">Total Nodes:</span> {data.nodes}
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
            <span className="font-medium">Variance:</span> {(data.variance * 100).toFixed(1)}%
          </div>
          
          {data.type !== 'Centralized' && (
            <>
              <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                <span className="font-medium">Dominant Node:</span> {data.dominantNode}%
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                <span className="font-medium">Synchronization:</span> {Math.random() > 0.5 ? 'Real-time' : 'Periodic'}
              </div>
            </>
          )}
        </div>
        
        <motion.div 
          className="mt-3 p-2 text-sm bg-gray-50 dark:bg-gray-800 rounded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>{content.recommendation}</p>
        </motion.div>
      </div>
    </Card>
  )
}

export default DataDistribution