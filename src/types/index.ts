export interface Customer {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface OrderItems {
  freshArrangementVase: string;
  cutFlowersWrapped: string;
  dishGardenPlanters: string;
}

export interface Recipient {
  name: string;
  address: string;
  phone: string;
}

export interface Order {
  id?: string;
  orderNumber: string;
  orderDate: Date;
  pickupDeliveryDate: Date;
  customer: Customer;
  customerId?: string | null;
  isGuestOrder: boolean;
  items: OrderItems;
  occasion: string;
  budget: number;
  specialRequests: string;
  deliveryType: 'pickup' | 'delivery';
  deliveryTime: string;
  recipient?: Recipient;
  deliveryFee: number;
  cardMessage: string;
  paymentType: string;
  status: 'pending' | 'in_progress' | 'ready' | 'completed' | 'cancelled';
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderFormData {
  // Customer Information
  firstName: string;
  lastName: string;
  phone: string;
  email: string;

  // Order Details
  orderDate: string;
  pickupDeliveryDate: string;
  freshArrangementVase: string;
  cutFlowersWrapped: string;
  dishGardenPlanters: string;
  occasion: string;
  budget: string; // Changed to string to match form input
  specialRequests: string;

  // Delivery Information
  deliveryType: 'pickup' | 'delivery';
  deliveryTime: string;
  
  // Recipient Information (for delivery)
  recipientName?: string;
  recipientAddress?: string;
  recipientPhone?: string;

  // Additional Details
  cardMessage: string;
  paymentType: string;
}

export interface CustomerAccount {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  authProvider: 'email' | 'google';
  addresses: CustomerAddress[];
  orderHistory: string[];
  preferences: CustomerPreferences;
  favoriteOrders: FavoriteOrder[];
  createdAt: Date;
  lastLoginAt: Date;
  lastOrderDate?: Date;
  totalOrders: number;
  lifetimeValue: number;
  isEmailVerified: boolean;
}

export interface CustomerAddress {
  id: string;
  label: string;
  address: string;
  isDefault: boolean;
}

export interface CustomerPreferences {
  favoriteFlowers: string[];
  commonOccasions: string[];
  budgetRange: string;
  preferredDeliveryTime: string;
}

export interface FavoriteOrder {
  id: string;
  name: string;
  template: Partial<OrderFormData>;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'staff';
  name: string;
  permissions: string[];
  createdAt: Date;
}

export interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
}