import { create } from 'zustand';
import { initialLocations, calculateRisk } from '../services/api';

const useSimulationStore = create((set, get) => ({
  locations: initialLocations,
  alerts: [],
  isOffline: false,
  
  setOfflineMode: (status) => set({ isOffline: status }),

  // Simulates an extreme rainfall event
  simulateExtremeRainfall: (locationId) => {
    set((state) => {
      const newLocations = state.locations.map(loc => {
        if (loc.id === locationId) {
          // Increase rainfall and soil moisture drastically
          const newRainfall = loc.rainfall + 60; // e.g. 85 -> 145
          const newSoilMoisture = loc.soil_moisture + 24; // e.g. 52 -> 76
          
          const tempLoc = { ...loc, rainfall: newRainfall, soil_moisture: newSoilMoisture };
          const riskUpdates = calculateRisk(tempLoc);
          
          return {
            ...tempLoc,
            ...riskUpdates,
            last_updated: new Date().toISOString()
          };
        }
        return loc;
      });

      // Generate alert if any location crosses to HIGH or CRITICAL
      const newAlerts = [...state.alerts];
      const updatedLoc = newLocations.find(l => l.id === locationId);
      
      if (updatedLoc && (updatedLoc.risk_category === 'HIGH' || updatedLoc.risk_category === 'CRITICAL')) {
        newAlerts.unshift({
          id: `alert-${Date.now()}`,
          locationId: updatedLoc.id,
          locationName: updatedLoc.location,
          district: updatedLoc.district,
          riskScore: updatedLoc.risk_score,
          probability: Math.round(updatedLoc.landslide_probability * 100),
          category: updatedLoc.risk_category,
          reason: "Heavy rainfall + high soil moisture + steep terrain",
          timestamp: new Date().toISOString(),
          status: "Active",
        });
      }

      return { locations: newLocations, alerts: newAlerts };
    });
  },

  resetSimulation: () => set({ locations: initialLocations, alerts: [] }),

  acknowledgeAlert: (alertId) => {
    set((state) => ({
      alerts: state.alerts.map(a => 
        a.id === alertId ? { ...a, status: "Acknowledged" } : a
      )
    }));
  }
}));

export default useSimulationStore;
