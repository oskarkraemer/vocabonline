import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { ThemeProvider } from "./components/ui/theme-provider";


import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  
  return (
    <div style={{paddingLeft: "calc(100vw - 100%)"}}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Navbar />
          <main>
              {children}
          </main>

          <Footer />
      </ThemeProvider>
    </div>
  )
}