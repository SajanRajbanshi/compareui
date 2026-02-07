'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  Stack, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CodeIcon from '@mui/icons-material/Code';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import AccordionWrapper from '@/components/wrappers/AccordionWrapper';
import ProviderHeader from '@/components/ProviderHeader';
import { ProviderContext } from '@/components/Providers';
import { generateAccordionCode } from '@/lib/codeGen';

import { useAI } from '@/context/AIContext';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useMounted } from '@/hooks/useMounted';

export default function AccordionPage() {
  const { selectedProviders } = React.useContext(ProviderContext);
  const { registerComponent } = useAI();
  const mounted = useMounted();
  
  // Controls
  const [size, setSize] = useLocalStorage<'small' | 'medium' | 'large'>('accordion_size', 'medium');
  
  // Internal state for AI updates
  const [borderRadius, setBorderRadius] = useLocalStorage('accordion_borderRadius', 8);
  const [backgroundColor, setBackgroundColor] = useLocalStorage<string>('accordion_backgroundColor', 'transparent');
  const [borderColor, setBorderColor] = useLocalStorage<string>('accordion_borderColor', 'rgba(0,0,0,0.1)');
  const [titleColor, setTitleColor] = useLocalStorage<string | undefined>('accordion_titleColor', undefined);
  const [answerColor, setAnswerColor] = useLocalStorage<string | undefined>('accordion_answerColor', undefined);
  const [title, setTitle] = useLocalStorage('accordion_title', 'What do you like the most?');
  const [content, setContent] = useLocalStorage('accordion_content', 'I like momo the most and I know you like it too secretly.');

  const [viewMode, setViewMode] = useLocalStorage<'preview' | 'code'>('accordion_viewMode', 'preview');
  const [copiedProvider, setCopiedProvider] = React.useState<string | null>(null);

  const config = React.useMemo(() => ({
    title,
    content,
    size,
    styles: {
      borderRadius,
      borderColor,
      backgroundColor,
      titleColor,
      answerColor: answerColor || undefined,
      padding: undefined
    }
  }), [size, borderRadius, borderColor, backgroundColor, titleColor, answerColor, title, content]);

  // Handler for AI updates
  const handleConfigUpdate = React.useCallback((newConfig: any) => {
    if (newConfig.size) setSize(newConfig.size);
    if (newConfig.title) setTitle(newConfig.title);
    if (newConfig.content) setContent(newConfig.content);
    
    if (newConfig.styles) {
      if (newConfig.styles.borderRadius !== undefined) setBorderRadius(newConfig.styles.borderRadius);
      if (newConfig.styles.backgroundColor !== undefined) setBackgroundColor(newConfig.styles.backgroundColor);
      if (newConfig.styles.borderColor !== undefined) setBorderColor(newConfig.styles.borderColor);
      if (newConfig.styles.titleColor !== undefined) setTitleColor(newConfig.styles.titleColor);
      if (newConfig.styles.answerColor !== undefined) setAnswerColor(newConfig.styles.answerColor);
    }
  }, []);

  // Register with AI context
  React.useEffect(() => {
    registerComponent('accordion', config, handleConfigUpdate);
  }, [config, registerComponent, handleConfigUpdate]);

  // Second example content
  const config2 = React.useMemo(() => ({
    ...config,
    title: 'Do you know it?',
    content: 'I know you know it but I want to know how you know it.'
  }), [config]);

  if (!mounted) {
    return (
     <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
           Accordion Comparison
        </Typography>
        <Typography variant="body1" color="text.secondary">
           Analyze space-saving disclosure patterns across different library implementations.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
     </Container>
    );
  }

  const handleCopy = (provider: string) => {
    const code = generateAccordionCode(provider, config);
    navigator.clipboard.writeText(code);
    setCopiedProvider(provider);
    setTimeout(() => setCopiedProvider(null), 2000);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Accordion Comparison
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Analyze space-saving disclosure patterns across different library implementations.
        </Typography>
      </Box>

      {/* Controls Bar */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 4, 
          border: '1px solid', 
          borderColor: 'divider',
          bgcolor: 'background.paper'
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl size="small" fullWidth>
              <InputLabel>Size</InputLabel>
              <Select
                value={size}
                label="Size"
                onChange={(e) => setSize(e.target.value as any)}
              >
                <MenuItem value="small">Small</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="large">Large</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* View Mode Toggle */}
      <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(_, value) => value && setViewMode(value)}
          size="small"
          sx={{ 
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            p: 0.5,
            '& .MuiToggleButton-root': {
              px: 4,
              py: 1,
              mx: 0.5,
              borderRadius: 2.5,
              border: 'none',
              textTransform: 'none',
              fontWeight: 600,
              color: 'primary.main',
              bgcolor: 'background.paper',
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                }
              },
              '&:hover': {
                bgcolor: 'action.hover',
              }
            }
          }}
        >
          <ToggleButton value="preview" sx={{ gap: 1 }}>
            <VisibilityIcon fontSize="small" /> Preview
          </ToggleButton>
          <ToggleButton value="code" sx={{ gap: 1 }}>
            <CodeIcon fontSize="small" /> Code
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Grid container spacing={4}>
        {selectedProviders.map((p) => (
          <Grid size={{ xs: 12, lg: 6 }} key={p} sx={{ display: 'flex' }}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                borderRadius: 4, 
                border: '1px solid', 
                borderColor: 'divider',
                bgcolor: 'background.paper',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)'
                }
              }}
            >
              <ProviderHeader 
                provider={p} 
                showCopy={viewMode === 'code' && p !== 'aceternity'} 
                onCopy={() => handleCopy(p)}
                isCopied={copiedProvider === p}
              />
              
              <Box sx={{ width: '100%', flex: 1 }}>
                {p === 'aceternity' ? (
                  <Box sx={{ 
                    p: 4, 
                    borderRadius: 2, 
                    bgcolor: 'action.hover', 
                    border: '1px dashed', 
                    borderColor: 'divider',
                    color: 'text.secondary',
                    textAlign: 'center',
                    fontStyle: 'italic',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    Aceternity UI does not provide a native Accordion component.
                  </Box>
                ) : viewMode === 'preview' ? (
                  <Stack>
                    <AccordionWrapper provider={p} config={config} />
                    <AccordionWrapper provider={p} config={config2} />
                  </Stack>
                ) : (
                  <Box 
                    component="pre"
                    sx={{ 
                      flex: 1,
                      bgcolor: 'grey.900', 
                      borderRadius: 2, 
                      p: 2, 
                      overflow: 'auto', 
                      fontFamily: 'monospace', 
                      fontSize: '0.75rem', 
                      color: 'grey.300',
                      maxHeight: 400
                    }}
                  >
                    {generateAccordionCode(p, config)}
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Snackbar open={!!copiedProvider} autoHideDuration={2000}>
        <Alert severity="success" sx={{ width: '100%', borderRadius: 2 }}>
          {copiedProvider} code copied!
        </Alert>
      </Snackbar>
    </Container>
  );
}
