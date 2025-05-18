import React from 'react';
import { type Property } from '../types/property';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faHeart, faHome, faMapMarkerAlt, faRulerCombined } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      {/* Property Image */}
      {/* Property Image */}
              <div className="relative h-64 overflow-hidden">
                {property?.images && property?.images?.length > 0 ? (
                  <img 
                    src={property?.images[0]} 
                    alt={property?.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary-light to-accent flex items-center justify-center text-white">
                    <FontAwesomeIcon icon={faHome} className="text-4xl" />
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <button className="absolute top-4 right-4 h-10 w-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-accent hover:text-accent-dark transition-colors duration-300">
                  <FontAwesomeIcon icon={faHeart} />
                </button>
                
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-white font-medium text-lg drop-shadow-md">
                    ₹{property?.rentAmount?.toLocaleString()}/mo
                  </span>
                  {property.depositAmount && (
                    <span className="block text-white text-sm drop-shadow-md">
                      Deposit: ₹{property?.depositAmount.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Property Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary-800 mb-2 group-hover:text-accent transition-colors duration-300">
                  {property?.title}
                </h3>
                <p className="text-secondary-600 mb-4 flex items-center">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-accent" />
                  {property?.address?.street}, {property?.address?.city}
                </p>
                
                <p className="text-secondary-600 mb-4 line-clamp-2">
                  {property?.description}
                </p>
                
                <div className="flex justify-between text-sm text-secondary-500 border-t border-neutral-100 pt-4">
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faBed} className="mr-2 text-secondary-400" />
                    {property?.numberOfBedrooms} Beds
                  </span>
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faBath} className="mr-2 text-secondary-400" />
                    {property?.numberOfBathrooms} Baths
                  </span>
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faRulerCombined} className="mr-2 text-secondary-400" />
                    {property?.areaSqft?.toLocaleString()} sqft
                  </span>
                </div>
              </div>
              
              {/* View Details Button */}
              <div className="px-6 pb-6">
                <Link 
                  to={`/property/${property.propertyId}`}
                  className="block w-full py-3 text-center bg-primary-light text-secondary-dark font-medium rounded-lg hover:bg-primary transition-colors duration-300"
                >
                  View Details
                </Link>
              </div>
    </div>
  );
};

export default PropertyCard;