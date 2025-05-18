// types/property.ts
export interface PropertyFeature {
  featureId: string;
  name: string;
  type: string;
  details: Record<string, any>;
  createdAt: string;
}

export interface PropertyAddress {
  addressId: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyLocation {
  locationId: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}

export interface Property {
  propertyId: string;
  title: string;
  description: string;
  propertyType: string;
  addressId: string;
  address: PropertyAddress;
  locationId: string;
  location: PropertyLocation;
  areaSqft: number;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  numberOfBalconies: number;
  rentAmount: number;
  depositAmount: number;
  rentalPeriod: string;
  images: string[];
  phoneNumber: string;
  features: PropertyFeature[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Feature {
  name: string;
  type: 'amenity' | 'facility';
  details: Record<string, any>;
}

export interface PropertyFormValues {
  title: string;
  description: string;
  propertyType: string;
  images: File[];
  uploadedImageUrls: string[];
  address: Address;
  location: Location;
  phoneNumber: string;
  rentAmount: number;
  depositAmount: number;
  rentalPeriod: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  numberOfBalconies: number;
  areaSqft: number;
  features: Feature[];
  consent: boolean;
}

export interface StepIndicatorProps {
  currentStep: number;
  steps: { id: string; label: string; icon: any }[];
}

export interface FormNavigationProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
}

export interface FeatureInputProps {
  feature: Feature;
  index: number;
  remove: (index: number) => void;
}

export interface ImageUploadPreviewProps {
  images: File[];
  uploadedImageUrls: string[];
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

export interface MapSelectorProps {
  setLocation: (location: { lat: number; lng: number }) => void;
  initialLocation?: { lat: number; lng: number };
}

export interface ReviewStepProps {
  values: PropertyFormValues;
}

export interface SectionProps {
  values: PropertyFormValues;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}