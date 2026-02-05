export const generateRadioCode = (provider: string, config: any) => {
  const { options, selectedValue, size, disabled, styles } = config;
  const color = styles?.color;

  switch (provider) {
    case 'mui': {
      const muiSize = size === 'small' ? 'small' : 'medium';
      const sxProps = color ? `sx={{ color: '${color}', '&.Mui-checked': { color: '${color}' } }}` : '';
      
      return `import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { useState } from 'react';

export function RadioDemo() {
  const [value, setValue] = useState('${selectedValue}');

  return (
    <FormControl${disabled ? ' disabled' : ''}>
      <FormLabel>Choose an option</FormLabel>
      <RadioGroup value={value} onChange={(e) => setValue(e.target.value)}>
${options.map((opt: string) => `        <FormControlLabel
          value="${opt}"
          control={<Radio size="${muiSize}"${sxProps ? ` ${sxProps}` : ''} />}
          label="${opt}"
        />`).join('\n')}
      </RadioGroup>
    </FormControl>
  );
}`;
    }

    case 'chakra': {
      const chakraSize = size === 'small' ? '14px' : size === 'large' ? '22px' : '18px';
      const chakraTextSize = size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md';
      
      return `import { Box, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';

export function RadioDemo() {
  const [value, setValue] = useState('${selectedValue}');

  return (
    <Stack gap={2}>
      <Text fontWeight="medium" fontSize="sm" mb={1}>Choose an option</Text>
      {${JSON.stringify(options)}.map((option) => (
        <Box
          key={option}
          display="flex"
          alignItems="center"
          gap={2}
          cursor={${disabled} ? 'not-allowed' : 'pointer'}
          opacity={${disabled} ? 0.5 : 1}
          onClick={() => !${disabled} && setValue(option)}
        >
          <Box
            width="${chakraSize}"
            height="${chakraSize}"
            borderRadius="full"
            border="2px solid"
            borderColor={value === option ? '${color || 'blue.500'}' : 'gray.300'}
            display="flex"
            alignItems="center"
            justifyContent="center"
            transition="all 0.2s"
          >
            {value === option && (
              <Box
                width="60%"
                height="60%"
                borderRadius="full"
                bg="${color || 'blue.500'}"
              />
            )}
          </Box>
          <Text fontSize="${chakraTextSize}"${color ? ` color="${color}"` : ''}>
            {option}
          </Text>
        </Box>
      ))}
    </Stack>
  );
}`;
    }

    case 'antd': {
      const antSize = size === 'small' ? 'small' : size === 'large' ? 'large' : 'middle';
      
      return `import { Radio } from 'antd';
import { useState } from 'react';

export function RadioDemo() {
  const [value, setValue] = useState('${selectedValue}');

  return (
    <Radio.Group 
      value={value} 
      onChange={(e) => setValue(e.target.value)}${disabled ? '\n      disabled' : ''}
      size="${antSize}"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
${options.map((opt: string) => `        <Radio value="${opt}">${opt}</Radio>`).join('\n')}
      </div>
    </Radio.Group>
  );
}`;
    }

    case 'shadcn': {
      const sizeClass = size === 'small' ? 'h-3 w-3' : size === 'large' ? 'h-6 w-6' : '';
      const textSize = size === 'small' ? 'text-xs' : size === 'large' ? 'text-lg' : '';
      
      return `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from 'react';

export function RadioDemo() {
  const [value, setValue] = useState('${selectedValue}');

  return (
    <RadioGroup value={value} onValueChange={setValue}${disabled ? ' disabled' : ''}>
      <div className="flex flex-col gap-3">
${options.map((opt: string) => `        <div className="flex items-center space-x-2">
          <RadioGroupItem value="${opt}" id="radio-${opt}"${sizeClass ? ` className="${sizeClass}"` : ''} />
          <Label htmlFor="radio-${opt}"${textSize ? ` className="${textSize}"` : ''}>${opt}</Label>
        </div>`).join('\n')}
      </div>
    </RadioGroup>
  );
}
`;
    }

    case 'aceternity': {
      const sizeClass = size === 'small' ? 'h-3 w-3' : size === 'large' ? 'h-6 w-6' : 'h-4 w-4';
      const textSize = size === 'small' ? 'text-xs' : size === 'large' ? 'text-lg' : 'text-sm';
      
      return `import { useState } from 'react';

export function RadioDemo() {
  const [value, setValue] = useState('${selectedValue}');

  return (
    <div className="flex flex-col gap-3">
${options.map((opt: string) => `      <label className="flex items-center space-x-2 cursor-pointer${disabled ? ' opacity-50 cursor-not-allowed' : ''}">
        <input
          type="radio"
          name="radio-group"
          value="${opt}"
          checked={value === '${opt}'}
          onChange={(e) => setValue(e.target.value)}${disabled ? '\n          disabled' : ''}
          className="${sizeClass} rounded-full border-2 appearance-none cursor-pointer checked:border-4 transition-all duration-200"
        />
        <span className="${textSize} select-none">${opt}</span>
      </label>`).join('\n')}
    </div>
  );
}`;
    }

    default:
      return "// Code generation not available for this provider";
  }
};
