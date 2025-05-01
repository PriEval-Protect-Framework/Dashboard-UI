import React, { useState } from 'react';
import { FaLock, FaChevronDown, FaChevronUp, FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

const MetricTooltip = ({ id, title, description }) => (
  <>
    <FaInfoCircle 
      className="text-gray-400 hover:text-gray-300 ml-1 inline cursor-help" 
      data-tooltip-id={id}
      size={14}
    />
    <Tooltip id={id} place="top" effect="solid">
      <div className="max-w-xs">
        <p className="font-semibold mb-1">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
    </Tooltip>
  </>
);

const PrivacyMetrics = ({ metrics }) => {
  const [expanded, setExpanded] = useState(false);

  // Function to format metric values as percentages when appropriate
  const formatMetricValue = (key, value) => {
    const percentageMetrics = [
      'average_success_rate', 
      'max_success_rate', 
      'min_success_rate',
      'avg_normalized_entropy'
    ];
    
    if (percentageMetrics.includes(key)) {
      return `${(value * 100).toFixed(2)}%`;
    }
    
    return typeof value === 'number' ? value.toFixed(4) : value;
  };

  if (!metrics) return null;

  const { adversarySuccess, dataSimilarity, informationGain, uncertainty } = metrics;

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaLock className="text-blue-400 mr-2" size={18} />
            <h3 className="text-lg font-semibold text-white">Privacy Metrics</h3>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {expanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="text-blue-400 text-sm font-medium mb-2">Data Similarity</h4>
            <div className="bg-gray-700 bg-opacity-40 rounded-lg p-3">
              <div className="grid grid-cols-1 gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">K-Anonymity</span>
                  <span className="text-sm text-white">{dataSimilarity.kAnonymity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">α-K-Anonymity</span>
                  <span className="text-sm text-white">α={dataSimilarity.alphaKAnonymity.alpha.toFixed(2)}, k={dataSimilarity.alphaKAnonymity.k}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">L-Diversity</span>
                  <span className="text-sm text-white">{dataSimilarity.lDiversity}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-red-400 text-sm font-medium mb-2">Adversary Success</h4>
            <div className="bg-gray-700 bg-opacity-40 rounded-lg p-3">
              <div className="grid grid-cols-1 gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Avg Success Rate</span>
                  <span className="text-sm text-white">{formatMetricValue('average_success_rate', adversarySuccess.adversarySuccessRate.average_success_rate)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Delta Presence</span>
                  <span className="text-sm text-white">{adversarySuccess.deltaPresence.delta_presence.toFixed(4)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-yellow-400 text-sm font-medium mb-2">Information Gain/Loss</h4>
                <div className="bg-gray-700 bg-opacity-40 rounded-lg p-3">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Mutual Information</span>
                      <span className="text-sm text-white">{informationGain.mutualInformation.toFixed(4)} bits</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Relative Entropy</span>
                      <span className="text-sm text-white">{informationGain.relativeEntropy.toFixed(4)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-green-400 text-sm font-medium mb-2">Uncertainty</h4>
                <div className="bg-gray-700 bg-opacity-40 rounded-lg p-3">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Avg Entropy</span>
                      <span className="text-sm text-white">{uncertainty.avgEntropy.toFixed(4)} bits</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Avg Min Entropy</span>
                      <span className="text-sm text-white">{uncertainty.avgMinEntropy.toFixed(4)} bits</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Normalized Entropy</span>
                      <span className="text-sm text-white">{formatMetricValue('avg_normalized_entropy', uncertainty.avgNormalizedEntropy)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <h4 className="text-purple-400 text-sm font-medium mb-2">Detailed Adversary Success Rate</h4>
                <div className="bg-gray-700 bg-opacity-40 rounded-lg p-3">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-gray-400">Min Rate</p>
                      <p className="text-sm text-white">
                        {formatMetricValue('min_success_rate', adversarySuccess.adversarySuccessRate.min_success_rate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Max Rate</p>
                      <p className="text-sm text-white">
                        {formatMetricValue('max_success_rate', adversarySuccess.adversarySuccessRate.max_success_rate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Equivalence Classes</p>
                      <p className="text-sm text-white">
                        {adversarySuccess.adversarySuccessRate.num_equivalence_classes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-yellow-400 text-sm font-medium mb-2">Delta Presence Details</h4>
                <div className="bg-gray-700 bg-opacity-40 rounded-lg p-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-400">Shared Records</p>
                      <p className="text-sm text-white">
                        {adversarySuccess.deltaPresence.shared_records}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Published Records</p>
                      <p className="text-sm text-white">
                        {adversarySuccess.deltaPresence.published_records}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      <div className="p-3 bg-gray-700 bg-opacity-30">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-400 hover:text-blue-300 text-sm font-medium w-full text-center"
        >
          {expanded ? 'Show less details' : 'Show more details'}
        </button>
      </div>
    </div>
  );
};

export default PrivacyMetrics;