import { NextRequest, NextResponse } from 'next/server';
import { OrderService } from '@/services/orderService';
import { OrderFormData } from '@/types';

// POST /api/orders - Create a new order
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const formData: OrderFormData = await request.json();

    // Validate the data server-side
    const validationErrors = OrderService.validateOrderData(formData);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationErrors 
        }, 
        { status: 400 }
      );
    }

    // Create the order
    const orderId = await OrderService.createOrder(formData);

    // Calculate delivery fee for response
    const deliveryFee = OrderService.calculateDeliveryFee(
      formData.deliveryType, 
      formData.recipientAddress
    );

    // Return success response
    return NextResponse.json({
      success: true,
      orderId,
      deliveryFee,
      message: 'Order created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('API Error creating order:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to create order', 
        message: error instanceof Error ? error.message : 'Unknown error occurred' 
      }, 
      { status: 500 }
    );
  }
}

// GET /api/orders - Get orders (for admin functionality)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');

    let orders;
    if (customerId) {
      // Get orders for specific customer
      orders = await OrderService.getOrders(customerId);
    } else {
      // Get all orders (admin functionality)
      orders = await OrderService.getOrders();
    }

    return NextResponse.json({
      success: true,
      orders,
      count: orders.length
    });

  } catch (error) {
    console.error('API Error fetching orders:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch orders', 
        message: error instanceof Error ? error.message : 'Unknown error occurred' 
      }, 
      { status: 500 }
    );
  }
}