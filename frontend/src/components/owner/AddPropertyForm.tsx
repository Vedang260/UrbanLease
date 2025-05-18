import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray, useFormikContext, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faMapMarkerAlt,
  faMoneyBillWave,
  faBed,
  faBath,
  faRulerCombined,
  faCheckCircle,
  faSwimmingPool,
  faDumbbell,
  faShieldAlt,
  faCar,
  faWifi,
  faChild,
  faBolt,
  faPlus,
  faTrash,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { addNewProperty, uploadPropertyImages } from '../../apis/property';
import { useAppSelector } from '../../hooks/hooks';
import toast from 'react-hot-toast';
import type { Feature, PropertyFormValues } from '../../types/property';
import { useNavigate } from 'react-router-dom';


// Form Steps
const formSteps = [
  { id: 'basic', label: 'Basic Info', icon: faHome },
  { id: 'address', label: 'Address', icon: faMapMarkerAlt },
  { id: 'rental', label: 'Rental Info', icon: faMoneyBillWave },
  { id: 'details', label: 'Property Details', icon: faBed },
  { id: 'features', label: 'Features', icon: faCheckCircle },
  { id: 'review', label: 'Review', icon: faCheckCircle },
];

// Validation Schema
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  propertyType: Yup.string().required('Property type is required'),
  images: Yup.array().notRequired()
    .min(1, 'At least one image is required')
    .required('Images are required'),
  address: Yup.object().shape({
    street: Yup.string().required('Street is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    zipcode: Yup.string().required('Zipcode is required'),
  }),
  location: Yup.object().shape({
    latitude: Yup.number().required('Location is required'),
    longitude: Yup.number().required('Location is required'),
  }),
  phoneNumber: Yup.string().required('Phone number is required'),
  rentAmount: Yup.number()
    .required('Rent amount is required')
    .min(1, 'Rent amount must be greater than 0'),
  depositAmount: Yup.number()
    .required('Deposit amount is required')
    .min(0, 'Deposit amount cannot be negative'),
  rentalPeriod: Yup.string().required('Rental period is required'),
  numberOfBedrooms: Yup.number()
    .required('Number of bedrooms is required')
    .min(0, 'Cannot be negative'),
  numberOfBathrooms: Yup.number()
    .required('Number of bathrooms is required')
    .min(0, 'Cannot be negative'),
  numberOfBalconies: Yup.number()
    .required('Number of balconies is required')
    .min(0, 'Cannot be negative'),
  areaSqft: Yup.number()
    .required('Area is required')
    .min(1, 'Area must be greater than 0'),
  features: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Feature name is required'),
      type: Yup.string().required('Feature type is required'),
    })
  ),
  consent: Yup.boolean()
    .oneOf([true], 'You must agree to the terms')
    .required('Consent is required'),
});

// Property Types
const propertyTypes = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'villa', label: 'Villa' },
  { value: 'condo', label: 'Condo' },
  { value: 'office', label: 'Office' },
  { value: 'plot', label: 'Plot' },
];

// Rental Periods
const rentalPeriods = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
];

// Common Features
const commonFeatures = [
  { name: 'Swimming Pool', type: 'amenity', icon: faSwimmingPool },
  { name: 'Gymnasium', type: 'amenity', icon: faDumbbell },
  { name: '24/7 Security', type: 'facility', icon: faShieldAlt },
  { name: 'Parking', type: 'facility', icon: faCar },
  { name: 'Wi-Fi', type: 'facility', icon: faWifi },
  { name: 'Children Play Area', type: 'amenity', icon: faChild },
  { name: 'Power Backup', type: 'facility', icon: faBolt },
];

// Initial Values
const initialValues: PropertyFormValues = {
  title: '',
  description: '',
  propertyType: '',
  images: [],
  uploadedImageUrls: [],
  address: {
    street: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
  },
  location: {
    latitude: 0,
    longitude: 0,
  },
  phoneNumber: '',
  rentAmount: 0,
  depositAmount: 0,
  rentalPeriod: 'monthly',
  numberOfBedrooms: 0,
  numberOfBathrooms: 0,
  numberOfBalconies: 0,
  areaSqft: 0,
  features: [],
  consent: false,
};

// Map Component
const MapSelector: React.FC<{
  setLocation: (location: { lat: number; lng: number }) => void;
  initialLocation?: { lat: number; lng: number };
}> = ({ setLocation, initialLocation }) => {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(initialLocation || null);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const location = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      setSelectedLocation(location);
      setLocation(location);
    }
  };

  return (
    <div className="mt-4">
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: '300px',
            borderRadius: '12px',
          }}
          center={selectedLocation || { lat: 20.5937, lng: 78.9629 }} // Default to India
          zoom={5}
          onClick={handleMapClick}
        >
          {selectedLocation && <Marker position={selectedLocation} />}
        </GoogleMap>
      {selectedLocation && (
        <div className="mt-2 text-sm text-gray-600">
          <p>Latitude: {selectedLocation.lat.toFixed(6)}</p>
          <p>Longitude: {selectedLocation.lng.toFixed(6)}</p>
        </div>
      )}
      <p className="mt-2 text-sm text-gray-500">
        Click on the map to select property location
      </p>
    </div>
  );
};

// Image Upload Preview
const ImageUploadPreview: React.FC<{
  images: File[];
  uploadedImageUrls: string[];
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => void;
}> = ({ images, uploadedImageUrls, setFieldValue }) => {
  const { token } = useAppSelector((state) => state.auth);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async () => {
    if (images.length === 0) return;
    
    try {
        setUploading(true);
        if(token){
            const response = await uploadPropertyImages(images, token);
            if (Array.isArray(response) && response.length > 0 && response.every(r => r.success)) {
                const imageUrls = response.map(r => r.image_url);
                setFieldValue('uploadedImageUrls', imageUrls);
                toast.success('Images uploaded successfully');
            } else {
                toast.error('Failed to upload images');
            }
        }
    } catch (error) {
      toast.error('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFieldValue('images', [...images, ...files]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setFieldValue('images', newImages);
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Property Images
        </label>
        <button
          type="button"
          onClick={handleImageUpload}
          disabled={uploading || images.length === 0}
          className={`px-3 py-1 text-sm rounded-md ${
            uploading || images.length === 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-accent text-white hover:bg-accent-dark'
          }`}
        >
          {uploading ? 'Uploading...' : 'Upload Images'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={URL.createObjectURL(image)}
              alt={`Preview ${index}`}
              className="w-full h-24 object-cover rounded-md"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FontAwesomeIcon icon={faTrash} size="xs" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center">
        <label
          htmlFor="image-upload"
          className="cursor-pointer bg-white border border-accent text-accent px-4 py-2 rounded-md hover:bg-accent/10 transition-colors flex items-center"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Images
          <input
            id="image-upload"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
        <span className="ml-2 text-sm text-gray-500">
          {images.length} image(s) selected
        </span>
      </div>

      {uploadedImageUrls.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-green-600">
            {uploadedImageUrls.length} image(s) uploaded successfully
          </p>
        </div>
      )}
    </div>
  );
};

// Feature Input Component
const FeatureInput: React.FC<{
  feature: Feature;
  index: number;
  remove: (index: number) => void;
}> = ({ feature, index, remove }) => {
  const getFeatureIcon = (name: string) => {
    if (name.includes('Pool')) return faSwimmingPool;
    if (name.includes('Gym')) return faDumbbell;
    if (name.includes('Security')) return faShieldAlt;
    if (name.includes('Parking')) return faCar;
    if (name.includes('Wi-Fi')) return faWifi;
    if (name.includes('Play')) return faChild;
    if (name.includes('Power')) return faBolt;
    return faCheckCircle;
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md mb-3">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <div className="bg-accent/10 p-2 rounded-lg mr-3">
            <FontAwesomeIcon
              icon={getFeatureIcon(feature.name)}
              className="text-accent text-lg"
            />
          </div>
          <div>
            <Field
              name={`features.${index}.name`}
              placeholder="Feature name"
              className="border-b border-gray-300 focus:border-accent outline-none bg-transparent"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => remove(index)}
          className="text-red-500 hover:text-red-700"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      <div className="ml-12">
        <div className="mb-2">
          <label className="block text-sm text-gray-500 mb-1">Type</label>
          <Field
            as="select"
            name={`features.${index}.type`}
            className="border border-gray-300 rounded p-2 text-sm w-full"
          >
            <option value="amenity">Amenity</option>
            <option value="facility">Facility</option>
          </Field>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Details</label>
          <Field
            as="textarea"
            name={`features.${index}.details`}
            placeholder="Enter details as JSON (e.g., {'size': '25m', 'heated': false})"
            className="border border-gray-300 rounded p-2 text-sm w-full h-20"
          />
        </div>
      </div>
    </div>
  );
};

// Form Navigation Buttons
const FormNavigation: React.FC<{
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
}> = ({ currentStep, setCurrentStep, totalSteps }) => {
  const { isValid, dirty, isSubmitting } = useFormikContext();

  return (
    <div className="flex justify-between mt-8">
      {currentStep > 0 ? (
        <button
          type="button"
          onClick={() => setCurrentStep(currentStep - 1)}
          className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
          Previous
        </button>
      ) : (
        <div></div>
      )}

      {currentStep < totalSteps - 1 ? (
        <button
          type="button"
          onClick={() => setCurrentStep(currentStep + 1)}
        //   disabled={!isValid || !dirty}
          className={`flex items-center px-4 py-2 rounded-md ${
            !isValid || !dirty
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-accent text-white hover:bg-accent-dark'
          }`}
        >
          Next
          <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
        </button>
      ) : (
        <button
          type="submit"
          disabled={!isValid || !dirty || isSubmitting}
          className={`flex items-center px-4 py-2 rounded-md ${
            !isValid || !dirty || isSubmitting
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Property'}
          <FontAwesomeIcon icon={faCheckCircle} className="ml-2" />
        </button>
      )}
    </div>
  );
};

// Step Indicators
const StepIndicators: React.FC<{
  currentStep: number;
  steps: { id: string; label: string; icon: any }[];
}> = ({ currentStep, steps }) => {
  return (
    <div className="flex justify-between mb-8 relative">
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
      <div
        className="absolute top-1/2 left-0 h-1 bg-accent -z-10 transition-all duration-300"
        style={{
          width: `${((currentStep + 1) / steps.length) * 100}%`,
        }}
      ></div>
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              index <= currentStep ? 'bg-accent text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            <FontAwesomeIcon icon={step.icon} />
          </div>
          <span
            className={`text-sm mt-2 ${
              index <= currentStep ? 'text-accent font-medium' : 'text-gray-500'
            }`}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
};

// Review Step Component
const ReviewStep: React.FC<{ values: PropertyFormValues }> = ({ values }) => {
  const getFeatureIcon = (name: string) => {
    if (name.includes('Pool')) return faSwimmingPool;
    if (name.includes('Gym')) return faDumbbell;
    if (name.includes('Security')) return faShieldAlt;
    if (name.includes('Parking')) return faCar;
    if (name.includes('Wi-Fi')) return faWifi;
    if (name.includes('Play')) return faChild;
    if (name.includes('Power')) return faBolt;
    return faCheckCircle;
  };

  return (
    <div className="space-y-6">
      {/* Basic Info Review */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <FontAwesomeIcon icon={faHome} className="mr-2 text-accent" />
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Title</p>
            <p className="text-gray-800">{values.title}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Property Type</p>
            <p className="text-gray-800 capitalize">{values.propertyType}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-500 text-sm">Description</p>
            <p className="text-gray-800">{values.description}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-500 text-sm">Images</p>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {values.images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index}`}
                  className="w-full h-24 object-cover rounded-md"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Address Review */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-accent" />
          Address & Location
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Street</p>
            <p className="text-gray-800">{values.address.street}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">City</p>
            <p className="text-gray-800">{values.address.city}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">State</p>
            <p className="text-gray-800">{values.address.state}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Country</p>
            <p className="text-gray-800">{values.address.country}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Zipcode</p>
            <p className="text-gray-800">{values.address.zipcode}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Phone Number</p>
            <p className="text-gray-800">{values.phoneNumber}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-500 text-sm">Location Coordinates</p>
            <p className="text-gray-800">
              Latitude: {values.location.latitude}, Longitude: {values.location.longitude}
            </p>
            <div className="mt-2 h-48">
              <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '12px',
                  }}
                  center={{
                    lat: values.location.latitude,
                    lng: values.location.longitude,
                  }}
                  zoom={15}
                >
                  <Marker
                    position={{
                      lat: values.location.latitude,
                      lng: values.location.longitude,
                    }}
                  />
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        </div>
      </div>

      {/* Rental Info Review */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2 text-accent" />
          Rental Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Rent Amount</p>
            <p className="text-gray-800">₹{values.rentAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Deposit Amount</p>
            <p className="text-gray-800">₹{values.depositAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Rental Period</p>
            <p className="text-gray-800 capitalize">{values.rentalPeriod}</p>
          </div>
        </div>
      </div>

      {/* Property Details Review */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <FontAwesomeIcon icon={faBed} className="mr-2 text-accent" />
          Property Details
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Bedrooms</p>
            <p className="text-gray-800">{values.numberOfBedrooms}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Bathrooms</p>
            <p className="text-gray-800">{values.numberOfBathrooms}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Balconies</p>
            <p className="text-gray-800">{values.numberOfBalconies}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Area (sqft)</p>
            <p className="text-gray-800">{values.areaSqft.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Features Review */}
      {values.features.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-accent" />
            Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-accent/10 p-2 rounded-lg mr-3">
                  <FontAwesomeIcon
                    icon={getFeatureIcon(feature.name)}
                    className="text-accent text-lg"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{feature.name}</h4>
                  <p className="text-sm text-gray-500 capitalize">{feature.type}</p>
                  {feature.details && (
                    <div className="text-sm text-gray-600 mt-1">
                      {Object.entries(feature.details).map(([key, value]) => (
                        <p key={key}>
                          <span className="capitalize">{key}: </span>
                          {Array.isArray(value) ? value.join(', ') : String(value)}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main Form Component
const AddPropertyForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  
  const handleSubmit = async (values: PropertyFormValues) => {
    try {
      // Prepare form data for submission
      const formData = {
        ...values,
        // Convert images to uploaded URLs (in a real app, you would have already uploaded these)
        images: values.uploadedImageUrls,
      };


      // Here you would call your API to submit the property
      console.log('Submitting property:', formData);
      // const response = await submitProperty(formData, token);
      if(token){
        const result = await addNewProperty(formData, token);
        if(result.success){
            toast.success('Property submitted successfully!');
            navigate('/owner/properties/my-properties')
        }
      }

    } catch (error) {
      toast.error('Failed to submit property');
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Add New Property</h1>
      <p className="text-gray-600 mb-8">
        Fill out the form below to list your property for rent
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <StepIndicators currentStep={currentStep} steps={formSteps} />

            {/* Step 1: Basic Information */}
            {currentStep === 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FontAwesomeIcon icon={faHome} className="mr-2 text-accent" />
                  Basic Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Property Title*
                    </label>
                    <Field
                      name="title"
                      type="text"
                      placeholder="e.g., Beautiful 3 BHK Apartment in City Center"
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description*
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      rows={4}
                      placeholder="Describe your property in detail..."
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
                      Property Type*
                    </label>
                    <Field
                      as="select"
                      name="propertyType"
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    >
                      <option value="">Select Property Type</option>
                      {propertyTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="propertyType" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <ImageUploadPreview
                    images={values.images}
                    uploadedImageUrls={values.uploadedImageUrls}
                    setFieldValue={setFieldValue}
                  />
                  <ErrorMessage name="images" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
            )}
            
            {/* Step 2: Address */}
            {currentStep === 1 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-accent" />
                  Address & Location
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="address.street" className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address*
                    </label>
                    <Field
                      name="address.street"
                      type="text"
                      placeholder="e.g., 123 Main Street"
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                    <ErrorMessage name="address.street" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="address.city" className="block text-sm font-medium text-gray-700 mb-1">
                      City*
                    </label>
                    <Field
                      name="address.city"
                      type="text"
                      placeholder="e.g., Ahmedabad"
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                    <ErrorMessage name="address.city" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="address.state" className="block text-sm font-medium text-gray-700 mb-1">
                      State*
                    </label>
                    <Field
                      name="address.state"
                      type="text"
                      placeholder="e.g., Gujarat"
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                    <ErrorMessage name="address.state" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="address.country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country*
                    </label>
                    <Field
                      name="address.country"
                      type="text"
                      placeholder="e.g., India"
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                    <ErrorMessage name="address.country" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="address.zipcode" className="block text-sm font-medium text-gray-700 mb-1">
                      Zipcode*
                    </label>
                    <Field
                      name="address.zipcode"
                      type="text"
                      placeholder="e.g., 380015"
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                    <ErrorMessage name="address.zipcode" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number*
                    </label>
                    <Field
                      name="phoneNumber"
                      type="tel"
                      placeholder="e.g., +91 9876543210"
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                    <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Location (Click on map to select)*
                  </label>
                  <MapSelector
                    setLocation={(location) => {
                      setFieldValue('location.latitude', location.lat);
                      setFieldValue('location.longitude', location.lng);
                    }}
                    initialLocation={
                      values.location.latitude && values.location.longitude
                        ? {
                            lat: values.location.latitude,
                            lng: values.location.longitude,
                          }
                        : undefined
                    }
                  />
                  <ErrorMessage name="location.latitude" component="div" className="text-red-500 text-sm mt-1" />
                  <ErrorMessage name="location.longitude" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
            )}

            {/* Step 3: Rental Information */}
            {currentStep === 2 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2 text-accent" />
                  Rental Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="rentAmount" className="block text-sm font-medium text-gray-700 mb-1">
                      Rent Amount (₹)*
                    </label>
                    <Field
                      name="rentAmount"
                      type="number"
                      placeholder="e.g., 25000"
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                    <ErrorMessage name="rentAmount" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="depositAmount" className="block text-sm font-medium text-gray-700 mb-1">
                      Deposit Amount (₹)*
                    </label>
                    <Field
                      name="depositAmount"
                      type="number"
                      placeholder="e.g., 50000"
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                    <ErrorMessage name="depositAmount" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="rentalPeriod" className="block text-sm font-medium text-gray-700 mb-1">
                      Rental Period*
                    </label>
                    <Field
                      as="select"
                      name="rentalPeriod"
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    >
                      {rentalPeriods.map((period) => (
                        <option key={period.value} value={period.value}>
                          {period.label}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="rentalPeriod" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Property Details */}
            {currentStep === 3 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FontAwesomeIcon icon={faBed} className="mr-2 text-accent" />
                  Property Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="numberOfBedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Bedrooms*
                    </label>
                    <Field
                      name="numberOfBedrooms"
                      type="number"
                      placeholder="e.g., 3"
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                    <ErrorMessage name="numberOfBedrooms" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="numberOfBathrooms" className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Bathrooms*
                    </label>
                    <Field
                      name="numberOfBathrooms"
                      type="number"
                      placeholder="e.g., 2"
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                    <ErrorMessage name="numberOfBathrooms" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="numberOfBalconies" className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Balconies*
                    </label>
                    <Field
                      name="numberOfBalconies"
                      type="number"
                      placeholder="e.g., 2"
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                    <ErrorMessage name="numberOfBalconies" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="areaSqft" className="block text-sm font-medium text-gray-700 mb-1">
                      Area (sqft)*
                    </label>
                    <Field
                      name="areaSqft"
                      type="number"
                      placeholder="e.g., 1500"
                      className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                    <ErrorMessage name="areaSqft" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Features */}
            {currentStep === 4 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-accent" />
                  Features
                </h2>
                <div className="mb-6">
                  <FieldArray name="features">
                    {({ push, remove }) => (
                      <div>
                        {values.features.map((feature, index) => (
                          <FeatureInput
                            key={index}
                            feature={feature}
                            index={index}
                            remove={remove}
                          />
                        ))}

                        <div className="mt-4">
                          <button
                            type="button"
                            onClick={() =>
                              push({
                                name: '',
                                type: 'amenity',
                                details: {},
                              })
                            }
                            className="flex items-center px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-dark"
                          >
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Add Feature
                          </button>
                        </div>

                        <div className="mt-4">
                          <p className="text-sm text-gray-500 mb-2">
                            Or select from common features:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {commonFeatures.map((feature, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() =>
                                  push({
                                    name: feature.name,
                                    type: feature.type,
                                    details: {},
                                  })
                                }
                                className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm"
                              >
                                <FontAwesomeIcon
                                  icon={feature.icon}
                                  className="mr-2 text-accent"
                                />
                                {feature.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </div>
              </div>
            )}

            {/* Step 6: Review & Submit */}
            {currentStep === 5 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-accent" />
                  Review & Submit
                </h2>
                <ReviewStep values={values} />

                <div className="mt-6">
                  <label className="flex items-start">
                    <Field
                      type="checkbox"
                      name="consent"
                      className="mt-1 mr-2"
                    />
                    <span className="text-sm text-gray-700">
                      I confirm that all the information provided is accurate and
                      I agree to the terms of service.
                    </span>
                  </label>
                  <ErrorMessage name="consent" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
            )}

            <FormNavigation
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              totalSteps={formSteps.length}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddPropertyForm;