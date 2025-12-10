# Theme Configuration Guide

## Overview

Hệ thống theme màu tập trung cho buttons và UI components, dựa trên màu chủ đạo của brand (#be226b, #ee1f6b - màu hồng/magenta).

## File Location

- **Theme Config**: `client/src/config/theme.js`
- **Export**: `client/src/config/env.js` (re-exported for convenience)

## Available Variants

### 1. Primary (Màu chủ đạo - Brand Color)
Màu hồng/magenta chính của brand: `#be226b` → `#ee1f6b`

```jsx
<Button variant="primary" content="Add to Cart" />
```

### 2. Secondary (Purple/Pink Gradient)
Màu gradient tím-hồng hiện đại: `#8b5cf6` → `#ec4899`

```jsx
<Button variant="secondary" content="View Details" />
```

### 3. Success (Green)
Màu xanh lá cho các hành động thành công: `#10b981` → `#059669`

```jsx
<Button variant="success" content="Confirm" />
```

### 4. Danger (Red)
Màu đỏ cho các hành động nguy hiểm/xóa: `#ef4444` → `#dc2626`

```jsx
<Button variant="danger" content="Delete" />
```

### 5. Warning (Orange/Amber)
Màu cam cho cảnh báo: `#f59e0b` → `#d97706`

```jsx
<Button variant="warning" content="Warning" />
```

### 6. Info (Blue)
Màu xanh dương cho thông tin: `#3b82f6` → `#2563eb`

```jsx
<Button variant="info" content="Learn More" />
```

### 7. Outline (Transparent với border)
Nền trong suốt với viền màu primary

```jsx
<Button variant="outline" content="Cancel" />
```

### 8. Ghost (Minimal style)
Nền trong suốt, không viền, minimal style

```jsx
<Button variant="ghost" content="Skip" />
```

### 9. Default (Neutral Gray)
Màu xám trung tính: `#6b7280` → `#4b5563`

```jsx
<Button variant="default" content="Default" />
```

## Usage Examples

### Basic Usage

```jsx
import Button from '~/components/button';

// Primary button (default)
<Button variant="primary" content="Add to Cart" onClick={handleClick} />

// Secondary button
<Button variant="secondary" content="View More" link="/products" />

// Success button
<Button variant="success" content="Save" type="submit" />

// Danger button
<Button variant="danger" content="Delete" onClick={handleDelete} />
```

### With Gradient or Solid

```jsx
// Gradient (default)
<Button variant="primary" useGradient={true} content="Gradient Button" />

// Solid color
<Button variant="primary" useGradient={false} content="Solid Button" />
```

### With Cart Icon

```jsx
<Button 
    variant="primary" 
    cart={true} 
    content="Add to Cart" 
    onClick={handleAddToCart} 
/>
```

### Navigation Button

```jsx
<Button 
    variant="primary" 
    link="/products" 
    content="View Products" 
/>
```

## Using Theme Directly

Nếu bạn cần sử dụng màu theme trực tiếp trong component:

```jsx
import { theme, getButtonTheme } from '~/config/theme';

// Get theme colors
const primaryTheme = theme.primary;
const buttonStyles = getButtonTheme('primary', true);

// Use in inline styles
<div style={{ background: primaryTheme.background }}>
    Content
</div>
```

## Theme Structure

Mỗi variant có cấu trúc:

```javascript
{
    background: 'linear-gradient(...)',      // Gradient background
    backgroundHover: 'linear-gradient(...)', // Hover state
    backgroundActive: 'linear-gradient(...)', // Active state
    color: '#ffffff',                        // Text color
    shadow: 'rgba(...)',                     // Box shadow
    shadowHover: 'rgba(...)',               // Hover shadow
    solid: '#hex',                          // Solid color variant
    solidHover: '#hex',                     // Solid hover
    solidActive: '#hex',                    // Solid active
}
```

## Helper Functions

### `getButtonTheme(variant, useGradient)`
Trả về style object cho button state bình thường

### `getButtonHoverTheme(variant, useGradient)`
Trả về style object cho button hover state

### `getButtonActiveTheme(variant, useGradient)`
Trả về style object cho button active state

## Customization

Để thay đổi màu chủ đạo, chỉnh sửa file `client/src/config/theme.js`:

```javascript
export const theme = {
    primary: {
        background: 'linear-gradient(135deg, #YOUR_COLOR 0%, #YOUR_COLOR_2 100%)',
        // ... other properties
    },
    // ...
};
```

## Best Practices

1. **Sử dụng Primary cho các hành động chính**: Add to Cart, Submit, Buy Now
2. **Sử dụng Secondary cho các hành động phụ**: View More, Learn More
3. **Sử dụng Success cho xác nhận**: Confirm, Save, Approve
4. **Sử dụng Danger cho xóa/hủy nguy hiểm**: Delete, Remove, Cancel Order
5. **Sử dụng Outline/Ghost cho các hành động phụ**: Cancel, Skip, Back

## Color Reference

- **Primary**: `#be226b` → `#ee1f6b` (Brand Pink/Magenta)
- **Secondary**: `#8b5cf6` → `#ec4899` (Purple to Pink)
- **Success**: `#10b981` → `#059669` (Green)
- **Danger**: `#ef4444` → `#dc2626` (Red)
- **Warning**: `#f59e0b` → `#d97706` (Orange)
- **Info**: `#3b82f6` → `#2563eb` (Blue)
- **Default**: `#6b7280` → `#4b5563` (Gray)

