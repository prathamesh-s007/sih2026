import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import RiskMap from './pages/RiskMap';
import EnvironmentalMonitoring from './pages/EnvironmentalMonitoring';
import AIPrediction from './pages/AIPrediction';
import RiskAnalysis from './pages/RiskAnalysis';
import Alerts from './pages/Alerts';
import AuthorityResponse from './pages/AuthorityResponse';
import HistoricalData from './pages/HistoricalData';
import DataPipeline from './pages/DataPipeline';
import Simulation from './pages/Simulation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="map" element={<RiskMap />} />
          <Route path="monitoring" element={<EnvironmentalMonitoring />} />
          <Route path="prediction" element={<AIPrediction />} />
          <Route path="analysis" element={<RiskAnalysis />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="authority" element={<AuthorityResponse />} />
          <Route path="historical" element={<HistoricalData />} />
          <Route path="pipeline" element={<DataPipeline />} />
          <Route path="simulation" element={<Simulation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
