# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Studio Flora is a Next.js 15 application for a floral order form system with Firebase backend integration. The application allows customers to submit flower orders through a single comprehensive form that handles customer information, order details, delivery preferences, and payment type selection.

## Development Commands

- **Development server**: `npm run dev` (uses Turbopack for faster builds)
- **Build**: `npm run build` 
- **Production server**: `npm start`
- **Linting**: `npm run lint`

## Architecture

### Tech Stack
- Next.js 15 with App Router
- React 19 with TypeScript
- Tailwind CSS 4 with custom Studio Flora design system
- Firebase (Firestore, Auth, Storage)
- React Hook Form with Yup validation
- React Hot Toast for notifications

### Key Directories
- `src/app/` - Next.js App Router pages and API routes
- `src/components/` - React components (currently contains OrderForm)
- `src/services/` - Business logic and API services
- `src/types/` - TypeScript type definitions
- `src/lib/` - Utility libraries and Firebase configuration

### Design System
The project uses a comprehensive Tailwind configuration with Studio Flora branding:
- Primary color palette based on Studio Flora green (`sf-green`)
- Custom font families: Playfair Display (primary), Inter (secondary), Dancing Script (accent)
- Custom spacing, shadows, and animation utilities
- Semantic color tokens for status states and earth tones

### Data Flow
1. Customer fills out OrderForm component
2. Form data is validated client-side with Yup schema
3. OrderApiService sends data to `/api/orders` route
4. API route validates data server-side via OrderService
5. OrderService creates order in Firebase Firestore
6. Success/error feedback via React Hot Toast

### Form Architecture
The OrderForm handles:
- Customer information (name, phone, email)
- Order details (dates, flower types, occasion, budget)
- Delivery/pickup preferences with conditional recipient fields
- Payment type selection
- Special requests and card messages

### Firebase Integration
- Authentication ready (not currently implemented in UI)
- Firestore for order storage with comprehensive Order schema
- Storage service available for future image uploads
- Configuration in `src/lib/firebase.ts`

### Type System
Comprehensive TypeScript interfaces in `src/types/index.ts`:
- `OrderFormData` - Form input structure
- `Order` - Complete order entity with status tracking
- `Customer`, `Recipient` - User data structures
- `CustomerAccount` - Future customer portal features

### Services Layer
- `OrderApiService` - Frontend API communication
- `OrderService` - Backend business logic (order creation, validation, delivery fee calculation)

## Development Notes

- Form uses conditional validation for delivery vs pickup scenarios
- Delivery fee calculation integrated into order flow
- Toast notifications styled to match Studio Flora branding
- Order status tracking prepared for future admin dashboard
- Customer account system architected but not yet implemented in UI