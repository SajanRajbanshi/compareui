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
  Slider,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CodeIcon from '@mui/icons-material/Code';
import ProgressWrapper from '@/components/wrappers/ProgressWrapper';
import ProviderHeader from '@/components/ProviderHeader';
import { ProviderContext } from '@/components/Providers';
import { generateProgressCode } from '@/lib/codeGen';

import { useAI } from '@/context/AIContext';

export default function ProgressPage() {
  const { selectedProviders } = React.useContext(ProviderContext);
  const { registerComponent } = useAI();
  
  // Controls
  const [size, setSize] = React.useState<'small' | 'medium' | 'large'>('medium');
  const [value, setValue] = React.useState(60);
  const [max, setMax] = React.useState(100);
  const [label, setLabel] = React.useState('Uploading Assets...');
  
  // Internal state for AI updates
  const [indicatorColor, setIndicatorColor] = React.useState<string | undefined>(undefined);
  const [trackColor, setTrackColor] = React.useState<string | undefined>(undefined);
  const [height, setHeight] = React.useState<number | undefined>(undefined);
  const [borderRadius, setBorderRadius] = React.useState<number | string | undefined>(undefined);

  const [viewMode, setViewMode] = React.useState<'preview' | 'code'>('preview');
  const [copiedProvider, setCopiedProvider] = React.useState<string | null>(null);

  const config = React.useMemo(() => ({
    value,
    max,
    label,
    size,
    styles: {
      indicatorColor,
      trackColor,
      height,
      borderRadius
    }
  }), [value, max, label, size, indicatorColor, trackColor, height, borderRadius]);

  // Handler for AI updates
  const handleConfigUpdate = React.useCallback((newConfig: any) => {
    if (newConfig.value !== undefined) setValue(newConfig.value);
    if (newConfig.max !== undefined) setMax(newConfig.max);
    if (newConfig.size) setSize(newConfig.size);
    if (newConfig.label !== undefined) setLabel(newConfig.label);
    
    if (newConfig.styles) {
      if (newConfig.styles.indicatorColor !== undefined) setIndicatorColor(newConfig.styles.indicatorColor);
      if (newConfig.styles.trackColor !== undefined) setTrackColor(newConfig.styles.trackColor);
      if (newConfig.styles.height !== undefined) setHeight(newConfig.styles.height);
      if (newConfig.styles.borderRadius !== undefined) setBorderRadius(newConfig.styles.borderRadius);
    }
  }, []);

  // Register with AI context
  React.useEffect(() => {
    registerComponent('progress', config, handleConfigUpdate);
  }, [config, registerComponent, handleConfigUpdate]);

  const handleCopy = (provider: string) => {
    const code = generateProgressCode(provider, config);
    navigator.clipboard.writeText(code);
    setCopiedProvider(provider);
    setTimeout(() => setCopiedProvider(null), 2000);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Progress Comparison
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Visualize task completion states across different library implementations.
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
        <Grid container spacing={4} alignItems="center">
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

          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <TextField 
              label="Label" 
              fullWidth 
              size="small" 
              value={label} 
              onChange={(e) => setLabel(e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Progress Value</Typography>
            <Slider 
              value={value} 
              onChange={(_, v) => setValue(v as number)} 
              max={max}
              valueLabelDisplay="auto"
            />
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
              
              <Box sx={{ width: '100%', flex: 1, py: 2 }}>
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
                    Aceternity UI does not provide a native Progress component.
                  </Box>
                ) : viewMode === 'preview' ? (
                  <Box sx={{ width: '100%', minHeight: 100, display: 'flex', alignItems: 'center' }}>
                    <ProgressWrapper provider={p} config={config} />
                  </Box>
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
                    {generateProgressCode(p, config)}
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
