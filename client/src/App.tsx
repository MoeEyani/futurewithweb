import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useContext, useEffect } from "react";
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
  const [location] = useLocation();

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

  return (
    <QueryClientProvider client={queryClient}>
      {showGateway && location === "/" ? (
        <ThresholdGate />
      ) : (
        <Router />
      )}
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
