document.addEventListener('DOMContentLoaded', () => {

    const fileInput = document.getElementById('study-file');
    const generateBtn = document.getElementById('start-session-btn');
    const subjectInput = document.getElementById('study-subject');
    const cafeSelect = document.getElementById('cafe-select');

    let fileContent = "";

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.name.endsWith('.txt')) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                fileContent = evt.target.result;
            };
            reader.readAsText(file);
        } else {
            alert("Upload a valid .txt file");
        }
    });

    generateBtn.addEventListener('click', async () => {

        const subject = subjectInput.value.trim();
        const cafe = cafeSelect.value;

        if (!subject || !fileContent || !cafe) {
            alert("Fill all fields!");
            return;
        }

        localStorage.setItem("selectedCafe", cafe);
        localStorage.setItem("studySubject", subject);

        const prompt = `You are an educational assistant.
Generate exactly 5 short-answer questions from the material below.
Return ONLY a JSON array of strings.

Material:
${fileContent.substring(0, 10000)}`;

        try {
            const response = await fetch('/api/groq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        { role: "user", content: prompt }
                    ]
                })
            });

            if (!response.ok) {
                const errText = await response.text();
                console.error("API ERROR:", errText);
                alert("API request failed. Check console.");
                return;
            }

            const data = await response.json();
            console.log("FULL RESPONSE:", data);

            if (!data.choices || !data.choices[0]) {
                alert("Invalid API response");
                return;
            }

            const text = data.choices[0].message.content;

            let questions;
            try {
                const start = text.indexOf('[');
                const end = text.lastIndexOf(']') + 1;

                if (start === -1 || end === -1) {
                    throw new Error("No JSON array found");
                }

                questions = JSON.parse(text.slice(start, end));
            } catch (err) {
                console.error("Parsing failed:", text);
                alert("Failed to parse questions. Check console.");
                return;
            }

            localStorage.setItem('studyQuestions', JSON.stringify(questions));
            localStorage.setItem('studyNotes', fileContent);

            window.location.href = "speech.html";

        } catch (e) {
            console.error("Fetch failed:", e);
            alert("Something went wrong. Check console.");
        }
    });

});
