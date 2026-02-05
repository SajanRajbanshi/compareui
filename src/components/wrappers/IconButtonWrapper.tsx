import React from 'react';
import { IconButton as MuiIconButton, Button as MuiButton } from '@mui/material';
import { IconButton as ChakraIconButton, Button as ChakraButton } from '@chakra-ui/react';
import { Button as AntButton } from 'antd';
import { Button as ShadcnButton } from '@/components/ui/button';
import { Search } from 'lucide-react';
import MuiSearch from '@mui/icons-material/Search';
import { cn } from '@/lib/utils';
import { ProviderContext, ProviderType } from '@/components/Providers';

interface IconButtonConfig {
  variant: string;
  size?: 'small' | 'medium' | 'large';
  label?: string;
  showLabel?: boolean;
  styles?: {
    borderRadius?: number | string;
    backgroundColor?: string;
    fontColor?: string;
    borderColor?: string;
    borderStyle?: 'solid' | 'dashed' | 'dotted';
    borderWidth?: number;
  };
}

interface IconButtonWrapperProps {
  provider: ProviderType;
  config: IconButtonConfig;
}

export default function IconButtonWrapper({
  provider,
  config,
}: IconButtonWrapperProps) {
  const { themeMode } = React.useContext(ProviderContext);
  const { styles, label, showLabel } = config;

  const borderRadius =
    styles?.borderRadius !== undefined
      ? typeof styles.borderRadius === "number"
        ? `${styles.borderRadius}px`
        : styles.borderRadius
      : undefined;
  
  const backgroundColor = styles?.backgroundColor;
  const fontColor = styles?.fontColor;
  const borderColor = styles?.borderColor;
  const borderStyle = styles?.borderStyle;
  const borderWidth = styles?.borderWidth !== undefined ? `${styles.borderWidth}px` : undefined;

  const muiSize = config.size === 'small' ? 'small' : config.size === 'large' ? 'large' : 'medium';
  const chakraSize = config.size === 'small' ? 'sm' : config.size === 'large' ? 'lg' : 'md';
  const antSize = config.size === 'small' ? 'small' : config.size === 'large' ? 'large' : 'middle';
  const shadcnSize = config.size === 'small' ? 'sm' : config.size === 'large' ? 'lg' : 'default';

  switch (provider) {
    case "mui":
      const muiVariant = config.variant === "contained" ? "contained" : "outlined";
      
      if (showLabel && label) {
        const textSxProps: any = {};
        if (borderRadius !== undefined) textSxProps.borderRadius = borderRadius;
        if (backgroundColor !== undefined) textSxProps.bgcolor = backgroundColor;
        if (fontColor !== undefined) textSxProps.color = fontColor;
        if (borderColor !== undefined) textSxProps.borderColor = borderColor;
        if (borderWidth !== undefined) textSxProps.borderWidth = borderWidth;
        if (borderStyle) textSxProps.borderStyle = borderStyle;
        
        return (
          <MuiButton
            variant={muiVariant}
            size={muiSize}
            startIcon={<MuiSearch />}
            sx={Object.keys(textSxProps).length > 0 ? textSxProps : undefined}
          >
            {label}
          </MuiButton>
        );
      }
      
      const iconSxProps: any = {};
      if (borderRadius !== undefined) iconSxProps.borderRadius = borderRadius;
      if (backgroundColor !== undefined) iconSxProps.bgcolor = backgroundColor;
      if (fontColor !== undefined) iconSxProps.color = fontColor;
      if (borderColor !== undefined) iconSxProps.borderColor = borderColor;
      if (borderWidth !== undefined) iconSxProps.borderWidth = borderWidth;
      if (borderStyle) iconSxProps.borderStyle = borderStyle;
      
      return (
        <MuiIconButton
          size={muiSize}
          sx={Object.keys(iconSxProps).length > 0 ? iconSxProps : undefined}
        >
          <MuiSearch fontSize="inherit" />
        </MuiIconButton>
      );

    case "chakra":
      const chakraVariant = config.variant === "contained" ? "solid" : "outline";
      
      if (showLabel && label) {
        const textStyle: any = {
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        };
        if (borderRadius !== undefined) textStyle.borderRadius = borderRadius;
        if (backgroundColor !== undefined) textStyle.backgroundColor = backgroundColor;
        if (fontColor !== undefined) textStyle.color = fontColor;
        if (borderColor !== undefined) textStyle.borderColor = borderColor;
        if (borderWidth !== undefined) textStyle.borderWidth = borderWidth;
        if (borderStyle) textStyle.borderStyle = borderStyle;
        
        return (
          <ChakraButton
            variant={chakraVariant}
            size={chakraSize}
            style={textStyle}
          >
            <Search size={18} />
            {label}
          </ChakraButton>
        );
      }
      
      const iconStyle: any = {};
      if (borderRadius !== undefined) iconStyle.borderRadius = borderRadius;
      if (backgroundColor !== undefined) iconStyle.backgroundColor = backgroundColor;
      if (fontColor !== undefined) iconStyle.color = fontColor;
      if (borderColor !== undefined) iconStyle.borderColor = borderColor;
      if (borderWidth !== undefined) iconStyle.borderWidth = borderWidth;
      if (borderStyle) iconStyle.borderStyle = borderStyle;
      
      return (
        <ChakraIconButton
          aria-label="Search"
          variant={chakraVariant}
          size={chakraSize}
          style={Object.keys(iconStyle).length > 0 ? iconStyle : undefined}
        >
          <Search size={18} />
        </ChakraIconButton>
      );

    case "antd":
      const antVariant = config.variant === "contained" ? "primary" : "default";
      
      const antStyle: any = {};
      if (borderRadius !== undefined) antStyle.borderRadius = borderRadius;
      if (backgroundColor !== undefined) antStyle.backgroundColor = backgroundColor;
      if (fontColor !== undefined) antStyle.color = fontColor;
      if (borderColor !== undefined) antStyle.borderColor = borderColor;
      if (borderWidth !== undefined) antStyle.borderWidth = borderWidth;
      if (borderStyle) antStyle.borderStyle = borderStyle;
      
      return (
        <AntButton
          shape={showLabel ? "default" : "circle"}
          type={antVariant as any}
          size={antSize as any}
          icon={<Search size={16} />}
          style={Object.keys(antStyle).length > 0 ? antStyle : undefined}
        >
          {showLabel && label}
        </AntButton>
      );

    case "shadcn":
      const shadcnVariant = config.variant === "contained" ? "default" : "outline";
      
      const shadcnStyle: any = {};
      if (borderRadius !== undefined) shadcnStyle.borderRadius = borderRadius;
      
      // Theme-aware background: invert for dark mode
      if (backgroundColor !== undefined) {
        shadcnStyle.backgroundColor = backgroundColor;
      } else if (shadcnVariant === "default") {
        shadcnStyle.backgroundColor = themeMode === "dark" ? "#ffffff" : "#000000";
      }
      
      // Theme-aware text color
      if (fontColor !== undefined) {
        shadcnStyle.color = fontColor;
      } else if (shadcnVariant === "default") {
        shadcnStyle.color = themeMode === "dark" ? "#000000" : "#ffffff";
      }
      
      if (borderColor !== undefined) shadcnStyle.borderColor = borderColor;
      if (borderWidth !== undefined) shadcnStyle.borderWidth = borderWidth;
      if (borderStyle) shadcnStyle.borderStyle = borderStyle;
      
      return (
        <ShadcnButton
          variant={shadcnVariant as any}
          size={showLabel ? "default" : "icon"}
          className={cn(
            !showLabel && (shadcnSize === 'sm' ? 'h-8 w-8' : shadcnSize === 'lg' ? 'h-11 w-11' : 'h-10 w-10'),
            showLabel && (shadcnSize === 'sm' ? 'h-8 w-8' : shadcnSize === 'lg' ? 'h-11 w-11' : 'h-10 w-10')+"flex items-center gap-2 !px-4 !py-2"
          )}
          style={Object.keys(shadcnStyle).length > 0 ? shadcnStyle : undefined}
        >
          <Search size={18} />
          {showLabel && label}
        </ShadcnButton>
      );

    case "aceternity":
      const sizePx = config.size === 'small' ? '32px' : config.size === 'large' ? '48px' : '40px';
      
      const aceternityStyle: any = {
        width: showLabel ? 'auto' : sizePx,
        height: showLabel ? 'auto' : sizePx,
        padding: showLabel ? '8px 16px' : '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
      };
      
      if (borderRadius !== undefined) aceternityStyle.borderRadius = borderRadius;
      if (backgroundColor !== undefined) aceternityStyle.backgroundColor = backgroundColor;
      if (fontColor !== undefined) aceternityStyle.color = fontColor;
      
      // Build border string
      const borderParts: string[] = [];
      if (borderWidth !== undefined) borderParts.push(borderWidth);
      else borderParts.push('1px');
      if (borderStyle) borderParts.push(borderStyle);
      if (borderColor !== undefined) borderParts.push(borderColor);
      if (borderParts.length > 0) aceternityStyle.border = borderParts.join(' ');
      
      return (
        <button
          style={aceternityStyle}
          className="transition duration-200 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        >
          <Search size={18} />
          {showLabel && label}
        </button>
      );

    default:
      return <div className="text-red-500 italic text-xs">Provider {provider} not found</div>;
  }
}
