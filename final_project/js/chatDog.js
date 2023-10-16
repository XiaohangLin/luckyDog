

class ChatBot {
  constructor() {
    this.OPENAI_API_KEY = "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";
    this.API_URL = "https://api.openai.com/v1/chat/completions";
    this.model = "gpt-3.5-turbo";
    this.chatLog = document.getElementById("chat-log");
    this.userInput = document.getElementById("user-input");
    this.sendButton = document.getElementById("send-button");
    this.initialMessage = "You are a lucky cup dog. Your name is lucky. You talk like a happy puppy. Don't say more than 50 words at a time";
    this.ELEVENLABS_API_KEY = "02041a45595020cae9250051fdd027e4";
    this.audioPlayer = document.getElementById("my-audio");
    this.API_URL_11 = "https://api.elevenlabs.io/v1/text-to-speech/TxGEqnHWrfWFTfGW9XjX";
  }

  async sendMessageToChatGPT(message, appendToLog = true) {
    const response = await fetch(this.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(
        {
        model: this.model,
        messages: [{ role: "user", content: this.initialMessage+message }],
      }),
    });
    const data = await response.json();
    const chatResponse = data.choices[0].message.content.trim();
    if (appendToLog) {
      this.appendMessageToChatLog(chatResponse, "chatbot");
      this.sendTextToSpeech(chatResponse);
      const audio = document.getElementById("my-audio");
      audio.pause();
      audio.currentTime = 0;
    }
  }
  
  appendMessageToChatLog(message, role) {
    const messageElement = document.createElement("div");
    messageElement.classList.add(role);
  
    const messageBubble = document.createElement("div");
    messageBubble.classList.add("message-bubble");
    messageBubble.classList.add("talk-bubble", "tri-right", "round");
    messageBubble.innerText = message;
  
    messageElement.appendChild(messageBubble);
    this.chatLog.appendChild(messageElement);
  }
  
  sendMessage() {
    const message = this.userInput.value.trim();
    if (message.length > 0) {
      this.appendMessageToChatLog(message, "user");
      this.userInput.value = "";
      this.sendMessageToChatGPT(message);
    }
  }

  async sendTextToSpeech(text) {
    const response = await fetch(API_URL_11, {
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
    audioPlayer.addEventListener('canplaythrough', function() {
      audioPlayer.play();
    });
  }
  

  init() {
    // send the initial message to ChatGPT on page load
    window.onload = async function () {
      await this.sendMessageToChatGPT(this.initialMessage, false);
    }.bind(this);

    // add the response to chatlog
    this.sendButton.addEventListener("click", this.sendMessage.bind(this));
  
    this.userInput.addEventListener("keydown", (event) => {
      if (event.keyCode === 13) {
        this.sendMessage();
      }
    });

    // add the initial message to chatlog on page load
    const WelcomeMessage = "I am a lucky dog. Can I help you?";
    this.appendMessageToChatLog(WelcomeMessage, "chatbot");
  }
}

const chatBot = new ChatBot();
chatBot.init();








