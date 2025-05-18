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