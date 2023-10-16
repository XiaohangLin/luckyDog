const ELEVENLABS_API_KEY = "02041a45595020cae9250051fdd027e4";
const audioPlayer = document.getElementById("my-audio");
const API_URL_11 = "https://api.elevenlabs.io/v1/text-to-speech/TxGEqnHWrfWFTfGW9XjX";
const API_URL_12 = "https://api.elevenlabs.io/v1/text-to-speech/ErXwobaYiN019PkySvjV";




async function sendTextToSpeech_coolguy(text) {
  const response = await fetch(API_URL_12, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": ELEVENLABS_API_KEY,
      "accept": "audio/mpeg"
    },
    body: JSON.stringify({
      "text": text,
      "voice_settings": {
        "stability": 0,
        "similarity_boost": 0
      }
    })
  });

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  audioPlayer.src = url;
  audioPlayer.play();

}
