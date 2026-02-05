"use client";

import React from "react";
import { 
  Radio as MuiRadio, 
  RadioGroup as MuiRadioGroup, 
  FormControlLabel as MuiFormControlLabel,
  FormControl as MuiFormControl,
  FormLabel as MuiFormLabel
} from "@mui/material";
import { 
  Box as ChakraBox,
  Stack as ChakraStack,
  Text as ChakraText
} from "@chakra-ui/react";
import { Radio as AntRadio } from "antd";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ProviderContext, ProviderType } from "@/components/Providers";

interface RadioConfig {
  options: string[];
  selectedValue: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  color?: string;
  styles?: {
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
  };
}

interface RadioWrapperProps {
  provider: ProviderType;
  config: RadioConfig;
  onChange?: (value: string) => void;
}

export default function RadioWrapper({
  provider,
  config,
  onChange,
}: RadioWrapperProps) {
  const { themeMode } = React.useContext(ProviderContext);
  const color = config.styles?.color || config.color;
  const backgroundColor = config.styles?.backgroundColor;
  const borderColor = config.styles?.borderColor;

  switch (provider) {
    case "mui":
      const muiSize = config.size === 'small' ? 'small' : config.size === 'large' ? 'medium' : 'medium';
      
      return (
        <MuiFormControl disabled={config.disabled}>
          <MuiFormLabel>Choose an option</MuiFormLabel>
          <MuiRadioGroup
            value={config.selectedValue}
            onChange={(e) => onChange?.(e.target.value)}
          >
            {config.options.map((option) => (
              <MuiFormControlLabel
                key={option}
                value={option}
                control={
                  <MuiRadio 
                    size={muiSize}
                    sx={{
                      ...(color ? { 
                        color: borderColor || color,
                        '&.Mui-checked': { color: color }
                      } : {}),
                      ...(backgroundColor ? { // MUI Radio background is strictly the circle, customization is tricky without custom icon
                         // Attempting to color inner circle via svg/icon manipulation or background prop if applicable
                      } : {})
                    }}
                  />
                }
                label={option}
              />
            ))}
          </MuiRadioGroup>
        </MuiFormControl>
      );

    case "chakra":
      const chakraSize = config.size === 'small' ? '14px' : config.size === 'large' ? '22px' : '18px';
      const chakraTextSize = config.size === 'small' ? 'sm' : config.size === 'large' ? 'lg' : 'md';
      
      return (
        <ChakraStack gap={2}>
          <ChakraText fontWeight="medium" fontSize="sm" mb={1}>Choose an option</ChakraText>
          {config.options.map((option) => (
            <ChakraBox
              key={option}
              display="flex"
              alignItems="center"
              gap={2}
              cursor={config.disabled ? 'not-allowed' : 'pointer'}
              opacity={config.disabled ? 0.5 : 1}
              onClick={() => !config.disabled && onChange?.(option)}
            >
              <ChakraBox
                width={chakraSize}
                height={chakraSize}
                borderRadius="full"
                border="2px solid"
                borderColor={config.selectedValue === option ? (borderColor || color || 'blue.500') : (borderColor || 'gray.300')}
                display="flex"
                alignItems="center"
                justifyContent="center"
                transition="all 0.2s"
                bg={backgroundColor}
              >
                {config.selectedValue === option && (
                  <ChakraBox
                    width="60%"
                    height="60%"
                    borderRadius="full"
                    bg={color || 'blue.500'}
                  />
                )}
              </ChakraBox>
              <ChakraText fontSize={chakraTextSize} color={color}>
                {option}
              </ChakraText>
            </ChakraBox>
          ))}
        </ChakraStack>
      );

    case "antd":
      const antSize = config.size === 'small' ? 'small' : config.size === 'large' ? 'large' : 'middle';
      
      return (
        <AntRadio.Group 
          value={config.selectedValue} 
          onChange={(e) => onChange?.(e.target.value)}
          disabled={config.disabled}
          size={antSize as any}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {config.options.map((option) => (
              <AntRadio 
                key={option} 
                value={option}
                style={{ 
                  ...(color ? { '--ant-primary-color': color } as any : {}), // Antd uses less/css vars, difficult to inline
                  // Fallback to wrapper or specific styles
                }}
              >
                <span style={{ color: color }}>{option}</span>
              </AntRadio>
            ))}
          </div>
        </AntRadio.Group>
      );

    case "shadcn":
      return (
        <RadioGroup 
          value={config.selectedValue} 
          onValueChange={onChange}
          disabled={config.disabled}
        >
          <div className="flex flex-col gap-3">
            {config.options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={option} 
                  id={`radio-${option}`}
                  className={cn(
                    config.size === 'small' && 'h-3 w-3',
                    config.size === 'large' && 'h-6 w-6'
                  )}
                  style={{ 
                    borderColor: borderColor || color, 
                    color: color,
                    backgroundColor: config.selectedValue === option ? (backgroundColor || color) : backgroundColor || 'transparent'
                  }}
                />
                <Label 
                  htmlFor={`radio-${option}`}
                  className={cn(
                    config.size === 'small' && 'text-xs',
                    config.size === 'large' && 'text-lg'
                  )}
                  style={color ? { color } : undefined}
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      );

    case "aceternity":
      const aceternitySize = config.size === 'small' ? 'h-3 w-3' : config.size === 'large' ? 'h-6 w-6' : 'h-4 w-4';
      const aceternityTextSize = config.size === 'small' ? 'text-xs' : config.size === 'large' ? 'text-lg' : 'text-sm';
      const aceternityColor = color || '#3b82f6';
      
      return (
        <div className="flex flex-col gap-3">
          {config.options.map((option) => (
            <label 
              key={option} 
              className={cn(
                "flex items-center space-x-3 cursor-pointer group",
                config.disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="radio-group"
                  value={option}
                  checked={config.selectedValue === option}
                  onChange={(e) => !config.disabled && onChange?.(e.target.value)}
                  disabled={config.disabled}
                  className="sr-only"
                />
                <div 
                  className={cn(
                    aceternitySize,
                    "rounded-full border-2 transition-all duration-200 flex items-center justify-center",
                    config.selectedValue === option ? "border-primary" : "border-gray-500 group-hover:border-gray-400"
                  )}
                  style={{ 
                    borderColor: config.selectedValue === option ? (borderColor || aceternityColor) : (borderColor || undefined),
                    backgroundColor: backgroundColor
                  }}
                >
                  {config.selectedValue === option && (
                    <div 
                      className="w-2 h-2 rounded-full bg-primary"
                      style={{ backgroundColor: aceternityColor }}
                    />
                  )}
                </div>
              </div>
              <span 
                className={cn(aceternityTextSize, "select-none font-medium")}
                style={color ? { color } : undefined}
              >
                {option}
              </span>
            </label>
          ))}
        </div>
      );

    default:
      return (
        <div className="text-red-500 italic text-xs">
          Provider {provider} not found
        </div>
      );
  }
}
