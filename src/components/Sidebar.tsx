import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Typography, 
  Divider,
  Drawer,
  useTheme,
  useMediaQuery,
  ListItemIcon
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon,
  SmartButton as SmartButtonIcon,
  CreditCard as CreditCardIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  Tab as TabIcon,
  Adjust as AdjustIcon,
  Input as InputIcon,
  RadioButtonChecked as RadioButtonCheckedIcon,
  List as ListIcon,
  ToggleOn as ToggleOnIcon,
  Settings as SettingsIcon,
  DonutLarge as DonutLargeIcon
} from '@mui/icons-material';
import { componentsConfig } from '@/constants/components';

const iconMap: Record<string, React.ReactNode> = {
  ExpandMore: <ExpandMoreIcon fontSize="small" />,
  SmartButton: <SmartButtonIcon fontSize="small" />,
  CreditCard: <CreditCardIcon fontSize="small" />,
  ChatBubbleOutline: <ChatBubbleOutlineIcon fontSize="small" />,
  Tab: <TabIcon fontSize="small" />,
  Adjust: <AdjustIcon fontSize="small" />,
  Input: <InputIcon fontSize="small" />,
  RadioButtonChecked: <RadioButtonCheckedIcon fontSize="small" />,
  List: <ListIcon fontSize="small" />,
  ToggleOn: <ToggleOnIcon fontSize="small" />,
  DonutLarge: <DonutLargeIcon fontSize="small" />,
};

const SidebarContent = ({ pathname, onLinkClick }: { pathname: string; onLinkClick?: () => void }) => (
  <>
    <Box sx={{ p: 3 }}>
        <Link href="/home" style={{ textDecoration: 'none' }} onClick={onLinkClick}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 800, 
            letterSpacing: -0.5,
            background: 'linear-gradient(45deg, #3b82f6 30%, #a855f7 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 0.5,
            cursor: 'pointer'
          }}
        >
          CompareUI
        </Typography>
      </Link>
    </Box>

    <Divider sx={{ opacity: 0.1 }} />

    <Box sx={{ flex: 1, px: 2, py: 2, overflowY: 'auto' }}>
      <List disablePadding sx={{ mb: 2 }}>
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            component={Link}
            href="/initialization"
            selected={pathname === '/initialization'}
            onClick={onLinkClick}
            sx={{
              borderRadius: 2,
              py: 0.5, 
              height: 36,
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': { bgcolor: 'primary.dark' },
                '& .MuiListItemIcon-root': { color: 'white' }
              },
              '&:hover': { bgcolor: 'action.hover' },
              transition: 'all 0.2s'
            }}
          >
            <ListItemIcon sx={{ minWidth: 32, color: pathname === '/initialization' ? 'inherit' : 'text.secondary' }}>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText 
              primary="Initialization" 
              primaryTypographyProps={{ 
                fontSize: '0.85rem', 
                fontWeight: pathname === '/initialization' ? 600 : 500,
              }} 
            />
          </ListItemButton>
        </ListItem>
      </List>

      <Typography 
        variant="overline" 
        sx={{ 
          color: 'text.secondary', 
          fontWeight: 700, 
          letterSpacing: 1.5,
          fontSize: '0.65rem',
          pl: 1,
          mb: 1,
          display: 'block'
        }}
      >
        COMPONENTS
      </Typography>

      <List disablePadding>
        {componentsConfig.map((item) => {
          const isActive = pathname === `/${item.tab}`;
          return (
            <ListItem key={item.tab} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={`/${item.tab}`}
                selected={isActive}
                onClick={onLinkClick}
                sx={{
                  borderRadius: 2,
                  py: 0.5,
                  height: 36,
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': { color: 'white' }
                  },
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                  transition: 'all 0.2s'
                }}
              >
                <ListItemIcon sx={{ minWidth: 32, color: isActive ? 'inherit' : 'text.secondary' }}>
                  {iconMap[item.icon as string] || <SettingsIcon fontSize="small" />}
                </ListItemIcon>
                <ListItemText 
                  primary={item.component} 
                  primaryTypographyProps={{ 
                    fontSize: '0.85rem', 
                    fontWeight: isActive ? 600 : 500,
                  }} 
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>

    <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
        v0.1.0-alpha · Sajan
      </Typography>
    </Box>
  </>
);

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 260 },
        }}
      >
        <SidebarContent pathname={pathname} onLinkClick={onMobileClose} />
      </Drawer>
    );
  }

  return (
    <Box 
      sx={{ 
        width: 260, 
        height: '100vh', 
        bgcolor: 'background.paper', 
        borderRight: '1px solid',
        borderColor: 'divider',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column'
      }}
    >
      <SidebarContent pathname={pathname} />
    </Box>
  );
}
