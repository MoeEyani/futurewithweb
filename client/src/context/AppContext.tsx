import { createContext, useState, ReactNode } from "react";

interface AppContextType {
  showGateway: boolean;
  setShowGateway: (show: boolean) => void;
  userType: 'leader' | 'follower' | 'guest' | null;
  setUserType: (type: 'leader' | 'follower' | 'guest' | null) => void;
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
}

export const AppContext = createContext<AppContextType>({
  showGateway: true,
  setShowGateway: () => {},
  userType: null,
  setUserType: () => {},
  language: 'en',
  setLanguage: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [showGateway, setShowGateway] = useState(true);
  const [userType, setUserType] = useState<'leader' | 'follower' | 'guest' | null>(null);
  
  // Initialize language from localStorage or default to 'en'
  const [language, setLanguage] = useState<'en' | 'ar'>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  });
  
  // Persist language changes to localStorage
  const handleSetLanguage = (lang: 'en' | 'ar') => {
    localStorage.setItem('language', lang);
    setLanguage(lang);
  };

  return (
    <AppContext.Provider
      value={{
        showGateway,
        setShowGateway,
        userType,
        setUserType,
        language,
        setLanguage: handleSetLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
