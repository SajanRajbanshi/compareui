export const generateTabsCode = (provider: string, config: any) => {
  const { tabs, defaultValue, orientation, styles } = config;
  
  const activeColor = styles?.activeColor;
  const inactiveColor = styles?.inactiveColor;
  const backgroundColor = styles?.backgroundColor;
  const borderRadius = styles?.borderRadius;
  const padding = styles?.padding;

  switch (provider) {
    case 'mui': {
      const sxProps: string[] = [];
      if (backgroundColor) sxProps.push(`bgcolor: '${backgroundColor}'`);
      if (borderRadius !== undefined) sxProps.push(`borderRadius: '${borderRadius}px'`);
      if (padding !== undefined) sxProps.push(`p: ${padding * 0.25}`); // MUI uses spacing units
      
      const tabSx: string[] = [];
      if (activeColor) tabSx.push(`'&.Mui-selected': { color: '${activeColor}' }`);
      if (inactiveColor) tabSx.push(`color: '${inactiveColor}'`);

      return `import React from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export function CustomTabs() {
  const [value, setValue] = React.useState('${defaultValue}');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          orientation="${orientation || 'horizontal'}"${sxProps.length > 0 ? `
          sx={{
            ${sxProps.join(',\n            ')}
          }}` : ''}
          TabIndicatorProps={{
            style: { backgroundColor: '${activeColor || "primary.main"}' }
          }}
        >
          ${tabs.map((tab: any) => `<Tab 
            label="${tab.label}" 
            value="${tab.value}"${tabSx.length > 0 ? `
            sx={{
              ${tabSx.join(',\n              ')}
            }}` : ''} 
          />`).join('\n          ')}
        </Tabs>
      </Box>
      ${tabs.map((tab: any) => `<CustomTabPanel value={value} index="${tab.value}">
        ${tab.content}
      </CustomTabPanel>`).join('\n      ')}
    </Box>
  );
}`;
    }

    case 'chakra': {
      const tabsProps: string[] = [];
      if (orientation) tabsProps.push(`orientation="${orientation}"`);
      if (orientation !== 'vertical') tabsProps.push('fitted');
      tabsProps.push('variant="enclosed"');
      if (activeColor) tabsProps.push(`colorScheme="blue"`); // Chakra uses color schemes for tabs, activeColor tricky
      
      const listProps: string[] = [];
      if (backgroundColor) listProps.push(`bg="${backgroundColor}"`);
      if (borderRadius !== undefined) listProps.push(`borderRadius="${borderRadius}px"`);
      if (padding !== undefined) listProps.push(`p={${padding}}`);

      const tabProps: string[] = [];
      if (activeColor) tabProps.push(`_selected={{ color: '${activeColor}', borderColor: '${activeColor}' }}`);
      if (inactiveColor) tabProps.push(`color="${inactiveColor}"`);

      return `import { Tabs } from '@chakra-ui/react';

export function CustomTabs() {
  return (
    <Tabs.Root defaultValue="${defaultValue}"${tabsProps.length > 0 ? ' ' + tabsProps.join(' ') : ''}>
      <Tabs.List${listProps.length > 0 ? ' ' + listProps.join(' ') : ''}>
        ${tabs.map((tab: any) => `<Tabs.Trigger value="${tab.value}"${tabProps.length > 0 ? ' ' + tabProps.join(' ') : ''}>${tab.label}</Tabs.Trigger>`).join('\n        ')}
      </Tabs.List>

      <Tabs.ContentGroup>
        ${tabs.map((tab: any) => `<Tabs.Content value="${tab.value}">
          <p>${tab.content}</p>
        </Tabs.Content>`).join('\n        ')}
      </Tabs.ContentGroup>
    </Tabs.Root>
  );
}`;
    }

    case 'antd': {
      // Antd Tabs items prop structure
      const itemsCode = tabs.map((tab: any) => `    {
      key: '${tab.value}',
      label: '${tab.label}',
      children: '${tab.content}',
    }`).join(',\n');

      const tabBarStyle: string[] = [];
      if (backgroundColor) tabBarStyle.push(`backgroundColor: '${backgroundColor}'`);
      if (borderRadius !== undefined) tabBarStyle.push(`borderRadius: '${borderRadius}px'`);
      if (padding !== undefined) tabBarStyle.push(`padding: '${padding}px'`);
      if (padding !== undefined) tabBarStyle.push(`padding: '${padding}px'`);

      return `import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const items: TabsProps['items'] = [
${itemsCode}
];

export function CustomTabs() {
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <Tabs 
      defaultActiveKey="${defaultValue}" 
      items={items} 
      onChange={onChange}
      tabPlacement="${orientation === 'vertical' ? 'left' : 'top'}"
      ${tabBarStyle.length > 0 ? `tabBarStyle={{
        ${tabBarStyle.join(',\n        ')}
      }}` : ''}
    />
  );
}`;
    }

    case 'shadcn': {
      const isVertical = orientation === 'vertical';
      const rootClasses = isVertical ? 'flex gap-6 w-full' : 'w-full';
      const listClasses = isVertical 
        ? 'flex flex-col h-auto w-48 justify-start' 
        : `grid w-full grid-cols-${tabs.length}`;
      
      const listStyles: string[] = [];
      if (backgroundColor) listStyles.push(`backgroundColor: '${backgroundColor}'`);
      if (borderRadius !== undefined) listStyles.push(`borderRadius: '${borderRadius}px'`);
      if (padding !== undefined) listStyles.push(`padding: '${padding}px'`);
      if (!isVertical) listStyles.push(`gridTemplateColumns: 'repeat(${tabs.length}, minmax(0, 1fr))'`);

      return `import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function CustomTabs() {
  return (
    <Tabs defaultValue="${defaultValue}" className="${rootClasses}" orientation="${orientation || 'horizontal'}">
      <TabsList className="${listClasses}"${listStyles.length > 0 ? ` style={{ ${listStyles.join(', ')} }}` : ''}>
        ${tabs.map((tab: any) => `<TabsTrigger value="${tab.value}"${isVertical ? ' className="w-full justify-start"' : ''}>
          ${tab.label}
        </TabsTrigger>`).join('\n        ')}
      </TabsList>
      ${tabs.map((tab: any) => `<TabsContent value="${tab.value}" className="${isVertical ? 'mt-0 flex-1' : 'mt-2 flex-1'}">
        <div style={{ wordBreak: 'break-word', whiteSpace: 'normal', maxWidth: '100%' }}>
          ${tab.content}
        </div>
      </TabsContent>`).join('\n      ')}
    </Tabs>
  )
}`;
    }

    case 'aceternity': {
      return `// Aceternity UI does not include a standard Tabs component.`;
    }

    default:
      return "// Provider code not available";
  }
};
