const storyContainer = document.getElementById("story-container");
const typingSound = new Audio("typing.wav");
typingSound.volume = 0.3;
typingSound.loop = true;

let storyHistory = [];

const genre = sessionStorage.getItem("genre")?.toLowerCase();
const character = sessionStorage.getItem("character");
const style = sessionStorage.getItem("style");


if (genre) {
  document.body.classList.add(genre);
}


if (!genre || !character || !style) {
    storyContainer.innerHTML = "<p>⚠️ Missing story setup. Please go back to the start page.</p>";
} 
else {
    startStory();
}

async function startStory() {
    storyContainer.innerHTML = "<p>✨ Generating story...</p>";

    const combinedPrompt = `
        Give me an enchanting story title and the first segment of a ${style} ${genre} story 
        featuring a ${character}. Write the title on the first line, then a blank line, 
        then the first story segment. End the segment with four labeled choices: A), B), C), D).
        `;

    const response = await generateStory(combinedPrompt);
    const [titleLine, , ...rest] = response.split('\n');
    const storyText = rest.join('\n');

    storyHistory.push({ role: "user", content: combinedPrompt });
    storyHistory.push({ role: "model", content: response });

    const titleEl = document.createElement("h2");
    titleEl.className = "story-title";
    titleEl.textContent = titleLine.trim();
    storyContainer.innerHTML = "";
    storyContainer.appendChild(titleEl);
    scrollToBottom();

    addStorySegment(storyText);
}


async function generateStory(prompt) {
    const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, history: storyHistory })
    });

    const data = await response.json();
    if (!response.ok || !data.story) {
        throw new Error("Failed to load story from Gemini.");
    }

    return data.story;
}

function addStorySegment(text) {
    let displayText = ""
    const storyEl = document.createElement("div");
    storyEl.className = "story-segment";

    const storyText = document.createElement("p");
    storyEl.appendChild(storyText);
    storyContainer.appendChild(storyEl);
    scrollToBottom();

    let i = 0;
    typingSound.play();
    const interval = setInterval(() => {
        if (i < text.length) {
        displayText += text[i] === "\n" ? "<br>" : text[i];
        storyText.innerHTML = formatMarkdown(displayText);
        i++;
        scrollToBottom();
        } else {
        clearInterval(interval);
        typingSound.pause();
        addTextInputBox();
        }
    }, 10);
}

function formatMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br>");
}


function scrollToBottom() {
    storyContainer.scrollTop = storyContainer.scrollHeight;
}

function addTextInputBox() {
    const inputDiv = document.createElement("div");
    inputDiv.className = "input-area";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Type A/B/C/D or anything you want...";
    input.className = "user-input";

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    submitBtn.className = "submit-button";

    submitBtn.addEventListener("click", async () => {
        const userInput = input.value.trim();
        if (!userInput) return;

        inputDiv.remove();
        addUserChoiceLine(userInput);

        const userPrompt = `Based on the user's response: "${userInput}", continue the interactive story.
        Maintain the same tone, characters, and style. If the story is near its end, conclude it naturally.
        Otherwise, end the segment with four distinct choices labeled A), B), C), and D).
        End the story clearly with the line: "The End." when it concludes. and do not include "*" this in the generated story `;

        storyHistory.push({ role: "user", content: userPrompt });

        const nextPart = await generateStory(userPrompt);
        storyHistory.push({ role: "model", content: nextPart });

        addStorySegment(nextPart);
    });

    inputDiv.appendChild(input);
    inputDiv.appendChild(submitBtn);
    storyContainer.appendChild(inputDiv);
    scrollToBottom();
}

function addUserChoiceLine(userInput) {
    const choiceLine = document.createElement("p");
    choiceLine.className = "user-choice";
    choiceLine.textContent = `You chose: ${userInput}`;
    storyContainer.appendChild(choiceLine);
    scrollToBottom();
}