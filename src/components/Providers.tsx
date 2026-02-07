"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, theme } from "antd";
import { cn } from "@/lib/utils";
import { AIProvider } from "@/context/AIContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export type ProviderType = "mui" | "chakra" | "antd" | "shadcn" | "aceternity";
export type ThemeMode = "light" | "dark";

interface ProviderContextType {
  selectedProviders: ProviderType[];
  toggleProvider: (provider: ProviderType) => void;
  themeMode: ThemeMode;
  toggleTheme: () => void;
  search: string;
  setSearch: (s: string) => void;
}

export const ProviderContext = React.createContext<ProviderContextType>({
  selectedProviders: ["mui", "shadcn", "chakra"],
  toggleProvider: () => {},
  themeMode: "dark",
  toggleTheme: () => {},
  search: "",
  setSearch: () => {},
});

// generate presets as per theme mode
const getMuiTheme = (mode: ThemeMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#3b82f6",
        light: "#60a5fa",
        dark: "#2563eb",
      },
      background: {
        default: mode === "dark" ? "#0a0a0a" : "#f3f4f6",
        paper: mode === "dark" ? "#111" : "#ffffff",
      },
      divider:
        mode === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
      text: {
        primary: mode === "dark" ? "#f3f4f6" : "#111827",
        secondary: mode === "dark" ? "#9ca3af" : "#4b5563",
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
          },
        },
      },
    },
  });

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  
  const [selectedProviders, setSelectedProviders] = useLocalStorage<ProviderType[]>("selectedProviders", ["mui", "shadcn", "chakra"]);
  const [themeMode, setThemeMode] = React.useState<ThemeMode>("light");
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("themeMode") as ThemeMode;
    if (savedTheme) {
      setThemeMode(savedTheme);
    }
  }, []);

  const toggleProvider = (provider: ProviderType) => {
    setSelectedProviders((prev) =>
      prev.includes(provider)
        ? prev.filter((p) => p !== provider)
        : [...prev, provider],
    );
  };

  const toggleTheme = () => {
    setThemeMode((prev) => {
      const newMode = prev === "dark" ? "light" : "dark";
      localStorage.setItem("themeMode", newMode);
      return newMode;
    });
  };

  const muiTheme = React.useMemo(() => getMuiTheme(themeMode), [themeMode]);

  return (
    <ProviderContext.Provider
      value={{
        selectedProviders,
        toggleProvider,
        themeMode,
        toggleTheme,
        search,
        setSearch,
      }}
    >
      <AIProvider>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              algorithm:
                themeMode === "dark"
                  ? theme.darkAlgorithm
                  : theme.defaultAlgorithm,
              token: {
                colorPrimary: "#3b82f6",
                borderRadius: 8,
              },
            }}
          >
            <AppRouterCacheProvider>
              <ThemeProvider theme={muiTheme}>
                <CssBaseline />
                <ChakraProvider value={defaultSystem}>
                  {isLanding ? (
                    <div className={themeMode}>
                      {children}
                    </div>
                  ) : (
                    <div
                      className={cn("flex h-full w-full", themeMode)}
                      style={{
                        backgroundColor: muiTheme.palette.background.default,
                        color: muiTheme.palette.text.primary,
                      }}
                    >
                      {children}
                    </div>
                  )}
                </ChakraProvider>
              </ThemeProvider>
            </AppRouterCacheProvider>
          </ConfigProvider>
        </AntdRegistry>
      </AIProvider>
    </ProviderContext.Provider>
  );
}
