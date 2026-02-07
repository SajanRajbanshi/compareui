'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  Slider, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CodeIcon from '@mui/icons-material/Code';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import ButtonWrapper from '@/components/wrappers/ButtonWrapper';
import ProviderHeader from '@/components/ProviderHeader';
import { ProviderContext } from '@/components/Providers';
import { generateButtonCode } from '@/lib/codeGen';

// ... imports
import { useAI } from '@/context/AIContext';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useMounted } from '@/hooks/useMounted';

export default function ButtonPage() {
  const { selectedProviders } = React.useContext(ProviderContext);
  const { registerComponent } = useAI();
  const mounted = useMounted();
  
  // State for all config properties
  const [variant, setVariant] = useLocalStorage('btn_variant', 'contained');
  const [size, setSize] = useLocalStorage<'small' | 'medium' | 'large'>('btn_size', 'medium');
  const [borderRadius, setBorderRadius] = useLocalStorage('btn_borderRadius', 12);
  const [backgroundColor, setBackgroundColor] = useLocalStorage<string | undefined>('btn_backgroundColor', undefined);
  const [fontColor, setFontColor] = useLocalStorage<string | undefined>('btn_fontColor', undefined);
  const [borderColor, setBorderColor] = useLocalStorage<string | undefined>('btn_borderColor', undefined);
  const [borderStyle, setBorderStyle] = useLocalStorage<'solid' | 'dashed' | 'dotted' | undefined>('btn_borderStyle', undefined);
  const [borderWidth, setBorderWidth] = useLocalStorage<number | undefined>('btn_borderWidth', undefined);
  const [padding, setPadding] = useLocalStorage<{ px: number; py: number }>('btn_padding', { px: 24, py: 8 });
  const [label, setLabel] = useLocalStorage('btn_label', 'Button');

  const [viewMode, setViewMode] = useLocalStorage<'preview' | 'code'>('btn_viewMode', 'preview');
  const [copiedProvider, setCopiedProvider] = React.useState<string | null>(null);

  const btnConfig = React.useMemo(() => ({
    label,
    variant,
    size,
    styles: {
      borderRadius,
      backgroundColor,
      fontColor,
      borderColor,
      borderStyle,
      borderWidth,
      padding
    }
  }), [label, variant, size, borderRadius, backgroundColor, fontColor, borderColor, borderStyle, borderWidth, padding]);

  // Handler for AI updates
  const handleConfigUpdate = React.useCallback((newConfig: any) => {
    if (newConfig.label) setLabel(newConfig.label);
    if (newConfig.variant) setVariant(newConfig.variant);
    if (newConfig.size) setSize(newConfig.size);
    if (newConfig.styles) {
      if (newConfig.styles.borderRadius !== undefined) setBorderRadius(newConfig.styles.borderRadius);
      if (newConfig.styles.backgroundColor !== undefined) setBackgroundColor(newConfig.styles.backgroundColor);
      if (newConfig.styles.fontColor !== undefined) setFontColor(newConfig.styles.fontColor);
      if (newConfig.styles.borderColor !== undefined) setBorderColor(newConfig.styles.borderColor);
      if (newConfig.styles.borderStyle !== undefined) setBorderStyle(newConfig.styles.borderStyle);
      if (newConfig.styles.borderWidth !== undefined) setBorderWidth(newConfig.styles.borderWidth);
      if (newConfig.styles.padding !== undefined) setPadding(newConfig.styles.padding);
    }
  }, []);

  // Register with AI context
  React.useEffect(() => {
    registerComponent('button', btnConfig, handleConfigUpdate);
  }, [btnConfig, registerComponent, handleConfigUpdate]);

  if (!mounted) {
    return (
     <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Button Comparison
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comparing interaction patterns and visual styles of primary actions across libraries.
        </Typography>
      </Box>
      {/* Skeleton loading state */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
     </Container>
    );
  }

  const handleCopy = (provider: string) => {
    const code = generateButtonCode(provider, btnConfig);
    navigator.clipboard.writeText(code);
    setCopiedProvider(provider);
    setTimeout(() => setCopiedProvider(null), 2000);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Button Comparison
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comparing interaction patterns and visual styles of primary actions across libraries.
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
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Variant</InputLabel>
            <Select
              value={variant}
              label="Variant"
              onChange={(e) => setVariant(e.target.value)}
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="contained">Contained</MenuItem>
              <MenuItem value="outlined">Outlined</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Size</InputLabel>
            <Select
              value={size}
              label="Size"
              onChange={(e) => setSize(e.target.value as any)}
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="small">Small</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="large">Large</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ flex: 1, width: '100%', px: 2 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, display: 'block', color: 'text.secondary', textTransform: 'uppercase' }}>
              Border Radius: {borderRadius}px
            </Typography>
            <Slider
              value={borderRadius}
              min={0}
              max={40}
              onChange={(_, value) => setBorderRadius(value as number)}
              valueLabelDisplay="auto"
              sx={{ py: 1 }}
            />
          </Box>
        </Stack>
      </Paper>

      {/* View Mode Toggle Bar */}
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

      <Grid container spacing={4} alignItems="stretch">
        {selectedProviders.map((p) => (
          <Grid size={{ xs: 12, lg: 6 }} key={p} sx={{ display: 'flex' }}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                borderRadius: 4, 
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)'
                }
              }}
            >
              <ProviderHeader 
                provider={p} 
                showCopy={viewMode === 'code'} 
                onCopy={() => handleCopy(p)}
                isCopied={copiedProvider === p}
              />

              {viewMode === 'preview' ? (
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 6 }}>
                  <ButtonWrapper provider={p} config={btnConfig} />
                </Box>
              ) : (
                <Box 
                  sx={{ 
                    flex: 1,
                    bgcolor: 'grey.900', 
                    borderRadius: 2, 
                    p: 2, 
                    overflowX: 'auto',
                    border: '1px solid',
                    borderColor: 'divider',
                    position: 'relative'
                  }}
                >
                  <Typography 
                    component="pre" 
                    sx={{ 
                      fontFamily: 'monospace', 
                      fontSize: '0.75rem', 
                      color: 'grey.300',
                      whiteSpace: 'pre'
                    }}
                  >
                    {generateButtonCode(p, btnConfig)}
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      <Snackbar open={!!copiedProvider} autoHideDuration={2000}>
        <Alert severity="success" sx={{ width: '100%', borderRadius: 2 }}>
          {copiedProvider} code copied to clipboard!
        </Alert>
      </Snackbar>
    </Container>
  );
}
