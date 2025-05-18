import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBath, 
  faBed, 
  faRulerCombined, 
  faMapMarkerAlt, 
  faCheckCircle,
  faSwimmingPool,
  faDumbbell,
  faShieldAlt,
  faCar,
  faWifi,
  faChild,
  faBolt,
  faHome,
  faLeaf,
  faVideo,
  faElevator,
  faUtensils,
  faTv,
  faFan,
  faSnowflake,
  faPaw,
  faWater,
  faFireExtinguisher
} from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { fetchPropertyDetails, approveProperty } from '../../apis/property';
import { useAppSelector } from '../../hooks/hooks';
import { setLoading } from '../../redux/slice/loadingSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const PropertyDetails: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const [property, setProperty] = useState<any>(null);
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
    const navigate = useNavigate();
  // Feature icon mapping
  const featureIcons: Record<string, any> = {
    // Amenities
    'pool': faSwimmingPool,
    'gym': faDumbbell,
    'play': faChild,
    'garden': faLeaf,
    'pet': faPaw,
    'laundry': faWater,
    
    // Facilities
    'security': faShieldAlt,
    'parking': faCar,
    'wifi': faWifi,
    'power': faBolt,
    'elevator': faElevator,
    'cctv': faVideo,
    'dining': faUtensils,
    'tv': faTv,
    'ac': faSnowflake,
    'fan': faFan,
    'fire': faFireExtinguisher,
    
    // Default
    'default': faCheckCircle
  };

  const getFeatureIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    const matchedKey = Object.keys(featureIcons).find(key => 
      lowerName.includes(key)
    );
    return featureIcons[matchedKey || 'default'];
  };

  // Feature item component
  const FeatureItem = ({ feature, type }: { feature: any, type: 'amenity' | 'facility' }) => {
    const icon = getFeatureIcon(feature.name);
    const bgColor = type === 'amenity' ? 'bg-accent/10' : 'bg-primary-light/10';
    const iconColor = type === 'amenity' ? 'text-accent' : 'text-primary-light';

    return (
      <div className="flex items-start">
        <div className={`${bgColor} p-2 rounded-lg mr-3`}>
          <FontAwesomeIcon icon={icon} className={`${iconColor} text-lg`} />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-800">{feature.name}</h3>
          {feature.details && (
            <ul className="text-sm text-gray-600 mt-1">
              {Object.entries(feature.details).map(([key, value]) => (
                <li key={key}>
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}: </span>
                  {Array.isArray(value) ? value.join(', ') : String(value)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const loadPropertyDetails = async () => {
      try {
        dispatch(setLoading(true));
        if (token && propertyId) {
          const response = await fetchPropertyDetails(propertyId, token);
          if (response.success) {
            setProperty(response.property);
          } else {
            toast.error(response.message);
          }
        }
      } catch (err) {
        console.log(err);
        toast.error('Failed to load property details');
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadPropertyDetails();
  }, [propertyId, token, dispatch]);

    const handleApproveProperty = async () => {
            try {
                dispatch(setLoading(true));
                if (token && propertyId) {
                    const response = await approveProperty(propertyId, token);
                if (response.success) {
                    navigate('/admin/properties/pending')
                } else {
                    toast.error(response.message);
                }
            }
        } catch (err) {
            console.log(err);
            toast.error('Failed to load property details');
        } finally {
            dispatch(setLoading(false));
        }
    };

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Group features by type
  const amenities = property?.features.filter((f: any) => f.type === 'amenity') || [];
  const facilities = property?.features.filter((f: any) => f.type === 'facility') || [];

  // Map container style
  const mapContainerStyle = {
    width: '100%',
    height: '300px',
    borderRadius: '12px'
  };

  if (!property) {
    return <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">Loading property details...</div>;
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Property Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-accent mb-2">{property.title}</h1>
        <p className="text-gray-600 flex items-center">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-accent" />
          {property.address.street}, {property.address.city}, {property.address.state} - {property.address.zipcode}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Property Details */}
        <div className="lg:col-span-2">
          {/* Image Carousel */}
          <div className="mb-8 rounded-xl overflow-hidden shadow-md">
            {property.images && property.images.length > 0 ? (
              <Slider {...carouselSettings}>
                {property.images.map((img: string, index: number) => (
                  <div key={index} className="h-96 w-full">
                    <img 
                      src={img} 
                      alt={`Property image ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="h-96 w-full bg-gradient-to-br from-primary-light to-accent flex items-center justify-center text-white">
                <FontAwesomeIcon icon={faHome} className="text-8xl" />
              </div>
            )}
          </div>

          {/* Property Description */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
            <p className="text-gray-600 mb-6">{property.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-neutral-100 pt-4">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faBed} className="mr-2 text-secondary-400" />
                <span className="text-gray-700">{property.numberOfBedrooms} Beds</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faBath} className="mr-2 text-secondary-400" />
                <span className="text-gray-700">{property.numberOfBathrooms} Baths</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faRulerCombined} className="mr-2 text-secondary-400" />
                <span className="text-gray-700">{property.areaSqft.toLocaleString()} sqft</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faHome} className="mr-2 text-secondary-400" />
                <span className="text-gray-700 capitalize">{property.propertyType}</span>
              </div>
            </div>
          </div>

          {/* Pricing Information */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Rent</h3>
                <p className="text-2xl font-bold text-accent">₹{property.rentAmount.toLocaleString()}</p>
                <p className="text-gray-500">{property.rentalPeriod}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Deposit</h3>
                <p className="text-2xl font-bold text-secondary-600">₹{property.depositAmount.toLocaleString()}</p>
                <p className="text-gray-500">Refundable security deposit</p>
              </div>
            </div>
          </div>

          {/* Amenities Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Amenities</h2>
            {amenities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {amenities.map((amenity: any) => (
                  <FeatureItem key={amenity.featureId} feature={amenity} type="amenity" />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No amenities listed for this property</p>
            )}
          </div>

          {/* Facilities Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Facilities</h2>
            {facilities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {facilities.map((facility: any) => (
                  <FeatureItem key={facility.featureId} feature={facility} type="facility" />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No facilities listed for this property</p>
            )}
          </div>
        </div>

        {/* Right Column - Map and Contact */}
        <div className="space-y-6">
          {/* Map Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Location</h2>
            {property.location && (
              <>
                <div className="mb-4">

                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={{
                        lat: property.location.latitude,
                        lng: property.location.longitude
                      }}
                      zoom={15}
                    >
                      <Marker position={{
                        lat: property.location.latitude,
                        lng: property.location.longitude
                      }} />
                    </GoogleMap>
                
                </div>
                <a 
                  href={`https://www.google.com/maps?q=${property.location.latitude},${property.location.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 text-center bg-white border border-accent text-accent font-medium rounded-lg hover:bg-accent/10 transition-colors duration-300 mb-4"
                >
                  View on Google Maps
                </a>
              </>
            )}
          </div>

          {/* Contact & Approval Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm">Phone Number</p>
                <p className="text-gray-800 font-medium">{property.phoneNumber}</p>
              </div>
              
              {property.status === 'pending_approval' && (
                <button className="w-full py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition-colors duration-300 flex items-center justify-center"
                    onClick={handleApproveProperty}
                >
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                  Approve Property
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;