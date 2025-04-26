// Generate random privacy metrics
export const generateRandomMetrics = () => ({
  uncertainty: Math.random(),
  informationGain: Math.random(),
  indistinguishability: Math.random(),
  dataSimilarity: Math.random(),
  adversarySuccess: Math.random(),
  precision: 0.5 + (Math.random() * 0.5),
  accuracy: 0.5 + (Math.random() * 0.5),
  time: Math.floor(Math.random() * 1000),
})

// Generate a complete set of dummy results
export const generateDummyResults = () => {
  // Calculate a random compliance score between 30 and 95%
  const complianceScore = Math.floor(30 + Math.random() * 65)
  
  // Randomly select an encryption type
  const encryptionTypes = ['Asymmetric', 'Symmetric', 'Hybrid', 'None']
  const encryptionType = encryptionTypes[Math.floor(Math.random() * encryptionTypes.length)]
  
  // GDPR compliance breakdown
  const gdprCovered = Math.floor(15 + Math.random() * 10)
  const gdprPartial = Math.floor(5 + Math.random() * 10)
  const gdprNotCovered = Math.floor(5 + Math.random() * 10)
  const gdprBelowThreshold = Math.floor(5 + Math.random() * 5)
  
  // Data distribution
  const isDistributed = Math.random() > 0.5
  const distributionData = {
    type: isDistributed ? (Math.random() > 0.5 ? 'Federated' : 'Distributed') : 'Centralized',
    nodes: isDistributed ? Math.floor(5 + Math.random() * 20) : 1,
    variance: isDistributed ? Math.random() * 0.5 : 0,
    dominantNode: isDistributed ? Math.floor(Math.random() * 100) : 100
  }
  
  // Generate needed feedback based on compliance score
  const feedbackItems = []
  if (complianceScore < 80) {
    feedbackItems.push('Improve GDPR coverage in documentation')
  }
  if (encryptionType === 'None' || encryptionType === 'Symmetric') {
    feedbackItems.push('Upgrade encryption method to asymmetric or hybrid')
  }
  if (distributionData.type === 'Centralized') {
    feedbackItems.push('Consider a more distributed data storage approach')
  }
  if (Math.random() > 0.7) {
    feedbackItems.push('Add anonymization of sensitive fields')
  }
  if (Math.random() > 0.6) {
    feedbackItems.push('Implement data minimization techniques')
  }
  if (feedbackItems.length === 0) {
    feedbackItems.push('Maintain current compliance practices')
  }
  
  // Return complete results object
  return {
    complianceScore,
    encryptionType,
    gdprCompliance: {
      fullyCovered: gdprCovered,
      partiallyCovered: gdprPartial,
      notCovered: gdprNotCovered,
      belowThreshold: gdprBelowThreshold,
      weightedScore: Math.floor(30 + Math.random() * 70),
      coverageScore: Math.floor(30 + Math.random() * 70),
    },
    dataDistribution: distributionData,
    privacyMetrics: generateRandomMetrics(),
    feedbackItems
  }
}

// Dummy hospital policy text
export const dummyPolicyText = `
SAMPLE HOSPITAL PRIVACY POLICY

1. Introduction
This privacy policy outlines how Sample Hospital collects, uses, stores, and protects your personal data in accordance with the General Data Protection Regulation (GDPR) and other applicable laws.

2. Data Collection
We collect personal data including:
- Patient identification (name, date of birth, address)
- Medical history and treatment records
- Insurance and payment information
- Emergency contact details

3. Purpose of Data Collection
Your personal data is collected for:
- Providing healthcare services
- Administrative purposes
- Legal and regulatory compliance
- Research and quality improvement (with appropriate consent)

4. Data Protection
We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction.

5. Data Sharing
We may share your data with:
- Healthcare providers involved in your care
- Insurance companies (with consent)
- Regulatory authorities as required by law
- Research institutions (anonymized data only)

6. Your Rights
Under GDPR, you have rights to:
- Access your personal data
- Request rectification of inaccurate data
- Request erasure of your data
- Restrict processing of your data
- Data portability
- Object to processing

7. Data Retention
We retain personal data for as long as necessary for the purposes outlined above and in accordance with legal requirements.

8. Contact
For privacy concerns, please contact our Data Protection Officer at dpo@samplehospital.example.
`

// Dummy hospital data sample
export const dummyDataSample = [
  {
    id: '0001',
    name: 'John Smith',
    age: 45,
    gender: 'M',
    diagnosis: 'Hypertension',
    admission_date: '2023-01-15',
  },
  {
    id: '0002',
    name: 'Sarah Johnson',
    age: 62,
    gender: 'F',
    diagnosis: 'Type 2 Diabetes',
    admission_date: '2023-02-03',
  },
  {
    id: '0003',
    name: 'Michael Chang',
    age: 33,
    gender: 'M',
    diagnosis: 'Asthma',
    admission_date: '2023-01-28',
  },
  {
    id: '0004',
    name: 'Emma Wilson',
    age: 28,
    gender: 'F',
    diagnosis: 'Migraine',
    admission_date: '2023-02-12',
  },
  {
    id: '0005',
    name: 'Robert Garcia',
    age: 57,
    gender: 'M',
    diagnosis: 'Coronary Artery Disease',
    admission_date: '2023-01-20',
  },
]