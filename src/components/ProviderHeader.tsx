import React from 'react';
import { Box, Typography, Tooltip, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { PROVIDER_LOGOS, ProviderId } from '@/constants/logos';

interface ProviderHeaderProps {
  provider: string;
  showCopy?: boolean;
  onCopy?: () => void;
  isCopied?: boolean;
}

export default function ProviderHeader({ 
  provider, 
  showCopy, 
  onCopy, 
  isCopied 
}: ProviderHeaderProps) {
  const providerId = provider.toLowerCase() as ProviderId;
  const logoUrl = PROVIDER_LOGOS[providerId];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        {logoUrl && (
          <Box 
            component="img" 
            src={logoUrl} 
            sx={{ 
              width: 20, 
              height: 20, 
              objectFit: 'contain',
              borderRadius: providerId === 'shadcn' ? '50%' : 0
            }} 
          />
        )}
        <Typography 
          variant="caption" 
          sx={{ 
            fontWeight: 800, 
            letterSpacing: 1, 
            color: 'primary.main',
            textTransform: 'uppercase'
          }}
        >
          {provider}
        </Typography>
      </Box>
      
      {showCopy && (
        <Tooltip title={isCopied ? "Copied!" : "Copy Code"}>
          <IconButton 
            size="small" 
            onClick={onCopy}
            color={isCopied ? "success" : "default"}
            sx={{ border: '1px solid', borderColor: 'divider' }}
          >
            {isCopied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}
