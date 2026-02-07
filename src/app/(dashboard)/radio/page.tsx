'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
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
  FormControlLabel,
  Switch as MuiSwitch,
  CircularProgress
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CodeIcon from '@mui/icons-material/Code';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import RadioWrapper from '@/components/wrappers/RadioWrapper';
import ProviderHeader from '@/components/ProviderHeader';
import { ProviderContext } from '@/components/Providers';
import { generateRadioCode } from '@/lib/codeGen';
import { useAI } from '@/context/AIContext';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useMounted } from '@/hooks/useMounted';

export default function RadioPage() {
  const { selectedProviders, themeMode } = React.useContext(ProviderContext);
  const { registerComponent } = useAI();
  const mounted = useMounted();
  
  // State for config properties
  const [size, setSize] = useLocalStorage<'small' | 'medium' | 'large'>('radio_size', 'medium');
  const [disabled, setDisabled] = useLocalStorage('radio_disabled', false);
  const [selectedValue, setSelectedValue] = useLocalStorage('radio_selectedValue', 'Option 1');
  const [options] = React.useState(['Option 1', 'Option 2', 'Option 3']);
  const [color, setColor] = useLocalStorage<string | undefined>('radio_color', undefined);

  const [viewMode, setViewMode] = useLocalStorage<'preview' | 'code'>('radio_viewMode', 'preview');
  const [copiedProvider, setCopiedProvider] = React.useState<string | null>(null);

  const radioConfig = React.useMemo(() => ({
    options,
    selectedValue,
    size,
    disabled,
    styles: {
      color
    }
  }), [options, selectedValue, size, disabled, color]);

  // Handler for AI updates
  const handleConfigUpdate = React.useCallback((newConfig: any) => {
    if (newConfig.selectedValue) setSelectedValue(newConfig.selectedValue);
    if (newConfig.size) setSize(newConfig.size);
    if (newConfig.disabled !== undefined) setDisabled(newConfig.disabled);
    if (newConfig.styles?.color !== undefined) setColor(newConfig.styles.color);
    if (newConfig.color !== undefined) setColor(newConfig.color);
  }, []);

  // Register with AI context
  React.useEffect(() => {
    registerComponent('radio', radioConfig, handleConfigUpdate);
  }, [radioConfig, registerComponent, handleConfigUpdate]);

  if (!mounted) {
    return (
     <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Radio Comparison
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comparing radio button implementations and selection patterns across libraries.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
     </Container>
    );
  }

  const handleCopy = (provider: string) => {
    const code = generateRadioCode(provider, radioConfig);
    navigator.clipboard.writeText(code);
    setCopiedProvider(provider);
    setTimeout(() => setCopiedProvider(null), 2000);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Radio Comparison
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comparing radio button implementations and selection patterns across libraries.
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

          <FormControlLabel
            control={
              <MuiSwitch
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
              />
            }
            label="Disabled"
          />

          <Box sx={{ flex: 1 }} />
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
                  <RadioWrapper 
                    provider={p} 
                    config={radioConfig}
                    onChange={setSelectedValue}
                  />
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
                    {generateRadioCode(p, radioConfig)}
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
