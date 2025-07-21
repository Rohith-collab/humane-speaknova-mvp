
  // src/pronunciation.js
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

export async function assessPronunciation(text) {
  const subscriptionKey = "FCft9MMuWWGKpr0ToYOSZM2dFfyEr3mgQAPWeJ68TWKOEtTUxCfeJQQJ99BGACGhslBXJ3w3AAAYACOGh8dM";
  const region = "centralindia";

  const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, region);
  speechConfig.speechRecognitionLanguage = 'en-US';

  const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();

  // Pronunciation assessment config
  const pronunciationConfig = new sdk.PronunciationAssessmentConfig(
    text,
    sdk.PronunciationAssessmentGradingSystem.HundredMark,
    sdk.PronunciationAssessmentGranularity.Word,
    true
  );

  const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
  pronunciationConfig.applyTo(recognizer);

  return new Promise((resolve, reject) => {
    recognizer.recognizeOnceAsync(
      (result) => {
        if (result.reason === sdk.ResultReason.RecognizedSpeech) {
          const json = JSON.parse(result.properties.getProperty(sdk.PropertyId.SpeechServiceResponse_JsonResult));
          resolve(json);
        } else {
          reject('Speech not recognized properly.');
        }
      },
      (err) => {
        reject(err);
      }
    );
  });
}
