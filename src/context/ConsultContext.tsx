import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SupportType } from '../navigation/types';

type ProviderInfo = {
  name: string;
  credentials: string;
  bio: string;
  avatarUrl?: string;
};

type ConsultContextValue = {
  concern: string;
  setConcern: (value: string) => void;
  supportType: SupportType | null;
  setSupportType: (value: SupportType) => void;
  provider: ProviderInfo;
};

const defaultProvider: ProviderInfo = {
  name: 'Dr. Maya Patel',
  credentials: 'MD, Pediatrician',
  bio: '10+ years helping parents navigate common child health and development questions.',
  avatarUrl: 'https://fastly.picsum.photos/id/903/200/300.jpg?hmac=bT2dTWTFYT3TyM7cBatAwmhTtJuzlHBXtqn_kH-z3lU',
};

const ConsultContext = createContext<ConsultContextValue | undefined>(undefined);

export const ConsultProvider = ({ children }: { children: ReactNode }) => {
  const [concern, setConcern] = useState('');
  const [supportType, setSupportType] = useState<SupportType | null>(null);

  return (
    <ConsultContext.Provider
      value={{
        concern,
        setConcern,
        supportType,
        setSupportType,
        provider: defaultProvider,
      }}
    >
      {children}
    </ConsultContext.Provider>
  );
};

export const useConsult = () => {
  const ctx = useContext(ConsultContext);
  if (!ctx) throw new Error('useConsult must be used within ConsultProvider');
  return ctx;
};
