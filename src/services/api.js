export const initialLocations = [
  {
    id: "loc-1",
    location: "Aizawl",
    state: "Mizoram",
    district: "Aizawl District",
    latitude: 23.7271,
    longitude: 92.7176,
    rainfall: 85, // mm
    soil_moisture: 52, // %
    slope: 34, // degrees
    elevation: 1132, // meters
    temperature: 24, // C
    historical_events: 12,
    satellite_indicator: 0.4,
    sensor_status: "Online",
    landslide_probability: 0.48,
    risk_score: 48,
    risk_category: "MODERATE",
    last_updated: new Date().toISOString(),
  },
  {
    id: "loc-2",
    location: "Gangtok",
    state: "Sikkim",
    district: "East Sikkim",
    latitude: 27.3314,
    longitude: 88.6138,
    rainfall: 120,
    soil_moisture: 65,
    slope: 42,
    elevation: 1650,
    temperature: 18,
    historical_events: 25,
    satellite_indicator: 0.6,
    sensor_status: "Online",
    landslide_probability: 0.65,
    risk_score: 65,
    risk_category: "HIGH",
    last_updated: new Date().toISOString(),
  },
  {
    id: "loc-3",
    location: "Shillong",
    state: "Meghalaya",
    district: "East Khasi Hills",
    latitude: 25.5788,
    longitude: 91.8933,
    rainfall: 45,
    soil_moisture: 30,
    slope: 20,
    elevation: 1525,
    temperature: 22,
    historical_events: 5,
    satellite_indicator: 0.2,
    sensor_status: "Online",
    landslide_probability: 0.20,
    risk_score: 20,
    risk_category: "LOW",
    last_updated: new Date().toISOString(),
  },
  {
    id: "loc-4",
    location: "Kohima",
    state: "Nagaland",
    district: "Kohima District",
    latitude: 25.6701,
    longitude: 94.1077,
    rainfall: 155,
    soil_moisture: 80,
    slope: 45,
    elevation: 1444,
    temperature: 20,
    historical_events: 18,
    satellite_indicator: 0.8,
    sensor_status: "Warning",
    landslide_probability: 0.85,
    risk_score: 85,
    risk_category: "CRITICAL",
    last_updated: new Date().toISOString(),
  },
  {
    id: "loc-5",
    location: "Imphal",
    state: "Manipur",
    district: "Imphal West",
    latitude: 24.8170,
    longitude: 93.9368,
    rainfall: 60,
    soil_moisture: 40,
    slope: 15,
    elevation: 786,
    temperature: 26,
    historical_events: 3,
    satellite_indicator: 0.3,
    sensor_status: "Online",
    landslide_probability: 0.30,
    risk_score: 30,
    risk_category: "MODERATE",
    last_updated: new Date().toISOString(),
  },
  {
    id: "loc-6",
    location: "Itanagar",
    state: "Arunachal Pradesh",
    district: "Papum Pare",
    latitude: 27.0844,
    longitude: 93.6053,
    rainfall: 95,
    soil_moisture: 58,
    slope: 30,
    elevation: 440,
    temperature: 25,
    historical_events: 8,
    satellite_indicator: 0.5,
    sensor_status: "Online",
    landslide_probability: 0.52,
    risk_score: 52,
    risk_category: "HIGH",
    last_updated: new Date().toISOString(),
  },
  {
    id: "loc-7",
    location: "Guwahati",
    state: "Assam",
    district: "Kamrup Metropolitan",
    latitude: 26.1445,
    longitude: 91.7362,
    rainfall: 30,
    soil_moisture: 25,
    slope: 10,
    elevation: 55,
    temperature: 30,
    historical_events: 2,
    satellite_indicator: 0.1,
    sensor_status: "Online",
    landslide_probability: 0.15,
    risk_score: 15,
    risk_category: "LOW",
    last_updated: new Date().toISOString(),
  },
  {
    id: "loc-8",
    location: "Agartala",
    state: "Tripura",
    district: "West Tripura",
    latitude: 23.8315,
    longitude: 91.2868,
    rainfall: 40,
    soil_moisture: 35,
    slope: 5,
    elevation: 15,
    temperature: 28,
    historical_events: 1,
    satellite_indicator: 0.1,
    sensor_status: "Offline",
    landslide_probability: 0.18,
    risk_score: 18,
    risk_category: "LOW",
    last_updated: new Date().toISOString(),
  }
];

// Helper to determine category
export const getRiskCategory = (score) => {
  if (score <= 25) return "LOW";
  if (score <= 50) return "MODERATE";
  if (score <= 75) return "HIGH";
  return "CRITICAL";
};

// Mock ML Prediction Calculation based on parameters
export const calculateRisk = (loc) => {
  let score = 0;
  
  // Rainfall contribution (0-30 points)
  score += Math.min(30, (loc.rainfall / 200) * 30);
  
  // Soil Moisture contribution (0-25 points)
  score += Math.min(25, (loc.soil_moisture / 100) * 25);
  
  // Slope contribution (0-20 points)
  score += Math.min(20, (loc.slope / 60) * 20);
  
  // Historical events (0-15 points)
  score += Math.min(15, (loc.historical_events / 30) * 15);
  
  // Satellite indicator (0-10 points)
  score += Math.min(10, loc.satellite_indicator * 10);

  const finalScore = Math.round(score);
  
  return {
    risk_score: finalScore,
    landslide_probability: finalScore / 100,
    risk_category: getRiskCategory(finalScore)
  };
};

export const fetchLocations = async () => {
  return new Promise(resolve => setTimeout(() => resolve(initialLocations), 500));
};

export const fetchHistoricalData = async () => {
  return new Promise(resolve => setTimeout(() => resolve([
    { month: "Jan", rainfall: 20, landslides: 0, alerts: 0 },
    { month: "Feb", rainfall: 30, landslides: 0, alerts: 0 },
    { month: "Mar", rainfall: 45, landslides: 1, alerts: 1 },
    { month: "Apr", rainfall: 80, landslides: 2, alerts: 3 },
    { month: "May", rainfall: 150, landslides: 5, alerts: 8 },
    { month: "Jun", rainfall: 280, landslides: 12, alerts: 15 },
    { month: "Jul", rainfall: 320, landslides: 18, alerts: 22 },
    { month: "Aug", rainfall: 250, landslides: 10, alerts: 12 },
    { month: "Sep", rainfall: 180, landslides: 6, alerts: 7 },
    { month: "Oct", rainfall: 90, landslides: 2, alerts: 2 },
    { month: "Nov", rainfall: 40, landslides: 0, alerts: 0 },
    { month: "Dec", rainfall: 15, landslides: 0, alerts: 0 },
  ]), 500));
};

export const fetchSensorHistory = async () => {
  return new Promise(resolve => {
    const data = [];
    let baseRainfall = 10;
    let baseMoisture = 30;
    
    for (let i = 30; i > 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Simulate a storm event in the middle of the month
      if (i > 10 && i < 15) {
        baseRainfall += Math.random() * 50;
        baseMoisture += Math.random() * 10;
      } else {
        baseRainfall = Math.max(0, baseRainfall - Math.random() * 20 + 5);
        baseMoisture = Math.max(20, baseMoisture - Math.random() * 5 + 2);
      }
      
      // Calculate risk based on mocked sensors
      let risk = (baseRainfall * 0.3) + (baseMoisture * 0.4);
      risk = Math.min(100, Math.round(risk));
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        rainfall: Math.round(baseRainfall),
        moisture: Math.round(baseMoisture),
        riskScore: risk
      });
    }
    
    setTimeout(() => resolve(data), 500);
  });
};

export const fetchYearlyData = async () => {
  return new Promise(resolve => setTimeout(() => resolve([
    { year: "2020", rainfall: 1500, landslides: 15, alerts: 18 },
    { year: "2021", rainfall: 1800, landslides: 24, alerts: 30 },
    { year: "2022", rainfall: 1300, landslides: 10, alerts: 12 },
    { year: "2023", rainfall: 2200, landslides: 35, alerts: 45 },
    { year: "2024", rainfall: 2000, landslides: 28, alerts: 35 },
    { year: "2025", rainfall: 1900, landslides: 22, alerts: 28 },
    { year: "2026", rainfall: 1200, landslides: 14, alerts: 16 }, // Current year partial
  ]), 500));
};
