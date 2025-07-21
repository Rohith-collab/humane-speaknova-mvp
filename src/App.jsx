import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import VoiceBot from './pages/VoiceBot';
import StoryTeller from './pages/StoryTeller';
import AzureGPTBot from './pages/AzureGPTBot';
import Module from './pages/Moduel';
import InterviewBot from './pages/Modules/InterviewBot';
import ShoppingBot from './pages/Modules/ShoppingBot';
import RestaurantBot from './pages/Modules/RestaurantBot';

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
        <Route path="/Module" element={<Module />} />
        <Route path="/InterviewBot" element={<InterviewBot />} />
        <Route path="/ShoppingBot" element={<ShoppingBot />} />
        <Route path="/RestaurantBot" element={<RestaurantBot/>} />
      </Routes>
    </BrowserRouter>
  );
  

}

export default App;
