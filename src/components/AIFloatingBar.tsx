"use client";

import React from "react";
import {
  Paper,
  InputBase,
  IconButton,
  CircularProgress,
  Tooltip,
  useTheme,
  Box,
  Fade,
  Backdrop,
  Divider,
} from "@mui/material";
import {
  AutoAwesome as AIIcon,
  ArrowUpward as SendIcon,
  Close as CloseIcon
} from "@mui/icons-material";
import { useAI } from "@/context/AIContext";
import { usePathname } from "next/navigation";
import { ProviderContext } from "@/components/Providers";

export default function AIFloatingBar() {
  const { prompt, setPrompt, generateConfig, generateCode, isGenerating, activeComponent, isAIBarVisible, toggleAIBar } =
    useAI();
  const { selectedProviders } = React.useContext(ProviderContext);
  const theme = useTheme();
  const pathname = usePathname();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isGenerating && prompt.trim()) {
      handleSend();
    }
  };

  const handleSend = () => {
    if (pathname === '/playground') {
      generateCode();
    } else {
      generateConfig();
    }
  };

  const isVisible =
    !!activeComponent &&
    isAIBarVisible &&
    pathname !== "/" &&
    pathname !== "/initialization" &&
    pathname !== "/home";

  if (!isVisible && !isGenerating) return null;

  return (
    <Fade in={isVisible} unmountOnExit>
      <Box
        sx={{
          position: "fixed",
          bottom: { xs: 0, md: 32 },
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          width: "100%",
          maxWidth: { xs: "100%", md: 600 },
          px: { xs: 0, md: 2 },
          pb: { xs: "env(safe-area-inset-bottom)", md: 0 },
          bgcolor: { xs: "background.paper", md: "transparent" },
          borderTop: { xs: "1px solid", md: "none" },
          borderColor: "divider",
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            borderRadius: { xs: '12px 12px 0 0', md: 8 },
            border: "1px solid",
            borderColor:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.1)",
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(20,20,20,0.9)"
                : "rgba(255,255,255,0.9)",
            backdropFilter: "blur(12px)",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)"
                : "0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)",
            transition: "all 0.3s ease",
            "&:focus-within": {
              transform: "scale(1.02)",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.3)"
                  : "0 12px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(59,130,246,0.3)",
            },
          }}
        >
          <Box
            sx={{
              p: 1.5,
              display: "flex",
              color: "primary.main",
              animation: isGenerating ? "pulse 2s infinite" : "none",
              "@keyframes pulse": {
                "0%": { opacity: 0.6 },
                "50%": { opacity: 1 },
                "100%": { opacity: 0.6 },
              },
            }}
          >
            <AIIcon />
          </Box>

          <InputBase
            sx={{ ml: 1, flex: 1, fontWeight: 500 }}
            placeholder={`Ask AI to change component styles...`}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isGenerating}
            autoFocus
          />

          <Box sx={{ p: 0.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton
              color="primary"
              onClick={handleSend}
              disabled={isGenerating || !prompt.trim()}
              sx={{
                bgcolor: prompt.trim() ? "primary.main" : "transparent",
                color: prompt.trim() ? "white" : "action.disabled",
                "&:hover": {
                  bgcolor: prompt.trim() ? "primary.dark" : "transparent",
                },
                width: 36,
                height: 36,
                transition: "all 0.2s",
              }}
            >
              {isGenerating ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <SendIcon fontSize="small" />
              )}
            </IconButton>

            <Divider orientation="vertical" flexItem sx={{ height: 24, my: 'auto', mx: 0.5 }} />

            <Tooltip title="Minimize">
              <IconButton
                size="small"
                onClick={toggleAIBar}
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
                  width: 32,
                  height: 32,
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
}
