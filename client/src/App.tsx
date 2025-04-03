import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import { useEffect, useContext } from "react";
import ThresholdGate from "./components/ThresholdGate";
import { AppContext } from "./context/AppContext";

function App() {
  const { showGateway, setShowGateway, userType, setUserType } = useContext(AppContext);

  // Check if gateway should be shown on initial load
  useEffect(() => {
    // Force the gateway to show on initial load for now
    setShowGateway(true);
    
    // Check if user has already made a choice in the last 24 hours
    const gatewayChoice = localStorage.getItem('gatewayChoice');
    const gatewayTimestamp = localStorage.getItem('gatewayTimestamp');
    const savedUserType = localStorage.getItem('userMindset') as 'leader' | 'follower' | 'guest' | null;
    
    // Skip gateway if choice was made in the last 24 hours
    if (gatewayChoice === 'entered' && gatewayTimestamp && 
        (Date.now() - parseInt(gatewayTimestamp)) < 86400000) {
      // Uncomment this line when you want to enable gateway skipping:
      // setShowGateway(false);
      if (savedUserType) {
        setUserType(savedUserType);
      }
    }
  }, [setShowGateway, setUserType]);

  return (
    <QueryClientProvider client={queryClient}>
      {showGateway ? (
        <ThresholdGate onEnterSite={(type) => {
          setUserType(type);
          setShowGateway(false);
          
          // Save gateway choice to localStorage
          localStorage.setItem('gatewayChoice', 'entered');
          localStorage.setItem('gatewayTimestamp', Date.now().toString());
          localStorage.setItem('userMindset', type);
        }} />
      ) : (
        <Home />
      )}
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
