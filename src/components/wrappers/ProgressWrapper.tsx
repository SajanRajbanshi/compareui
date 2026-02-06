'use client';

import React from 'react';
import { 
  Box, 
  LinearProgress, 
  Typography 
} from '@mui/material';
import {
  ProgressRoot,
  ProgressRange,
  ProgressLabel,
} from '@chakra-ui/react';
import { Progress as AntProgress, Typography as AntTypography } from 'antd';
import { Progress as ShadcnProgress } from "@/components/ui/progress";
import { Label as ShadcnLabel } from "@/components/ui/label";

const { Text: AntText } = AntTypography;

export type Provider = 'mui' | 'chakra' | 'antd' | 'shadcn' | 'aceternity';

interface ProgressConfig {
  value?: number;
  max?: number;
  size?: 'small' | 'medium' | 'large';
  label?: string;
  styles?: {
    indicatorColor?: string;
    trackColor?: string;
    height?: number;
    borderRadius?: number | string;
  };
}

interface ProgressWrapperProps {
  provider: Provider;
  config: ProgressConfig;
}

export default function ProgressWrapper({ provider, config }: ProgressWrapperProps) {
  const { styles, size, value = 60, max = 100, label } = config;
  
  const indicatorColor = styles?.indicatorColor;
  const trackColor = styles?.trackColor;
  const height = styles?.height || (size === 'small' ? 4 : size === 'large' ? 12 : 8);
  const borderRadius = styles?.borderRadius !== undefined ? (typeof styles.borderRadius === 'number' ? `${styles.borderRadius}px` : styles.borderRadius) : '999px';

  switch (provider) {
    case 'mui':
      return (
        <Box sx={{ width: '100%' }}>
          {label && (
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              {label}
            </Typography>
          )}
          <LinearProgress 
            variant="determinate" 
            value={(value / max) * 100} 
            sx={{ 
              height,
              borderRadius,
              bgcolor: trackColor || 'action.hover',
              '& .MuiLinearProgress-bar': {
                bgcolor: indicatorColor || 'primary.main',
                borderRadius
              }
            }} 
          />
        </Box>
      );

    case 'chakra':
      return (
        <ProgressRoot value={value} max={max} width="100%">
          {label && <ProgressLabel mb="2" fontWeight="500">{label}</ProgressLabel>}
          <div style={{ 
            height, 
            borderRadius, 
            backgroundColor: trackColor || 'rgba(0,0,0,0.05)', 
            overflow: 'hidden',
            width: '100%' 
          }}>
            <ProgressRange style={{ backgroundColor: indicatorColor, height: '100%' }} />
          </div>
        </ProgressRoot>
      );

    case 'antd':
      return (
        <div style={{ width: '100%' }}>
          {label && (
            <div style={{ marginBottom: 8 }}>
              <AntText strong>{label}</AntText>
            </div>
          )}
          <AntProgress 
            percent={Math.round((value / max) * 100)} 
            strokeWidth={height}
            strokeColor={indicatorColor}
            railColor={trackColor}
            showInfo={false}
            style={{ borderRadius }}
          />
        </div>
      );

    case 'shadcn':
      return (
        <div className="w-full space-y-2">
          {label && <ShadcnLabel className="text-sm font-medium">{label}</ShadcnLabel>}
          <ShadcnProgress 
            value={value} 
            max={max}
            style={{ height, borderRadius, backgroundColor: trackColor }}
            indicatorStyle={{ backgroundColor: indicatorColor }}
          />
        </div>
      );

    default:
      return <div className="text-red-500 italic">Provider {provider} not found</div>;
  }
}
