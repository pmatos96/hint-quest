"use client";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Box, ThemeProvider } from "@mui/material";
import { theme } from "@/style/theme";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ padding: 0, margin: 0 }}>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              width: "100vw",
              height: "100vh",
              backgroundColor: theme => theme.palette.background.default,
              paddingLeft: 0,
              paddingRight: 0,
            }}
          >
            {children}
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
