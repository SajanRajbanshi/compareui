"use client";

import React from "react";
import { Button as MuiButton } from "@mui/material";
import { Button as ChakraButton } from "@chakra-ui/react";
import { Button as AntButton } from "antd";
import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProviderContext, ProviderType } from "@/components/Providers";

interface ButtonConfig {
  label: string;
  variant: string;
  size?: 'small' | 'medium' | 'large';
  styles?: {
    borderRadius?: number | string;
    backgroundColor?: string;
    fontColor?: string;
    borderColor?: string;
    borderStyle?: 'solid' | 'dashed' | 'dotted';
    borderWidth?: number;
    padding?: { px: number; py: number };
  };
}

interface ButtonWrapperProps {
  provider: ProviderType;
  config: ButtonConfig;
}

export default function ButtonWrapper({
  provider,
  config,
}: ButtonWrapperProps) {
  const { themeMode } = React.useContext(ProviderContext);
  const { styles } = config;

  // Normalized styling values
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
  const px = styles?.padding?.px ?? 4;
  const py = styles?.padding?.py ?? 1;

  switch (provider) {
    case "mui":
      const muiVariant =
        config.variant === "contained" ? "contained" : "outlined";
      
      // Build sx object dynamically - only include defined properties
      // Note: MUI handles padding through its size prop, so we don't apply custom padding
      const sxProps: any = {};
      if (borderRadius !== undefined) sxProps.borderRadius = borderRadius;
      if (backgroundColor !== undefined) sxProps.bgcolor = backgroundColor;
      if (fontColor !== undefined) sxProps.color = fontColor;
      if (borderColor !== undefined) sxProps.borderColor = borderColor;
      if (borderWidth !== undefined) sxProps.borderWidth = borderWidth;
      if (borderStyle) sxProps.borderStyle = borderStyle;
      
      return (
        <MuiButton
          variant={muiVariant}
          size={config.size || 'medium'}
          sx={Object.keys(sxProps).length > 0 ? sxProps : undefined}
        >
          {config.label}
        </MuiButton>
      );

    case "chakra":
      const chakraVariant =
        config.variant === "contained" ? "solid" : "outline";
      const chakraSize = config.size === 'small' ? 'sm' : config.size === 'large' ? 'lg' : 'md';
      
      const chakraStyle: any = {
        paddingLeft: `${px}px`,
        paddingRight: `${px}px`,
        paddingTop: `${py}px`,
        paddingBottom: `${py}px`,
      };
      if (borderRadius !== undefined) chakraStyle.borderRadius = borderRadius;
      if (backgroundColor !== undefined) chakraStyle.backgroundColor = backgroundColor;
      if (fontColor !== undefined) chakraStyle.color = fontColor;
      if (borderColor !== undefined) chakraStyle.borderColor = borderColor;
      if (borderWidth !== undefined) chakraStyle.borderWidth = borderWidth;
      if (borderStyle) chakraStyle.borderStyle = borderStyle;
      
      return (
        <ChakraButton
          variant={chakraVariant}
          size={chakraSize}
          style={chakraStyle}
        >
          {config.label}
        </ChakraButton>
      );

    case "antd":
      const antVariant = config.variant === "contained" ? "primary" : "default";
      const antSize = config.size === 'small' ? 'small' : config.size === 'large' ? 'large' : 'middle';
      
      const antStyle: any = {
        height: "auto",
        padding: `${py}px ${px}px`,
      };
      if (borderRadius !== undefined) antStyle.borderRadius = borderRadius;
      if (backgroundColor !== undefined) antStyle.backgroundColor = backgroundColor;
      if (fontColor !== undefined) antStyle.color = fontColor;
      if (borderColor !== undefined) antStyle.borderColor = borderColor;
      if (borderWidth !== undefined) antStyle.borderWidth = borderWidth;
      if (borderStyle) antStyle.borderStyle = borderStyle;
      
      return (
        <AntButton
          type={antVariant as any}
          size={antSize as any}
          style={antStyle}
        >
          {config.label}
        </AntButton>
      );

    case "shadcn":
      const shadcnVariant =
        config.variant === "contained" ? "default" : "outline";
      const shadcnSize = config.size === 'small' ? 'sm' : config.size === 'large' ? 'lg' : 'default';
      
      const shadcnStyle: any = {};
      
      if (borderRadius !== undefined) shadcnStyle.borderRadius = borderRadius;
      
      // Theme-aware background: invert for dark mode
      if (backgroundColor !== undefined) {
        shadcnStyle.backgroundColor = backgroundColor;
      } else if (shadcnVariant === "default") {
        // Invert default background based on theme
        shadcnStyle.backgroundColor = themeMode === "dark" ? "#ffffff" : "#000000";
      }
      
      // Theme-aware text color
      if (fontColor !== undefined) {
        shadcnStyle.color = fontColor;
      } else if (shadcnVariant === "default") {
        // Invert text color based on theme
        shadcnStyle.color = themeMode === "dark" ? "#000000" : "#ffffff";
      }
      
      if (borderColor !== undefined) shadcnStyle.borderColor = borderColor;
      if (borderWidth !== undefined) shadcnStyle.borderWidth = borderWidth;
      if (borderStyle) shadcnStyle.borderStyle = borderStyle;
      
      return (
        <ShadcnButton
          variant={shadcnVariant as any}
          size={shadcnSize as any}
          className={cn(
            shadcnSize === 'sm' ? 'h-8' : shadcnSize === 'lg' ? 'h-11' : 'h-10',
            "flex items-center gap-2 !px-4 !py-2"
          )}
          style={Object.keys(shadcnStyle).length > 0 ? shadcnStyle : undefined}
        >
          {config.label}
        </ShadcnButton>
      );

    case "aceternity":
      const aceternityPadding = config.size === 'small' ? '4px 12px' : config.size === 'large' ? '12px 32px' : `${py}px ${px}px`;
      const aceternityFontSize = config.size === 'small' ? '0.75rem' : config.size === 'large' ? '1rem' : '0.875rem';
      
      const aceternityStyle: any = {
        padding: aceternityPadding,
        fontSize: aceternityFontSize,
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
          className={cn(
            "font-semibold transition duration-200",
            "hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          )}
        >
          {config.label}
        </button>
      );

    default:
      return (
        <div className="text-red-500 italic text-xs">
          Provider {provider} not found
        </div>
      );
  }
}
