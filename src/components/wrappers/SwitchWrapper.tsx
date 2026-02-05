"use client";

import React from "react";
import { 
  Switch as MuiSwitch, 
  FormControlLabel as MuiFormControlLabel 
} from "@mui/material";
import { 
  Box as ChakraBox,
  Text as ChakraText
} from "@chakra-ui/react";
import { Switch as AntSwitch } from "antd";
import { Switch as ShadcnSwitch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ProviderContext, ProviderType } from "@/components/Providers";

interface SwitchConfig {
  checked: boolean;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  label?: string;
  color?: string;
  styles?: {
    color?: string;
  };
}

interface SwitchWrapperProps {
  provider: ProviderType;
  config: SwitchConfig;
  onChange?: (checked: boolean) => void;
}

export default function SwitchWrapper({
  provider,
  config,
  onChange,
}: SwitchWrapperProps) {
  const { themeMode } = React.useContext(ProviderContext);
  const color = config.styles?.color || config.color;
  const label = config.label || "Toggle";

  switch (provider) {
    case "mui":
      const muiSize = config.size === 'small' ? 'small' : config.size === 'large' ? 'medium' : 'medium';
      
      return (
        <MuiFormControlLabel
          control={
            <MuiSwitch
              checked={config.checked}
              onChange={(e) => onChange?.(e.target.checked)}
              size={muiSize}
              disabled={config.disabled}
              sx={color ? { 
                '&.Mui-checked': { color },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { 
                  backgroundColor: color 
                }
              } : undefined}
            />
          }
          label={label}
        />
      );

    case "chakra":
      const chakraWidth = config.size === 'small' ? '36px' : config.size === 'large' ? '56px' : '44px';
      const chakraHeight = config.size === 'small' ? '20px' : config.size === 'large' ? '28px' : '24px';
      const chakraThumbSize = config.size === 'small' ? '16px' : config.size === 'large' ? '24px' : '20px';
      const chakraTextSize = config.size === 'small' ? 'sm' : config.size === 'large' ? 'lg' : 'md';
      
      return (
        <ChakraBox display="flex" alignItems="center" gap={2}>
          <ChakraBox
            as="button"
            role="switch"
            aria-checked={config.checked}
            onClick={() => !config.disabled && onChange?.(!config.checked)}
            width={chakraWidth}
            height={chakraHeight}
            position="relative"
            borderRadius="full"
            bg={config.checked ? (color || 'blue.500') : 'gray.300'}
            cursor={config.disabled ? 'not-allowed' : 'pointer'}
            opacity={config.disabled ? 0.5 : 1}
            transition="all 0.2s"
            _focus={{
              outline: 'none',
              boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.5)'
            }}
          >
            <ChakraBox
              position="absolute"
              top="2px"
              left={config.checked ? `calc(100% - ${chakraThumbSize} - 2px)` : '2px'}
              width={chakraThumbSize}
              height={chakraThumbSize}
              borderRadius="full"
              bg="white"
              boxShadow="sm"
              transition="all 0.2s"
            />
          </ChakraBox>
          <ChakraText fontSize={chakraTextSize} color={color}>
            {label}
          </ChakraText>
        </ChakraBox>
      );

    case "antd":
      const antSize = config.size === 'small' ? 'small' : config.size === 'large' ? undefined : 'default';
      
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AntSwitch
            checked={config.checked}
            onChange={onChange}
            size={antSize as any}
            disabled={config.disabled}
            style={color ? {
              backgroundColor: config.checked ? color : undefined
            } : undefined}
          />
          <span style={color ? { color } : undefined}>{label}</span>
        </div>
      );

    case "shadcn":
      const shadcnSize = config.size === 'small' ? 'sm' : config.size === 'large' ? 'lg' : 'default';
      
      return (
        <div className="flex items-center space-x-2">
          <ShadcnSwitch
            id="shadcn-switch"
            checked={config.checked}
            onCheckedChange={onChange}
            disabled={config.disabled}
            // size={shadcnSize as any}
            style={color && config.checked ? { backgroundColor: color } : undefined}
          />
          <Label 
            htmlFor="shadcn-switch"
            className={cn(
              config.size === 'small' && 'text-xs',
              config.size === 'large' && 'text-lg'
            )}
            style={color ? { color } : undefined}
          >
            {label}
          </Label>
        </div>
      );

    case "aceternity":
      const aceternitySize = config.size === 'small' 
        ? 'w-9 h-5' 
        : config.size === 'large' 
        ? 'w-14 h-7' 
        : 'w-11 h-6';
      const aceternityThumbSize = config.size === 'small' 
        ? 'h-4 w-4' 
        : config.size === 'large' 
        ? 'h-6 w-6' 
        : 'h-5 w-5';
      const aceternityTranslate = config.size === 'small' 
        ? 'translate-x-4' 
        : config.size === 'large' 
        ? 'translate-x-7' 
        : 'translate-x-5';
      const aceternityTextSize = config.size === 'small' ? 'text-xs' : config.size === 'large' ? 'text-lg' : 'text-sm';
      
      return (
        <div className="flex items-center space-x-2">
          <button
            type="button"
            role="switch"
            aria-checked={config.checked}
            disabled={config.disabled}
            onClick={() => !config.disabled && onChange?.(!config.checked)}
            className={cn(
              aceternitySize,
              "relative inline-flex items-center rounded-full transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-offset-2",
              config.disabled && "opacity-50 cursor-not-allowed",
              !config.disabled && "cursor-pointer"
            )}
            style={{
              backgroundColor: config.checked 
                ? (color || '#3b82f6') 
                : '#d1d5db'
            }}
          >
            <span
              className={cn(
                aceternityThumbSize,
                "inline-block transform rounded-full bg-white transition-transform duration-200",
                config.checked ? aceternityTranslate : 'translate-x-0.5'
              )}
            />
          </button>
          <span 
            className={cn(aceternityTextSize, "select-none")}
            style={color ? { color } : undefined}
          >
            {label}
          </span>
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
