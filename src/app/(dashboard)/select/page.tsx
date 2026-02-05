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
  Switch as MuiSwitch
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CodeIcon from '@mui/icons-material/Code';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import SelectWrapper from '@/components/wrappers/SelectWrapper';
import ProviderHeader from '@/components/ProviderHeader';
import { ProviderContext } from '@/components/Providers';
import { generateSelectCode } from '@/lib/codeGen';
import { useAI } from '@/context/AIContext';

export default function SelectPage() {
  const { selectedProviders, themeMode } = React.useContext(ProviderContext);
  const { registerComponent } = useAI();
  
  // State for config properties
  const [size, setSize] = React.useState<'small' | 'medium' | 'large'>('medium');
  const [disabled, setDisabled] = React.useState(false);
  const [value, setValue] = React.useState('option1');
  const [label, setLabel] = React.useState('Choose Plan');
  const [placeholder, setPlaceholder] = React.useState('Select a variant...');
  const [color, setColor] = React.useState<string | undefined>(undefined);
  const [borderRadius, setBorderRadius] = React.useState(8);
  const [borderColor, setBorderColor] = React.useState<string | undefined>(undefined);
  const [options] = React.useState([
    { value: 'option1', label: 'Basic Plan' },
    { value: 'option2', label: 'Pro Plan' },
    { value: 'option3', label: 'Enterprise' }
  ]);

  const [viewMode, setViewMode] = React.useState<'preview' | 'code'>('preview');
  const [copiedProvider, setCopiedProvider] = React.useState<string | null>(null);

  const selectConfig = React.useMemo(() => ({
    options,
    value,
    size,
    disabled,
    label,
    placeholder,
    styles: {
      color,
      borderRadius,
      borderColor
    }
  }), [options, value, size, disabled, label, placeholder, color, borderRadius, borderColor]);

  // Handler for AI updates
  const handleConfigUpdate = React.useCallback((newConfig: any) => {
    if (newConfig.value !== undefined) setValue(newConfig.value);
    if (newConfig.size) setSize(newConfig.size);
    if (newConfig.disabled !== undefined) setDisabled(newConfig.disabled);
    if (newConfig.label !== undefined) setLabel(newConfig.label);
    if (newConfig.placeholder !== undefined) setPlaceholder(newConfig.placeholder);
    if (newConfig.styles?.color !== undefined) setColor(newConfig.styles.color);
    if (newConfig.styles?.borderRadius !== undefined) setBorderRadius(newConfig.styles.borderRadius);
    if (newConfig.styles?.borderColor !== undefined) setBorderColor(newConfig.styles.borderColor);
    if (newConfig.color !== undefined) setColor(newConfig.color);
    if (newConfig.borderRadius !== undefined) setBorderRadius(newConfig.borderRadius);
    if (newConfig.borderColor !== undefined) setBorderColor(newConfig.borderColor);
  }, []);

  // Register with AI context
  React.useEffect(() => {
    registerComponent('select', selectConfig, handleConfigUpdate);
  }, [selectConfig, registerComponent, handleConfigUpdate]);

  const handleCopy = (provider: string) => {
    const code = generateSelectCode(provider, selectConfig);
    navigator.clipboard.writeText(code);
    setCopiedProvider(provider);
    setTimeout(() => setCopiedProvider(null), 2000);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Select Comparison
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comparing dropdown and selection components across libraries.
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
          onChange={(_, val) => val && setViewMode(val)}
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
                  <Box sx={{ width: '100%', maxWidth: 400 }}>
                    <SelectWrapper
                      provider={p as any}
                      config={selectConfig}
                      onChange={setValue}
                    />
                  </Box>
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
                    {generateSelectCode(p, selectConfig)}
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Snackbar 
        open={!!copiedProvider} 
        autoHideDuration={2000} 
        onClose={() => setCopiedProvider(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%', borderRadius: 2 }}>
          Code copied to clipboard!
        </Alert>
      </Snackbar>
    </Container>
  );
}
