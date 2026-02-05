export const generateAccordionCode = (provider: string, config: any) => {
  const { styles, size, title, content } = config;
  
  const borderRadius = styles?.borderRadius !== undefined ? (typeof styles.borderRadius === 'number' ? `${styles.borderRadius}px` : styles.borderRadius) : undefined;
  const backgroundColor = styles?.backgroundColor;
  const titleColor = styles?.titleColor;
  const answerColor = styles?.answerColor;
  const borderColor = styles?.borderColor;
  
  // Size configs
  const padding = size === 'small' ? '8px' : size === 'large' ? '24px' : '16px';
  const titleSize = size === 'small' ? '0.875rem' : size === 'large' ? '1.125rem' : '1rem';
  const contentSize = size === 'small' ? '0.75rem' : size === 'large' ? '1rem' : '0.875rem';

  switch (provider) {
    case 'mui': {
      const sxProps: string[] = [];
      if (backgroundColor && backgroundColor !== 'transparent') sxProps.push(`bgcolor: '${backgroundColor}'`);
      if (borderColor) sxProps.push(`borderColor: '${borderColor}'`);
      if (borderRadius) sxProps.push(`borderRadius: '${borderRadius}'`);
      
      const titleSx = titleColor ? `sx={{ color: '${titleColor}', fontSize: '${titleSize}', fontWeight: 600 }}` : `sx={{ fontSize: '${titleSize}', fontWeight: 600 }}`;
      const contentSx = [`fontSize: '${contentSize}'`];
      if (answerColor) contentSx.push(`color: '${answerColor}'`);

      return `import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function CustomAccordion() {
  return (
    <Accordion 
      elevation={0}
      sx={{ 
        border: '1px solid',
        overflow: 'hidden',
        ${sxProps.join(',\n        ')}
      }}
    >
      <AccordionSummary 
        expandIcon={<ExpandMoreIcon ${titleColor ? `sx={{ color: '${titleColor}' }}` : ''} />}
        sx={{ minHeight: 'auto', py: ${size === 'small' ? 0.5 : 1} }}
      >
        <Typography ${titleSx}>
          ${title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ paddingLeft: '${padding}', paddingRight: '${padding}', paddingBottom: '${padding}', paddingTop: 0 }}>
        <Typography variant="body2" sx={{ ${contentSx.join(', ')} }}>
          ${content}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}`;
    }

    case 'chakra': {
      const containerStyle: string[] = [`borderRadius: "${borderRadius || '8px'}"`, `border: "1px solid ${borderColor || 'rgba(0,0,0,0.1)'}"`, `overflow: "hidden"`];
      if (backgroundColor) containerStyle.push(`backgroundColor: "${backgroundColor}"`);
      
      const triggerStyle: string[] = [`padding: "${padding}"`, `fontSize: "${titleSize}"`];
      if (titleColor) triggerStyle.push(`color: "${titleColor}"`);
      
      const contentStyle: string[] = [`paddingLeft: "${padding}"`, `paddingRight: "${padding}"`, `paddingBottom: "${padding}"`, `paddingTop: 0`, `fontSize: "${contentSize}"`];
      if (answerColor) contentStyle.push(`color: "${answerColor}"`);

      return `import {
  Accordion as Container,
  AccordionItem,
  AccordionItemTrigger, // Or AccordionButton + AccordionIcon in v2
  AccordionItemContent, // Or AccordionPanel in v2
} from '@chakra-ui/react';

export function CustomAccordion() {
  return (
    <Container collapsible width="100%" style={{ ${containerStyle.join(', ')} }}>
      <AccordionItem value="item-1" className="border-none">
        <AccordionItemTrigger style={{ ${triggerStyle.join(', ')} }}>
          ${title}
        </AccordionItemTrigger>
        <AccordionItemContent style={{ ${contentStyle.join(', ')} }}>
          ${content}
        </AccordionItemContent>
      </AccordionItem>
    </Container>
  );
}`;
    }

    case 'antd': {
      const collapseStyle: string[] = [`borderRadius: "${borderRadius || '8px'}"`, `border: "1px solid ${borderColor || 'rgba(0,0,0,0.1)'}"`];
      if (backgroundColor) collapseStyle.push(`background: "${backgroundColor}"`);
      else collapseStyle.push(`background: "transparent"`);
      
      const labelNode = titleColor 
        ? `<span style={{ fontSize: '${titleSize}', fontWeight: 600, color: '${titleColor}' }}>${title}</span>`
        : `${title}`;
        
      const contentNode = `<div style={{ fontSize: '${contentSize}', color: '${answerColor || 'inherit'}' }}>${content}</div>`;

      return `import { Collapse } from 'antd';

export function CustomAccordion() {
  const items = [{
    key: '1',
    label: ${labelNode},
    children: ${contentNode},
  }];

  return (
    <Collapse 
      items={items} 
      ghost={${backgroundColor === 'transparent' || !backgroundColor}}
      style={{ 
        width: '100%',
        ${collapseStyle.join(',\n        ')}
      }} 
    />
  );
}`;
    }

    case 'shadcn': {
      const shadcnStyle: string[] = [`borderRadius: "${borderRadius || '8px'}"`, `border: "1px solid ${borderColor || 'rgba(0,0,0,0.1)'}"`];
      if (backgroundColor) shadcnStyle.push(`backgroundColor: "${backgroundColor}"`);

      const triggerClass = "hover:no-underline hover:bg-muted/50 transition-all data-[state=open]:bg-muted/50";
      const triggerStyle: string[] = [`padding: "${padding}"`, `fontSize: "${titleSize}"`];
      if (titleColor) triggerStyle.push(`color: "${titleColor}"`);

      const contentStyle: string[] = [`paddingLeft: "${padding}"`, `paddingRight: "${padding}"`, `paddingBottom: "${padding}"`, `paddingTop: 0`, `fontSize: "${contentSize}"`];
      if (answerColor) contentStyle.push(`color: "${answerColor}"`);

      return `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function CustomAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full" style={{ ${shadcnStyle.join(', ')} }}>
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger 
          className="${triggerClass}"
          style={{ ${triggerStyle.join(', ')} }}
        >
          ${title}
        </AccordionTrigger>
        <AccordionContent style={{ ${contentStyle.join(', ')} }}>
          ${content}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`;
    }

    default:
      return "// Generated code not available for this provider";
  }
};
