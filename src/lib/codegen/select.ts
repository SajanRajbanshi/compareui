export const generateSelectCode = (provider: string, config: any) => {
  const { options, value, placeholder, size, disabled, label, styles } = config;
  const color = styles?.color;
  const borderRadius = styles?.borderRadius || 8;
  const borderColor = styles?.borderColor;
  const normalizedOptions = options.map((opt: any) => 
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  switch (provider) {
    case 'mui': {
      return `import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useState } from 'react';

export function SelectDemo() {
  const [val, setVal] = useState('${value}');

  return (
    <FormControl fullWidth size="${size === 'small' ? 'small' : 'medium'}" disabled={${disabled}}>
      ${label ? `<InputLabel id="select-label">${label}</InputLabel>` : ''}
      <Select
        labelId="select-label"
        value={val}
        ${label ? `label="${label}"` : ''}
        onChange={(e) => setVal(e.target.value)}
        sx={{ 
          ${color ? `color: '${color}', ` : ''}
          '.MuiOutlinedInput-notchedOutline': { 
            borderColor: '${borderColor || color || '#ccc'}',
            borderRadius: '${borderRadius}px'
          } 
        }}
      >
        {${JSON.stringify(normalizedOptions)}.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}`;
    }

    case 'chakra': {
      const chakraSize = size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md';
      return `import { Box, Text, VStack, HStack } from '@chakra-ui/react';
import { ChevronDown, Check } from 'lucide-react';
import { useState } from 'react';

export function SelectDemo() {
  const [val, setVal] = useState('${value}');
  const [isOpen, setIsOpen] = useState(false);
  const options = ${JSON.stringify(normalizedOptions)};
  const selected = options.find(o => o.value === val);

  return (
    <Box position="relative" width="full">
      ${label ? `<Text mb={1} fontSize="sm" fontWeight="medium">${label}</Text>` : ''}
      <Box
        as="button"
        onClick={() => !${disabled} && setIsOpen(!isOpen)}
        width="full"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={4}
        py={2}
        borderRadius="${borderRadius}px"
        border="1px solid"
        borderColor="${borderColor || color || '#E2E8F0'}"
        bg="transparent"
        opacity={${disabled} ? 0.5 : 1}
        cursor={${disabled} ? "not-allowed" : "pointer"}
      >
        <Text color={val ? "${color || 'inherit'}" : "gray.400"}>
          {selected?.label || "${placeholder || 'Select an option'}"}
        </Text>
        <ChevronDown size={16} />
      </Box>
      
      {isOpen && (
        <VStack
          position="absolute"
          top="100%"
          left={0}
          right={0}
          mt={1}
          zIndex={10}
          bg="white"
          border="1px solid #E2E8F0"
          borderRadius="md"
          boxShadow="lg"
          align="stretch"
          py={1}
        >
          {options.map((opt) => (
            <HStack
              key={opt.value}
              px={4}
              py={2}
              cursor="pointer"
              _hover={{ bg: "gray.50" }}
              onClick={() => {
                setVal(opt.value);
                setIsOpen(false);
              }}
              justifyContent="space-between"
            >
              <Text color={opt.value === val ? "${color || '#3182ce'}" : "inherit"}>
                {opt.label}
              </Text>
              {opt.value === val && <Check size={14} color="${color || '#3182ce'}" />}
            </HStack>
          ))}
        </VStack>
      )}
    </Box>
  );
}`;
    }

    case 'antd': {
      return `import { Select } from 'antd';
import { useState } from 'react';

export function SelectDemo() {
  const [val, setVal] = useState('${value}');

  return (
    <div style={{ width: '100%' }}>
      ${label ? `<div style={{ marginBottom: 4 }}>${label}</div>` : ''}
      <Select
        value={val}
        onChange={setVal}
        disabled={${disabled}}
        placeholder="${placeholder || 'Select an option'}"
        size="${size === 'small' ? 'small' : size === 'large' ? 'large' : 'middle'}"
        style={{ 
          width: '100%',
          borderColor: '${borderColor || color || '#d9d9d9'}',
          borderRadius: '${borderRadius}px'
        }}
        options={${JSON.stringify(normalizedOptions)}}
      />
    </div>
  );
}`;
    }

    case 'shadcn': {
      return `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from 'react';

export function SelectDemo() {
  const [val, setVal] = useState('${value}');

  return (
    <div className="w-full space-y-1">
      ${label ? `<label className="text-sm font-medium">${label}</label>` : ''}
      <Select value={val} onValueChange={setVal} disabled={${disabled}}>
        <SelectTrigger 
          className="w-full"
          style={{ 
            borderColor: '${borderColor || color || '#e2e8f0'}', 
            color: '${color || 'inherit'}',
            borderRadius: '${borderRadius}px'
          }}
        >
          <SelectValue placeholder="${placeholder || 'Select an option'}" />
        </SelectTrigger>
        <SelectContent>
          {${JSON.stringify(normalizedOptions)}.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}`;
    }

    case 'aceternity': {
      return `import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export function SelectDemo() {
  const [val, setVal] = useState('${value}');
  const [isOpen, setIsOpen] = useState(false);
  const options = ${JSON.stringify(normalizedOptions)};
  const selected = options.find(o => o.value === val);

  return (
    <div className="w-full relative">
      ${label ? `<label className="block text-sm font-semibold mb-1 opacity-80">${label}</label>` : ''}
      <button
        onClick={() => !${disabled} && setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 rounded-xl transition-all border-2 bg-white"
        style={{ 
          borderColor: '${borderColor || color || '#3b82f6'}',
          borderRadius: '${borderRadius}px'
        }}
      >
        <span className="text-sm font-medium" style={{ color: '${color || 'inherit'}' }}>
          {selected?.label || "${placeholder || 'Select an option'}"}
        </span>
        <ChevronDown className={\`w-4 h-4 transition-transform \${isOpen ? 'rotate-180' : ''}\`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 right-0 mt-2 rounded-2xl border bg-white shadow-2xl p-2">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                setVal(opt.value);
                setIsOpen(false);
              }}
              className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <span className="text-sm font-medium">
                {opt.label}
              </span>
              {opt.value === val && <Check size={14} style={{ color: '${color || '#3b82f6'}' }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}`;
    }

    default:
      return '// Provider not supported';
  }
};
