import React from 'react';
import { TextField as MuiInput, InputAdornment } from '@mui/material';
import { Input as ChakraInput, Field, Group, InputElement, InputAddon } from '@chakra-ui/react';
import { Input as AntInput } from 'antd';
import { Input as ShadcnInput } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ProviderContext, ProviderType } from '@/components/Providers';
import { Mail, Search } from 'lucide-react';

interface InputConfig {
  placeholder: string;
  label: string;
  type?: string;
  variant?: string;
  size?: 'small' | 'medium' | 'large';
  styles?: {
    borderRadius?: number | string;
    borderColor?: string;
    focusColor?: string;
    backgroundColor?: string;
    fontColor?: string;
  };
}

interface InputWrapperProps {
  provider: ProviderType;
  config: InputConfig;
}

export default function InputWrapper({ provider, config }: InputWrapperProps) {
  const { themeMode } = React.useContext(ProviderContext);
  const { styles } = config;

  // Normalized values
  const borderRadius = styles?.borderRadius !== undefined ? (typeof styles.borderRadius === 'number' ? `${styles.borderRadius}px` : styles.borderRadius) : '8px';
  const borderColor = styles?.borderColor;
  const focusColor = styles?.focusColor || '#3b82f6';
  const backgroundColor = styles?.backgroundColor;
  const fontColor = styles?.fontColor;

  const commonStyles = {
    borderRadius,
    borderColor,
    backgroundColor,
    color: fontColor
  };

  switch (provider) {
    case 'mui':
      const muiVariant = config.variant === 'filled' ? 'filled' : config.variant === 'standard' ? 'standard' : 'outlined';
      
      const MuiField = (props: any) => (
        <MuiInput 
          label={config.label} 
          placeholder={config.placeholder} 
          type={config.type || 'text'} 
          variant={muiVariant}
          fullWidth
          size={config.size === 'small' ? 'small' : 'medium'}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius,
              backgroundColor,
              color: fontColor,
              '& input': {
                color: fontColor,
              },
              '& fieldset': { borderColor },
              '&.Mui-focused fieldset': { borderColor: focusColor },
            },
            '& .MuiFilledInput-root': {
                borderTopLeftRadius: borderRadius,
                borderTopRightRadius: borderRadius,
                backgroundColor,
                color: fontColor,
                '& input': {
                  color: fontColor,
                },
                '&:before': { borderColor },
                '&:after': { borderColor: focusColor },
            },
            '& .MuiInput-root': { // Standard variant
               color: fontColor,
               '& input': {
                 color: fontColor,
               },
               '&:before': { borderColor },
               '&:after': { borderColor: focusColor }
            },
            '& .MuiInputLabel-root': {
               color: fontColor ? `${fontColor} !important` : undefined
            }
          }}
          {...props}
        />
      );

      return (
        <div className="flex flex-col gap-4 w-full">
          <MuiField />
          <MuiField 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail size={20} style={{ color: fontColor }} />
                </InputAdornment>
              ),
            }}
          />
          <MuiField 
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search size={20} style={{ color: fontColor }} />
                </InputAdornment>
              ),
            }}
          />
        </div>
      );

    case 'chakra':
      const chakraVariant = (config.variant === 'filled' ? 'subtle' : config.variant === 'standard' ? 'flushed' : 'outline') as any;
      const chakraSize = config.size === 'small' ? 'sm' : config.size === 'large' ? 'lg' : 'md';

      return (
        <div className="flex flex-col gap-4 w-full">
          <Field.Root>
            <Field.Label fontWeight="bold" fontSize="sm" mb={1} color={fontColor}>{config.label}</Field.Label>
            <ChakraInput 
              placeholder={config.placeholder} 
              variant={chakraVariant}
              size={chakraSize}
              style={commonStyles}
              _focus={{ borderColor: focusColor, boxShadow: `0 0 0 1px ${focusColor}` }}
            />
          </Field.Root>

          <Group attached={false} width="100%">
            <InputElement placement="start" pointerEvents="none">
              <Mail size={18} color={fontColor || 'currentColor'} />
            </InputElement>
            <ChakraInput 
              placeholder={config.placeholder}
              variant={chakraVariant}
              size={chakraSize}
              style={{ ...commonStyles, paddingLeft: '40px' }}
              _focus={{ borderColor: focusColor, boxShadow: `0 0 0 1px ${focusColor}` }}
            />
          </Group>

          <Group attached={false} width="100%">
            <ChakraInput 
              placeholder={config.placeholder}
              variant={chakraVariant}
              size={chakraSize}
              style={{ ...commonStyles, paddingRight: '40px' }}
              _focus={{ borderColor: focusColor, boxShadow: `0 0 0 1px ${focusColor}` }}
            />
            <InputElement placement="end">
              <Search size={18} color={fontColor || 'currentColor'} />
            </InputElement>
          </Group>
        </div>
      );

    case 'antd':
      const antVariant = config.variant === 'filled' ? 'borderless' : 'outlined'; // Antd doesn't distinguish much besides borderless
      const antSize = config.size === 'small' ? 'small' : config.size === 'large' ? 'large' : 'middle';

      const AntWrapper = ({ children }: any) => (
         <div className="w-full">
          <label className={cn(
            "block text-xs font-bold mb-1 uppercase tracking-tight",
            themeMode === 'dark' ? "text-neutral-500" : "text-neutral-600"
          )} style={{ color: fontColor }}>
            {config.label}
          </label>
          {children}
        </div>
      );

      return (
        <div className="flex flex-col gap-4 w-full">
          <AntWrapper>
            <AntInput 
              placeholder={config.placeholder} 
              variant={antVariant}
              size={antSize}
              style={{ ...commonStyles, borderRadius }}
            />
          </AntWrapper>
          <AntWrapper>
            <AntInput 
              placeholder={config.placeholder}
              prefix={<Mail size={16} className={!fontColor ? "text-gray-400" : ""} color={fontColor} />}
              variant={antVariant}
              size={antSize}
              style={{ ...commonStyles, borderRadius }}
            />
          </AntWrapper>
          <AntWrapper>
            <AntInput 
              placeholder={config.placeholder}
              suffix={<Search size={16} className={!fontColor ? "text-gray-400" : ""} color={fontColor} />}
              variant={antVariant}
              size={antSize}
              style={{ ...commonStyles, borderRadius }}
            />
          </AntWrapper>
        </div>
      );

    case 'shadcn':
      // Shadcn uses standard inputs, wrapper for icons
      const ShadcnWrapper = ({ children, iconLeft, iconRight }: any) => (
        <div className="grid w-full items-center gap-2 relative">
          <Label className="font-bold text-xs uppercase tracking-wider" style={{ color: fontColor }}>{config.label}</Label>
          <div className="relative">
            {iconLeft && <div className="absolute left-3 top-2.5 text-muted-foreground" style={{ color: fontColor }}>{iconLeft}</div>}
            <ShadcnInput 
              placeholder={config.placeholder} 
              className={cn(
                config.size === 'small' ? 'h-8 text-xs' : config.size === 'large' ? 'h-12 text-lg' : 'h-10'
              )}
              style={{
                ...commonStyles,
                paddingLeft: iconLeft ? '3rem' : undefined,
                paddingRight: iconRight ? '3rem' : undefined
              }} 
            />
             {iconRight && <div className="absolute right-3 top-2.5 text-muted-foreground" style={{ color: fontColor }}>{iconRight}</div>}
          </div>
        </div>
      );

      return (
        <div className="flex flex-col gap-4 w-full">
          <ShadcnWrapper />
          <ShadcnWrapper iconLeft={<Mail size={16} />} />
          <ShadcnWrapper iconRight={<Search size={16} />} />
        </div>
      );

    case 'aceternity':
       // Aceternity Input is custom
       const AceternityWrapper = ({ iconLeft, iconRight }: any) => (
        <div className="w-full group relative">
          <label className={cn(
            "text-[10px] font-black mb-1 block transition-colors uppercase tracking-[0.2em]",
            themeMode === 'dark' ? "text-neutral-600 group-hover:text-blue-500" : "text-neutral-400 group-hover:text-blue-600"
          )} style={{ color: fontColor }}>
            {config.label}
          </label>
          <div className="relative">
             {iconLeft && <div className="absolute left-3 top-3 z-10 text-neutral-400" style={{ color: fontColor }}>{iconLeft}</div>}
            <input 
              type={config.type || 'text'} 
              placeholder={config.placeholder}
              style={{ 
                borderRadius, 
                borderColor,
                backgroundColor,
                color: fontColor,
                paddingLeft: iconLeft ? '3rem' : undefined,
                paddingRight: iconRight ? '3rem' : undefined
              }}
              className={cn(
                "flex w-full border text-sm transition-all duration-300",
                config.size === 'small' ? 'h-9 px-3' : config.size === 'large' ? 'h-14 px-6 text-lg' : 'h-11 px-4 py-2',
                themeMode === 'dark' 
                  ? "bg-neutral-900 text-white focus:ring-2 focus:ring-blue-900 focus:border-blue-500" 
                  : "bg-white text-black shadow-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-400"
              )}
            />
            {iconRight && <div className="absolute right-3 top-3 z-10 text-neutral-400" style={{ color: fontColor }}>{iconRight}</div>}
          </div>
        </div>
       );

      return (
        <div className="flex flex-col gap-4 w-full">
          <AceternityWrapper />
          <AceternityWrapper iconLeft={<Mail size={18} />} />
          <AceternityWrapper iconRight={<Search size={18} />} />
        </div>
      );

    default:
      return <div className="text-red-500 italic text-xs">Provider {provider} not found</div>;
  }
}
