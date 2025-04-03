import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";
import { useEffect, useContext, useState } from "react";
import { Route, Switch } from "wouter";
import ThresholdGate from "./components/ThresholdGate";
import { AppContext } from "./context/AppContext";
import { ChatAssistant } from "./components/chat/ChatAssistant";
import { PhilosophySnippet } from "./components/micro-interactions/PhilosophySnippet";

function App() {
  const { userType, setUserType, language, setLanguage } = useContext(AppContext);
  // Use local state instead of context for the gateway visibility
  const [showGateway, setShowGateway] = useState(true);

  // Check if gateway should be shown on initial load
  useEffect(() => {
    console.log('App mounted - initializing...');
    
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'ar' || savedLanguage === 'en') {
      setLanguage(savedLanguage);
    }
    
    // Check if user has already made a choice in the last 24 hours
    const gatewayChoice = localStorage.getItem('gatewayChoice');
    const gatewayTimestamp = localStorage.getItem('gatewayTimestamp');
    const savedUserType = localStorage.getItem('userMindset') as 'leader' | 'follower' | 'guest' | null;
    
    // Skip gateway if choice was made in the last 24 hours
    if (gatewayChoice === 'entered' && gatewayTimestamp && 
        (Date.now() - parseInt(gatewayTimestamp)) < 86400000) {
      // Uncomment this line when you want to enable gateway skipping:
      setShowGateway(false);
      if (savedUserType) {
        setUserType(savedUserType);
      }
    }
  }, [setUserType, setLanguage]);

  // Debug function to log the current state
  useEffect(() => {
    console.log('App state - showGateway:', showGateway, 'userType:', userType, 'language:', language);
  }, [showGateway, userType, language]);

  // Direct navigation function with no timeouts or state complications
  const handleEnterSite = (type: 'leader' | 'follower' | 'guest') => {
    console.log('handleEnterSite called with type:', type);
    
    // Set the user type
    setUserType(type);
    
    // Save choice for 24 hours
    localStorage.setItem('gatewayChoice', 'entered');
    localStorage.setItem('gatewayTimestamp', Date.now().toString());
    localStorage.setItem('userMindset', type);
    
    // Directly set showGateway to false - no timeout needed with local state
    console.log('Setting showGateway to false - navigating to home page');
    setShowGateway(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      {showGateway ? (
        <ThresholdGate onEnterSite={handleEnterSite} />
      ) : (
        <>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/admin" component={Admin} />
            <Route path="/admin/:tab" component={Admin} />
            <Route component={NotFound} />
          </Switch>
          
          {/* Global interactive components */}
          <ChatAssistant />
          <PhilosophySnippet />
        </>
      )}
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
