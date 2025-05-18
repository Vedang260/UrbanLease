import { type Property } from '../types/property';

export const mockProperties: any[] = [
  {
    propertyId: '1',
    title: 'Modern Apartment in City Center',
    description: 'A beautiful modern apartment located in the heart of the city with stunning views and modern amenities.',
    propertyType: 'apartment',
    rentAmount: 25000,
    depositAmount: 50000,
    areaSqft: 1200,
    numberOfBedrooms: 2,
    numberOfBathrooms: 2,
    address: {
        addressId: '123',
        street: '123 Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipcode: '400001',
        country: 'India',
        createdAt: '',
        updatedAt: ''
    },
    images: [
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    available: true,
    amenities: ['Air Conditioning', 'Gym', 'Swimming Pool', 'Parking'],
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  },
  {
    propertyId: '2',
    title: 'Spacious Villa with Garden',
    description: 'A spacious villa with a beautiful garden, perfect for families looking for a peaceful living experience.',
    propertyType: 'villa',
    rentAmount: 75000,
    depositAmount: 150000,
    areaSqft: 3500,
    numberOfBedrooms: 4,
    numberOfBathrooms: 3,
    address: {
        street: '456 Park Avenue',
        city: 'Bangalore',
        state: 'Karnataka',
        zipcode: '560001',
        country: 'India',
        addressId: '',
        createdAt: '',
        updatedAt: ''
    },
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    available: true,
    amenities: ['Garden', 'Security', 'Power Backup', 'Parking'],
    createdAt: '2023-02-01T00:00:00Z',
    updatedAt: '2023-02-01T00:00:00Z'
  },
  {
    propertyId: '3',
    title: 'Cozy Studio Apartment',
    description: 'A cozy studio apartment ideal for students or working professionals looking for affordable housing options.',
    propertyType: 'apartment',
    rentAmount: 15000,
    depositAmount: 30000,
    areaSqft: 500,
    numberOfBedrooms: 1,
    numberOfBathrooms: 1,
    address: {
        street: '789 College Road',
        city: 'Delhi',
        state: 'Delhi',
        zipcode: '110001',
        country: 'India',
        addressId: '',
        createdAt: '',
        updatedAt: ''
    },
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    available: true,
    amenities: ['Wi-Fi', 'Air Conditioning', 'Furnished', 'Laundry'],
    createdAt: '2023-03-01T00:00:00Z',
    updatedAt: '2023-03-01T00:00:00Z'
  },
  {
    propertyId: '4',
    title: 'Luxury Penthouse with Terrace',
    description: 'A luxurious penthouse with a private terrace offering panoramic views of the city skyline.',
    propertyType: 'condo',
    rentAmount: 120000,
    depositAmount: 240000,
    areaSqft: 2800,
    numberOfBedrooms: 3,
    numberOfBathrooms: 3.5,
    address: {
        street: '101 Skyline Avenue',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipcode: '400005',
        country: 'India',
        addressId: '',
        createdAt: '',
        updatedAt: ''
    },
    images: [
      'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    available: true,
    amenities: ['Private Terrace', 'Jacuzzi', 'Home Theatre', 'Private Elevator'],
    createdAt: '2023-04-01T00:00:00Z',
    updatedAt: '2023-04-01T00:00:00Z'
  },
  {
    propertyId: '5',
    title: 'Family Home Near School',
    description: 'A comfortable family home located near reputed schools and shopping centers, perfect for families with children.',
    propertyType: 'house',
    rentAmount: 45000,
    depositAmount: 90000,
    areaSqft: 1800,
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    address: {
        street: '234 School Lane',
        city: 'Chennai',
        state: 'Tamil Nadu',
        zipcode: '600001',
        country: 'India',
        addressId: '',
        createdAt: '',
        updatedAt: ''
    },
    images: [
      'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    available: true,
    amenities: ['Garden', 'Study Room', 'Playground', 'Storage'],
    createdAt: '2023-05-01T00:00:00Z',
    updatedAt: '2023-05-01T00:00:00Z'
  },
  {
    propertyId: '6',
    title: 'Modern Office Space',
    description: 'A modern office space in a commercial district, suitable for startups and small businesses.',
    propertyType: 'office',
    rentAmount: 60000,
    depositAmount: 120000,
    areaSqft: 1500,
    numberOfBedrooms: 0,
    numberOfBathrooms: 2,
    address: {
        street: '567 Business Park',
        city: 'Hyderabad',
        state: 'Telangana',
        zipcode: '500001',
        country: 'India',
        addressId: '',
        createdAt: '',
        updatedAt: ''
    },
    images: [
      'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    available: true,
    amenities: ['Conference Room', 'Reception', 'Cafeteria', 'Parking'],
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2023-06-01T00:00:00Z'
  }
];