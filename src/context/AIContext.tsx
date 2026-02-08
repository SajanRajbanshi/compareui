'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import axios from 'axios';

interface AIContextType {
  isGenerating: boolean;
  prompt: string;
  setPrompt: (prompt: string) => void;
  generateConfig: () => Promise<void>;
  generateCode: () => Promise<void>;
  registerComponent: (name: string, currentConfig: any, setConfig: (config: any) => void) => void;
  activeComponent: string | null;
  isAIBarVisible: boolean;
  setIsAIBarVisible: (visible: boolean) => void;
  toggleAIBar: () => void;
}

const AIContext = createContext<AIContextType>({
  isGenerating: false,
  prompt: '',
  setPrompt: () => {},
  generateConfig: async () => {},
  generateCode: async () => {},
  registerComponent: () => {},
  activeComponent: null,
  isAIBarVisible: true,
  setIsAIBarVisible: () => {},
  toggleAIBar: () => {},
});

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [isAIBarVisible, setIsAIBarVisible] = useState(true);

  const toggleAIBar = useCallback(() => setIsAIBarVisible(prev => !prev), []);
  // and frequent context updates when config changes
  const configRef = useRef<any>(null);
  const setConfigRef = useRef<((config: any) => void) | null>(null);

  const registerComponent = useCallback((name: string, currentConfig: any, setConfig: (config: any) => void) => {
    setActiveComponent(name);
    configRef.current = currentConfig;
    setConfigRef.current = setConfig;
  }, []);

  const generateConfig = async () => {
    if (!prompt.trim() || !activeComponent || !configRef.current || !setConfigRef.current) {
      return;
    }

    setIsGenerating(true);
    try {
      const response = await axios.post('https://compareui-server.vercel.app/api/config/generate', {
        componentName: activeComponent,
        prompt: prompt,
        currentConfig: configRef.current
      });

      if (response.data.success && response.data.config) {
        setConfigRef.current(response.data.config);
        setPrompt(''); // Clear prompt on success
      }
    } catch (error: any) {
      console.error('Failed to generate config:', error);
      const errorMessage = error.response?.data?.error || error.response?.data?.lastError || 'Failed to generate configuration';
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateCode = async () => {
    if (!prompt.trim() || !activeComponent || !configRef.current || !setConfigRef.current) {
      return;
    }

    setIsGenerating(true);
    try {
      const response = await axios.post('https://compareui-server.vercel.app/api/code/generate', {
        prompt: prompt,
        prevCode: configRef.current
      });

      if (response.data.success && response.data.config) {
        setConfigRef.current(response.data.config);
        setPrompt(''); // Clear prompt on success
      }
    } catch (error: any) {
      console.error('Failed to generate code:', error);
      const errorMessage = error.response?.data?.error || error.response?.data?.lastError || 'Failed to generate code';
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AIContext.Provider value={{
      isGenerating,
      prompt,
      setPrompt,
      generateConfig,
      generateCode,
      registerComponent,
      activeComponent,
      isAIBarVisible,
      setIsAIBarVisible,
      toggleAIBar
    }}>
      {children}
    </AIContext.Provider>
  );
}

export const useAI = () => useContext(AIContext);
