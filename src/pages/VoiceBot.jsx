import React, { useEffect, useState } from 'react';
import { recognizeSpeech, speakText } from '../speechUtils';
import Avatar from '../components/Avatar';
import Sentiment from 'sentiment';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { DirectLine } from 'botframework-directlinejs';
import { correctGrammar } from '../grammarUtils';
import { assessPronunciation } from '../pronunciation';

const sentiment = new Sentiment();

// 🔐 Your Direct Line secret from Azure Bot Channels
const directLine = new DirectLine({
  secret: '4aXIPMfTMTKKayoPIxIAbTfH3X5LAZGTNUXb6Y5MPMPVuBBx22WFJQQJ99BGAC77bzfXJ3w3AAABACOG8zZ5'
});

export default function VoiceBot() {
  const [transcript, setTranscript] = useState('');
  const [reply, setReply] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [emotion, setEmotion] = useState('neutral');
  const [typedText, setTypedText] = useState('');

  // 🔁 Listen for replies from Microsoft Bot
  useEffect(() => {
    const subscription = directLine.activity$.subscribe(activity => {
      if (activity.type === 'message' && activity.from.role === 'bot') {
        const botReply = activity.text;
        setReply(botReply);
        speakText(botReply);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // ✅ Unified input handler
  const handleInput = async (userSpeech) => {
    try {
      setSpeaking(true);
      setTranscript(userSpeech);

      // 🔍 Emotion
      const moodScore = sentiment.analyze(userSpeech).score;
      let detectedEmotion = 'neutral';
      if (moodScore > 2) detectedEmotion = 'happy';
      else if (moodScore < -2) detectedEmotion = 'sad';
      setEmotion(detectedEmotion);

      // ✅ Grammar correction
      const grammarResult = await correctGrammar(userSpeech);
      const grammarFix = grammarResult.corrected;
      const explanation = grammarResult.explanations
        .map(e => `📝 ${e.error} → Suggest: ${e.suggestion}`)
        .join("\n");

      // ✅ Pronunciation assessment
      const result = await assessPronunciation(userSpeech);
      const accuracy = result?.NBest?.[0]?.PronunciationAssessment?.AccuracyScore || 0;
      const misWords = result?.NBest?.[0]?.Words?.filter(w => w.PronunciationAssessment.ErrorType !== "None") || [];

      // ✅ Send to Microsoft Bot
      directLine.postActivity({
        from: { id: 'user1', name: 'User' },
        type: 'message',
        text: userSpeech
      }).subscribe(
        id => console.log("✅ Sent to Microsoft Bot:", id),
        error => console.error("❌ Bot error:", error)
      );

      const botReply = `✅ Grammar Fix: ${grammarFix}
📘 Explanation: ${explanation}
🎯 Pronunciation Score: ${accuracy}
🔍 Mispronounced Words: ${misWords.map(w => w.Word).join(", ") || "None"}
😊 Emotion: ${detectedEmotion}`;

      setReply(botReply);
      speakText(botReply);
      setSpeaking(false);

      // ✅ Save to Firestore
      await addDoc(collection(db, "sessions"), {
        text: userSpeech,
        correction: grammarFix,
        pronunciationScore: accuracy,
        mispronounced: misWords.map(w => w.Word),
        emotion: detectedEmotion,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      alert("Error: " + err.message);
      setSpeaking(false);
    }
  };

  const handleVoiceInput = async () => {
    const userSpeech = await recognizeSpeech();
    await handleInput(userSpeech);
  };

  const handleTextSubmit = () => {
    if (typedText.trim()) {
      handleInput(typedText);
      setTypedText('');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🎤 Angilam – Bot</h2>
      <Avatar speaking={speaking} />

      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <button onClick={handleVoiceInput}>🎙 Speak</button>
        <input
          type="text"
          value={typedText}
          onChange={(e) => setTypedText(e.target.value)}
          placeholder="Or type here..."
          style={{ flex: 1, padding: '6px 10px' }}
        />
        <button onClick={handleTextSubmit}>Submit</button>
      </div>

      <p><strong>You said:</strong> {transcript}</p>
      <p><strong>Bot says:</strong> {reply}</p>
    </div>
  );
}
