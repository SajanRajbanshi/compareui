"use client";

import React from "react";
import { Box, Typography, Container } from "@mui/material";

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ py: 12, textAlign: "center" }}>
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontWeight: 800,
            background: "linear-gradient(45deg, #3b82f6 30%, #a855f7 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          CompareUI
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ mb: 4, fontWeight: 500 }}
        >
          The multi-library design playground.
        </Typography>
      </Box>

      <Box
        sx={{
          textAlign: "left",
          bgcolor: "rgba(255,255,255,0.03)",
          p: 6,
          borderRadius: 4,
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 700, color: "primary.light" }}
        >
          What is it?
        </Typography>
        <Typography
          variant="body1"
          paragraph
          color="text.secondary"
          sx={{ lineHeight: 1.8 }}
        >
          CompareUI is a developer tool designed to bridge the gap between
          popular UI libraries. It allows you to visualize exactly how
          components from different frameworks render under the same functional
          requirements.
        </Typography>

        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 700, color: "primary.light", mt: 4 }}
        >
          How it works?
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ lineHeight: 1.8 }}
        >
          Select your favorite UI providers from the dashboard header (MUI,
          Chakra, AntD, etc.) and navigate to any component category in the
          sidebar. You'll see side-by-side comparisons of each library's output,
          helping you choose the right tool for your next project or ensuring
          design consistency across platforms.
        </Typography>
      </Box>

      <Typography
        variant="caption"
        sx={{ mt: 8, display: "block", color: "text.disabled" }}
      >
        Select a component from the sidebar to begin comparison.
      </Typography>
    </Container>
  );
}
