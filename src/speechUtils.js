import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';

const SPEECH_KEY = "FCft9MMuWWGKpr0ToYOSZM2dFfyEr3mgQAPWeJ68TWKOEtTUxCfeJQQJ99BGACGhslBXJ3w3AAAYACOGh8dM";
const REGION = "centralindia"; // e.g. centralindia

export const recognizeSpeech = () => {
  return new Promise((resolve, reject) => {
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(SPEECH_KEY, REGION);
    speechConfig.speechRecognitionLanguage = "en-IN";

    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync(result => {
      if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
        resolve(result.text);
      } else {
        reject("Speech not recognized.");
      }
    });
  });
};

export const speakText = (text) => {
  const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(SPEECH_KEY, REGION);
  const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
  const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);

  synthesizer.speakTextAsync(text);
};
