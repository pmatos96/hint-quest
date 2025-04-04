import type { Metadata } from "next";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Box, Container, containerClasses } from "@mui/material";

export const metadata: Metadata = {
  title: "Hint Quest App",
  description: "A game by Patrick Matos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ padding: 0, margin: 0 }}>
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "powderblue",
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          {children}
        </Box>
      </body>
    </html>
  );
}
