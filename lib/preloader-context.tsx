"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

interface PreloaderCtx {
  isLoaded: boolean;
  setLoaded: () => void;
}

const PreloaderContext = createContext<PreloaderCtx>({
  isLoaded: false,
  setLoaded: () => {},
});

export const usePreloader = () => useContext(PreloaderContext);

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const setLoaded = useCallback(() => setIsLoaded(true), []);

  return (
    <PreloaderContext.Provider value={{ isLoaded, setLoaded }}>
      {children}
    </PreloaderContext.Provider>
  );
}
