export const generateButtonCode = (provider: string, config: any) => {
  const { styles, variant, size, label } = config;
  
  // Extract style properties (undefined = use library defaults)
  const borderRadius = styles?.borderRadius !== undefined ? (typeof styles.borderRadius === 'number' ? `${styles.borderRadius}px` : styles.borderRadius) : undefined;
  const backgroundColor = styles?.backgroundColor;
  const fontColor = styles?.fontColor;
  const borderColor = styles?.borderColor;
  const borderStyle = styles?.borderStyle || 'solid';
  const borderWidth = styles?.borderWidth !== undefined ? `${styles.borderWidth}px` : undefined;
  const px = styles?.padding?.px ?? 4;
  const py = styles?.padding?.py ?? 1;

  switch (provider) {
    case 'mui': {
      const muiVariant = variant === "contained" ? "contained" : "outlined";
      
      // Build sx object dynamically - MUI handles padding through size prop
      const sxProps: string[] = [];
      
      if (borderRadius !== undefined) sxProps.push(`borderRadius: '${borderRadius}'`);
      if (backgroundColor !== undefined) sxProps.push(`bgcolor: '${backgroundColor}'`);
      if (fontColor !== undefined) sxProps.push(`color: '${fontColor}'`);
      if (borderColor !== undefined) sxProps.push(`borderColor: '${borderColor}'`);
      if (borderWidth !== undefined) sxProps.push(`borderWidth: '${borderWidth}'`);
      if (borderStyle !== 'solid') sxProps.push(`borderStyle: '${borderStyle}'`);
      
      const sxPropsString = sxProps.length > 0 
        ? `\n      sx={{\n        ${sxProps.join(',\n        ')}\n      }}`
        : '';
      
      return `import { Button } from '@mui/material';

export function CustomButton() {
  return (
    <Button 
      variant="${muiVariant}"
      size="${size || 'medium'}"${sxPropsString}
    >
      ${label}
    </Button>
  );
}`;
    }

    case 'chakra': {
      const chakraVariant = variant === "contained" ? "solid" : "outline";
      const chakraSize = size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md';
      
      const styleProps: string[] = [
        `paddingLeft: "${px}px"`,
        `paddingRight: "${px}px"`,
        `paddingTop: "${py}px"`,
        `paddingBottom: "${py}px"`,
      ];
      
      if (borderRadius !== undefined) styleProps.push(`borderRadius: "${borderRadius}"`);
      if (backgroundColor !== undefined) styleProps.push(`backgroundColor: "${backgroundColor}"`);
      if (fontColor !== undefined) styleProps.push(`color: "${fontColor}"`);
      if (borderColor !== undefined) styleProps.push(`borderColor: "${borderColor}"`);
      if (borderWidth !== undefined) styleProps.push(`borderWidth: "${borderWidth}"`);
      if (borderStyle !== 'solid') styleProps.push(`borderStyle: "${borderStyle}"`);
      
      return `import { Button } from '@chakra-ui/react';

export function CustomButton() {
  return (
    <Button
      variant="${chakraVariant}"
      size="${chakraSize}"
      style={{
        ${styleProps.join(',\n        ')}
      }}
    >
      ${label}
    </Button>
  );
}`;
    }

    case 'antd': {
      const antVariant = variant === "contained" ? "primary" : "default";
      const antSize = size === 'small' ? 'small' : size === 'large' ? 'large' : 'middle';
      
      const styleProps: string[] = [
        `height: "auto"`,
        `padding: "${py}px ${px}px"`,
      ];
      
      if (borderRadius !== undefined) styleProps.push(`borderRadius: "${borderRadius}"`);
      if (backgroundColor !== undefined) styleProps.push(`backgroundColor: "${backgroundColor}"`);
      if (fontColor !== undefined) styleProps.push(`color: "${fontColor}"`);
      if (borderColor !== undefined) styleProps.push(`borderColor: "${borderColor}"`);
      if (borderWidth !== undefined) styleProps.push(`borderWidth: "${borderWidth}"`);
      if (borderStyle !== 'solid') styleProps.push(`borderStyle: "${borderStyle}"`);
      
      return `import { Button } from 'antd';

export function CustomButton() {
  return (
    <Button
      type="${antVariant}"
      size="${antSize}"
      style={{
        ${styleProps.join(',\n        ')}
      }}
    >
      ${label}
    </Button>
  );
}`;
    }

    case 'shadcn': {
      const shadcnVariant = variant === "contained" ? "default" : "outline";
      const shadcnSize = size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'default';
      
      const styleProps: string[] = [
        `padding: "${py}px ${px}px"`,
        `height: "auto"`,
      ];
      
      if (borderRadius !== undefined) styleProps.push(`borderRadius: "${borderRadius}"`);
      if (backgroundColor !== undefined) styleProps.push(`backgroundColor: "${backgroundColor}"`);
      if (fontColor !== undefined) styleProps.push(`color: "${fontColor}"`);
      if (borderColor !== undefined) styleProps.push(`borderColor: "${borderColor}"`);
      if (borderWidth !== undefined) styleProps.push(`borderWidth: "${borderWidth}"`);
      if (borderStyle !== 'solid') styleProps.push(`borderStyle: "${borderStyle}"`);
      
      return `import { Button } from '@/components/ui/button';

export function CustomButton() {
  return (
    <Button
      variant="${shadcnVariant}"
      size="${shadcnSize}"
      style={{
        ${styleProps.join(',\n        ')}
      }}
    >
      ${label}
    </Button>
  );
}`;
    }

    case 'aceternity': {
      const aceternityPadding = size === 'small' ? '4px 12px' : size === 'large' ? '12px 32px' : `${py}px ${px}px`;
      const aceternityFontSize = size === 'small' ? '0.75rem' : size === 'large' ? '1rem' : '0.875rem';
      
      const styleProps: string[] = [
        `padding: "${aceternityPadding}"`,
        `fontSize: "${aceternityFontSize}"`,
      ];
      
      if (borderRadius !== undefined) styleProps.push(`borderRadius: "${borderRadius}"`);
      if (backgroundColor !== undefined) styleProps.push(`backgroundColor: "${backgroundColor}"`);
      if (fontColor !== undefined) styleProps.push(`color: "${fontColor}"`);
      
      // For border, combine all border properties
      const borderParts: string[] = [];
      if (borderWidth !== undefined) borderParts.push(borderWidth);
      else borderParts.push('1px');
      if (borderStyle) borderParts.push(borderStyle);
      if (borderColor !== undefined) borderParts.push(borderColor);
      
      if (borderParts.length > 0) {
        styleProps.push(`border: "${borderParts.join(' ')}"`);
      }
      
      return `export function CustomButton() {
  return (
    <button
      style={{
        ${styleProps.join(',\n        ')}
      }}
      className="font-semibold transition duration-200 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
    >
      ${label}
    </button>
  );
}`;
    }

    default:
      return "// Provider code not available";
  }
};
