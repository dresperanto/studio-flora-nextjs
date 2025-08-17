import { OrderFormData } from '@/types';

export class OrderApiService {
  private static readonly API_BASE = '/api/orders';

  // Create order via API route (more secure)
  static async createOrder(formData: OrderFormData): Promise<{orderId: string, deliveryFee: number}> {
    try {
      const response = await fetch(this.API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create order');
      }

      const data = await response.json();
      return {
        orderId: data.orderId,
        deliveryFee: data.deliveryFee
      };
    } catch (error) {
      console.error('Error creating order via API:', error);
      throw error;
    }
  }

  // Get orders via API route
  static async getOrders(customerId?: string) {
    try {
      const url = customerId 
        ? `${this.API_BASE}?customerId=${encodeURIComponent(customerId)}`
        : this.API_BASE;

      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch orders');
      }

      const data = await response.json();
      return data.orders;
    } catch (error) {
      console.error('Error fetching orders via API:', error);
      throw error;
    }
  }

  // Calculate delivery fee (client-side utility)
  static calculateDeliveryFee(deliveryType: string, address?: string): number {
    if (deliveryType === 'pickup') {
      return 0;
    }
    
    if (!address) {
      return 15; // Default delivery fee
    }

    // Simple placeholder logic
    const lowerAddress = address.toLowerCase();
    if (lowerAddress.includes('downtown') || lowerAddress.includes('city center')) {
      return 10;
    } else if (lowerAddress.includes('suburbs')) {
      return 20;
    } else {
      return 15; // Standard delivery fee
    }
  }

  // Client-side validation (should match server-side)
  static validateOrderData(formData: OrderFormData): string[] {
    const errors: string[] = [];

    // Required field validation
    if (!formData.firstName.trim()) errors.push('First name is required');
    if (!formData.lastName.trim()) errors.push('Last name is required');
    if (!formData.phone.trim()) errors.push('Phone number is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.pickupDeliveryDate) errors.push('Pickup/delivery date is required');
    if (!formData.occasion.trim()) errors.push('Occasion is required');
    
    const budgetAmount = parseFloat(formData.budget);
    if (!formData.budget || isNaN(budgetAmount) || budgetAmount <= 0) {
      errors.push('Budget must be greater than 0');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }

    // Phone validation (basic)
    const phoneRegex = /^[+]?[\s\-()]*([0-9][\s\-()]*){10,}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      errors.push('Please enter a valid phone number');
    }

    // Date validation
    const selectedDate = new Date(formData.pickupDeliveryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      errors.push('Pickup/delivery date must be today or in the future');
    }

    // Delivery-specific validation
    if (formData.deliveryType === 'delivery') {
      if (!formData.recipientName?.trim()) errors.push('Recipient name is required for delivery');
      if (!formData.recipientAddress?.trim()) errors.push('Recipient address is required for delivery');
      if (!formData.recipientPhone?.trim()) errors.push('Recipient phone is required for delivery');
    }

    // Order items validation (at least one item should be specified)
    const hasItems = formData.freshArrangementVase.trim() || 
                    formData.cutFlowersWrapped.trim() || 
                    formData.dishGardenPlanters.trim();
    
    if (!hasItems) {
      errors.push('Please specify at least one item for your order');
    }

    return errors;
  }
}