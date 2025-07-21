
import React, { useState } from 'react';
import { recognizeSpeech, speakText } from '../../speechUtils';
import Avatar from '../../components/Avatar';
import { db } from '../../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
// import './AzureGPTBot.css';


function InterviewBot() {
  const [transcript, setTranscript] = useState('');
  const [reply, setReply] = useState('');
  const [typedText, setTypedText] = useState('');
  const [speaking, setSpeaking] = useState(false);

  const getGPTReply = async (userInput) => {
  try {
    const response = await fetch(
      'https://yogar-mcyatzzl-eastus2.services.ai.azure.com/openai/deployments/gpt-4.1-mini/chat/completions?api-version=2023-07-01-preview',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': 'A8JgTwbZlu9NaV4GHr33zkdjYf9GDtrLQwnHtHdlYtoOG4HCYlTSJQQJ99BGACHYHv6XJ3w3AAAAACOGRv2n' // Replace with your Azure key
        },
        body: JSON.stringify({
          messages: [
            {
  role: 'system',
  content: `you are a bot just reply in single line of single sentence`
},
            { role: 'user', content: userInput }
          ],
          temperature: 0.7,
          max_tokens: 800
        })
      }
    );

    const data = await response.json();
    console.log("Raw Azure Response:", data); // helpful for debugging
    return (data.choices?.[0]?.message?.content || 'No response from bot.').trim();
  } catch (err) {
    console.error('Azure OpenAI Error:', err);
    return 'Sorry, I could not process that.';
  }
};
const typeReply = (text) => {
  let i = 0;
  setReply(''); // reset visual typing

  const interval = setInterval(() => {
    if (i < text.length) {
      setReply(prev => prev + text[i]);
      i++;
    } else {
      clearInterval(interval);
    }
  }, 30);
};




  const handleInput = async (inputText) => {
    setTranscript(inputText);
    const botResponse = await getGPTReply(inputText);
    setReply(botResponse);
    speakText(botResponse);

    await addDoc(collection(db, 'sessions'), {
      text: inputText,
      response: botResponse,
      createdAt: serverTimestamp()
    });
  };

  const handleVoiceInput = async () => {
    setSpeaking(true);
    const spokenText = await recognizeSpeech();
    await handleInput(spokenText);
    setSpeaking(false);
  };

  const handleTextSubmit = async () => {
    if (typedText.trim()) {
      setSpeaking(true);
      await handleInput(typedText);
      setTypedText('');
      setSpeaking(false);
    }
  };

  return (
  <div className="bot-container">
    <h2 className="bot-title">🎤 Angilam – English Bot</h2>

    <div className="bot-avatar">
      <Avatar speaking={speaking} />
    </div>

    <div className="bot-response-bubble">
      {reply && (
        <>
          <div className="thought-bubble">
            <p>{reply}</p>
          </div>
        </>
      )}
    </div>

    <div className="bot-you-said">
      {transcript && (
        <p><strong>You said:</strong> {transcript}</p>
      )}
    </div>

    <div className="chat-input-bar">
      <button onClick={handleVoiceInput}>🎙</button>
      <input
        type="text"
        value={typedText}
        onChange={(e) => setTypedText(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleTextSubmit}>Send</button>
    </div>
  </div>
);

}

export default InterviewBot;
