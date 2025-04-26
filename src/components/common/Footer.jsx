import { FaGithub, FaBug } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} PriEval-Protect | Version 1.0.0
          </div>
          
          <div className="flex space-x-4 mt-3 md:mt-0">
            <a 
              href="#" 
              className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
              aria-label="GitHub repository"
            >
              <FaGithub className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-warning-500 dark:text-gray-400 dark:hover:text-warning-400 transition-colors"
              aria-label="Report a bug"
            >
              <FaBug className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer