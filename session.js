// ==========================
// TOPIC CONTEXT
// ==========================

const topic = localStorage.getItem("topic") || "general";

const topicMap = {
  dsa: {
    keywords: ["array", "stack", "queue", "search", "sort", "tree", "graph"],
    questions: [
      "Explain in detail",
      "What is the time complexity?",
      "Why use this data structure?",
      "Can you explain this step by step?",
      "Is there a better approach?"
    ]
  },

  os: {
    keywords: ["process", "thread", "deadlock", "memory", "cpu"],
    questions: [
      "How does the OS manage this?",
      "What happens if this fails?",
      "Why is this needed?",
      "Give a real-world example"
    ]
  },

  photosynthesis: {
    keywords: ["chlorophyll", "sunlight", "carbon", "oxygen", "glucose"],
    questions: [
      "Where does this happen?",
      "Why is sunlight important?",
      "What are the inputs?",
      "Explain this simply"
    ]
  },

  general: {
    keywords: ["so", "hence"],
    questions: [
      "Can you explain that in simpler words?",
      "Why does this work?",
      "Give an example",
      "Go on…"
    ]
  }
};

const activeTopic = topicMap[topic] || topicMap.general;

// ==========================
// INTERRUPTION STATE
// ==========================

const usedKeywords = {};
const usedQuestions = {};
let lastInterruptTime = 0;
const COOLDOWN_TIME = 6000; // 6 seconds

// ==========================
// BACKGROUND VIDEO
// ==========================

const vibe = localStorage.getItem("vibe");
const video = document.getElementById("bgVideo");
const source = document.getElementById("videoSource");

let videoPath = "videos/starlit.mp4";

if (vibe === "summer") videoPath = "videos/summer.mp4";
if (vibe === "spring") videoPath = "videos/spring.mp4";
if (vibe === "autumn") videoPath = "videos/autumn.mp4";
if (vibe === "winter") videoPath = "videos/winter.mp4";

source.src = videoPath;
video.load();
video.play().catch(() => console.log("Autoplay blocked"));

// ==========================
// SPEECH RECOGNITION
// ==========================

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const speechText = document.getElementById("speechText");
const interruptionsDiv = document.getElementById("interruptions");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

let finalTranscript = "";

// ==========================
// START / STOP
// ==========================

startBtn.onclick = () => {
  try {
    recognition.start();
    speechText.innerText = "🎙️ Listening...";
  } catch {
    console.log("Already listening");
  }
};

stopBtn.onclick = () => {
  recognition.stop();
  speechText.innerText += "\n\n⏹️ Stopped listening.";
};

// ==========================
// LIVE TRANSCRIPTION
// ==========================

recognition.onresult = (event) => {
  let interim = "";

  for (let i = event.resultIndex; i < event.results.length; i++) {
    const text = event.results[i][0].transcript.toLowerCase();

    if (event.results[i].isFinal) {
      finalTranscript += text + " ";
      detectKeywords(text); // 👈 ONLY when user finishes speaking
    } else {
      interim += text;
    }
  }

  speechText.innerText = finalTranscript + interim;
};

// ==========================
// KEYWORD → INTERRUPTION
// ==========================

function detectKeywords(text) {
  const now = Date.now();

  if (now - lastInterruptTime < COOLDOWN_TIME) return;

  for (let word of activeTopic.keywords) {
    if (text.includes(word) && !usedKeywords[word]) {
      usedKeywords[word] = true;
      lastInterruptTime = now;
      showContextQuestion();
      break;
    }
  }
}

// ==========================
// INTERRUPTION BUBBLE
// ==========================

function showContextQuestion() {
  const available = activeTopic.questions.filter(
    q => !usedQuestions[q]
  );

  if (available.length === 0) return;

  const question =
    available[Math.floor(Math.random() * available.length)];

  usedQuestions[question] = true;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerText = question;

  interruptionsDiv.appendChild(bubble);

  setTimeout(() => bubble.remove(), 4000);
}

// ==========================
// ERROR HANDLING
// ==========================

recognition.onerror = (event) => {
  speechText.innerText = "Error: " + event.error;
};

