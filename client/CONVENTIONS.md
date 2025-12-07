# Coding Conventions & Standards

This document outlines the coding conventions and standards for the FashionStore Web project. All developers should follow these guidelines to maintain consistency and code quality.

## Table of Contents

1. [Naming Conventions](#naming-conventions)
2. [File Structure](#file-structure)
3. [Component Organization](#component-organization)
4. [Import Statements](#import-statements)
5. [Code Style](#code-style)
6. [Layout System](#layout-system)
7. [API Integration](#api-integration)

---

## Naming Conventions

### Folders

- **Pages**: Use `camelCase` or `lowercase` for page folders
  - ✅ `cart/`, `category/`, `contact/`, `home/`, `login/`, `profile/`
  - ❌ `Cart/`, `Category/`, `CONTACT/`

- **Layouts**: Use `camelCase` for layout folders
  - ✅ `defaultLayout/`, `adminLayout/`, `header/`, `footer/`, `sidebar/`
  - ❌ `DefaultLayout/`, `Header/`, `Sidebar/`

- **Components**: Use `camelCase` for component folders
  - ✅ `button/`, `card/`, `input/`, `modal/`, `pagination/`
  - ❌ `Button/`, `Card/`, `INPUT/`

- **Assets**: Use `camelCase` for asset folders
  - ✅ `avatar/`, `cart/`, `logo/`, `user/`
  - ❌ `Avatar/`, `Cart/`, `LOGO/`

### Files

- **Component Files**: Always use `index.jsx` for the main component file within its folder
  - ✅ `components/button/index.jsx`
  - ❌ `components/button/Button.jsx`

- **Page Files**: Always use `index.jsx` for the main page file
  - ✅ `pages/public/cart/index.jsx`
  - ❌ `pages/public/cart/Cart.jsx`

- **Layout Files**: Always use `index.jsx` for the main layout file
  - ✅ `layouts/public/defaultLayout/index.jsx`
  - ❌ `layouts/public/defaultLayout/DefaultLayout.jsx`

- **Style Files**: Use `ComponentName.module.scss` (PascalCase for the component name)
  - ✅ `Button.module.scss`, `Card.module.scss`, `Header.module.scss`
  - ❌ `button.module.scss`, `card.module.scss`

### Functions and Components

- **Component Functions**: Use `PascalCase` for component function names
  ```jsx
  export default function Category() { ... }
  export default function Login() { ... }
  ```

- **Regular Functions**: Use `camelCase` for regular functions
  ```jsx
  const handleSubmit = () => { ... }
  const fetchApiData = async () => { ... }
  ```

- **Constants**: Use `UPPER_SNAKE_CASE` for constants
  ```jsx
  const API_BASE_URL = 'https://api.example.com';
  const MAX_RETRY_COUNT = 3;
  ```

### Variables

- Use `camelCase` for variables
  ```jsx
  const productData = [];
  const isLoggedIn = true;
  const currentUser = {};
  ```

---

## File Structure

### Project Structure

```
client/src/
├── apis/              # API service files
├── assets/            # Static assets (images, icons, etc.)
│   ├── avatar/
│   ├── cart/
│   ├── logo/
│   └── user/
├── components/        # Reusable UI components
│   ├── button/
│   │   ├── index.jsx
│   │   └── Button.module.scss
│   ├── card/
│   └── ...
├── config/            # Configuration files
├── hooks/             # Custom React hooks
├── layouts/           # Layout components
│   ├── admin/
│   │   └── adminLayout/
│   │       └── index.jsx
│   └── public/
│       ├── defaultLayout/
│       ├── header/
│       ├── footer/
│       └── sidebar/
│           ├── category/
│           ├── colors/
│           └── price/
├── pages/             # Page components
│   ├── admin/
│   │   ├── dashboard/
│   │   ├── orders/
│   │   └── ...
│   └── public/
│       ├── cart/
│       ├── category/
│       ├── home/
│       └── ...
├── redux/             # Redux store and slices
├── routes/            # Route configuration
└── utils/             # Utility functions
```

### Component Folder Structure

Each component should have its own folder with the following structure:

```
componentName/
├── index.jsx          # Main component file (required)
├── ComponentName.module.scss  # Styles (if needed)
└── [other files]     # Additional files if needed
```

---

## Component Organization

### Component Structure

1. **Imports**: Order imports as follows:
   ```jsx
   // 1. React and React-related
   import React, { useState, useEffect } from 'react';
   
   // 2. Third-party libraries
   import { Row, Col } from 'antd';
   import { toast } from 'react-toastify';
   
   // 3. Internal components
   import Button from '~/components/button';
   import Card from '~/components/card';
   
   // 4. Internal layouts
   import Header from '~/layouts/public/header';
   
   // 5. Internal utilities and configs
   import config from '~/config';
   import { formatDate } from '~/utils/helpers';
   
   // 6. APIs
   import { getAllProducts } from '~/apis/products';
   
   // 7. Styles
   import styles from './ComponentName.module.scss';
   ```

2. **Component Definition**: Use function components with default export
   ```jsx
   export default function ComponentName() {
     // Component logic
     return (
       // JSX
     );
   }
   ```

3. **PropTypes**: Use PropTypes for type checking (if not using TypeScript)
   ```jsx
   import PropTypes from 'prop-types';
   
   ComponentName.propTypes = {
     title: PropTypes.string.isRequired,
     count: PropTypes.number,
   };
   ```

---

## Import Statements

### Import Paths

- **Use `~` alias** for imports from `src` directory
  ```jsx
  import Button from '~/components/button';
  import { getAllProducts } from '~/apis/products';
  import config from '~/config';
  ```

- **Relative imports** should only be used for:
  - Files in the same directory
  - Parent/child directories within the same feature
  ```jsx
  import CommentForm from './CommentForm';
  import Comment from './Comment';
  ```

### Import Naming

- Import component folders directly (they resolve to `index.jsx`)
  ```jsx
  ✅ import Button from '~/components/button';
  ✅ import Header from '~/layouts/public/header';
  ❌ import Button from '~/components/button/Button';
  ❌ import Header from '~/layouts/public/header/Header';
  ```

---

## CSS and Styling

### CSS Modules

- **Always use CSS Modules** instead of inline styles
- **File naming**: Use `ComponentName.module.scss` (PascalCase for component name)
- **Import styles**: `import styles from './ComponentName.module.scss'`
- **Class naming**: Use camelCase for class names in CSS modules

```jsx
// ✅ Correct: Using CSS Modules
import styles from './ProductDetail.module.scss';

<div className={styles.productContainer}>
  <h1 className={styles.title}>Product</h1>
</div>

// ❌ Wrong: Inline styles
<div style={{ margin: '20px', padding: '10px' }}>
  <h1 style={{ fontSize: '18px' }}>Product</h1>
</div>
```

### CSS Units

- **Use `rem` for spacing, sizing, and layout properties**
  - Base font size: 16px (1rem = 16px)
  - Conversion: `px / 16 = rem`
  - Examples:
    - `10px` → `0.625rem`
    - `20px` → `1.25rem`
    - `40px` → `2.5rem`
    - `100px` → `6.25rem`

- **Use `em` for typography relative to parent element**
  - Use when size should scale with parent font size
  - Example: `font-size: 1.2em` (20% larger than parent)

- **Avoid `px` for layout and spacing**
  - Only use `px` for:
    - Border widths (1px, 2px)
    - Very small values (< 4px)
    - Box shadows (can use px or rem)

```scss
// ✅ Correct: Using rem
.container {
  margin: 1.25rem;        // 20px
  padding: 2.5rem;        // 40px
  font-size: 1.125rem;    // 18px
  border-radius: 0.625rem; // 10px
}

// ❌ Wrong: Using px
.container {
  margin: 20px;
  padding: 40px;
  font-size: 18px;
  border-radius: 10px;
}
```

### CSS Best Practices

1. **Avoid inline styles**: Always use CSS Modules
2. **Use semantic class names**: `.productContainer` not `.div1`
3. **Keep styles scoped**: CSS Modules automatically scope classes
4. **Use variables for colors**: Define in SCSS variables or CSS custom properties
5. **Responsive design**: Use relative units (rem, em, %) for better scalability
6. **Consistent spacing**: Use a spacing scale (e.g., 0.5rem, 1rem, 1.5rem, 2rem)

### SCSS Features

- Use SCSS nesting for component styles
- Use mixins for repeated patterns
- Use variables for colors, spacing, and breakpoints

```scss
// Variables
$primary-color: #E280AD;
$spacing-unit: 1rem;

// Mixins
@mixin button-base {
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 1rem;
}

// Usage
.button {
  @include button-base;
  background-color: $primary-color;
  margin: $spacing-unit;
}
```

### Dynamic Styles

- For dynamic styles (e.g., colors from props), use CSS custom properties (CSS variables)
- Avoid inline styles even for dynamic values

```jsx
// ✅ Correct: Using CSS custom properties
<div style={{ '--color': color }} className={styles.colorSwatch} />

// In SCSS
.colorSwatch {
  background-color: var(--color);
}

// ❌ Wrong: Inline styles
<div style={{ backgroundColor: color }} />
```

---

## Code Style

### JavaScript/JSX

1. **Use functional components** with hooks
   ```jsx
   ✅ export default function Component() { ... }
   ❌ class Component extends React.Component { ... }
   ```

2. **Use const/let**, avoid `var`
   ```jsx
   ✅ const [state, setState] = useState();
   ✅ let temp = '';
   ❌ var temp = '';
   ```

3. **Arrow functions** for callbacks and event handlers
   ```jsx
   ✅ const handleClick = () => { ... };
   ✅ onClick={() => handleClick()}
   ```

4. **Template literals** for string concatenation
   ```jsx
   ✅ const message = `Hello, ${name}!`;
   ❌ const message = 'Hello, ' + name + '!';
   ```

5. **Destructuring** for props and state
   ```jsx
   ✅ const { title, count } = props;
   ✅ const [data, setData] = useState([]);
   ```

### Spacing and Formatting

- Use 2 spaces for indentation
- Use single quotes for strings (unless using template literals)
- Add trailing commas in multi-line objects/arrays
- Maximum line length: 100 characters

```jsx
const obj = {
  name: 'John',
  age: 30,
  city: 'New York',
};
```

---

## Layout System

### Layout Usage

- **Always use the layout system** defined in `App.jsx`
- **Never import Header/Footer directly** in page components
- Layouts are automatically applied based on route configuration

```jsx
// ✅ Correct: Layout is applied automatically via App.jsx
export default function Category() {
  return <div>Content</div>;
}

// ❌ Wrong: Direct import of Header/Footer
import Header from '~/layouts/public/header';
import Footer from '~/layouts/public/footer';
```

### Layout Types

- **DefaultLayout**: Applied to most public pages (includes Header + Footer)
- **AdminLayout**: Applied to admin pages (includes Sidebar + Header)
- **null**: No layout (for login, register, etc.)

---

## API Integration

### API File Organization

- Group API calls by feature/resource
- Use consistent naming: `api[Action][Resource]`
  ```jsx
  apiGetUsers()
  apiCreateProduct()
  apiUpdateOrder()
  apiDeleteUser()
  ```

### Error Handling

- Always handle errors in API calls
- Use toast notifications for user feedback
  ```jsx
  try {
    const response = await apiGetProducts();
    if (response.success) {
      setProducts(response.data);
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    toast.error('An error occurred');
    console.error(error);
  }
  ```

---

## State Management

### Redux Usage

- Use Redux for global state (user, cart, etc.)
- Use local state (`useState`) for component-specific state
- Use `useSelector` and `useDispatch` hooks

```jsx
import { useSelector, useDispatch } from 'react-redux';

const { current, isLoggedIn } = useSelector((state) => state.user);
const dispatch = useDispatch();
```

---

## Best Practices

1. **DRY Principle**: Don't Repeat Yourself - reuse components and utilities
2. **Single Responsibility**: Each component should have one clear purpose
3. **Component Composition**: Build complex UIs from simple components
4. **Performance**: Use `React.memo`, `useMemo`, `useCallback` when appropriate
5. **Accessibility**: Use semantic HTML and ARIA attributes
6. **Error Boundaries**: Implement error boundaries for better error handling
7. **Code Comments**: Comment complex logic, not obvious code
8. **Testing**: Write tests for critical business logic

---

## Git Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactoring
- `style`: Code style changes (formatting, etc.)
- `docs`: Documentation changes
- `chore`: Maintenance tasks
- `test`: Adding or updating tests

### Examples

```
feat(category): add unified category page for all categories
refactor(naming): standardize folder naming to camelCase convention
fix(layout): remove direct Header/Footer imports from pages
```

---

## Code Review Checklist

Before submitting code for review, ensure:

- [ ] Follows naming conventions
- [ ] Uses layout system correctly
- [ ] Imports are organized and use `~` alias
- [ ] No direct Header/Footer imports in pages
- [ ] Error handling is implemented
- [ ] Code is properly formatted
- [ ] No console.log statements in production code
- [ ] PropTypes are defined (if applicable)
- [ ] No unused imports or variables

---

## Resources

- [React Documentation](https://react.dev/)
- [ESLint Rules](https://eslint.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

---

**Last Updated**: 2024
**Maintained by**: Development Team

