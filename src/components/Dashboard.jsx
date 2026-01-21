import { useState, useCallback } from 'react'

const Dashboard = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [bloodTypeFilter, setBloodTypeFilter] = useState('')
  const [municipalityFilter, setMunicipalityFilter] = useState('')
  const [availabilityFilter, setAvailabilityFilter] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingDonor, setEditingDonor] = useState(null)
  const [notification, setNotification] = useState('')
  const [nextId, setNextId] = useState(6)

  const [donors, setDonors] = useState([
    {
      id: 1,
      fullName: 'Juan Dela Cruz',
      age: 28,
      sex: 'Male',
      bloodType: 'O+',
      contactNumber: '09123456789',
      municipality: 'Sorsogon City',
      availability: 'Available'
    },
    {
      id: 2,
      fullName: 'Maria Santos',
      age: 25,
      sex: 'Female',
      bloodType: 'A+',
      contactNumber: '09234567890',
      municipality: 'Legazpi',
      availability: 'Available'
    },
    {
      id: 3,
      fullName: 'Carlos Reyes',
      age: 32,
      sex: 'Male',
      bloodType: 'B+',
      contactNumber: '09345678901',
      municipality: 'Daraga',
      availability: 'Unavailable'
    },
    {
      id: 4,
      fullName: 'Ana Lopez',
      age: 29,
      sex: 'Female',
      bloodType: 'O-',
      contactNumber: '09456789012',
      municipality: 'Sorsogon City',
      availability: 'Available'
    },
    {
      id: 5,
      fullName: 'Roberto Tan',
      age: 35,
      sex: 'Male',
      bloodType: 'AB+',
      contactNumber: '09567890123',
      municipality: 'Pilar',
      availability: 'Available'
    }
  ])

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

    return {
      totalDonors,
      availableDonors,
      unavailableDonors: totalDonors - availableDonors,
      bloodTypeStats,
      municipalityStats
    }
  }

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.contactNumber.includes(searchTerm)
    const matchesBloodType = !bloodTypeFilter || donor.bloodType === bloodTypeFilter
    const matchesMunicipality = !municipalityFilter || donor.municipality === municipalityFilter
    const matchesAvailability = !availabilityFilter || donor.availability === availabilityFilter

    return matchesSearch && matchesBloodType && matchesMunicipality && matchesAvailability
  })

  const showNotification = useCallback((message) => {
    setNotification(message)
    setTimeout(() => setNotification(''), 3000)
  }, [])

  const handleAddDonor = useCallback((newDonor) => {
    const donorWithId = { ...newDonor, id: nextId }
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

  const stats = getStatistics()

  return (
    <div className="max-w-7xl mx-auto p-6 font-sans">
      <header className="flex justify-between items-center mb-8 p-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg">
        <h1 className="text-3xl font-bold">DUGTONG Dashboard</h1>
        <button
          className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-4 py-2 rounded-md transition-colors duration-300"
          onClick={() => onNavigate('welcome')}
        >
          Back to Welcome
        </button>
      </header>

      {notification && (
        <div className="bg-green-500 text-white p-4 rounded-md text-center mb-6 animate-slide-in">
          {notification}
        </div>
      )}

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-red-700 mb-6">Donor Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500 text-center">
            <h3 className="text-sm uppercase text-gray-600 mb-2">Total Donors</h3>
            <p className="text-3xl font-bold text-gray-800">{stats.totalDonors}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 text-center">
            <h3 className="text-sm uppercase text-gray-600 mb-2">Available</h3>
            <p className="text-3xl font-bold text-gray-800">{stats.availableDonors}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-700 text-center">
            <h3 className="text-sm uppercase text-gray-600 mb-2">Unavailable</h3>
            <p className="text-3xl font-bold text-gray-800">{stats.unavailableDonors}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-red-700 mb-4">Blood Type Distribution</h3>
            <div className="space-y-2">
              {Object.entries(stats.bloodTypeStats).map(([type, count]) => (
                <div key={type} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-bold text-red-600">{type}</span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-red-700 mb-4">Municipality Distribution</h3>
            <div className="space-y-2">
              {Object.entries(stats.municipalityStats).map(([municipality, count]) => (
                <div key={municipality} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-bold text-red-700">{municipality}</span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-red-700">Donor Management</h2>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md transition-colors duration-300"
            onClick={() => setShowAddForm(true)}
          >
            Add New Donor
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name or contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />

          <select
            value={bloodTypeFilter}
            onChange={(e) => setBloodTypeFilter(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">All Blood Types</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          <select
            value={municipalityFilter}
            onChange={(e) => setMunicipalityFilter(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">All Municipalities</option>
            <option value="Sorsogon City">Sorsogon City</option>
            <option value="Legazpi">Legazpi</option>
            <option value="Daraga">Daraga</option>
            <option value="Pilar">Pilar</option>
          </select>

          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">All Availability</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDonors.map(donor => (
            <div key={donor.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-red-700 mb-2">{donor.fullName}</h3>
                <p className="text-gray-700 mb-1">Age: {donor.age} | Sex: {donor.sex}</p>
                <p className="text-gray-700 mb-1">Blood Type: <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">{donor.bloodType}</span></p>
                <p className="text-gray-700 mb-1">Contact: {donor.contactNumber}</p>
                <p className="text-gray-700 mb-1">Municipality: {donor.municipality}</p>
                <p className="text-gray-700">Status: <span className={`px-2 py-1 rounded-full text-sm font-bold ${
                  donor.availability === 'Available'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-700 text-white'
                }`}>
                  {donor.availability}
                </span></p>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition-colors duration-300 flex-1"
                  onClick={() => setEditingDonor(donor)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition-colors duration-300 flex-1"
                  onClick={() => handleDeleteDonor(donor.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {(showAddForm || editingDonor) && (
        <DonorForm
          donor={editingDonor}
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

const DonorForm = ({ donor, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: donor?.fullName || '',
    age: donor?.age || '',
    sex: donor?.sex || '',
    bloodType: donor?.bloodType || '',
    contactNumber: donor?.contactNumber || '',
    municipality: donor?.municipality || '',
    availability: donor?.availability || 'Available'
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic validation
    if (!formData.fullName || !formData.age || !formData.sex ||
        !formData.bloodType || !formData.contactNumber || !formData.municipality) {
      alert('Please fill in all required fields')
      return
    }

    onSubmit(donor ? { ...formData, id: donor.id } : formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-2xl font-bold text-red-700 mb-6">{donor ? 'Edit Donor' : 'Add New Donor'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="18"
                max="65"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Sex</label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Blood Type</label>
              <select
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              >
                <option value="">Select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Availability</label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              pattern="09[0-9]{9}"
              placeholder="09XXXXXXXXX"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Municipality</label>
            <select
              name="municipality"
              value={formData.municipality}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            >
              <option value="">Select</option>
              <option value="Sorsogon City">Sorsogon City</option>
              <option value="Legazpi">Legazpi</option>
              <option value="Daraga">Daraga</option>
              <option value="Pilar">Pilar</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md flex-1 transition-colors duration-300"
            >
              {donor ? 'Update' : 'Add'} Donor
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-md flex-1 transition-colors duration-300"
              onClick={onCancel}
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