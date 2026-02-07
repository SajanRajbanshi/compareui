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
  CircularProgress
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CodeIcon from '@mui/icons-material/Code';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import ModalWrapper from '@/components/wrappers/ModalWrapper';
import ProviderHeader from '@/components/ProviderHeader';
import { ProviderContext } from '@/components/Providers';
import { generateModalCode } from '@/lib/codegen/modal';
import { useAI } from '@/context/AIContext';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useMounted } from '@/hooks/useMounted';

export default function ModalPage() {
  const { selectedProviders } = React.useContext(ProviderContext);
  const { registerComponent } = useAI();
  const mounted = useMounted();
  
  // State for config
  const [title, setTitle] = useLocalStorage('modal_title', 'Modal Title');
  const [content, setContent] = useLocalStorage('modal_content', 'This is the modal content description. It can be long or short depending on your needs.');
  
  const [borderRadius, setBorderRadius] = useLocalStorage('modal_borderRadius', 12);
  const [backgroundColor, setBackgroundColor] = useLocalStorage<string | undefined>('modal_backgroundColor', undefined);
  const [titleColor, setTitleColor] = useLocalStorage<string | undefined>('modal_titleColor', undefined);
  const [textColor, setTextColor] = useLocalStorage<string | undefined>('modal_textColor', undefined);
  const [overlayColor, setOverlayColor] = useLocalStorage<string | undefined>('modal_overlayColor', undefined);
  const [borderColor, setBorderColor] = useLocalStorage<string | undefined>('modal_borderColor', undefined);

  const [viewMode, setViewMode] = useLocalStorage<'preview' | 'code'>('modal_viewMode', 'preview');
  const [copiedProvider, setCopiedProvider] = React.useState<string | null>(null);

  const modalConfig = React.useMemo(() => ({
    title,
    content,
    styles: {
      borderRadius,
      backgroundColor,
      titleColor,
      textColor,
      overlayColor,
      borderColor
    }
  }), [title, content, borderRadius, backgroundColor, titleColor, textColor, overlayColor, borderColor]);

  // Handler for AI updates
  const handleConfigUpdate = React.useCallback((newConfig: any) => {
    if (newConfig.title) setTitle(newConfig.title);
    if (newConfig.content) setContent(newConfig.content);
    
    if (newConfig.styles) {
      if (newConfig.styles.borderRadius !== undefined) setBorderRadius(newConfig.styles.borderRadius);
      if (newConfig.styles.backgroundColor !== undefined) setBackgroundColor(newConfig.styles.backgroundColor);
      if (newConfig.styles.titleColor !== undefined) setTitleColor(newConfig.styles.titleColor);
      if (newConfig.styles.textColor !== undefined) setTextColor(newConfig.styles.textColor);
      if (newConfig.styles.overlayColor !== undefined) setOverlayColor(newConfig.styles.overlayColor);
      if (newConfig.styles.borderColor !== undefined) setBorderColor(newConfig.styles.borderColor);
    }
  }, []);

  // Register with AI context
  React.useEffect(() => {
    registerComponent('modal', modalConfig, handleConfigUpdate);
  }, [modalConfig, registerComponent, handleConfigUpdate]);

  if (!mounted) {
    return (
     <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Modal Comparison
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comparing modal dialogs and overlays across libraries.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
     </Container>
    );
  }

  const handleCopy = (provider: string) => {
    const code = generateModalCode(provider, modalConfig);
    navigator.clipboard.writeText(code);
    setCopiedProvider(provider);
    setTimeout(() => setCopiedProvider(null), 2000);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Modal Comparison
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comparing modal dialogs and overlays across libraries.
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
          <Box sx={{ flex: 1, width: '100%', px: 2 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, display: 'block', color: 'text.secondary', textTransform: 'uppercase' }}>
              Border Radius: {borderRadius}px
            </Typography>
            <Slider
              value={borderRadius}
              min={0}
              max={50}
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
                  <ModalWrapper provider={p} config={modalConfig} />
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
                    {generateModalCode(p, modalConfig)}
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
