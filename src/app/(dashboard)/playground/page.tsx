'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Container, 
  Paper, 
  ToggleButton, 
  ToggleButtonGroup,
  Typography,
  CircularProgress,
  Grid
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CodeIcon from '@mui/icons-material/Code';
import { useAI } from '@/context/AIContext';
import { ProviderContext } from '@/components/Providers';
import ProviderHeader from '@/components/ProviderHeader';
import { providerRegistry } from '@/constants/providerRegistry';

import { useMounted } from '@/hooks/useMounted';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const DEFAULT_CODE = '';

export default function PlaygroundPage() {
  const { selectedProviders } = React.useContext(ProviderContext);
  const { registerComponent, isGenerating, setIsAIBarVisible } = useAI();
  const mounted = useMounted();
  const [providerCode, setProviderCode] = useLocalStorage<Record<string, string>>('playground_code', {
    mui: DEFAULT_CODE,
    chakra: DEFAULT_CODE,
    antd: DEFAULT_CODE,
    shadcn: DEFAULT_CODE
  });
  const [viewMode, setViewMode] = useLocalStorage<'preview' | 'code'>('playground_view_mode', 'preview');
  const iframeRefs = useRef<Record<string, HTMLIFrameElement | null>>({});

  // Ensure AI bar is visible when entering playground
  useEffect(() => {
    setIsAIBarVisible(true);
  }, [setIsAIBarVisible]);

  // Register with AI context
  useEffect(() => {
    registerComponent('playground', providerCode, (newConfigs: Record<string, string>) => {
      // AI returns { mui: '...', antd: '...' } without imports
      if (newConfigs) {
        const wrappedConfigs: Record<string, string> = {};
        Object.entries(newConfigs).forEach(([id, code]) => {
          wrappedConfigs[id] = code;
        });
        setProviderCode(prev => ({ ...prev, ...wrappedConfigs }));
      }
    });
  }, [providerCode, registerComponent]);

  // Sync code to iframes
  useEffect(() => {
    const syncAll = () => {
      console.log('Playground: Syncing code to iframes...');
      Object.entries(providerCode).forEach(([id, code]) => {
        const iframe = iframeRefs.current[id];
        if (iframe && iframe.contentWindow) {
          try {
            iframe.contentWindow.postMessage({
              type: 'UPDATE_CODE',
              payload: { code }
            }, '*');
          } catch (e) {
            console.error(`Playground: Failed to postMessage to ${id}:`, e);
          }
        }
      });
    };

    syncAll();
    const timer = setTimeout(syncAll, 1000);
    return () => clearTimeout(timer);
  }, [providerCode, viewMode, selectedProviders]);

  if (!mounted) {
    return (
      <Container maxWidth="xl" sx={{ height: 'calc(100vh - 128px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ height: 'calc(100vh - 128px)', display: 'flex', flexDirection: 'column' }}>
      {/* View Mode Toggle */}
      {(Object.values(providerCode).some(c => c.trim()) || isGenerating) && (
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
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
      )}

      <Grid container spacing={4} alignItems="stretch" sx={{ flex: 1, minHeight: 0 }}>
        {!isGenerating && !Object.values(providerCode).some(c => c.trim()) ? (
          <Grid size={{ xs: 12 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Box sx={{ textAlign: 'center', maxWidth: 600, p: 4 }}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 800, background: 'linear-gradient(45deg, #2563eb, #7c3aed)', backgroundClip: 'text', textFillColor: 'transparent', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                AI Playground
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                Generate and compare UI components across multiple libraries instantly.
                <br />
                Just type your request below to get started.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                {['MUI', 'Chakra', 'AntD', 'shadcn'].map(lib => (
                  <Paper key={lib} elevation={0} sx={{ px: 2, py: 1, borderRadius: 2, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
                    <Typography variant="subtitle2" fontWeight={600}>{lib}</Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
          </Grid>
        ) : (
          selectedProviders.map((p) => {
            const isUnavailable = p === 'aceternity';
            return (
              <Grid size={{ xs: 12, lg: selectedProviders.length > 1 ? 6 : 12 }} key={p} sx={{ display: 'flex' }}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    flex: 1,
                    borderRadius: 4, 
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    p: 2
                  }}
                >
                  <ProviderHeader 
                    provider={p.toUpperCase()} 
                    showCopy={viewMode === 'code' && !isUnavailable} 
                    onCopy={() => navigator.clipboard.writeText(providerCode[p] || '')}
                  />

                  {isGenerating && !isUnavailable && (
                    <Box sx={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      right: 0, 
                      bottom: 0, 
                      bgcolor: 'rgba(255,255,255,0.7)', 
                      zIndex: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(4px)'
                    }}>
                      <CircularProgress size={32} />
                    </Box>
                  )}

                  {isUnavailable ? (
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400, bgcolor: 'action.hover', borderRadius: 2 }}>
                      <Typography color="text.secondary" variant="body1" fontWeight={500}>
                        Not available for {p.toUpperCase()} as of now
                      </Typography>
                    </Box>
                  ) : viewMode === 'preview' ? (
                    <Box sx={{ flex: 1, width: '100%', minHeight: 400 }}>
                      <iframe
                        ref={el => { iframeRefs.current[p] = el }}
                        src="https://sandbox-7vgw.vercel.app/"
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        title={`Sandbox-${p}`}
                        onLoad={() => {
                          const iframe = iframeRefs.current[p];
                          if (iframe && iframe.contentWindow) {
                            iframe.contentWindow.postMessage({
                              type: 'UPDATE_CODE',
                              payload: { code: providerCode[p] || '' }
                            }, '*');
                          }
                        }}
                      />
                    </Box>
                  ) : (
                    <Box 
                      sx={{ 
                        flex: 1,
                        bgcolor: '#0f172a', 
                        p: 3, 
                        borderRadius: 2,
                        overflow: 'auto',
                        minHeight: 400
                      }}
                    >
                      <Typography 
                        component="pre" 
                        sx={{ 
                          fontFamily: 'monospace', 
                          fontSize: '0.85rem', 
                          color: '#e2e8f0',
                          whiteSpace: 'pre-wrap',
                          lineHeight: 1.6
                        }}
                      >
                        {providerCode[p]}
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Grid>
            );
          })
        )}
      </Grid>
    </Container>
  );
}
