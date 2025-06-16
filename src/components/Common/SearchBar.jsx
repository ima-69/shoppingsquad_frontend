import React from 'react'
import { useState } from 'react'
import { Search, X } from 'lucide-react'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  // Simulating dispatch and navigation
  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchTerm.trim()) return
    
    // For demonstration purposes only
    console.log(`Searching for: ${searchTerm}`)
    alert(`Search submitted: ${searchTerm}`)
    setIsOpen(false)
  }

  const handleSearchToggle = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      // Focus the input when opening
      setTimeout(() => {
        document.getElementById('search-input')?.focus()
      }, 100)
    }
  }

  return (
    <div className={`
      fixed inset-x-0 z-50 transition-all duration-300 ease-in-out
      ${isOpen ? 'top-0 bg-white/80 backdrop-blur-sm shadow-lg' : 'relative'}
    `}>
      <div className="container mx-auto px-4">
        {isOpen ? (
          <div className="py-6">
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                  autoComplete="off"
                />
                
                <button
                  onClick={handleSearch}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
                
                <button
                  onClick={handleSearchToggle}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={handleSearchToggle}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Open search"
          >
            <Search className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar