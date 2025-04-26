import { motion } from 'framer-motion'
import { FaMoon, FaSun, FaShieldAlt } from 'react-icons/fa'
import { useTheme } from '../../context/ThemeContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme()
  
  return (
    <motion.nav 
      className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 shadow-sm"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <FaShieldAlt className="h-8 w-8 text-primary-400" aria-hidden="true" />
              <motion.span
                className="ml-2 text-xl font-bold text-gray-900 dark:text-white"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                PriEval-Protect
              </motion.span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDarkMode ? (
                <FaSun className="h-5 w-5" aria-hidden="true" />
              ) : (
                <FaMoon className="h-5 w-5" aria-hidden="true" />
              )}
              <span className="sr-only">Toggle theme</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar