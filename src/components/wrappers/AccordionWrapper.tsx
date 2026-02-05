'use client';

import React from 'react';
import { 
  Accordion as MuiAccordion, 
  AccordionSummary as MuiAccordionSummary, 
  AccordionDetails as MuiAccordionDetails,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  AccordionRoot as ChakraAccordion,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
} from '@chakra-ui/react';
import { Collapse as AntCollapse } from 'antd';
import {
  Accordion as ShadcnAccordion,
  AccordionContent as ShadcnAccordionContent,
  AccordionItem as ShadcnAccordionItem,
  AccordionTrigger as ShadcnAccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from '@/lib/utils';

export type Provider = 'mui' | 'chakra' | 'antd' | 'shadcn' | 'aceternity';

interface AccordionConfig {
  title: string;
  content: string;
  size?: 'small' | 'medium' | 'large';
  styles?: {
    borderRadius?: number | string;
    borderColor?: string;
    backgroundColor?: string;
    titleColor?: string;
    answerColor?: string;
    padding?: number | string;
  };
}

interface AccordionWrapperProps {
  provider: Provider;
  config: AccordionConfig;
}

export default function AccordionWrapper({ provider, config }: AccordionWrapperProps) {
  const { styles, size } = config;
  
  const borderRadius = styles?.borderRadius !== undefined ? (typeof styles.borderRadius === 'number' ? `${styles.borderRadius}px` : styles.borderRadius) : '0';
  const borderColor = styles?.borderColor || 'rgba(0,0,0,0.1)';
  const backgroundColor = styles?.backgroundColor || 'transparent';
  const titleColor = styles?.titleColor;
  const answerColor = styles?.answerColor;
  
  // Size-based padding
  const sizePadding = size === 'small' ? '0.5rem' : size === 'large' ? '1.5rem' : '1rem';
  const padding = styles?.padding !== undefined ? (typeof styles.padding === 'number' ? `${styles.padding}px` : styles.padding) : sizePadding;
  
  // Size-based font sizes
  const titleSize = size === 'small' ? '0.875rem' : size === 'large' ? '1.125rem' : '1rem';
  const contentSize = size === 'small' ? '0.75rem' : size === 'large' ? '1rem' : '0.875rem';
  switch (provider) {
    case 'mui':
      return (
        <MuiAccordion 
          elevation={0}
          sx={{ 
            width: '100%', 
            bgcolor: backgroundColor !== 'transparent' ? backgroundColor : 'background.paper', 
            border: '1px solid', 
            borderColor,
            borderRadius, 
            overflow: 'hidden',
            '&:before': { display: 'none' } 
          }}
        >
          <MuiAccordionSummary 
            expandIcon={<ExpandMoreIcon sx={{ color: titleColor }} />}
            sx={{ minHeight: 'auto', py: size === 'small' ? 0.5 : 1 }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: titleSize, color: titleColor }}>{config.title}</Typography>
          </MuiAccordionSummary>
          <MuiAccordionDetails sx={{ paddingLeft: padding, paddingRight: padding, paddingBottom: padding, paddingTop: 0 }}>
            <Typography variant="body2" sx={{ fontSize: contentSize, color: answerColor || 'text.secondary' }}>
              {config.content}
            </Typography>
          </MuiAccordionDetails>
        </MuiAccordion>
      );

    case 'chakra':
      // Chakra v2/v3 check: typically <Accordion> <AccordionItem> ...
      // For smoothness, ensure we use native Chakra transitions. 
      // If props are correct, it should animate.
      return (
        <ChakraAccordion collapsible width="100%" style={{ borderRadius, border: `1px solid ${borderColor}`, backgroundColor, overflow: 'hidden' }}>
          <AccordionItem value="item-1" className="border-none">
            <AccordionItemTrigger style={{ padding, fontSize: titleSize, color: titleColor }} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              {config.title}
            </AccordionItemTrigger>
            <AccordionItemContent style={{ 
              paddingLeft: padding, 
              paddingRight: padding, 
              paddingBottom: padding, 
              paddingTop: 0, 
              fontSize: contentSize, 
              color: answerColor 
            }}>
              {config.content}
            </AccordionItemContent>
          </AccordionItem>
        </ChakraAccordion>
      );

    case 'antd':
      const items = [{
        key: '1',
        label: <span style={{ fontSize: titleSize, fontWeight: 600, color: titleColor }}>{config.title}</span>,
        children: <div style={{ fontSize: contentSize, color: answerColor }}>{config.content}</div>,
      }];
      return (
        <AntCollapse 
          items={items} 
          style={{ width: '100%', background: backgroundColor, borderRadius, border: `1px solid ${borderColor}` }} 
          ghost={backgroundColor === 'transparent'}
        />
      );

    case 'shadcn':
      // Shadcn needs 'data-[state=...]' animations. Ensure @/components/ui/accordion uses basic radix primitives which handle this content awareness.
      // We apply standard padding/transition classes here to ensure it mimics the desired 'smoothness'.
      return (
        <ShadcnAccordion type="single" collapsible className="w-full" style={{ borderRadius, border: `1px solid ${borderColor}`, backgroundColor }}>
          <ShadcnAccordionItem value="item-1" className="border-none">
            <ShadcnAccordionTrigger 
              className="hover:no-underline hover:bg-muted/50 transition-all data-[state=open]:bg-muted/50"
              style={{ padding: typeof padding === 'number' ? padding : sizePadding, fontSize: titleSize, color: titleColor }}
            >
              {config.title}
            </ShadcnAccordionTrigger>
            <ShadcnAccordionContent style={{ 
              paddingLeft: typeof padding === 'number' ? padding : sizePadding, 
              paddingRight: typeof padding === 'number' ? padding : sizePadding, 
              paddingBottom: typeof padding === 'number' ? padding : sizePadding, 
              paddingTop: 0, 
              fontSize: contentSize, 
              color: answerColor 
            }}>
              {config.content}
            </ShadcnAccordionContent>
          </ShadcnAccordionItem>
        </ShadcnAccordion>
      );



    default:
      return <div className="text-red-500 italic">Provider {provider} not found</div>;
  }
}
