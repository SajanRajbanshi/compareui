export const generateSwitchCode = (provider: string, config: any) => {
  const { checked, size, disabled, label, styles } = config;
  const color = styles?.color;

  switch (provider) {
    case 'mui': {
      const muiSize = size === 'small' ? 'small' : 'medium';
      const sxProps = color ? `sx={{ '&.Mui-checked': { color: '${color}' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '${color}' } }}` : '';
      
      return `import { Switch, FormControlLabel } from '@mui/material';
import { useState } from 'react';

export function SwitchDemo() {
  const [checked, setChecked] = useState(${checked});

  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          size="${muiSize}"${disabled ? '\n          disabled' : ''}${sxProps ? `\n          ${sxProps}` : ''}
        />
      }
      label="${label || 'Toggle'}"
    />
  );
}`;
    }

    case 'chakra': {
      const chakraSize = size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md';
      const colorScheme = color ? '' : ' colorScheme="blue"';
      
      return `import { Switch, FormControl, FormLabel } from '@chakra-ui/react';
import { useState } from 'react';

export function SwitchDemo() {
  const [checked, setChecked] = useState(${checked});

  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel htmlFor="switch" mb="0" mr={3}>
        ${label || 'Toggle'}
      </FormLabel>
      <Switch
        id="switch"
        isChecked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        size="${chakraSize}"${disabled ? '\n        isDisabled' : ''}${colorScheme}
      />
    </FormControl>
  );
}`;
    }

    case 'antd': {
      const antSize = size === 'small' ? 'small' : size === 'large' ? undefined : 'default';
      
      return `import { Switch } from 'antd';
import { useState } from 'react';

export function SwitchDemo() {
  const [checked, setChecked] = useState(${checked});

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Switch
        checked={checked}
        onChange={setChecked}${antSize ? `\n        size="${antSize}"` : ''}${disabled ? '\n        disabled' : ''}
      />
      <span>${label || 'Toggle'}</span>
    </div>
  );
}`;
    }

    case 'shadcn': {
      const sizeClass = size === 'small' ? 'h-5 w-9' : size === 'large' ? 'h-7 w-14' : '';
      const textSize = size === 'small' ? 'text-xs' : size === 'large' ? 'text-lg' : '';
      
      return `import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from 'react';

export function SwitchDemo() {
  const [checked, setChecked] = useState(${checked});

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="switch"
        checked={checked}
        onCheckedChange={setChecked}${disabled ? '\n        disabled' : ''}${sizeClass ? `\n        className="${sizeClass}"` : ''}
      />
      <Label htmlFor="switch"${textSize ? ` className="${textSize}"` : ''}>
        ${label || 'Toggle'}
      </Label>
    </div>
  );
}`;
    }

    case 'aceternity': {
      const sizeClass = size === 'small' ? 'w-9 h-5' : size === 'large' ? 'w-14 h-7' : 'w-11 h-6';
      const thumbSize = size === 'small' ? 'h-4 w-4' : size === 'large' ? 'h-6 w-6' : 'h-5 w-5';
      const translate = size === 'small' ? 'translate-x-4' : size === 'large' ? 'translate-x-7' : 'translate-x-5';
      const textSize = size === 'small' ? 'text-xs' : size === 'large' ? 'text-lg' : 'text-sm';
      
      return `import { useState } from 'react';

export function SwitchDemo() {
  const [checked, setChecked] = useState(${checked});

  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        role="switch"
        aria-checked={checked}${disabled ? '\n        disabled' : ''}
        onClick={() => setChecked(!checked)}
        className="${sizeClass} relative inline-flex items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2${disabled ? ' opacity-50 cursor-not-allowed' : ' cursor-pointer'}"
        style={{ backgroundColor: checked ? '${color || '#3b82f6'}' : '#d1d5db' }}
      >
        <span className="${thumbSize} inline-block transform rounded-full bg-white transition-transform duration-200 \${checked ? '${translate}' : 'translate-x-0.5'}" />
      </button>
      <span className="${textSize} select-none">${label || 'Toggle'}</span>
    </div>
  );
}`;
    }

    default:
      return "// Code generation not available for this provider";
  }
};
