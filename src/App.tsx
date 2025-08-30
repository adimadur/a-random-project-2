import { useState } from 'react';
import Calculator from './components/Calculator';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="calculator-theme">
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Calculator />
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
