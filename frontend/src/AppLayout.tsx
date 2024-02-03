import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { ThemeProvider } from "./components/ui/theme-provider";


import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <main>
            {children}
        </main>

        <Footer />
    </ThemeProvider>
  )
}