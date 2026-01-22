import { useState, useCallback, useEffect } from 'react'
import { 
  Search, Filter, UserPlus, Edit, Trash2, 
  Users, Activity, MapPin, Heart, 
  Sun, Moon, ChevronRight, CheckCircle,
  ArrowLeft, BarChart3, Phone, Mail,
  Shield, Eye, EyeOff, RefreshCw
} from 'lucide-react'

const Dashboard = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [bloodTypeFilter, setBloodTypeFilter] = useState('')
  const [municipalityFilter, setMunicipalityFilter] = useState('')
  const [availabilityFilter, setAvailabilityFilter] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingDonor, setEditingDonor] = useState(null)
  const [notification, setNotification] = useState('')
  const [nextId, setNextId] = useState(6)
  const [darkMode, setDarkMode] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [activeStat, setActiveStat] = useState('overview')

  const [donors, setDonors] = useState([
    {
      id: 1,
      fullName: 'Juan Dela Cruz',
      age: 28,
      sex: 'Male',
      bloodType: 'O+',
      contactNumber: '09123456789',
      email: 'juandelacruz@email.com',
      municipality: 'Sorsogon City',
      availability: 'Available',
      lastDonation: '2024-01-15',
      donationCount: 5
    },
    {
      id: 2,
      fullName: 'Maria Santos',
      age: 25,
      sex: 'Female',
      bloodType: 'A+',
      contactNumber: '09234567890',
      email: 'mariasantos@email.com',
      municipality: 'Legazpi',
      availability: 'Available',
      lastDonation: '2024-01-20',
      donationCount: 3
    },
    {
      id: 3,
      fullName: 'Carlos Reyes',
      age: 32,
      sex: 'Male',
      bloodType: 'B+',
      contactNumber: '09345678901',
      email: 'carlosreyes@email.com',
      municipality: 'Daraga',
      availability: 'Unavailable',
      lastDonation: '2023-12-10',
      donationCount: 7
    },
    {
      id: 4,
      fullName: 'Ana Lopez',
      age: 29,
      sex: 'Female',
      bloodType: 'O-',
      contactNumber: '09456789012',
      email: 'analopez@email.com',
      municipality: 'Sorsogon City',
      availability: 'Available',
      lastDonation: '2024-01-18',
      donationCount: 4
    },
    {
      id: 5,
      fullName: 'Roberto Tan',
      age: 35,
      sex: 'Male',
      bloodType: 'AB+',
      contactNumber: '09567890123',
      email: 'robertotan@email.com',
      municipality: 'Pilar',
      availability: 'Available',
      lastDonation: '2024-01-22',
      donationCount: 6
    }
  ])

  const bloodTypeColors = {
    'O+': 'from-red-500 to-orange-500',
    'A+': 'from-blue-500 to-cyan-500',
    'B+': 'from-green-500 to-emerald-500',
    'AB+': 'from-purple-500 to-pink-500',
    'O-': 'from-red-700 to-rose-700',
    'A-': 'from-blue-700 to-indigo-700',
    'B-': 'from-green-700 to-teal-700',
    'AB-': 'from-purple-700 to-fuchsia-700'
  }

  const municipalityColors = {
    'Sorsogon City': 'bg-gradient-to-r from-red-500/20 to-rose-500/20',
    'Legazpi': 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20',
    'Daraga': 'bg-gradient-to-r from-green-500/20 to-emerald-500/20',
    'Pilar': 'bg-gradient-to-r from-purple-500/20 to-pink-500/20'
  }

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const getStatistics = () => {
    const totalDonors = donors.length
    const availableDonors = donors.filter(d => d.availability === 'Available').length
    const bloodTypeStats = donors.reduce((acc, donor) => {
      acc[donor.bloodType] = (acc[donor.bloodType] || 0) + 1
      return acc
    }, {})
    const municipalityStats = donors.reduce((acc, donor) => {
      acc[donor.municipality] = (acc[donor.municipality] || 0) + 1
      return acc
    }, {})
    const totalDonations = donors.reduce((acc, donor) => acc + donor.donationCount, 0)
    const avgAge = donors.reduce((acc, donor) => acc + donor.age, 0) / totalDonors

    return {
      totalDonors,
      availableDonors,
      unavailableDonors: totalDonors - availableDonors,
      bloodTypeStats,
      municipalityStats,
      totalDonations,
      avgAge: avgAge.toFixed(1)
    }
  }

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.contactNumber.includes(searchTerm) ||
                         donor.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBloodType = !bloodTypeFilter || donor.bloodType === bloodTypeFilter
    const matchesMunicipality = !municipalityFilter || donor.municipality === municipalityFilter
    const matchesAvailability = !availabilityFilter || donor.availability === availabilityFilter

    return matchesSearch && matchesBloodType && matchesMunicipality && matchesAvailability
  })

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(''), 3000)
  }, [])

  const handleAddDonor = useCallback((newDonor) => {
    const donorWithId = { ...newDonor, id: nextId, donationCount: 0 }
    setDonors(prevDonors => [...prevDonors, donorWithId])
    setNextId(prevId => prevId + 1)
    setShowAddForm(false)
    showNotification('Donor added successfully!')
  }, [nextId, showNotification])

  const handleUpdateDonor = useCallback((updatedDonor) => {
    setDonors(prevDonors => prevDonors.map(donor => 
      donor.id === updatedDonor.id ? updatedDonor : donor
    ))
    setEditingDonor(null)
    showNotification('Donor updated successfully!')
  }, [showNotification])

  const handleDeleteDonor = useCallback((id) => {
    setDonors(prevDonors => prevDonors.filter(donor => donor.id !== id))
    showNotification('Donor deleted successfully!')
  }, [showNotification])

  const clearFilters = () => {
    setSearchTerm('')
    setBloodTypeFilter('')
    setMunicipalityFilter('')
    setAvailabilityFilter('')
  }

  const stats = getStatistics()

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      darkMode ? 'dark bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 to-white text-gray-900'
    }`}>
      {/* Navigation Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-lg border-b ${
        darkMode ? 'border-gray-800/50 bg-black/30' : 'border-gray-200/50 bg-white/30'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('welcome')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Heart className="w-8 h-8 text-red-500 animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent">
                  DUGTONG Dashboard
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-yellow-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <UserPlus className="w-5 h-5" />
                <span className="font-semibold">Add Donor</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 animate-slide-in ${
          notification.type === 'success' 
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
            : 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
        }`}>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Overview */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">Donor Overview</h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Real-time statistics and analytics for blood donors in Sorsogon
              </p>
            </div>
            
            <div className="flex gap-2">
              {['overview', 'blood', 'location', 'activity'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveStat(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeStat === tab
                      ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
                      : darkMode 
                        ? 'bg-gray-800/50 text-gray-400 hover:text-white'
                        : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Total Donors Card */}
            <div className={`rounded-2xl p-6 backdrop-blur-sm border ${
              darkMode 
                ? 'bg-gray-800/30 border-gray-700/50 hover:border-red-500/30' 
                : 'bg-white/50 border-gray-200/50 hover:border-red-500/30'
            } transition-all duration-300 hover:scale-[1.02]`}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-red-500/20 to-rose-500/20">
                  <Users className="w-6 h-6 text-red-400" />
                </div>
                <div className="text-3xl font-bold text-red-400">
                  {stats.totalDonors}
                </div>
              </div>
              <h3 className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Donors
              </h3>
              <p className="text-xs text-gray-500">
                Active registered blood donors
              </p>
            </div>

            {/* Available Donors Card */}
            <div className={`rounded-2xl p-6 backdrop-blur-sm border ${
              darkMode 
                ? 'bg-gray-800/30 border-gray-700/50 hover:border-green-500/30' 
                : 'bg-white/50 border-gray-200/50 hover:border-green-500/30'
            } transition-all duration-300 hover:scale-[1.02]`}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20">
                  <Activity className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-3xl font-bold text-green-400">
                  {stats.availableDonors}
                </div>
              </div>
              <h3 className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Available Now
              </h3>
              <p className="text-xs text-gray-500">
                Ready to donate immediately
              </p>
            </div>

            {/* Total Donations Card */}
            <div className={`rounded-2xl p-6 backdrop-blur-sm border ${
              darkMode 
                ? 'bg-gray-800/30 border-gray-700/50 hover:border-blue-500/30' 
                : 'bg-white/50 border-gray-200/50 hover:border-blue-500/30'
            } transition-all duration-300 hover:scale-[1.02]`}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
                  <Heart className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-blue-400">
                  {stats.totalDonations}
                </div>
              </div>
              <h3 className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Donations
              </h3>
              <p className="text-xs text-gray-500">
                Lifetime contributions
              </p>
            </div>

            {/* Average Age Card */}
            <div className={`rounded-2xl p-6 backdrop-blur-sm border ${
              darkMode 
                ? 'bg-gray-800/30 border-gray-700/50 hover:border-purple-500/30' 
                : 'bg-white/50 border-gray-200/50 hover:border-purple-500/30'
            } transition-all duration-300 hover:scale-[1.02]`}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-purple-400">
                  {stats.avgAge}
                </div>
              </div>
              <h3 className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Average Age
              </h3>
              <p className="text-xs text-gray-500">
                Mean age of donors
              </p>
            </div>
          </div>

          {/* Distribution Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Blood Type Distribution */}
            <div className={`rounded-2xl p-6 backdrop-blur-sm border ${
              darkMode 
                ? 'bg-gray-800/30 border-gray-700/50' 
                : 'bg-white/50 border-gray-200/50'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-red-400" />
                  Blood Type Distribution
                </h3>
                <span className="text-sm text-gray-500">
                  {Object.keys(stats.bloodTypeStats).length} types
                </span>
              </div>
              <div className="space-y-3">
                {Object.entries(stats.bloodTypeStats).map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${bloodTypeColors[type] || 'from-gray-500 to-gray-700'}`}></div>
                      <span className="font-medium">{type}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`w-32 h-2 rounded-full overflow-hidden ${
                        darkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'
                      }`}>
                        <div 
                          className={`h-full bg-gradient-to-r ${bloodTypeColors[type] || 'from-gray-500 to-gray-700'}`}
                          style={{ width: `${(count / donors.length) * 100}%` }}
                        ></div>
                      </div>
                      <span className={`font-bold min-w-8 text-right ${
                        type.includes('O') ? 'text-red-400' :
                        type.includes('A') ? 'text-blue-400' :
                        type.includes('B') ? 'text-green-400' : 'text-purple-400'
                      }`}>
                        {count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Municipality Distribution */}
            <div className={`rounded-2xl p-6 backdrop-blur-sm border ${
              darkMode 
                ? 'bg-gray-800/30 border-gray-700/50' 
                : 'bg-white/50 border-gray-200/50'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-400" />
                  Municipality Distribution
                </h3>
                <span className="text-sm text-gray-500">
                  {Object.keys(stats.municipalityStats).length} areas
                </span>
              </div>
              <div className="space-y-4">
                {Object.entries(stats.municipalityStats).map(([municipality, count]) => (
                  <div key={municipality} className="flex items-center justify-between p-3 rounded-lg border border-transparent hover:border-red-500/30 transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${municipalityColors[municipality] || 'bg-gray-500/20'}`}>
                        <MapPin className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <span className="font-medium">{municipality}</span>
                        <p className="text-xs text-gray-500">
                          {count} donor{count !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-24 h-2 rounded-full overflow-hidden ${
                        darkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'
                      }`}>
                        <div 
                          className={`h-full ${municipalityColors[municipality] || 'bg-gray-500'}`}
                          style={{ width: `${(count / donors.length) * 100}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-red-400 min-w-8 text-right">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Donor Management */}
        <section className={`rounded-2xl p-6 backdrop-blur-sm border ${
          darkMode 
            ? 'bg-gray-800/30 border-gray-700/50' 
            : 'bg-white/50 border-gray-200/50'
        }`}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Donor Management</h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Manage blood donor profiles and information
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {showFilters ? <ChevronRight className="w-4 h-4 rotate-90" /> : <ChevronRight className="w-4 h-4" />}
              </button>
              
              {(bloodTypeFilter || municipalityFilter || availabilityFilter || searchTerm) && (
                <button
                  onClick={clearFilters}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    darkMode 
                      ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300' 
                      : 'bg-red-100 hover:bg-red-200 text-red-600'
                  }`}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>

          {/* Search and Filters */}
          <div className={`mb-6 overflow-hidden transition-all duration-300 ${
            showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search donors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg transition-all duration-300 ${
                    darkMode 
                      ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-red-500/50 focus:ring-red-500/20' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-red-500 focus:ring-red-500/10'
                  } border focus:outline-none focus:ring-2`}
                />
              </div>

              <select
                value={bloodTypeFilter}
                onChange={(e) => setBloodTypeFilter(e.target.value)}
                className={`w-full p-3 rounded-lg border transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-800/50 border-gray-700 text-white focus:border-red-500/50 focus:ring-red-500/20' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-red-500 focus:ring-red-500/10'
                } focus:outline-none focus:ring-2`}
              >
                <option value="">All Blood Types</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                  <option key={type} value={type} className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                    {type}
                  </option>
                ))}
              </select>

              <select
                value={municipalityFilter}
                onChange={(e) => setMunicipalityFilter(e.target.value)}
                className={`w-full p-3 rounded-lg border transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-800/50 border-gray-700 text-white focus:border-red-500/50 focus:ring-red-500/20' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-red-500 focus:ring-red-500/10'
                } focus:outline-none focus:ring-2`}
              >
                <option value="">All Municipalities</option>
                {['Sorsogon City', 'Legazpi', 'Daraga', 'Pilar'].map(municipality => (
                  <option key={municipality} value={municipality} className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                    {municipality}
                  </option>
                ))}
              </select>

              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className={`w-full p-3 rounded-lg border transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-800/50 border-gray-700 text-white focus:border-red-500/50 focus:ring-red-500/20' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-red-500 focus:ring-red-500/10'
                } focus:outline-none focus:ring-2`}
              >
                <option value="">All Status</option>
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
          </div>

          {/* Donor Cards Grid */}
          {filteredDonors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDonors.map(donor => (
                <div 
                  key={donor.id} 
                  className={`rounded-xl p-5 border transition-all duration-300 hover:scale-[1.02] ${
                    darkMode 
                      ? 'bg-gray-800/30 border-gray-700/50 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/10' 
                      : 'bg-white border-gray-200/50 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${bloodTypeColors[donor.bloodType] || 'from-gray-500 to-gray-700'}`}>
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{donor.fullName}</h3>
                        <p className="text-sm text-gray-500">{donor.age} years • {donor.sex}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      donor.availability === 'Available'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {donor.availability}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-16 text-center py-1 rounded-lg ${
                        darkMode 
                          ? 'bg-gradient-to-r from-red-500/20 to-rose-500/20' 
                          : 'bg-gradient-to-r from-red-500/10 to-rose-500/10'
                      }`}>
                        <span className={`font-bold ${bloodTypeColors[donor.bloodType]?.split(' ')[1]?.replace('to-', 'text-') || 'text-red-400'}`}>
                          {donor.bloodType}
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-400 text-sm">
                        {donor.municipality}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{donor.contactNumber}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{donor.email}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-gray-200/20">
                      <div className="text-sm">
                        <span className="text-gray-500">Last donation: </span>
                        <span className="font-medium">{donor.lastDonation}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-400" />
                        <span className="font-bold text-red-400">{donor.donationCount}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingDonor(donor)}
                      className={`flex items-center justify-center gap-2 flex-1 py-2 rounded-lg transition-all duration-300 ${
                        darkMode 
                          ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30' 
                          : 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 border border-blue-500/20'
                      } hover:scale-105`}
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteDonor(donor.id)}
                      className={`flex items-center justify-center gap-2 flex-1 py-2 rounded-lg transition-all duration-300 ${
                        darkMode 
                          ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30' 
                          : 'bg-red-500/10 hover:bg-red-500/20 text-red-600 border border-red-500/20'
                      } hover:scale-105`}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-block p-4 rounded-full bg-gradient-to-r from-red-500/10 to-rose-500/10 mb-4">
                <Search className="w-12 h-12 text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">No donors found</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Try adjusting your search or filters
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg hover:scale-105 transition-all duration-300"
              >
                Clear all filters
              </button>
            </div>
          )}

          <div className={`mt-6 text-center text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            Showing {filteredDonors.length} of {donors.length} donors
          </div>
        </section>
      </main>

      {/* Donor Form Modal */}
      {(showAddForm || editingDonor) && (
        <DonorForm
          donor={editingDonor}
          darkMode={darkMode}
          onSubmit={editingDonor ? handleUpdateDonor : handleAddDonor}
          onCancel={() => {
            setShowAddForm(false)
            setEditingDonor(null)
          }}
        />
      )}
    </div>
  )
}

const DonorForm = ({ donor, darkMode, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: donor?.fullName || '',
    age: donor?.age || '',
    sex: donor?.sex || '',
    bloodType: donor?.bloodType || '',
    contactNumber: donor?.contactNumber || '',
    email: donor?.email || '',
    municipality: donor?.municipality || '',
    availability: donor?.availability || 'Available'
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.fullName || !formData.age || !formData.sex ||
        !formData.bloodType || !formData.contactNumber || !formData.municipality || !formData.email) {
      alert('Please fill in all required fields')
      return
    }

    onSubmit(donor ? { ...formData, id: donor.id, donationCount: donor.donationCount } : formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      ></div>
      
      {/* Modal */}
      <div className={`relative rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}>
        {/* Header */}
        <div className="sticky top-0 z-10 p-6 border-b backdrop-blur-sm" style={{
          background: darkMode 
            ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(249, 250, 251, 0.95) 100%)'
        }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-red-500/20 to-rose-500/20">
                <UserPlus className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-xl font-bold">
                {donor ? 'Edit Donor' : 'Add New Donor'}
              </h2>
            </div>
            <button
              onClick={onCancel}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                darkMode 
                  ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
              }`}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-red-500/50 focus:ring-red-500/20' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-red-500 focus:ring-red-500/10'
              } focus:outline-none focus:ring-2`}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Age *
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="18"
                max="65"
                className={`w-full p-3 rounded-lg border transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-red-500/50 focus:ring-red500/20' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-red-500 focus:ring-red-500/10'
                } focus:outline-none focus:ring-2`}
                placeholder="18-65"
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Sex *
              </label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-800/50 border-gray-700 text-white focus:border-red-500/50 focus:ring-red-500/20' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-red-500 focus:ring-red-500/10'
                } focus:outline-none focus:ring-2`}
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Blood Type *
              </label>
              <select
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-800/50 border-gray-700 text-white focus:border-red-500/50 focus:ring-red-500/20' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-red-500 focus:ring-red-500/10'
                } focus:outline-none focus:ring-2`}
                required
              >
                <option value="">Select</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Status *
              </label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-800/50 border-gray-700 text-white focus:border-red-500/50 focus:ring-red-500/20' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-red-500 focus:ring-red-500/10'
                } focus:outline-none focus:ring-2`}
                required
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Contact Number *
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              pattern="09[0-9]{9}"
              placeholder="09XXXXXXXXX"
              className={`w-full p-3 rounded-lg border transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-red-500/50 focus:ring-red-500/20' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-red-500 focus:ring-red-500/10'
              } focus:outline-none focus:ring-2`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-red-500/50 focus:ring-red-500/20' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-red-500 focus:ring-red-500/10'
              } focus:outline-none focus:ring-2`}
              placeholder="donor@email.com"
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Municipality *
            </label>
            <select
              name="municipality"
              value={formData.municipality}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-800/50 border-gray-700 text-white focus:border-red-500/50 focus:ring-red-500/20' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-red-500 focus:ring-red-500/10'
              } focus:outline-none focus:ring-2`}
              required
            >
              <option value="">Select</option>
              {['Sorsogon City', 'Legazpi', 'Daraga', 'Pilar'].map(municipality => (
                <option key={municipality} value={municipality}>{municipality}</option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-red-500 to-rose-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {donor ? 'Update Donor' : 'Add Donor'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/50' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 border border-gray-300'
              }`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Dashboard