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
import InputWrapper from '@/components/wrappers/InputWrapper';
import ProviderHeader from '@/components/ProviderHeader';
import { ProviderContext } from '@/components/Providers';
import { useAI } from '@/context/AIContext';
import { generateInputCode } from '@/lib/codeGen';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useMounted } from '@/hooks/useMounted';

export default function InputPage() {
  const { selectedProviders } = React.useContext(ProviderContext);
  const { registerComponent } = useAI();
  const mounted = useMounted();
  
  // State
  const [variant, setVariant] = useLocalStorage('input_variant', 'outlined');
  const [size, setSize] = useLocalStorage<'small' | 'medium' | 'large'>('input_size', 'medium');
  const [borderRadius, setBorderRadius] = useLocalStorage('input_borderRadius', 8);
  const [label, setLabel] = useLocalStorage('input_label', 'Email Address');
  const [placeholder, setPlaceholder] = useLocalStorage('input_placeholder', 'user@example.com');
  // Since styles is an object with potentially many keys, we use JSON for storage
  const [styles, setStyles] = useLocalStorage<any>('input_styles', {});
  
  const [viewMode, setViewMode] = useLocalStorage<'preview' | 'code'>('input_viewMode', 'preview');
  const [copiedProvider, setCopiedProvider] = React.useState<string | null>(null);

  const inputConfig = React.useMemo(() => ({
    label,
    placeholder,
    variant,
    size,
    type: 'email',
    styles: {
      borderRadius,
      borderColor: undefined,
      focusColor: undefined,
      ...styles
    }
  }), [label, placeholder, variant, size, borderRadius, styles]);

  // Handle AI Updates
  const handleConfigUpdate = React.useCallback((newConfig: any) => {
    if (newConfig.label) setLabel(newConfig.label);
    if (newConfig.placeholder) setPlaceholder(newConfig.placeholder);
    if (newConfig.variant) setVariant(newConfig.variant);
    if (newConfig.size) setSize(newConfig.size);
    if (newConfig.styles) {
      if (newConfig.styles.borderRadius !== undefined) setBorderRadius(newConfig.styles.borderRadius);
      setStyles((prev: any) => ({ ...prev, ...newConfig.styles }));
    }
  }, []);

  React.useEffect(() => {
    registerComponent('input', inputConfig, handleConfigUpdate);
  }, [inputConfig, registerComponent, handleConfigUpdate]);

  if (!mounted) {
    return (
     <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Input Comparison
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Compare form entry fields and validation styling across different providers.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
     </Container>
    );
  }

  const handleCopy = (provider: string) => {
    const code = generateInputCode(provider, inputConfig);
    navigator.clipboard.writeText(code);
    setCopiedProvider(provider);
    setTimeout(() => setCopiedProvider(null), 2000);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Input Comparison
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Compare form entry fields and validation styling across different providers.
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
              <MenuItem value="outlined">Outlined</MenuItem>
              <MenuItem value="standard">Standard</MenuItem>
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
              max={24}
              onChange={(_, value) => setBorderRadius(value as number)}
              valueLabelDisplay="auto"
              sx={{ py: 1 }}
            />
          </Box>
        </Stack>
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

      {/* Grid */}
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
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 6, width: '100%' }}>
                  <InputWrapper provider={p} config={inputConfig} />
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
                    {generateInputCode(p, inputConfig)}
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
