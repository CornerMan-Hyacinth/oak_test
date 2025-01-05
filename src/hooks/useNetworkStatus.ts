import axios from "axios";
import { useState, useEffect } from "react";

interface NetworkStatus {
  isOnline: boolean;
  connectionQuality: "good" | "poor" | "unknown";
  latency: number;
}

export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isOnline: true,
    connectionQuality: "unknown",
    latency: 0,
  });

  useEffect(() => {
    const checkLatency = async () => {
      const startTime = performance.now();
      try {
        await axios.get("/api/ping", { method: "HEAD" });
        const latency = performance.now() - startTime;

        setNetworkStatus((prev) => ({
          ...prev,
          latency,
          connectionQuality: latency > 1000 ? "poor" : "good",
        }));
      } catch (error) {
        setNetworkStatus((prev) => ({
          ...prev,
          connectionQuality: "poor",
          latency: 0,
        }));
      }
    };

    const handleOnline = () => {
      setNetworkStatus((prev) => ({ ...prev, isOnline: true }));
    };

    const handleOffline = () => {
      setNetworkStatus((prev) => ({ ...prev, isOnline: false }));
    };

    // Check initial status
    checkLatency();

    // Set up periodic checks
    const intervalId = setInterval(checkLatency, 30000); // Check every 30 seconds

    // Add event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return networkStatus;
};
