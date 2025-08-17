# Studio Flora Order App - Design System & Style Guide

## 1. Brand Overview

### 1.1 Brand Personality
- **Elegant & Sophisticated**: Professional floral business with refined aesthetic
- **Natural & Organic**: Earth-inspired with botanical elements
- **Warm & Approachable**: Welcoming while maintaining professionalism
- **Clean & Modern**: Contemporary design with timeless appeal

### 1.2 Visual Principles
- Use of natural imagery and organic shapes
- Clean, uncluttered layouts with generous white space
- Soft, nature-inspired color palette
- High-quality photography as primary visual element
- Elegant typography that's both readable and refined

## 2. Color Palette

### 2.1 Primary Colors
```css
/* Studio Flora Green - Primary Brand Color */
--sf-green-primary: #4a5d3a;        /* Deep forest green from header */
--sf-green-light: #6b7c5a;          /* Lighter green for hover states */
--sf-green-dark: #3a4d2a;           /* Darker green for text/accents */

/* Secondary Greens */
--sf-green-50: #f7f9f5;             /* Lightest green for backgrounds */
--sf-green-100: #e8f0e3;            /* Light green for subtle highlights */
--sf-green-200: #d1e0c8;            /* Medium light for borders */
--sf-green-300: #a8c295;            /* Medium green for secondary elements */
```

### 2.2 Neutral Colors
```css
/* Whites & Creams */
--sf-white: #ffffff;                 /* Pure white for backgrounds */
--sf-cream: #faf9f7;                /* Warm cream for off-white areas */
--sf-beige: #f5f3f0;                /* Light beige for subtle backgrounds */

/* Grays */
--sf-gray-50: #f9fafb;              /* Lightest gray */
--sf-gray-100: #f3f4f6;             /* Light gray for borders */
--sf-gray-200: #e5e7eb;             /* Medium light gray */
--sf-gray-300: #d1d5db;             /* Medium gray */
--sf-gray-400: #9ca3af;             /* Medium dark gray */
--sf-gray-500: #6b7280;             /* Dark gray for secondary text */
--sf-gray-600: #4b5563;             /* Darker gray for body text */
--sf-gray-700: #374151;             /* Very dark gray for headings */
--sf-gray-800: #1f2937;             /* Near black for primary text */
--sf-gray-900: #111827;             /* Darkest for strong emphasis */
```

### 2.3 Accent Colors
```css
/* Earth Tones */
--sf-brown-light: #d4b896;          /* Light tan from website elements */
--sf-brown-medium: #b8956f;         /* Medium brown for accents */
--sf-brown-dark: #8b6f4a;           /* Dark brown for contrast */

/* Status Colors */
--sf-success: #059669;              /* Green for success states */
--sf-warning: #d97706;              /* Amber for warnings */
--sf-error: #dc2626;                /* Red for errors */
--sf-info: #0284c7;                 /* Blue for information */
```

## 3. Typography

### 3.1 Font Families
```css
/* Primary Font - For headings and brand elements */
--font-primary: 'Playfair Display', 'Georgia', serif;  /* Elegant serif for headers */

/* Secondary Font - For body text and UI elements */
--font-secondary: 'Inter', 'system-ui', '-apple-system', sans-serif;  /* Clean sans-serif */

/* Accent Font - For special elements */
--font-accent: 'Dancing Script', 'cursive';  /* Script font for special occasions */
```

### 3.2 Font Sizes & Weights
```css
/* Headings */
--text-6xl: 3.75rem;    /* 60px - Hero titles */
--text-5xl: 3rem;       /* 48px - Main page titles */
--text-4xl: 2.25rem;    /* 36px - Section headers */
--text-3xl: 1.875rem;   /* 30px - Subsection headers */
--text-2xl: 1.5rem;     /* 24px - Card titles */
--text-xl: 1.25rem;     /* 20px - Large text */

/* Body Text */
--text-lg: 1.125rem;    /* 18px - Large body text */
--text-base: 1rem;      /* 16px - Standard body text */
--text-sm: 0.875rem;    /* 14px - Small text */
--text-xs: 0.75rem;     /* 12px - Captions, labels */

/* Font Weights */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### 3.3 Typography Hierarchy
```css
/* Studio Flora Logo */
.sf-logo {
  font-family: var(--font-primary);
  font-size: var(--text-4xl);
  font-weight: var(--font-medium);
  color: var(--sf-green-primary);
  letter-spacing: -0.025em;
}

/* Page Titles */
.sf-title-main {
  font-family: var(--font-primary);
  font-size: var(--text-5xl);
  font-weight: var(--font-semibold);
  color: var(--sf-gray-800);
  line-height: 1.1;
}

/* Section Headers */
.sf-title-section {
  font-family: var(--font-primary);
  font-size: var(--text-3xl);
  font-weight: var(--font-medium);
  color: var(--sf-green-primary);
  line-height: 1.2;
}

/* Body Text */
.sf-text-body {
  font-family: var(--font-secondary);
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  color: var(--sf-gray-600);
  line-height: 1.6;
}

/* Small Text */
.sf-text-small {
  font-family: var(--font-secondary);
  font-size: var(--text-sm);
  font-weight: var(--font-normal);
  color: var(--sf-gray-500);
  line-height: 1.5;
}
```

## 4. Component Styles

### 4.1 Buttons
```css
/* Primary Button */
.sf-button-primary {
  background-color: var(--sf-green-primary);
  color: var(--sf-white);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-family: var(--font-secondary);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  border: none;
  transition: all 0.2s ease;
}

.sf-button-primary:hover {
  background-color: var(--sf-green-light);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(74, 93, 58, 0.15);
}

/* Secondary Button */
.sf-button-secondary {
  background-color: transparent;
  color: var(--sf-green-primary);
  border: 2px solid var(--sf-green-primary);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-family: var(--font-secondary);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  transition: all 0.2s ease;
}

.sf-button-secondary:hover {
  background-color: var(--sf-green-primary);
  color: var(--sf-white);
}

/* Large Button */
.sf-button-large {
  padding: 1rem 2rem;
  font-size: var(--text-lg);
  border-radius: 0.75rem;
}
```

### 4.2 Form Elements
```css
/* Input Fields */
.sf-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid var(--sf-gray-200);
  border-radius: 0.5rem;
  font-family: var(--font-secondary);
  font-size: var(--text-base);
  color: var(--sf-gray-700);
  background-color: var(--sf-white);
  transition: border-color 0.2s ease;
}

.sf-input:focus {
  outline: none;
  border-color: var(--sf-green-primary);
  box-shadow: 0 0 0 3px rgba(74, 93, 58, 0.1);
}

/* Labels */
.sf-label {
  display: block;
  font-family: var(--font-secondary);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--sf-gray-700);
  margin-bottom: 0.5rem;
}

/* Textarea */
.sf-textarea {
  min-height: 120px;
  resize: vertical;
  font-family: var(--font-secondary);
}

/* Select Dropdown */
.sf-select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  padding-right: 2.5rem;
}
```

### 4.3 Cards
```css
/* Standard Card */
.sf-card {
  background-color: var(--sf-white);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--sf-gray-100);
  transition: all 0.2s ease;
}

.sf-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

/* Image Card (like homepage service cards) */
.sf-card-image {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  background-color: var(--sf-gray-100);
}

.sf-card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: var(--sf-white);
  padding: 1.5rem;
}

/* Order Summary Card */
.sf-card-order {
  background-color: var(--sf-green-50);
  border: 2px solid var(--sf-green-200);
  border-radius: 1rem;
  padding: 1.5rem;
}
```

### 4.4 Status Indicators
```css
/* Order Status Badges */
.sf-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.sf-badge-pending {
  background-color: #fef3c7;
  color: #92400e;
}

.sf-badge-progress {
  background-color: #dbeafe;
  color: #1e40af;
}

.sf-badge-ready {
  background-color: #d1fae5;
  color: #065f46;
}

.sf-badge-completed {
  background-color: var(--sf-green-100);
  color: var(--sf-green-dark);
}

.sf-badge-cancelled {
  background-color: #fee2e2;
  color: #991b1b;
}
```

## 5. Layout & Spacing

### 5.1 Spacing Scale
```css
/* Spacing Scale (based on 0.25rem = 4px) */
--space-0: 0;
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
```

### 5.2 Container Widths
```css
/* Container Sizes */
.sf-container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

/* Responsive Breakpoints */
@media (min-width: 640px) {  /* sm */
  .sf-container { max-width: 640px; }
}

@media (min-width: 768px) {  /* md */
  .sf-container { max-width: 768px; }
}

@media (min-width: 1024px) { /* lg */
  .sf-container { max-width: 1024px; }
}

@media (min-width: 1280px) { /* xl */
  .sf-container { max-width: 1280px; }
}
```

### 5.3 Grid Layouts
```css
/* Standard Grid */
.sf-grid {
  display: grid;
  gap: var(--space-6);
}

.sf-grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.sf-grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

/* Responsive Grid */
.sf-grid-responsive {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

/* Form Grid */
.sf-form-grid {
  display: grid;
  gap: var(--space-4);
}

@media (min-width: 768px) {
  .sf-form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

## 6. Icons & Imagery

### 6.1 Icon Style
- Use Lucide React icons for consistency
- Size: 16px (1rem) for inline icons, 24px (1.5rem) for standalone icons
- Color: Match text color or use green accent
- Style: Outline style, 2px stroke width

### 6.2 Image Guidelines
- Use high-quality floral photography as hero images
- Maintain 16:9 aspect ratio for featured images
- Use overlay gradients for text readability
- Soft, natural lighting preferred
- Professional, elegant composition

## 7. Animation & Interactions

### 7.1 Transitions
```css
/* Standard Transitions */
.sf-transition {
  transition: all 0.2s ease;
}

.sf-transition-slow {
  transition: all 0.3s ease;
}

/* Hover Effects */
.sf-hover-lift:hover {
  transform: translateY(-2px);
}

.sf-hover-scale:hover {
  transform: scale(1.02);
}
```

### 7.2 Loading States
```css
/* Loading Spinner */
.sf-spinner {
  border: 3px solid var(--sf-green-100);
  border-top: 3px solid var(--sf-green-primary);
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Skeleton Loading */
.sf-skeleton {
  background: linear-gradient(90deg, var(--sf-gray-100) 25%, var(--sf-gray-50) 50%, var(--sf-gray-100) 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

## 8. Mobile Responsiveness

### 8.1 Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px+

### 8.2 Mobile-First Approach
- Start with mobile layout
- Use progressive enhancement for larger screens
- Touch-friendly button sizes (min 44px height)
- Readable text sizes (min 16px)
- Adequate spacing for touch interactions

## 9. Accessibility

### 9.1 Color Contrast
- Ensure WCAG AA compliance (4.5:1 contrast ratio minimum)
- Test all color combinations
- Provide focus indicators for interactive elements

### 9.2 Typography
- Minimum font size: 16px for body text
- Clear hierarchy and logical reading order
- Sufficient line height (1.5+) for readability

## 10. Implementation Notes for Claude Code

### 10.1 CSS Custom Properties
Define all color and spacing variables as CSS custom properties at the root level for easy maintenance and theme consistency.

### 10.2 Untitled UI Integration
When using Untitled UI components, apply Studio Flora styling through:
- Custom CSS classes
- Theme override props
- Wrapper components with Studio Flora styling

### 10.3 Tailwind Configuration
Configure Tailwind CSS to include Studio Flora color palette and spacing scale in the config file for seamless integration.

---

**Note**: This style guide should be used in conjunction with Untitled UI components, applying Studio Flora branding on top of the base component library for consistency and efficiency.