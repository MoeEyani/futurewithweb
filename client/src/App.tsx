import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import { useEffect, useState } from "react";
import ThresholdGate from "./components/ThresholdGate";

function App() {
  const [showGateway, setShowGateway] = useState(true);
  const [userType, setUserType] = useState<'leader' | 'follower' | 'guest' | null>(null);

  // Check if gateway should be shown on initial load
  useEffect(() => {
    // Check if user has already made a choice in the last 24 hours
    const gatewayChoice = localStorage.getItem('gatewayChoice');
    const gatewayTimestamp = localStorage.getItem('gatewayTimestamp');
    const savedUserType = localStorage.getItem('userMindset') as 'leader' | 'follower' | 'guest' | null;
    
    // Skip gateway if choice was made in the last 24 hours
    if (gatewayChoice === 'entered' && gatewayTimestamp && 
        (Date.now() - parseInt(gatewayTimestamp)) < 86400000) {
      setShowGateway(false);
      if (savedUserType) {
        setUserType(savedUserType);
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {showGateway ? (
        <ThresholdGate onEnterSite={(type) => {
          setUserType(type);
          setShowGateway(false);
        }} />
      ) : (
        <Home />
      )}
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
