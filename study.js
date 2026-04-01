document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('study-file');
    const filePreview = document.getElementById('file-preview');
    const generateBtn = document.getElementById('generate-btn');
    const subjectInput = document.getElementById('subject-input');
    const apiKeyInput = document.getElementById('api-key-input');
    const loader = document.getElementById('loader');

    let fileContent = "";

    const savedKey = localStorage.getItem('groqApiKey');
    if (savedKey) {
        apiKeyInput.value = savedKey;
    }

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.name.endsWith('.txt')) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                fileContent = evt.target.result;
                filePreview.value = fileContent.substring(0, 100) + '...';
                filePreview.style.display = 'block';
                generateBtn.disabled = false;
            };
            reader.readAsText(file);
        } else {
            alert("Please upload a valid .txt file");
            generateBtn.disabled = true;
            filePreview.style.display = 'none';
        }
    });

    generateBtn.addEventListener('click', async () => {
        const subject = subjectInput.value.trim();
        const apiKey = apiKeyInput.value.trim();

        if (!subject || !apiKey || !fileContent) {
            alert("Subject, API Key, and a File are required.");
            return;
        }

        localStorage.setItem('groqApiKey', apiKey);

        generateBtn.disabled = true;
        loader.style.display = 'block';

        const prompt = `You are an educational assistant. 
Given the following study material about ${subject}, generate exactly 5 short-answer questions. 
Return strictly a JSON array of strings only.

Material:
${fileContent.substring(0, 10000)}`;

        try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + apiKey
                },
                body: JSON.stringify({
                    model: "llama3-70b-8192",
                    messages: [{ role: "user", content: prompt }]
                })
            });

            if (!response.ok) {
                throw new Error("API Request Failed");
            }

            const data = await response.json();
            const textContent = data.choices[0].message.content;

            const jsonStart = textContent.indexOf('[');
            const jsonEnd = textContent.lastIndexOf(']') + 1;

            const questionsArray = JSON.parse(textContent.slice(jsonStart, jsonEnd));

            localStorage.setItem('studyQuestions', JSON.stringify(questionsArray));

            window.location.href = 'speech.html';

        } catch (error) {
            console.error(error);
            alert("Error generating questions: " + error.message);
            generateBtn.disabled = false;
            loader.style.display = 'none';
        }
    });
});

