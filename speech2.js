window.addEventListener("DOMContentLoaded", () => {
    let cafe = localStorage.getItem("selectedCafe"); 
    // Fallback if not selected
    if (!cafe) {
        cafe = "spring";
    }

    const video = document.getElementById("bg-video");
    video.src = "video/" + cafe + ".mp4";
    video.load();
    video.play().catch(err => console.log("Video play failed:", err));
});

function goBack() {
    window.location.href = "dashboard.html";
}

let recognition;
let isRecording = false;
let speechArea = document.getElementById("speech-text");
let shouldBeRecording = false;

// Audio context handling to prevent timeout on some browsers if paused
if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = function() {
        isRecording = true;
    }

    recognition.onend = function() {
        isRecording = false;
        // Auto-restart if we didn't intentionally stop it and the popup isn't active
        const popup = document.getElementById("question-popup");
        if (shouldBeRecording && (!popup.classList.contains("active"))) {
            try {
                recognition.start();
            } catch (e) {
                console.warn("Failed to restart recording", e);
            }
        }
    }

    recognition.onresult = function(event) {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        speechArea.value += transcript + " ";
        speechArea.scrollTop = speechArea.scrollHeight;
    }
} else {
    alert("Speech Recognition not supported in this browser. Please use Chrome.");
}

document.getElementById("start-mic").onclick = () => {
    shouldBeRecording = true;
    if (!isRecording && recognition) recognition.start();
}
document.getElementById("stop-mic").onclick = () => {
    shouldBeRecording = false;
    if (isRecording && recognition) recognition.stop();
}

// Logic for Questions
let questions = [];
let currentQIdx = 0;
let apiKey = localStorage.getItem('claudeApiKey');
let questionTimer;
let sessionResults = [];

// Load questions from localStorage
try {
    const stored = localStorage.getItem('studyQuestions');
    if (stored) {
        questions = JSON.parse(stored);
    }
} catch(e) {
    console.warn("Failed to load questions from localStorage", e);
}

// Validate questions exists
if (!questions || questions.length === 0) {
    console.log("No questions found via study page, generating fallback questions");
    questions = ["Explain the main concept in your own words.", "Give a concrete example of this topic."];
}

const popup = document.getElementById("question-popup");
const questionText = document.getElementById("question-text");
const answerInput = document.getElementById("answer-input");
const submitAnswer = document.getElementById("submit-answer");
const feedbackText = document.getElementById("feedback-text");

function startTimer() {
    clearInterval(questionTimer);
    questionTimer = setInterval(() => {
        showQuestion();
    }, 30000); // 30 seconds interval
}

function showQuestion() {
    if (currentQIdx >= questions.length) {
        showSummary();
        return;
    }
    
    clearInterval(questionTimer);
    
    // Pause Mic to focus on answering
    if (isRecording && recognition) {
        recognition.stop();
    }

    // Reset UI
    popup.classList.remove("correct-glow", "incorrect-glow");
    feedbackText.style.display = "none";
    feedbackText.innerText = "";
    answerInput.value = "";
    submitAnswer.disabled = false;
    submitAnswer.innerText = "Enter";

    // Show next Question
    const qStr = questions[currentQIdx];
    questionText.innerText = `Q: ${qStr}`;
    
    popup.classList.add("active");
    setTimeout(() => {
        answerInput.focus();
    }, 600);
}

submitAnswer.onclick = async () => {
    const answer = answerInput.value.trim();
    if (!answer) return;

    submitAnswer.disabled = true;
    submitAnswer.innerText = "Checking...";
    feedbackText.style.display = "block";
    feedbackText.style.color = "#9ad1ff";
    feedbackText.innerText = "Validating answer...";
    popup.classList.remove("correct-glow", "incorrect-glow");

    if (!apiKey) {
        // Fallback demo mode if no API key is set
        setTimeout(() => {
            const passed = answer.length > 5;
            handleValidationResult({ correct: passed, feedback: passed ? "Good job! (Mock API)" : "Too short. (Mock API)" }, answer);
        }, 1000);
        return;
    }

    const question = questions[currentQIdx];
    const prompt = `You are a strict but fair AI tutor testing a student. 
Question: "${question}"
Student's Answer: "${answer}"
Is the student's answer essentially correct and relevant? Briefly assess it.
Respond strictly in valid JSON format like this exactly, with no markdown code blocks outside:
{"correct": true, "feedback": "Your brief feedback here"}
If wrong, correct is false and explain why briefly.`;

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
                'anthropic-dangerously-allow-browser': 'true'
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 300,
                messages: [{ role: 'user', content: prompt }]
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error?.message || "Validation API failed");
        }

        const data = await response.json();
        const textContent = data.content[0].text;
        
        let jsonData = {};
        try {
            const startIdx = textContent.indexOf('{');
            const endIdx = textContent.lastIndexOf('}') + 1;
            jsonData = JSON.parse(textContent.slice(startIdx, endIdx));
            
            if (typeof jsonData.correct !== "boolean") {
                jsonData.correct = true; // Safe fallback
            }
        } catch (e) {
            console.error("Failed to parse JSON response", textContent);
            jsonData = { correct: true, feedback: "Unable to parse result. Assuming correct." };
        }

        handleValidationResult(jsonData, answer);
    } catch (e) {
        console.error(e);
        handleValidationResult({ correct: true, feedback: "Error validating. Passed by default." }, answer);
    }
};

function handleValidationResult({ correct, feedback }, answer) {
    if (correct) {
        popup.classList.remove("incorrect-glow");
        popup.classList.add("correct-glow");
        feedbackText.style.color = "#4CAF50";
        feedbackText.innerText = feedback || "Correct! Keep going.";
        
        // Save to session results
        sessionResults.push({
            q: questions[currentQIdx],
            a: answer,
            f: feedback || "Correct."
        });

        setTimeout(() => {
            popup.classList.remove("active", "correct-glow");
            currentQIdx++;
            if (currentQIdx >= questions.length) {
                showSummary();
            } else {
                startTimer();
                if (shouldBeRecording && !isRecording && recognition) {
                    try { recognition.start(); } catch(e){}
                }
            }
        }, 2000);
    } else {
        popup.classList.add("incorrect-glow");
        feedbackText.style.color = "#F44336";
        feedbackText.innerText = feedback || "Not quite right. Try again.";
        submitAnswer.disabled = false;
        submitAnswer.innerText = "Try Again";
        
        // Remove animation class closely after so it can shake again
        setTimeout(() => {
            popup.classList.remove("incorrect-glow");
        }, 600);
    }
}

function showSummary() {
    clearInterval(questionTimer);
    if (isRecording && recognition) recognition.stop();
    
    document.getElementById("summary-overlay").style.display = "flex";
    const content = document.getElementById("summary-content");
    content.innerHTML = "";

    sessionResults.forEach((res, i) => {
        const item = document.createElement("div");
        item.className = "summary-item";
        item.innerHTML = `
            <h4>Q${i+1}: ${res.q}</h4>
            <p><strong>Your Answer:</strong> ${res.a}</p>
            <p class="feedback"><strong>Feedback:</strong> ${res.f}</p>
        `;
        content.appendChild(item);
    });
}

if (questions.length > 0) {
    startTimer();
}
