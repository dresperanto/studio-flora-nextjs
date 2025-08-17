import { OrderFormData, Order } from '@/types';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export class OrderService {
  // Server-side order creation (saves to Firebase)
  static async createOrder(formData: OrderFormData): Promise<string> {
    const orderNumber = this.generateOrderNumber();
    
    // Convert form data to order object
    const orderData: Omit<Order, 'id'> = {
      orderNumber,
      orderDate: new Date(formData.orderDate),
      pickupDeliveryDate: new Date(formData.pickupDeliveryDate),
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email
      },
      customerId: null,
      isGuestOrder: true,
      items: {
        freshArrangementVase: formData.freshArrangementVase || '',
        cutFlowersWrapped: formData.cutFlowersWrapped || '',
        dishGardenPlanters: formData.dishGardenPlanters || ''
      },
      occasion: formData.occasion,
      budget: parseFloat(formData.budget),
      specialRequests: formData.specialRequests || '',
      deliveryType: formData.deliveryType,
      deliveryTime: formData.deliveryTime,
      recipient: formData.deliveryType === 'delivery' ? {
        name: formData.recipientName || '',
        address: formData.recipientAddress || '',
        phone: formData.recipientPhone || ''
      } : undefined,
      deliveryFee: this.calculateDeliveryFee(formData.deliveryType, formData.recipientAddress),
      cardMessage: formData.cardMessage || '',
      paymentType: formData.paymentType,
      status: 'pending',
      totalAmount: parseFloat(formData.budget) + this.calculateDeliveryFee(formData.deliveryType, formData.recipientAddress),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    try {
      // Save to Firebase Firestore
      const docRef = await addDoc(collection(db, 'orders'), {
        ...orderData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      console.log('Order created successfully in Firebase:', docRef.id);
      return orderNumber;
    } catch (error) {
      console.error('Error saving order to Firebase:', error);
      throw new Error('Failed to save order to database');
    }
  }

  // Generate a unique order number
  private static generateOrderNumber(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `SF-${timestamp}-${random}`;
  }

  // Get orders (server-side)
  static async getOrders(customerId?: string) {
    try {
      const ordersRef = collection(db, 'orders');
      const { getDocs, query, where, orderBy } = await import('firebase/firestore');
      
      let ordersQuery;
      if (customerId) {
        ordersQuery = query(
          ordersRef,
          where('customerId', '==', customerId),
          orderBy('createdAt', 'desc')
        );
      } else {
        ordersQuery = query(ordersRef, orderBy('createdAt', 'desc'));
      }
      
      const querySnapshot = await getDocs(ordersQuery);
      const orders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return orders;
    } catch (error) {
      console.error('Error fetching orders from Firebase:', error);
      throw new Error('Failed to fetch orders from database');
    }
  }

  // Calculate delivery fee (server-side utility)
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

  // Server-side validation (should match client-side)
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
