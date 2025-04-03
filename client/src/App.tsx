import { Route, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import ThresholdGate from "./components/ThresholdGate";

function App() {
  const { showGateway, setShowGateway } = useContext(AppContext);

  // Check if gateway should be shown on initial load
  useEffect(() => {
    // Check if user has already made a choice in the last 24 hours
    const gatewayChoice = localStorage.getItem('gatewayChoice');
    const gatewayTimestamp = localStorage.getItem('gatewayTimestamp');
    
    // Skip gateway if choice was made in the last 24 hours
    if (gatewayChoice === 'entered' && gatewayTimestamp && 
        (Date.now() - parseInt(gatewayTimestamp)) < 86400000) {
      setShowGateway(false);
    }
  }, [setShowGateway]);

  // Render the threshold gate first, then the main application after the user passes through
  return (
    <QueryClientProvider client={queryClient}>
      {showGateway ? (
        <ThresholdGate />
      ) : (
        <Switch>
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      )}
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
