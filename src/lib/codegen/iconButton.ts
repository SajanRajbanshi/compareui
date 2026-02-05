export const generateIconButtonCode = (provider: string, config: any) => {
  const { styles, variant, size, label } = config;
  
  // Extract style properties (undefined = use library defaults)
  const borderRadius = styles?.borderRadius !== undefined ? (typeof styles.borderRadius === 'number' ? `${styles.borderRadius}px` : styles.borderRadius) : undefined;
  const backgroundColor = styles?.backgroundColor;
  const fontColor = styles?.fontColor;
  const borderColor = styles?.borderColor;
  const borderStyle = styles?.borderStyle || 'solid';
  const borderWidth = styles?.borderWidth !== undefined ? `${styles.borderWidth}px` : undefined;
  const displayLabel = label || 'Search';

  switch (provider) {
    case 'mui': {
      const muiVariant = variant === "contained" ? "contained" : "outlined";
      
      // Icon Only Button
      const iconSxProps: string[] = [];
      if (borderRadius !== undefined) iconSxProps.push(`borderRadius: '${borderRadius}'`);
      if (backgroundColor !== undefined) iconSxProps.push(`bgcolor: '${backgroundColor}'`);
      if (fontColor !== undefined) iconSxProps.push(`color: '${fontColor}'`);
      if (borderColor !== undefined) iconSxProps.push(`borderColor: '${borderColor}'`);
      if (borderWidth !== undefined) iconSxProps.push(`borderWidth: '${borderWidth}'`);
      if (borderStyle !== 'solid') iconSxProps.push(`borderStyle: '${borderStyle}'`);
      
      // Icon + Text Button
      const textSxProps: string[] = [];
      if (borderRadius !== undefined) textSxProps.push(`borderRadius: '${borderRadius}'`);
      if (backgroundColor !== undefined) textSxProps.push(`bgcolor: '${backgroundColor}'`);
      if (fontColor !== undefined) textSxProps.push(`color: '${fontColor}'`);
      if (borderColor !== undefined) textSxProps.push(`borderColor: '${borderColor}'`);
      if (borderWidth !== undefined) textSxProps.push(`borderWidth: '${borderWidth}'`);
      if (borderStyle !== 'solid') textSxProps.push(`borderStyle: '${borderStyle}'`);
      
      return `import { IconButton, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Icon Only Button
export function CustomIconButton() {
  return (
    <IconButton 
      size="${size === 'small' ? 'small' : size === 'large' ? 'large' : 'medium'}"${iconSxProps.length > 0 ? `
      sx={{
        ${iconSxProps.join(',\n        ')}
      }}` : ''}
    >
      <SearchIcon fontSize="inherit" />
    </IconButton>
  );
}

// Icon + Text Button
export function CustomIconTextButton() {
  return (
    <Button 
      variant="${muiVariant}"
      startIcon={<SearchIcon />}${textSxProps.length > 0 ? `
      sx={{
        ${textSxProps.join(',\n        ')}
      }}` : ''}
    >
      ${displayLabel}
    </Button>
  );
}`;
    }

    case 'chakra': {
      const chakraSize = size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md';
      const chakraVariant = variant === "contained" ? "solid" : "outline";
      
      const iconStyleProps: string[] = [];
      if (borderRadius !== undefined) iconStyleProps.push(`borderRadius: "${borderRadius}"`);
      if (backgroundColor !== undefined) iconStyleProps.push(`backgroundColor: "${backgroundColor}"`);
      if (fontColor !== undefined) iconStyleProps.push(`color: "${fontColor}"`);
      if (borderColor !== undefined) iconStyleProps.push(`borderColor: "${borderColor}"`);
      if (borderWidth !== undefined) iconStyleProps.push(`borderWidth: "${borderWidth}"`);
      if (borderStyle !== 'solid') iconStyleProps.push(`borderStyle: "${borderStyle}"`);
      
      const textStyleProps: string[] = [
        `display: 'flex'`,
        `alignItems: 'center'`,
        `gap: '8px'`
      ];
      if (borderRadius !== undefined) textStyleProps.push(`borderRadius: "${borderRadius}"`);
      if (backgroundColor !== undefined) textStyleProps.push(`backgroundColor: "${backgroundColor}"`);
      if (fontColor !== undefined) textStyleProps.push(`color: "${fontColor}"`);
      if (borderColor !== undefined) textStyleProps.push(`borderColor: "${borderColor}"`);
      if (borderWidth !== undefined) textStyleProps.push(`borderWidth: "${borderWidth}"`);
      if (borderStyle !== 'solid') textStyleProps.push(`borderStyle: "${borderStyle}"`);
      
      return `import { IconButton, Button } from '@chakra-ui/react';
import { Search } from 'lucide-react';

// Icon Only Button
export function CustomIconButton() {
  return (
    <IconButton
      aria-label="Search"
      variant="${chakraVariant}"
      size="${chakraSize}"${iconStyleProps.length > 0 ? `
      style={{
        ${iconStyleProps.join(',\n        ')}
      }}` : ''}
    >
      <Search size={18} />
    </IconButton>
  );
}

// Icon + Text Button
export function CustomIconTextButton() {
  return (
    <Button
      variant="${chakraVariant}"
      size="${chakraSize}"
      style={{
        ${textStyleProps.join(',\n        ')}
      }}
    >
      <Search size={18} />
      ${displayLabel}
    </Button>
  );
}`;
    }

    case 'antd': {
      const antVariant = variant === "contained" ? "primary" : "default";
      const antSize = size === 'small' ? 'small' : size === 'large' ? 'large' : 'middle';
      
      const iconStyleProps: string[] = [];
      if (borderRadius !== undefined) iconStyleProps.push(`borderRadius: "${borderRadius}"`);
      if (backgroundColor !== undefined) iconStyleProps.push(`backgroundColor: "${backgroundColor}"`);
      if (fontColor !== undefined) iconStyleProps.push(`color: "${fontColor}"`);
      if (borderColor !== undefined) iconStyleProps.push(`borderColor: "${borderColor}"`);
      if (borderWidth !== undefined) iconStyleProps.push(`borderWidth: "${borderWidth}"`);
      if (borderStyle !== 'solid') iconStyleProps.push(`borderStyle: "${borderStyle}"`);
      
      const textStyleProps: string[] = [];
      if (borderRadius !== undefined) textStyleProps.push(`borderRadius: "${borderRadius}"`);
      if (backgroundColor !== undefined) textStyleProps.push(`backgroundColor: "${backgroundColor}"`);
      if (fontColor !== undefined) textStyleProps.push(`color: "${fontColor}"`);
      if (borderColor !== undefined) textStyleProps.push(`borderColor: "${borderColor}"`);
      if (borderWidth !== undefined) textStyleProps.push(`borderWidth: "${borderWidth}"`);
      if (borderStyle !== 'solid') textStyleProps.push(`borderStyle: "${borderStyle}"`);
      
      return `import { Button } from 'antd';
import { Search } from 'lucide-react';

// Icon Only Button
export function CustomIconButton() {
  return (
    <Button
      shape="circle"
      type="${antVariant}"
      size="${antSize}"
      icon={<Search size={16} />}${iconStyleProps.length > 0 ? `
      style={{
        ${iconStyleProps.join(',\n        ')}
      }}` : ''}
    />
  );
}

// Icon + Text Button
export function CustomIconTextButton() {
  return (
    <Button
      type="${antVariant}"
      size="${antSize}"
      icon={<Search size={16} />}${textStyleProps.length > 0 ? `
      style={{
        ${textStyleProps.join(',\n        ')}
      }}` : ''}
    >
      ${displayLabel}
    </Button>
  );
}`;
    }

    case 'shadcn': {
      const shadcnVariant = variant === "contained" ? "default" : "outline";
      const shadcnSizeValue = size === 'small' ? 'h-8 w-8' : size === 'large' ? 'h-11 w-11' : 'h-10 w-10';
      
      const iconStyleProps: string[] = [];
      if (borderRadius !== undefined) iconStyleProps.push(`borderRadius: "${borderRadius}"`);
      if (backgroundColor !== undefined) iconStyleProps.push(`backgroundColor: "${backgroundColor}"`);
      if (fontColor !== undefined) iconStyleProps.push(`color: "${fontColor}"`);
      if (borderColor !== undefined) iconStyleProps.push(`borderColor: "${borderColor}"`);
      if (borderWidth !== undefined) iconStyleProps.push(`borderWidth: "${borderWidth}"`);
      if (borderStyle !== 'solid') iconStyleProps.push(`borderStyle: "${borderStyle}"`);
      
      const textStyleProps: string[] = [];
      if (borderRadius !== undefined) textStyleProps.push(`borderRadius: "${borderRadius}"`);
      if (backgroundColor !== undefined) textStyleProps.push(`backgroundColor: "${backgroundColor}"`);
      if (fontColor !== undefined) textStyleProps.push(`color: "${fontColor}"`);
      if (borderColor !== undefined) textStyleProps.push(`borderColor: "${borderColor}"`);
      if (borderWidth !== undefined) textStyleProps.push(`borderWidth: "${borderWidth}"`);
      if (borderStyle !== 'solid') textStyleProps.push(`borderStyle: "${borderStyle}"`);
      
      return `import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

// Icon Only Button
export function CustomIconButton() {
  return (
    <Button
      variant="${shadcnVariant}"
      size="icon"
      className="${shadcnSizeValue}"${iconStyleProps.length > 0 ? `
      style={{
        ${iconStyleProps.join(',\n        ')}
      }}` : ''}
    >
      <Search size={18} />
    </Button>
  );
}

// Icon + Text Button
export function CustomIconTextButton() {
  return (
    <Button
      variant="${shadcnVariant}"
      className="flex items-center gap-2"${textStyleProps.length > 0 ? `
      style={{
        ${textStyleProps.join(',\n        ')}
      }}` : ''}
    >
      <Search size={18} />
      ${displayLabel}
    </Button>
  );
}`;
    }

    case 'aceternity': {
      const sizePx = size === 'small' ? '32px' : size === 'large' ? '48px' : '40px';
      
      const iconStyleProps: string[] = [
        `width: "${sizePx}"`,
        `height: "${sizePx}"`,
        `display: 'flex'`,
        `alignItems: 'center'`,
        `justifyContent: 'center'`,
      ];
      
      if (borderRadius !== undefined) iconStyleProps.push(`borderRadius: "${borderRadius}"`);
      if (backgroundColor !== undefined) iconStyleProps.push(`backgroundColor: "${backgroundColor}"`);
      if (fontColor !== undefined) iconStyleProps.push(`color: "${fontColor}"`);
      
      const iconBorderParts: string[] = [];
      if (borderWidth !== undefined) iconBorderParts.push(borderWidth);
      else iconBorderParts.push('1px');
      if (borderStyle) iconBorderParts.push(borderStyle);
      if (borderColor !== undefined) iconBorderParts.push(borderColor);
      if (iconBorderParts.length > 0) iconStyleProps.push(`border: "${iconBorderParts.join(' ')}"`);
      
      const textStyleProps: string[] = [
        `padding: "8px 16px"`,
        `display: 'flex'`,
        `alignItems: 'center'`,
        `gap: '8px'`
      ];
      
      if (borderRadius !== undefined) textStyleProps.push(`borderRadius: "${borderRadius}"`);
      if (backgroundColor !== undefined) textStyleProps.push(`backgroundColor: "${backgroundColor}"`);
      if (fontColor !== undefined) textStyleProps.push(`color: "${fontColor}"`);
      
      const textBorderParts: string[] = [];
      if (borderWidth !== undefined) textBorderParts.push(borderWidth);
      else textBorderParts.push('1px');
      if (borderStyle) textBorderParts.push(borderStyle);
      if (borderColor !== undefined) textBorderParts.push(borderColor);
      if (textBorderParts.length > 0) textStyleProps.push(`border: "${textBorderParts.join(' ')}"`);
      
      return `import { Search } from 'lucide-react';

// Icon Only Button
export function CustomIconButton() {
  return (
    <button
      style={{
        ${iconStyleProps.join(',\n        ')}
      }}
      className="transition duration-200 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
    >
      <Search size={18} />
    </button>
  );
}

// Icon + Text Button
export function CustomIconTextButton() {
  return (
    <button
      style={{
        ${textStyleProps.join(',\n        ')}
      }}
      className="transition duration-200 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
    >
      <Search size={18} />
      ${displayLabel}
    </button>
  );
}`;
    }

    default:
      return "// Provider code not available";
  }
};
