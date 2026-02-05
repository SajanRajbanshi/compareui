'use client';

import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  FormGroup, 
  FormControlLabel, 
  Checkbox, 
  Box,
  IconButton,
  Divider,
  TextField,
  InputAdornment,
  Autocomplete,
  useTheme as useMuiTheme,
  Select,
  MenuItem,
  ListItemText,
  FormControl,
  Menu,
  Button
} from '@mui/material';
import { 
  Brightness4 as MoonIcon, 
  Brightness7 as SunIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { ProviderContext, ProviderType } from '@/components/Providers';
import { usePathname, useRouter } from 'next/navigation';
import { componentsConfig } from '@/constants/components';

const providers: { id: ProviderType; label: string }[] = [
  { id: 'mui', label: 'MUI' },
  { id: 'chakra', label: 'Chakra' },
  { id: 'antd', label: 'AntD' },
  { id: 'shadcn', label: 'shadcn' },
  { id: 'aceternity', label: 'Aceternity' },
];

import { 
  Menu as MenuIcon,
  AutoAwesome as AutoAwesomeIcon,
  Close as CloseIcon,
  Widgets as WidgetsIcon
} from '@mui/icons-material';
import { useAI } from '@/context/AIContext';

interface TopHeaderProps {
  onMobileNavOpen?: () => void;
}

export default function TopHeader({ onMobileNavOpen }: TopHeaderProps) {
  const { selectedProviders, toggleProvider, themeMode, toggleTheme } = React.useContext(ProviderContext);
  const { toggleAIBar, isAIBarVisible } = useAI();
  const pathname = usePathname();
  const router = useRouter();
  const theme = useMuiTheme();
  const title = pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) || 'Home';
  
  // Mobile provider menu state
  const [mobileProviderAnchor, setMobileProviderAnchor] = React.useState<null | HTMLElement>(null);

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        bgcolor: 'background.paper', 
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
        backgroundImage: 'none',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 3 }, minHeight: 64, position: 'relative' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMobileNavOpen}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ fontWeight: 800, color: 'text.primary', minWidth: 120 }}>
            {title}
          </Typography>
        </Box>

        {/* Centered Search */}
        {pathname !== '/home' && (
          <Box sx={{ 
            position: 'absolute', 
            left: '50%', 
            transform: 'translateX(-50%)',
            display: { xs: 'none', md: 'block' } 
          }}>
            <Autocomplete
              options={componentsConfig}
              getOptionLabel={(option) => option.component}
              onChange={(_, value) => {
                if (value) {
                  router.push(`/${value.tab}`);
                }
              }}
              popupIcon={null}
              renderInput={(params) => (
                <TextField 
                  {...params}
                  size="small"
                  placeholder="Search Component..."
                  sx={{ 
                    width: 300,
                    '& .MuiOutlinedInput-root': {
                      bgcolor: themeMode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                      borderRadius: 2,
                      pl: 1
                    }
                  }}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start" sx={{ pl: 0.5 }}>
                        <SearchIcon fontSize="small" sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Mobile Provider Selection Button */}
          <IconButton
            onClick={(e) => setMobileProviderAnchor(e.currentTarget)}
            size="small"
            sx={{ 
              display: { xs: 'flex', md: 'none' },
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <WidgetsIcon fontSize="small" />
          </IconButton>

          {/* Mobile Provider Menu */}
          <Menu
            anchorEl={mobileProviderAnchor}
            open={Boolean(mobileProviderAnchor)}
            onClose={() => setMobileProviderAnchor(null)}
            PaperProps={{
              sx: { minWidth: 200 }
            }}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                SELECT PROVIDERS
              </Typography>
            </Box>
            <Divider />
            {providers.map((p) => (
              <MenuItem key={p.id} onClick={() => toggleProvider(p.id)}>
                <Checkbox checked={selectedProviders.includes(p.id)} size="small" />
                <ListItemText primary={p.label} />
              </MenuItem>
            ))}
          </Menu>

          {/* Desktop Provider Selection */}
          <FormControl size="small" sx={{ display: { xs: 'none', md: 'flex' }, width: 220 }}>
            <Select
              multiple
              displayEmpty
              value={selectedProviders}
              onChange={(e) => {
                const value = e.target.value;
                // On autofill we get a stringified value.
                const newValues = typeof value === 'string' ? value.split(',') : value;
                
                // We need to sync with ProviderContext.
                // ProviderContext has `toggleProvider`.
                // Comparing newValues (all selected) vs selectedProviders (current).
                // Or I can just expose setProviders in context. (Can't easily right now).
                // I'll iterate diffs.
                // Assuming newValues is ProviderType[].
                const current = selectedProviders;
                const next = newValues as ProviderType[];
                
                const added = next.filter(x => !current.includes(x));
                const removed = current.filter(x => !next.includes(x));
                
                added.forEach(id => toggleProvider(id));
                removed.forEach(id => toggleProvider(id));
              }}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <Typography variant="body2" color="text.secondary">Select Providers</Typography>;
                }
                const labels = selected.map(id => providers.find(p => p.id === id)?.label);
                if (selected.length > 2) {
                  return `${labels.slice(0, 2).join(', ')} +${selected.length - 2}`;
                }
                return labels.join(', ');
              }}
              sx={{ 
                height: 40,
                bgcolor: themeMode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                '.MuiSelect-select': { py: 1 }
              }}
              MenuProps={{
                PaperProps: { style: { maxHeight: 300 } }
              }}
            >
              {providers.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  <Checkbox checked={selectedProviders.includes(p.id)} size="small" />
                  <ListItemText primary={p.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Divider orientation="vertical" flexItem sx={{ mx: 1, my: 1.5 }} />
          
          <IconButton 
            onClick={toggleAIBar} 
            color={isAIBarVisible ? "primary" : "default"} 
            size="small"
            sx={{ 
              border: isAIBarVisible ? '1px solid' : '1px dashed',
              borderColor: isAIBarVisible ? 'primary.main' : 'divider'
            }}
          >
            <AutoAwesomeIcon fontSize="small" />
          </IconButton>

          <IconButton onClick={toggleTheme} color="inherit" size="small">
            {themeMode === 'dark' ? <SunIcon fontSize="small" /> : <MoonIcon fontSize="small" />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
