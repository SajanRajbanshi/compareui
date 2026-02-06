export const generateProgressCode = (provider: string, config: any) => {
  const { styles, size, value = 60, max = 100, label } = config;
  
  const indicatorColor = styles?.indicatorColor;
  const trackColor = styles?.trackColor;
  const height = styles?.height || (size === 'small' ? 4 : size === 'large' ? 12 : 8);
  const borderRadius = styles?.borderRadius !== undefined ? (typeof styles.borderRadius === 'number' ? `${styles.borderRadius}px` : styles.borderRadius) : '999px';

  switch (provider) {
    case 'mui': {
      const sxProps: string[] = [
        `height: ${height}`,
        `borderRadius: '${borderRadius}'`,
      ];
      if (trackColor) sxProps.push(`bgcolor: '${trackColor}'`);
      
      const barSx = indicatorColor ? `, '& .MuiLinearProgress-bar': { bgcolor: '${indicatorColor}' }` : '';

      return `import { Box, LinearProgress, Typography } from '@mui/material';

export function CustomProgress() {
  return (
    <Box sx={{ width: '100%' }}>
      ${label ? `<Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>${label}</Typography>` : ''}
      <LinearProgress 
        variant="determinate" 
        value={${value}} 
        sx={{ 
          ${sxProps.join(',\n          ')}${barSx}
        }} 
      />
    </Box>
  );
}`;
    }

    case 'chakra': {
      const rootStyle: string[] = [`height: "${height}px"`, `borderRadius: "${borderRadius}"`];
      if (trackColor) rootStyle.push(`backgroundColor: "${trackColor}"`);
      
      const indicatorStyle: string[] = [];
      if (indicatorColor) indicatorStyle.push(`backgroundColor: "${indicatorColor}"`);

      return `import { ProgressRoot, ProgressRange, ProgressLabel, ProgressValueText } from '@chakra-ui/react';

export function CustomProgress() {
  return (
    <ProgressRoot value={${value}} max={${max}} width="100%" style={{ ${rootStyle.join(', ')} }}>
      ${label ? `<ProgressLabel mb="2" fontWeight="500">${label}</ProgressLabel>` : ''}
      <ProgressRange style={{ ${indicatorStyle.join(', ')} }} />
    </ProgressRoot>
  );
}`;
    }

    case 'antd': {
      const strokeColor = indicatorColor ? `strokeColor="${indicatorColor}"` : '';
      const railColor = trackColor ? `railColor="${trackColor}"` : '';

      return `import { Progress, Typography } from 'antd';

const { Text } = Typography;

export function CustomProgress() {
  return (
    <div style={{ width: '100%' }}>
      ${label ? `<div style={{ marginBottom: 8 }}><Text strong>${label}</Text></div>` : ''}
      <Progress 
        percent={${Math.round((value / max) * 100)}} 
        strokeWidth={${height}}
        ${strokeColor}
        ${railColor}
        showInfo={false}
        style={{ borderRadius: '${borderRadius}' }}
      />
    </div>
  );
}`;
    }

    case 'shadcn': {
      const rootStyle: string[] = [`height: "${height}px"`, `borderRadius: "${borderRadius}"`];
      if (trackColor) rootStyle.push(`backgroundColor: "${trackColor}"`);
      
      const indicatorStyle: string[] = [];
      if (indicatorColor) indicatorStyle.push(`backgroundColor: "${indicatorColor}"`);

      return `import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";

export function CustomProgress() {
  return (
    <div className="w-full space-y-2">
      ${label ? `<Label className="text-sm font-medium">${label}</Label>` : ''}
      <Progress 
        value={${value}} 
        max={${max}}
        style={{ ${rootStyle.join(', ')} }}
        indicatorStyle={{ ${indicatorStyle.join(', ')} }}
      />
    </div>
  );
}`;
    }

    default:
      return "// Generated code not available for this provider";
  }
};
