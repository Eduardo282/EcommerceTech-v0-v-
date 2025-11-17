"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = (props) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={{
        "--normal-bg": "#000",
        "--normal-text": "var(--popover-foreground)",
      }}
      {...props}
    />
  );
};

export { Toaster };
