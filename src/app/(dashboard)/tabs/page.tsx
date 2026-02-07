'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  Slider, 
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CodeIcon from '@mui/icons-material/Code';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import TabsWrapper from '@/components/wrappers/TabsWrapper';
import ProviderHeader from '@/components/ProviderHeader';
import { ProviderContext } from '@/components/Providers';
import { generateTabsCode } from '@/lib/codegen/tabs';
import { useAI } from '@/context/AIContext';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useMounted } from '@/hooks/useMounted';

export default function TabsPage() {
  const { selectedProviders } = React.useContext(ProviderContext);
  const { registerComponent } = useAI();
  const mounted = useMounted();
  
  // State for config
  const [borderRadius, setBorderRadius] = useLocalStorage('tabs_borderRadius', 8);
  const [padding, setPadding] = useLocalStorage('tabs_padding', 2);
  const [orientation, setOrientation] = useLocalStorage<'horizontal' | 'vertical'>('tabs_orientation', 'horizontal');
  
  const [activeColor, setActiveColor] = useLocalStorage<string | undefined>('tabs_activeColor', undefined);
  const [inactiveColor, setInactiveColor] = useLocalStorage<string | undefined>('tabs_inactiveColor', undefined);
  const [backgroundColor, setBackgroundColor] = useLocalStorage<string | undefined>('tabs_backgroundColor', undefined);

  const [tabs, setTabs] = useLocalStorage('tabs_items', [
    { label: 'Account', value: 'account', content: 'Manage your account settings and preferences here.' },
    { label: 'Password', value: 'password', content: 'Update your password and security settings.' },
    { label: 'Notifications', value: 'notifications', content: 'Configure how you receive notifications.' }
  ]);

  const [viewMode, setViewMode] = useLocalStorage<'preview' | 'code'>('tabs_viewMode', 'preview');
  const [copiedProvider, setCopiedProvider] = React.useState<string | null>(null);

  const tabsConfig = React.useMemo(() => ({
    tabs,
    defaultValue: 'account',
    orientation,
    styles: {
      borderRadius,
      padding,
      activeColor,
      inactiveColor,
      backgroundColor
    }
  }), [tabs, orientation, borderRadius, padding, activeColor, inactiveColor, backgroundColor]);

  // Handler for AI updates
  const handleConfigUpdate = React.useCallback((newConfig: any) => {
    if (newConfig.tabs) setTabs(newConfig.tabs);
    if (newConfig.orientation) setOrientation(newConfig.orientation);
    
    if (newConfig.styles) {
      if (newConfig.styles.borderRadius !== undefined) setBorderRadius(newConfig.styles.borderRadius);
      if (newConfig.styles.padding !== undefined) setPadding(newConfig.styles.padding);
      if (newConfig.styles.activeColor !== undefined) setActiveColor(newConfig.styles.activeColor);
      if (newConfig.styles.inactiveColor !== undefined) setInactiveColor(newConfig.styles.inactiveColor);
      if (newConfig.styles.backgroundColor !== undefined) setBackgroundColor(newConfig.styles.backgroundColor);
    }
  }, []);

  // Register with AI context
  React.useEffect(() => {
    registerComponent('tabs', tabsConfig, handleConfigUpdate);
  }, [tabsConfig, registerComponent, handleConfigUpdate]);

  if (!mounted) {
    return (
     <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Tabs Comparison
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comparing tab navigation components across libraries.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
     </Container>
    );
  }

  const handleCopy = (provider: string) => {
    const code = generateTabsCode(provider, tabsConfig);
    navigator.clipboard.writeText(code);
    setCopiedProvider(provider);
    setTimeout(() => setCopiedProvider(null), 2000);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Tabs Comparison
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comparing tab navigation components across libraries.
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
          <Box sx={{ minWidth: 200 }}>
             <FormControl fullWidth size="small">
               <InputLabel>Orientation</InputLabel>
               <Select
                 value={orientation}
                 label="Orientation"
                 onChange={(e) => setOrientation(e.target.value as 'horizontal' | 'vertical')}
               >
                 <MenuItem value="horizontal">Horizontal</MenuItem>
                 <MenuItem value="vertical">Vertical</MenuItem>
               </Select>
             </FormControl>
          </Box>

          <Box sx={{ flex: 1, width: '100%', px: 2 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, display: 'block', color: 'text.secondary', textTransform: 'uppercase' }}>
              Border Radius: {borderRadius}px
            </Typography>
            <Slider
              value={borderRadius}
              min={0}
              max={30}
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
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', py: 2 }}>
                  <TabsWrapper provider={p} config={tabsConfig} />
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
                    position: 'relative',
                    maxWidth: '100%'
                  }}
                >
                  <Typography 
                    component="pre" 
                    sx={{ 
                      fontFamily: 'monospace', 
                      fontSize: '0.75rem', 
                      color: 'grey.300',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-all'
                    }}
                  >
                    {generateTabsCode(p, tabsConfig)}
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
