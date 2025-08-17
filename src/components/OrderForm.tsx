'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { Calendar, MapPin, User, MessageSquare } from 'lucide-react';
import { OrderApiService } from '@/services/orderApiService';
import { OrderFormData } from '@/types';

// Validation schema
const orderSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phone: yup.string().required('Phone number is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  orderDate: yup.string().required('Order date is required'),
  pickupDeliveryDate: yup.string().required('Pickup/delivery date is required'),
  occasion: yup.string().required('Occasion is required'),
  budget: yup.string().required('Budget is required'),
  deliveryType: yup.mixed<'pickup' | 'delivery'>().oneOf(['pickup', 'delivery']).required('Delivery type is required'),
  deliveryTime: yup.string().required('Time preference is required'),
  paymentType: yup.string().required('Payment type is required'),
  specialRequests: yup.string().defined(),
  freshArrangementVase: yup.string().defined(),
  cutFlowersWrapped: yup.string().defined(),
  dishGardenPlanters: yup.string().defined(),
  cardMessage: yup.string().defined(),
  recipientName: yup.string().when('deliveryType', {
    is: 'delivery',
    then: (schema) => schema.required('Recipient name is required for delivery'),
    otherwise: (schema) => schema.defined()
  }),
  recipientAddress: yup.string().when('deliveryType', {
    is: 'delivery',
    then: (schema) => schema.required('Recipient address is required for delivery'),
    otherwise: (schema) => schema.defined()
  }),
  recipientPhone: yup.string().when('deliveryType', {
    is: 'delivery',
    then: (schema) => schema.required('Recipient phone is required for delivery'),
    otherwise: (schema) => schema.defined()
  })
});

const OrderForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(orderSchema),
    defaultValues: {
      orderDate: new Date().toISOString().split('T')[0],
      deliveryType: 'pickup' as const,
      budget: '',
      freshArrangementVase: '',
      cutFlowersWrapped: '',
      dishGardenPlanters: '',
      specialRequests: '',
      cardMessage: '',
      recipientName: '',
      recipientAddress: '',
      recipientPhone: ''
    }
  });

  const watchDeliveryType = watch('deliveryType');
  const watchRecipientAddress = watch('recipientAddress');
  const watchBudget = watch('budget') || '';

  // Update delivery fee when delivery type or address changes
  React.useEffect(() => {
    const fee = OrderApiService.calculateDeliveryFee(watchDeliveryType, watchRecipientAddress);
    setDeliveryFee(fee);
  }, [watchDeliveryType, watchRecipientAddress]);

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);

    try {
      // Show loading toast
      const loadingToast = toast.loading('Creating your order...');

      // Validate the data
      const validationErrors = OrderApiService.validateOrderData(data);
      if (validationErrors.length > 0) {
        toast.dismiss(loadingToast);
        toast.error(validationErrors.join(', '));
        return;
      }

      // Create the order via API
      const result = await OrderApiService.createOrder(data);
      const orderId = result.orderId;
      
      // Dismiss loading and show success
      toast.dismiss(loadingToast);
      
      // Create detailed success message
      const budgetAmount = parseFloat(data.budget) || 0;
      const orderTotal = budgetAmount + deliveryFee;
      const successMessage = `
        🌸 Order Created Successfully!
        
        Order #: ${orderId.slice(-8).toUpperCase()}
        Customer: ${data.firstName} ${data.lastName}
        ${data.deliveryType === 'delivery' ? 'Delivery' : 'Pickup'}: ${new Date(data.pickupDeliveryDate).toLocaleDateString()}
        Total: $${orderTotal.toFixed(2)}
        
        We'll contact you soon to confirm your order details.
      `;
      
      toast.success(successMessage, {
        duration: 8000,
        style: {
          background: '#059669',
          color: '#ffffff',
          maxWidth: '500px',
          padding: '16px',
          whiteSpace: 'pre-line',
        },
      });
      
      reset(); // Clear the form
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred while creating your order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const FormField: React.FC<{ label: string; error?: string; required?: boolean; className?: string; children: React.ReactNode }> = ({ 
    label, 
    error, 
    required,
    className,
    children 
  }) => (
    <div className={`space-y-2 ${className || ''}`}>
      <label className="block text-sm font-medium text-sf-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-sf-cream py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-primary text-4xl font-medium text-sf-green-primary mb-4 tracking-tight">Studio Flora</h1>
          <h2 className="font-primary text-3xl font-medium text-sf-green-primary mb-2">Flower Order Form</h2>
          <p className="font-secondary text-base text-sf-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
            Create your perfect floral arrangement with our easy-to-use order form
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Customer Information */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-sf-gray-100">
            <h3 className="font-primary text-2xl font-medium text-sf-green-primary mb-8 flex items-center">
              <User className="mr-3 text-sf-green-primary" size={24} />
              Customer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField label="First Name" error={errors.firstName?.message} required>
                <input
                  {...register('firstName')}
                  className="w-full px-4 py-3 border-2 border-sf-gray-200 rounded-lg font-secondary text-base text-sf-gray-700 bg-white transition-colors focus:outline-none focus:border-sf-green-primary focus:shadow-sm focus:shadow-sf-green-primary/10"
                  placeholder="Enter your first name"
                />
              </FormField>
              
              <FormField label="Last Name" error={errors.lastName?.message} required>
                <input
                  {...register('lastName')}
                  className="w-full px-4 py-3 border-2 border-sf-gray-200 rounded-lg font-secondary text-base text-sf-gray-700 bg-white transition-colors focus:outline-none focus:border-sf-green-primary focus:shadow-sm focus:shadow-sf-green-primary/10"
                  placeholder="Enter your last name"
                />
              </FormField>
              
              <FormField label="Phone Number" error={errors.phone?.message} required>
                <input
                  {...register('phone')}
                  className="w-full px-4 py-3 border-2 border-sf-gray-200 rounded-lg font-secondary text-base text-sf-gray-700 bg-white transition-colors focus:outline-none focus:border-sf-green-primary focus:shadow-sm focus:shadow-sf-green-primary/10"
                  placeholder="(555) 123-4567"
                  type="tel"
                />
              </FormField>
              
              <FormField label="Email Address" error={errors.email?.message} required>
                <input
                  {...register('email')}
                  className="w-full px-4 py-3 border-2 border-sf-gray-200 rounded-lg font-secondary text-base text-sf-gray-700 bg-white transition-colors focus:outline-none focus:border-sf-green-primary focus:shadow-sm focus:shadow-sf-green-primary/10"
                  placeholder="your@email.com"
                  type="email"
                />
              </FormField>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-sf-gray-100">
            <h3 className="font-primary text-2xl font-medium text-sf-green-primary mb-8 flex items-center">
              <Calendar className="mr-3 text-sf-green-primary" size={24} />
              Order Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField label="Order Date" error={errors.orderDate?.message} required>
                <input
                  {...register('orderDate')}
                  className="w-full px-4 py-3 border-2 border-sf-gray-200 rounded-lg font-secondary text-base text-sf-gray-700 bg-white transition-colors focus:outline-none focus:border-sf-green-primary focus:shadow-sm focus:shadow-sf-green-primary/10"
                  type="date"
                  min={today}
                />
              </FormField>
              
              <FormField label="Pickup/Delivery Date" error={errors.pickupDeliveryDate?.message} required>
                <input
                  {...register('pickupDeliveryDate')}
                  className="w-full px-4 py-3 border-2 border-sf-gray-200 rounded-lg font-secondary text-base text-sf-gray-700 bg-white transition-colors focus:outline-none focus:border-sf-green-primary focus:shadow-sm focus:shadow-sf-green-primary/10"
                  type="date"
                  min={today}
                />
              </FormField>
              
              <FormField label="Occasion" error={errors.occasion?.message} required>
                <select 
                  {...register('occasion')} 
                  className="w-full px-4 py-3 border-2 border-sf-gray-200 rounded-lg font-secondary text-base text-sf-gray-700 bg-white transition-colors focus:outline-none focus:border-sf-green-primary focus:shadow-sm focus:shadow-sf-green-primary/10"
                >
                  <option value="">Select occasion</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="wedding">Wedding</option>
                  <option value="funeral">Funeral/Memorial</option>
                  <option value="get-well">Get Well</option>
                  <option value="congratulations">Congratulations</option>
                  <option value="love-romance">Love & Romance</option>
                  <option value="thank-you">Thank You</option>
                  <option value="just-because">Just Because</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="other">Other</option>
                </select>
              </FormField>
              
              <FormField label="Budget ($)" error={errors.budget?.message} required>
                <input
                  {...register('budget')}
                  className="w-full px-4 py-3 border-2 border-sf-gray-200 rounded-lg font-secondary text-base text-sf-gray-700 bg-white transition-colors focus:outline-none focus:border-sf-green-primary focus:shadow-sm focus:shadow-sf-green-primary/10"
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="50.00"
                />
              </FormField>
            </div>

            {/* Order Items */}
            <div className="mt-8 space-y-6">
              <h4 className="text-lg font-semibold text-sf-green-primary mb-4">Order Items</h4>
              <FormField label="Fresh Arrangement in Vase (FAV)">
                <input
                  {...register('freshArrangementVase')}
                  className="w-full px-4 py-3 border-2 border-sf-gray-200 rounded-lg font-secondary text-base text-sf-gray-700 bg-white transition-colors focus:outline-none focus:border-sf-green-primary focus:shadow-sm focus:shadow-sf-green-primary/10"
                  placeholder="e.g., Mixed spring flowers, bright colors"
                />
              </FormField>
              
              <FormField label="Cut Flowers Wrapped (CFW)">
                <input
                  {...register('cutFlowersWrapped')}
                  className="w-full px-4 py-3 border-2 border-sf-gray-200 rounded-lg font-secondary text-base text-sf-gray-700 bg-white transition-colors focus:outline-none focus:border-sf-green-primary focus:shadow-sm focus:shadow-sf-green-primary/10"
                  placeholder="e.g., Dozen red roses"
                />
              </FormField>
              
              <FormField label="Dish Garden/Planters (DG)">
                <input
                  {...register('dishGardenPlanters')}
                  className="w-full px-4 py-3 border-2 border-sf-gray-200 rounded-lg font-secondary text-base text-sf-gray-700 bg-white transition-colors focus:outline-none focus:border-sf-green-primary focus:shadow-sm focus:shadow-sf-green-primary/10"
                  placeholder="e.g., Succulent garden in ceramic pot"
                />
              </FormField>
            </div>

            <FormField label="Special Requests & Color Preferences" className="mt-8">
              <textarea
                {...register('specialRequests')}
                className="w-full px-4 py-3 border-2 border-sf-gray-200 rounded-lg font-secondary text-base text-sf-gray-700 bg-white transition-colors focus:outline-none focus:border-sf-green-primary focus:shadow-sm focus:shadow-sf-green-primary/10 resize-none"
                rows={4}
                placeholder="Any special requests, color preferences, or additional notes..."
              />
            </FormField>
          </div>

          {/* Delivery Information */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-sf-gray-100">
            <h3 className="font-primary text-2xl font-medium text-sf-green-primary mb-8 flex items-center">
              <MapPin className="mr-3 text-sf-green-primary" size={24} />
              Delivery Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField label="Delivery Type" error={errors.deliveryType?.message} required>
                <select 
                  {...register('deliveryType')} 
                  className="w-full px-4 py-3 border-2 border-sf-gray-200 rounded-lg font-secondary text-base text-sf-gray-700 bg-white transition-colors focus:outline-none focus:border-sf-green-primary focus:shadow-sm focus:shadow-sf-green-primary/10"
                >
                  <option value="pickup">Pickup</option>
                  <option value="delivery">Delivery</option>
                </select>
              </FormField>
              
              <FormField label="Time Preference" error={errors.deliveryTime?.message} required>
                <select 
                  {...register('deliveryTime')} 
                  className="w-full px-4 py-3 border-2 border-sf-gray-200 rounded-lg font-secondary text-base text-sf-gray-700 bg-white transition-colors focus:outline-none focus:border-sf-green-primary focus:shadow-sm focus:shadow-sf-green-primary/10"
                >
                  <option value="">Select time</option>
                  <option value="morning">Morning (8AM - 12PM)</option>
                  <option value="afternoon">Afternoon (12PM - 5PM)</option>
                  <option value="evening">Evening (5PM - 8PM)</option>
                  <option value="anytime">Anytime</option>
                </select>
              </FormField>
            </div>

            {/* Recipient Information (shown only for delivery) */}
            {watchDeliveryType === 'delivery' && (
              <div className="mt-8 p-8 bg-sf-green-50 border border-sf-green-200 rounded-xl">
                <h4 className="text-lg font-semibold text-sf-green-primary mb-6">Recipient Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField label="Recipient Name" error={errors.recipientName?.message} required>
                    <input
                      {...register('recipientName')}
                      className="w-full px-4 py-3 border-2 border-sf-gray-200 rounded-lg font-secondary text-base text-sf-gray-700 bg-white transition-colors focus:outline-none focus:border-sf-green-primary focus:shadow-sm focus:shadow-sf-green-primary/10"
                      placeholder="Recipient's full name"
                    />
                  </FormField>
                  
                  <FormField label="Recipient Phone" error={errors.recipientPhone?.message} required>
                    <input
                      {...register('recipientPhone')}
                      className="w-full px-4 py-3 border-2 border-sf-gray-200 rounded-lg font-secondary text-base text-sf-gray-700 bg-white transition-colors focus:outline-none focus:border-sf-green-primary focus:shadow-sm focus:shadow-sf-green-primary/10"
                      placeholder="Recipient's phone number"
                      type="tel"
                    />
                  </FormField>
                  
                  <div className="md:col-span-2">
                    <FormField label="Delivery Address" error={errors.recipientAddress?.message} required>
                      <textarea
                        {...register('recipientAddress')}
                        className="w-full px-4 py-3 border-2 border-sf-gray-200 rounded-lg font-secondary text-base text-sf-gray-700 bg-white transition-colors focus:outline-none focus:border-sf-green-primary focus:shadow-sm focus:shadow-sf-green-primary/10 resize-none"
                        rows={3}
                        placeholder="Full delivery address including street, city, state, and zip code"
                      />
                    </FormField>
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Fee Display */}
            {deliveryFee > 0 && (
              <div className="mt-6 p-4 bg-sf-green-100 border border-sf-green-200 rounded-lg">
                <p className="text-sm text-sf-green-dark font-medium">
                  <strong>Delivery Fee:</strong> ${deliveryFee.toFixed(2)}
                </p>
              </div>
            )}
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-sf-gray-100">
            <h3 className="font-primary text-2xl font-medium text-sf-green-primary mb-8 flex items-center">
              <MessageSquare className="mr-3 text-sf-green-primary" size={24} />
              Additional Information
            </h3>
            
            <div className="space-y-6">
              <FormField label="Card Message">
                <textarea
                  {...register('cardMessage')}
                  className="w-full px-4 py-3 border-2 border-sf-gray-200 rounded-lg font-secondary text-base text-sf-gray-700 bg-white transition-colors focus:outline-none focus:border-sf-green-primary focus:shadow-sm focus:shadow-sf-green-primary/10 resize-none"
                  rows={4}
                  placeholder="Message for the card (if applicable)..."
                />
              </FormField>
              
              <FormField label="Payment Type" error={errors.paymentType?.message} required>
                <select 
                  {...register('paymentType')} 
                  className="w-full px-4 py-3 border-2 border-sf-gray-200 rounded-lg font-secondary text-base text-sf-gray-700 bg-white transition-colors focus:outline-none focus:border-sf-green-primary focus:shadow-sm focus:shadow-sf-green-primary/10"
                >
                  <option value="">Select payment method</option>
                  <option value="cash">Cash</option>
                  <option value="check">Check</option>
                  <option value="credit-card">Credit Card</option>
                  <option value="venmo">Venmo</option>
                  <option value="paypal">PayPal</option>
                  <option value="zelle">Zelle</option>
                </select>
              </FormField>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-sf-green-50 border-2 border-sf-green-200 rounded-2xl p-8">
            <h3 className="font-primary text-2xl font-medium text-sf-green-primary mb-6 text-center">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-sf-gray-700">Order Amount:</span>
                <span className="font-semibold text-sf-gray-900">${(parseFloat(watchBudget) || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sf-gray-700">Delivery Fee:</span>
                <span className="font-semibold text-sf-gray-900">${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="border-t-2 border-sf-green-200 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-sf-green-primary">Total:</span>
                  <span className="text-xl font-bold text-sf-green-primary">${((parseFloat(watchBudget) || 0) + deliveryFee).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-8 border-t border-sf-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-sf-green-primary text-white px-8 py-4 rounded-lg font-secondary text-lg font-medium border-none cursor-pointer transition-all duration-200 hover:bg-sf-green-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sf-green-primary/15 w-full sm:w-auto sm:px-12 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Creating Order...' : 'Submit Order'}
            </button>
            <p className="text-sf-gray-500 text-sm mt-4">
              We&apos;ll contact you soon to confirm your order details
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;