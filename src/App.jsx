import { useState } from 'react'
import Welcome from './components/Welcome'
import Dashboard from './components/Dashboard'

function App() {
  const [currentPage, setCurrentPage] = useState('welcome')

  const navigateTo = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen bg-white">
      {currentPage === 'welcome' && (
        <Welcome onNavigate={navigateTo} />
      )}
      {currentPage === 'dashboard' && (
        <Dashboard onNavigate={navigateTo} />
      )}
    </div>
  )
}

export default App