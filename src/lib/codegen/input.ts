export const generateInputCode = (provider: string, config: any) => {
  const { styles, variant, size, label, placeholder } = config;

  const borderRadius = styles?.borderRadius !== undefined ? (typeof styles.borderRadius === 'number' ? `${styles.borderRadius}px` : styles.borderRadius) : undefined;
  const borderColor = styles?.borderColor;
  const focusColor = styles?.focusColor;
  const backgroundColor = styles?.backgroundColor;
  const fontColor = styles?.fontColor;

  switch (provider) {
    case 'mui': {
      const muiVariant = variant === "filled" ? "filled" : variant === "standard" ? "standard" : "outlined";
      const muiSize = size === 'small' ? 'small' : 'medium';

      const sxProps: string[] = [];
      if (borderRadius) sxProps.push(`borderRadius: '${borderRadius}'`);
      if (backgroundColor) sxProps.push(`backgroundColor: '${backgroundColor}'`);
      if (fontColor) sxProps.push(`color: '${fontColor}'`);
      if (fontColor) sxProps.push(`'& input': { color: '${fontColor}' }`);
      if (borderColor) sxProps.push(`'& fieldset': { borderColor: '${borderColor}' }`);
      if (focusColor) sxProps.push(`'&.Mui-focused fieldset': { borderColor: '${focusColor}' }`);

      const sxString = sxProps.length > 0 ? `sx={{ ${sxProps.join(', ')} }}` : '';
      const labelSx = fontColor ? `sx={{ color: '${fontColor} !important' }}` : '';

      return `import { TextField, InputAdornment } from '@mui/material';
import { Mail, Search } from 'lucide-react';

export function InputDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Default */}
      <TextField 
        label="${label}" 
        variant="${muiVariant}"
        size="${muiSize}"
        fullWidth
        ${sxString}
        ${labelSx ? `InputLabelProps={{ ${labelSx} }}` : ''}
      />

      {/* Start Icon */}
      <TextField
        label="${label}"
        variant="${muiVariant}"
        size="${muiSize}"
        fullWidth
        ${sxString}
        ${labelSx ? `InputLabelProps={{ ${labelSx} }}` : ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Mail size={20}${fontColor ? ` style={{ color: '${fontColor}' }}` : ''} />
            </InputAdornment>
          ),
        }}
      />

      {/* End Icon */}
      <TextField
        label="${label}"
        variant="${muiVariant}"
        size="${muiSize}"
        fullWidth
        ${sxString}
        ${labelSx ? `InputLabelProps={{ ${labelSx} }}` : ''}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search size={20}${fontColor ? ` style={{ color: '${fontColor}' }}` : ''} />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}`;
    }

    case 'chakra': {
      const variantVal = variant === "filled" ? "filled" : variant === "standard" ? "flushed" : "outline";
      const sizeVal = size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md';
      
      const styleProps: string[] = [];
      if (borderRadius) styleProps.push(`borderRadius: '${borderRadius}'`);
      if (borderColor) styleProps.push(`borderColor: '${borderColor}'`);
      if (backgroundColor) styleProps.push(`backgroundColor: '${backgroundColor}'`);
      if (fontColor) styleProps.push(`color: '${fontColor}'`);
      const styleString = styleProps.length > 0 ? `style={{ ${styleProps.join(', ')} }}` : '';
      
      return `import { Input, InputGroup, InputLeftElement, InputRightElement, Stack, Text, Box } from '@chakra-ui/react';
import { Mail, Search } from 'lucide-react';

export function InputDemo() {
  return (
    <Stack spacing={4}>
      {/* Default */}
      <Box>
        <Text mb="8px" fontWeight="bold" fontSize="sm"${fontColor ? ` color="${fontColor}"` : ''}>${label}</Text>
        <Input placeholder="${placeholder}" variant="${variantVal}" size="${sizeVal}" ${styleString}${focusColor ? ` _focus={{ borderColor: '${focusColor}' }}` : ''} />
      </Box>

      {/* Start Icon */}
      <InputGroup size="${sizeVal}">
        <InputLeftElement pointerEvents='none'>
          <Mail size={18}${fontColor ? ` color="${fontColor}"` : ''} />
        </InputLeftElement>
        <Input placeholder="${placeholder}" variant="${variantVal}" ${styleString}${focusColor ? ` _focus={{ borderColor: '${focusColor}' }}` : ''} />
      </InputGroup>

      {/* End Icon */}
      <InputGroup size="${sizeVal}">
        <Input placeholder="${placeholder}" variant="${variantVal}" ${styleString}${focusColor ? ` _focus={{ borderColor: '${focusColor}' }}` : ''} />
        <InputRightElement>
          <Search size={18}${fontColor ? ` color="${fontColor}"` : ''} />
        </InputRightElement>
      </InputGroup>
    </Stack>
  );
}`;
    }

    case 'antd': {
      const variantVal = variant === "filled" ? "borderless" : "outlined";
      const sizeVal = size === 'small' ? 'small' : size === 'large' ? 'large' : 'middle';

      const styleProps: string[] = [];
      if (borderRadius) styleProps.push(`borderRadius: '${borderRadius}'`);
      if (borderColor) styleProps.push(`borderColor: '${borderColor}'`);
      if (backgroundColor) styleProps.push(`backgroundColor: '${backgroundColor}'`);
      if (fontColor) styleProps.push(`color: '${fontColor}'`);
      const styleString = styleProps.length > 0 ? `style={{ ${styleProps.join(', ')} }}` : '';

      return `import { Input } from 'antd';
import { Mail, Search } from 'lucide-react';

export function InputDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Default */}
      <div>
        <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold', fontSize: 12${fontColor ? `, color: '${fontColor}'` : ''} }}>${label}</label>
        <Input placeholder="${placeholder}" variant="${variantVal}" size="${sizeVal}" ${styleString} />
      </div>

      {/* Start Icon */}
      <Input 
        placeholder="${placeholder}" 
        prefix={<Mail size={16} color="${fontColor || '#9ca3af'}" />} 
        variant="${variantVal}" 
        size="${sizeVal}"
        ${styleString}
      />

      {/* End Icon */}
      <Input 
        placeholder="${placeholder}" 
        suffix={<Search size={16} color="${fontColor || '#9ca3af'}" />} 
        variant="${variantVal}" 
        size="${sizeVal}"
        ${styleString}
      />
    </div>
  );
}`;
    }

    case 'shadcn': {
      const styleProps: string[] = [];
      if (borderRadius) styleProps.push(`borderRadius: '${borderRadius}'`);
      if (borderColor) styleProps.push(`borderColor: '${borderColor}'`);
      if (backgroundColor) styleProps.push(`backgroundColor: '${backgroundColor}'`);
      if (fontColor) styleProps.push(`color: '${fontColor}'`);
      const styleString = styleProps.length > 0 ? `style={{ ${styleProps.join(', ')} }}` : '';
      const labelStyle = fontColor ? `style={{ color: '${fontColor}' }}` : '';

      return `import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Search } from "lucide-react"

export function InputDemo() {
  return (
    <div className="grid w-full items-center gap-4">
      {/* Default */}
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email" ${labelStyle}>${label}</Label>
        <Input type="email" id="email" placeholder="${placeholder}" ${styleString} />
      </div>

      {/* Start Icon */}
      <div className="relative">
        <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"${fontColor ? ` style={{ color: '${fontColor}' }}` : ''}>
          <Mail className="h-4 w-4" />
        </div>
        <Input 
          type="email" 
          placeholder="${placeholder}" 
          style={{ paddingLeft: '3rem'${borderRadius ? `, borderRadius: '${borderRadius}'` : ''}${borderColor ? `, borderColor: '${borderColor}'` : ''}${backgroundColor ? `, backgroundColor: '${backgroundColor}'` : ''}${fontColor ? `, color: '${fontColor}'` : ''} }}
        />
      </div>

      {/* End Icon */}
      <div className="relative">
        <Input 
          type="email" 
          placeholder="${placeholder}" 
          style={{ paddingRight: '3rem'${borderRadius ? `, borderRadius: '${borderRadius}'` : ''}${borderColor ? `, borderColor: '${borderColor}'` : ''}${backgroundColor ? `, backgroundColor: '${backgroundColor}'` : ''}${fontColor ? `, color: '${fontColor}'` : ''} }}
        />
        <div className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground"${fontColor ? ` style={{ color: '${fontColor}' }}` : ''}>
          <Search className="h-4 w-4" />
        </div>
      </div>
    </div>
  )
}`;
    }

    case 'aceternity': {
      const styleProps: string[] = [];
      if (borderRadius) styleProps.push(`borderRadius: '${borderRadius}'`);
      if (borderColor) styleProps.push(`borderColor: '${borderColor}'`);
      if (backgroundColor) styleProps.push(`backgroundColor: '${backgroundColor}'`);
      if (fontColor) styleProps.push(`color: '${fontColor}'`);
      const styleString = styleProps.length > 0 ? `style={{ ${styleProps.join(', ')} }}` : '';
      const labelStyle = fontColor ? `style={{ color: '${fontColor}' }}` : '';

      return `import { Mail, Search } from 'lucide-react';

export function InputDemo() {
  return (
    <div className="space-y-4">
      {/* Default */}
      <div className="w-full">
        <label className="text-xs font-bold mb-1 block uppercase" ${labelStyle}>${label}</label>
        <input 
          type="text" 
          placeholder="${placeholder}"
          ${styleString}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {/* Start Icon */}
      <div className="relative w-full">
        <div className="absolute left-3 top-3 text-neutral-400"${fontColor ? ` style={{ color: '${fontColor}' }}` : ''}>
           <Mail size={18} />
        </div>
        <input 
          type="text" 
          placeholder="${placeholder}"
          style={{ paddingLeft: '3rem'${borderRadius ? `, borderRadius: '${borderRadius}'` : ''}${borderColor ? `, borderColor: '${borderColor}'` : ''}${backgroundColor ? `, backgroundColor: '${backgroundColor}'` : ''}${fontColor ? `, color: '${fontColor}'` : ''} }}
          className="flex h-10 w-full rounded-md border border-input bg-background pr-3 py-2 text-sm"
        />
      </div>

      {/* End Icon */}
      <div className="relative w-full">
        <input 
          type="text" 
          placeholder="${placeholder}"
          style={{ paddingRight: '3rem'${borderRadius ? `, borderRadius: '${borderRadius}'` : ''}${borderColor ? `, borderColor: '${borderColor}'` : ''}${backgroundColor ? `, backgroundColor: '${backgroundColor}'` : ''}${fontColor ? `, color: '${fontColor}'` : ''} }}
          className="flex h-10 w-full rounded-md border border-input bg-background pl-3 py-2 text-sm"
        />
        <div className="absolute right-3 top-3 text-neutral-400"${fontColor ? ` style={{ color: '${fontColor}' }}` : ''}>
           <Search size={18} />
        </div>
      </div>
    </div>
  );
}`;
    }

    default:
      return "// Code generation not available for this provider";
  }
};
