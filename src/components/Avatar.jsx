import React from 'react';
import Lottie from 'lottie-react';
import talkingAvatar from '../assets/talking-avatar.json'; // make sure the file exists

export default function Avatar({ speaking }) {
  return (
    <div style={{ width: 300 }}>
      <Lottie animationData={talkingAvatar} loop={speaking} />
    </div>
  );
}
