import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import InputPage from './pages/InputPage'
import ResultsPage from './pages/ResultsPage'
import { useData } from './context/DataContext'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const { policyFile, dataFile } = useData()
  
  // If both files are loaded and we're on input page, navigate to results
  useEffect(() => {
    if (policyFile && dataFile && location.pathname === '/') {
      const timer = setTimeout(() => navigate('/results'), 1000)
      return () => clearTimeout(timer)
    }
  }, [policyFile, dataFile, location.pathname, navigate])

  return (
    <div className="min-h-screen flex flex-col bg-pattern">
      <Navbar />
      
      <main className="flex-grow px-4 py-6 md:px-8 md:py-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<InputPage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  )
}

export default App