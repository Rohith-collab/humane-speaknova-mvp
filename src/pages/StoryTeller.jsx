// src/pages/StoryTeller.jsx
import React, { useState } from 'react';

export default function StoryTeller() {
  const [story, setStory] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateVideo = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 🔁 Simulate API response for now
    setTimeout(() => {
      // Replace this with real API call later
      setVideoUrl("https://www.w3schools.com/html/mov_bbb.mp4"); // sample video URL
      setLoading(false);
    }, 3000);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🎬 SpeakNova Story Mode</h2>
      <form onSubmit={handleGenerateVideo}>
        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Type your short story here..."
          rows={5}
          style={{ width: "100%", marginBottom: 10 }}
        />
        <button type="submit">Generate Video</button>
      </form>

      {loading && <p>⏳ Generating your AI video...</p>}

      {videoUrl && (
        <div style={{ marginTop: 20 }}>
          <h3>Your AI-Generated Story Video:</h3>
          <video width="100%" height="400" controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}
