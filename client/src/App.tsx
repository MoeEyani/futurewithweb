import { Route, Switch, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./context/AppContext";
import ThresholdGate from "./components/ThresholdGate";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { showGateway, setShowGateway } = useContext(AppContext);
  const [location, setLocation] = useLocation();
  const [forceUpdate, setForceUpdate] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Determine initial state on mount
  useEffect(() => {
    // Check if user has already made a choice in the last 24 hours
    const gatewayChoice = localStorage.getItem('gatewayChoice');
    const gatewayTimestamp = localStorage.getItem('gatewayTimestamp');
    
    // Skip gateway if choice was made in the last 24 hours
    if (gatewayChoice === 'entered' && gatewayTimestamp && 
        (Date.now() - parseInt(gatewayTimestamp)) < 86400000) {
      setShowGateway(false);
    }
    
    setIsReady(true);
  }, [setShowGateway]);

  // Force re-render when showGateway changes
  useEffect(() => {
    if (!showGateway && isReady) {
      // Force a re-render after showGateway is set to false
      setForceUpdate(prev => prev + 1);
      console.log("Gateway closed, navigating to home page");
      
      // Force navigation to home - since we're not using wouter's navigate, use direct browser navigation
      if (location !== "/") {
        window.location.href = "/";
      } else {
        // If we're already at root, force a refresh
        window.location.reload();
      }
    }
  }, [showGateway, isReady, location]);

  // This key forces the Router component to completely re-mount when showGateway changes
  return (
    <QueryClientProvider client={queryClient}>
      {showGateway ? (
        <ThresholdGate key="threshold-gate" />
      ) : (
        <Router key={`router-${forceUpdate}`} />
      )}
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
