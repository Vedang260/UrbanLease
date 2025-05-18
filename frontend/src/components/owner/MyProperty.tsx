import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { type Property } from '../../types/property';
import PropertyCard from '../../components/PropertyCard';
import { useAppSelector } from '../../hooks/hooks';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/slice/loadingSlice';
import { fetchPropertyRequests } from '../../apis/property';
import toast from 'react-hot-toast';

const MyProperty: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState({
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    searchQuery: ''
  });

  const { token } = useAppSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadProperties = async () => {
            try {
                dispatch(setLoading(true));
                if(token){
                    const response = await fetchPropertyRequests(token);

                    console.log("Response in property", response);
                    if (response.success) {
                        setProperties(response?.propertyRequest);
                        console.log(properties);
                    } else {
                        toast.error(response.message);
                    }
                }
            } catch (err) {
                console.log(err);
            } finally {
                dispatch(setLoading(false));
            }
        };

        loadProperties();
    }, [token, dispatch]);

  // Filtering logic
  const filteredProperties = properties.filter((property) => {
    // Parse numeric values from filters for comparison
    const minPrice = filters.minPrice ? parseInt(filters.minPrice) : 0;
    const maxPrice = filters.maxPrice ? parseInt(filters.maxPrice) : Infinity;
    const minBedrooms = filters.bedrooms ? parseInt(filters.bedrooms) : 0;
    
    // Handle type conversions and null values safely
    const rentAmount = property.rentAmount || 0;
    const numberOfBedrooms = property.numberOfBedrooms || 0;
    
    return (
      // Property type filter
      (!filters.propertyType || property.propertyType === filters.propertyType) &&
      
      // Search query filter - check if any text field contains the search query
      (!filters.searchQuery || 
        (property.title && property.title.toLowerCase().includes(filters.searchQuery.toLowerCase())) ||
        (property.address && property.address.city && property.address.city.toLowerCase().includes(filters.searchQuery.toLowerCase())) ||
        (property.address && property.address.street && property.address.street.toLowerCase().includes(filters.searchQuery.toLowerCase()))) &&
      
      // Bedrooms filter
      (!filters.bedrooms || numberOfBedrooms >= minBedrooms) &&
      
      // Price range filters
      (rentAmount >= minPrice) &&
      (!filters.maxPrice || rentAmount <= maxPrice)
    );
  });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          My Properties
        </h1>
        <p className="text-gray-600">
          {filteredProperties.length} properties found
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search by location or name"
                className="w-full p-3 pl-10 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                value={filters.searchQuery}
                onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
              />
              <Search 
                size={18}
                className="absolute left-3 top-3.5 text-gray-400" 
              />
            </div>
          </div>
          
          <div>
            <select 
              className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent appearance-none bg-white"
              value={filters.propertyType}
              onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
            >
              <option value="">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="condo">Condo</option>
              <option value="office">Office</option>
            </select>
          </div>
          
          <div>
            <select 
              className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent appearance-none bg-white"
              value={filters.bedrooms}
              onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
            >
              <option value="">Any Beds</option>
              <option value="1">1+ Bed</option>
              <option value="2">2+ Beds</option>
              <option value="3">3+ Beds</option>
              <option value="4">4+ Beds</option>
            </select>
          </div>
          
          <div>
            <select 
              className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent appearance-none bg-white"
              value={filters.minPrice}
              onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
            >
              <option value="">Min Price</option>
              <option value="10000">₹10,000</option>
              <option value="20000">₹20,000</option>
              <option value="30000">₹30,000</option>
              <option value="50000">₹50,000</option>
            </select>
          </div>
          
          <div>
            <select 
              className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent appearance-none bg-white"
              value={filters.maxPrice}
              onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
            >
              <option value="">Max Price</option>
              <option value="30000">₹30,000</option>
              <option value="50000">₹50,000</option>
              <option value="100000">₹100,000</option>
              <option value="200000">₹200,000</option>
            </select>
          </div>
        </div>
      </div>

      {/* Property Grid */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-xl font-bold text-secondary-600 mb-4">No properties found matching your criteria</h3>
          <p className="text-secondary-500 mb-6">Try adjusting your filters or search for something different</p>
          <button 
            onClick={() => setFilters({
              propertyType: '',
              minPrice: '',
              maxPrice: '',
              bedrooms: '',
              searchQuery: ''
            })}
            className="bg-accent text-white py-2 px-6 rounded-lg hover:bg-accent-dark transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard 
              key={property?.propertyId}
              property={property}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredProperties.length > 0 && (
        <div className="flex justify-center mt-12">
          <nav className="flex items-center space-x-2">
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
              2
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
              3
            </button>
            <span className="px-2 text-gray-500">...</span>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
              10
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MyProperty;