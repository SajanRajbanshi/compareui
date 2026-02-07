'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Tab, 
  Tabs, 
  Paper,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  CircularProgress
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import TerminalIcon from '@mui/icons-material/Terminal';
import CodeIcon from '@mui/icons-material/Code';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { PROVIDER_LOGOS } from '@/constants/logos';

interface ProviderGuide {
  id: string;
  label: string;
  icon: React.ReactElement;
  install: string;
  setup: string;
  usage: string;
  notes?: string;
}

const guides: ProviderGuide[] = [
  {
    id: 'mui',
    label: 'Material UI',
    icon: <Box component="img" src={PROVIDER_LOGOS.mui} sx={{ width: 20, height: 20 }} />,
    install: 'npm install @mui/material @emotion/react @emotion/styled @mui/icons-material',
    setup: `// src/components/Providers.tsx
'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'light', 
    primary: { main: '#3b82f6' },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}`,
    usage: `import { Button } from '@mui/material';

export default function MyComponent() {
  return (
    <Button variant="contained">
      Hello World
    </Button>
  );
}`,
    notes: 'MUI uses Emotion for styling. Ensure "use client" is present where necessary.'
  },
  {
    id: 'chakra',
    label: 'Chakra UI',
    icon: <Box component="img" src={PROVIDER_LOGOS.chakra} sx={{ width: 20, height: 20 }} />,
    install: 'npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion',
    setup: `// src/components/Providers.tsx
'use client';

import { ChakraProvider } from '@chakra-ui/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      {children}
    </ChakraProvider>
  );
}`,
    usage: `import { Button } from '@chakra-ui/react';

export default function MyComponent() {
  return (
    <Button colorScheme="blue">
      Hello Chakra
    </Button>
  );
}`
  },
  {
    id: 'antd',
    label: 'Ant Design',
    icon: <Box component="img" src={PROVIDER_LOGOS.antd} sx={{ width: 20, height: 20 }} />,
    install: 'npm install antd @ant-design/nextjs-registry',
    setup: `// src/components/Providers.tsx
'use client';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider theme={{ token: { colorPrimary: '#3b82f6' } }}>
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
}`,
    usage: `import { Button } from 'antd';

export default function MyComponent() {
  return (
    <Button type="primary">
      Hello AntD
    </Button>
  );
}`
  },
  {
    id: 'shadcn',
    label: 'shadcn/ui',
    icon: <Box component="img" src={PROVIDER_LOGOS.shadcn} sx={{ width: 20, height: 20, borderRadius: '50%' }} />,
    install: `npx shadcn-ui@latest init
# Follow prompts:
# - Style: Default
# - Base Color: Slate
# - CSS Variables: Yes

npx shadcn-ui@latest add button`,
    setup: `// src/app/layout.tsx
import "@/styles/globals.css"
import { cn } from "@/lib/utils"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        {children}
      </body>
    </html>
  )
}`,
    usage: `import { Button } from "@/components/ui/button"

export default function MyComponent() {
  return (
    <Button variant="default">
      Hello Shadcn
    </Button>
  )
}`
  },
  {
    id: 'aceternity',
    label: 'Aceternity UI',
    icon: <Box component="img" src={PROVIDER_LOGOS.aceternity} sx={{ width: 20, height: 20 }} />,
    install: 'npm i framer-motion clsx tailwind-merge',
    setup: `// tailwind.config.ts
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [\`--\${key}\`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}`,
    usage: `import { SparklesCore } from "../ui/sparkles";

export default function MyComponent() {
  return (
    <div className="h-[40rem] w-full bg-black relative">
       <SparklesCore
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
        />
    </div>
  );
}`
  }
];

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useMounted } from '@/hooks/useMounted';

export default function InitializationPage() {
  const mounted = useMounted();
  const [activeTab, setActiveTab] = useLocalStorage('init_activeTab', 0);
  const [copied, setCopied] = React.useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const currentGuide = guides[activeTab];

  const CodeBlock = ({ code, id, language = 'tsx' }: { code: string, id: string, language?: string }) => (
    <Paper 
      variant="outlined" 
      sx={{ 
        p: 2, 
        bgcolor: '#1a1a1a', 
        color: '#f0f0f0', 
        fontFamily: 'monospace',
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'rgba(255,255,255,0.1)'
      }}
    >
       <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
        <Tooltip title="Copy">
          <IconButton 
            size="small" 
            onClick={() => handleCopy(code, id)}
            sx={{ 
              color: copied === id ? 'success.main' : 'grey.500', 
              bgcolor: 'rgba(255,255,255,0.05)', 
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } 
            }}
          >
            {copied === id ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>
      <Box component="pre" sx={{ m: 0, overflowX: 'auto', fontSize: '0.85rem', lineHeight: 1.5, p: 1 }}>
        {code}
      </Box>
    </Paper>
  );

  if (!mounted) {
    return (
      <Container maxWidth="xl" disableGutters sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" disableGutters sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <Box sx={{ p: 2, pb: 1 }}>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800 }}>
          Set up your project and start using the generated code.
        </Typography>
      </Box>

      {/* Tabs Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          borderBottom: '1px solid', 
          borderColor: 'divider', 
          bgcolor: 'background.paper',
          px: 4,
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}
      >
        <Tabs 
          value={activeTab} 
          onChange={(_, v) => setActiveTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ '& .MuiTab-root': { fontWeight: 600, textTransform: 'none', fontSize: '0.95rem', minHeight: 48, gap: 1 } }}
        >
          {guides.map((g) => (
            <Tab key={g.id} label={g.label} icon={g.icon} iconPosition="start" />
          ))}
        </Tabs>
      </Paper>

      <Box sx={{ flex: 1, overflowY: 'auto', p: 4 }}>
        <Container maxWidth="lg" disableGutters>
          
          {/* Installation */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <TerminalIcon fontSize="medium" color="primary" />
              Installation
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Install the necessary dependencies for {currentGuide.label}.
            </Typography>
            <CodeBlock code={currentGuide.install} id="install" language="bash" />
          </Box>

          <Divider sx={{ mb: 6 }} />

          {/* Setup */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <CodeIcon fontSize="medium" color="secondary" />
              Initialization
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Create a Providers component or update your configuration to wrap your application.
            </Typography>
            <CodeBlock code={currentGuide.setup} id="setup" />
          </Box>

          <Divider sx={{ mb: 6 }} />

          {/* Usage */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <CheckCircleOutlineIcon fontSize="medium" color="success" />
              Usage Example
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              How to use components from this library in your application.
            </Typography>
            <CodeBlock code={currentGuide.usage} id="usage" />
          </Box>

          {currentGuide.notes && (
            <Alert severity="info" variant="outlined" sx={{ borderRadius: 2 }}>
              <Typography variant="subtitle2" fontWeight={700}>Note:</Typography>
              {currentGuide.notes}
            </Alert>
          )}

        </Container>
      </Box>

      <Snackbar open={!!copied} autoHideDuration={2000} onClose={() => setCopied(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" sx={{ width: '100%', borderRadius: 2, fontWeight: 600 }}>
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </Container>
  );
}
