import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import VoiceBot from './pages/VoiceBot';
import StoryTeller from './pages/StoryTeller';
import AzureGPTBot from './pages/AzureGPTBot';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/voicebot" element={<VoiceBot />} />
        <Route path="/story" element={<StoryTeller />} />
        <Route path="/Angilambot" element={<AzureGPTBot />} />
      </Routes>
    </BrowserRouter>
  );
  

}

export default App;
