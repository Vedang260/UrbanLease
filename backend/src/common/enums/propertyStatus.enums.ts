export enum PropertyStatus {
  BOOKED = 'booked', // Property is rented or sold
  UNDER_CONSTRUCTION = 'under_construction', // Property is being built
  READY_TO_MOVE = 'ready_to_move', // Property is available for immediate occupancy
  SOLD = 'sold', // Property has been purchased
  AVAILABLE = 'available', // Property is available for rent or sale
  MAINTENANCE = 'maintenance', // Property is under maintenance
  PENDING_APPROVAL = 'pending_approval', // Property listing awaiting admin approval
}