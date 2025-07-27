const storyContainer = document.getElementById("story-container"); // Get the div element where the story will be displayed
const typingSound = new Audio("typing.wav"); // Create an Audio object for typing sound effect
typingSound.volume = 0.3; // Set the volume of the typing sound
typingSound.loop = true; // Make the typing sound loop

let storyHistory = []; // Array to store the conversation history for the AI model
let storySegments = []; // Array to keep track of dynamically added story elements for removal

// Retrieve story parameters from session storage
const genre = sessionStorage.getItem("genre")?.toLowerCase(); // Get genre and convert to lowercase
const character = sessionStorage.getItem("character"); // Get character from session storage
const style = sessionStorage.getItem("style"); // Get style from session storage

// Apply genre-specific styling to the body
if (genre) {
  document.body.classList.add(genre);
}

// Check if all necessary story parameters are present
if (!genre || !character || !style) {
    // If any parameters are missing, display an error message
    storyContainer.innerHTML = "<p>⚠️ Missing story setup. Please go back to the start page.</p>";
}
else {
    // If all parameters are present, start generating the story
    startStory();
}

 //Initiates the story generation process by sending an initial prompt to the AI.
async function startStory() {
    storyContainer.innerHTML = "<p>✨ Generating story...</p>"; // Display a loading message

    // Construct the initial prompt for the AI
    const combinedPrompt = `
        Give me an enchanting story title and the first segment of a ${style} ${genre} story 
        featuring a ${character}. Write the title on the first line, then a blank line, 
        then the first story segment. End the segment with four labeled choices: A), B), C), D).
        `;

    const response = await generateStory(combinedPrompt); // Generate the story segment using the AI
    const [titleLine, , ...rest] = response.split('\n'); // Split the response to extract title and story text
    const storyText = rest.join('\n'); // Join the remaining parts to form the story text

    storyHistory.push({ role: "user", content: combinedPrompt }); // Add user's prompt to history
    storyHistory.push({ role: "model", content: response }); // Add AI's response to history

    // Create and append the story title to the container
    const titleEl = document.createElement("h2");
    titleEl.className = "story-title";
    titleEl.textContent = titleLine.trim();
    storyContainer.innerHTML = ""; // Clear the loading message
    storyContainer.appendChild(titleEl); // Append the title element
    scrollToBottom(); // Scroll to the bottom to show new content

    addStorySegment(storyText); // Add the generated story segment to the display
}

/**
 * Sends a prompt to the backend API to generate story content using the Gemini model.
 * @param {string} prompt The text prompt to send to the AI.
 * @returns {Promise<string>} A promise that resolves with the generated story text.
 * @throws {Error} If the API response is not OK or the story content is missing.
 */
async function generateStory(prompt) {
    const response = await fetch("/api/generate", { // Make a POST request to the generate API endpoint
        method: "POST", // Specify the HTTP method as POST
        headers: { "Content-Type": "application/json" }, // Set the content type header
        body: JSON.stringify({ prompt, history: storyHistory }) // Send prompt and history as JSON in the request body
    });

    const data = await response.json(); // Parse the JSON response
    if (!response.ok || !data.story) { // Check if the response was successful and contains story data
        throw new Error("Failed to load story from Gemini."); // Throw an error if generation fails
    }

    return data.story; // Return the generated story text
}

/**
 * Adds a new story segment to the display with a typing animation.
 * @param {string} text The text content of the story segment to display.
 */
function addStorySegment(text) {
    let displayText = "" // Initialize empty string to build typed text
    const storyEl = document.createElement("div"); // Create a new div for the story segment
    storyEl.className = "story-segment"; // Assign a CSS class to the story segment

    const storyText = document.createElement("p"); // Create a paragraph element for the text
    storyEl.appendChild(storyText); // Append the paragraph to the segment div
    storyContainer.appendChild(storyEl); // Append the segment div to the main story container
    storySegments.push(storyEl); // Add the new segment to the storySegments array
    scrollToBottom(); // Scroll to the bottom to keep new text in view

    let i = 0; // Initialize a counter for typing animation
    typingSound.play(); // Start playing the typing sound

    const interval = setInterval(() => { // Set up an interval for the typing effect
        if (i < text.length) { // Check if all characters have been typed
            // Add character by character, converting newlines to <br> tags
            displayText += text[i] === "\n" ? "<br>" : text[i];
            storyText.innerHTML = formatMarkdown(displayText); // Update the innerHTML with formatted text
            i++; // Increment the character counter
            scrollToBottom(); // Keep scrolling to bottom as text is added
        } 
        else {
            clearInterval(interval); // Stop the typing animation
            typingSound.pause(); // Pause the typing sound
            storyText.innerHTML = formatMarkdown(displayText); // Ensure the final text is fully displayed and formatted
            addTextInputBox(); // Add the user input box after typing is complete
        }
    }, 10); // Typing speed (10ms per character)
}

/**
 * Formats markdown-like syntax in the given text into HTML.
 * Specifically, `**text**` becomes `<strong>text</strong>` and `*text*` becomes `<em>text</em>`.
 * Newlines `\n` are converted to `<br>`.
 * @param {string} text The text to format.
 * @returns {string} The HTML-formatted text.
 */
function formatMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Replaces **text** with <strong>text</strong> for bolding
    .replace(/\*(.*?)\*/g, "<em>$1</em>") // Replaces *text* with <em>text</em> for italics
    .replace(/\n/g, "<br>"); // Replaces newline characters with <br> for line breaks
}

 // Scrolls the story container to the very bottom to show the latest content.
function scrollToBottom() {
    storyContainer.scrollTop = storyContainer.scrollHeight; // Set scroll position to the bottom
}

 // Adds a text input box and a submit button for user interaction, along with navigation controls.
function addTextInputBox() {
    const inputDiv = document.createElement("div"); // Create a div for the input area
    inputDiv.className = "input-area"; // Assign CSS class for styling

    const input = document.createElement("input"); // Create the text input element
    input.type = "text"; // Set input type to text
    input.placeholder = "Type A/B/C/D or anything you want..."; // Placeholder text
    input.className = "user-input"; // Assign CSS class for styling

    const submitBtn = document.createElement("button"); // Create the submit button
    submitBtn.textContent = "Submit"; // Set button text
    submitBtn.className = "submit-button"; // Assign CSS class for styling

    // Remove any old controls before appending new ones
    const existingControls = document.getElementById("story-controls"); // Get existing control div
    if (existingControls) existingControls.remove(); // Remove if it exists

    const controlDiv = document.createElement("div"); // Create a div for the control buttons
    controlDiv.id = "story-controls"; // Assign an ID to the control div
    controlDiv.className = "control-buttons"; // Assign CSS class for styling

    // Go Back Button
    const backBtn = document.createElement("button"); // Create the "Go Back" button
    backBtn.textContent = "Go Back"; // Set button text
    backBtn.className = "go-back-button"; // Assign CSS class for styling
    // Display the back button only if there's enough history to go back (at least one full turn of user prompt + model response)
    backBtn.style.display = storyHistory.length >= 4 ? "inline-block" : "none";

    backBtn.addEventListener("click", () => { // Add a click event listener to the "Go Back" button
        // Check if there are enough history entries to undo a full turn (user prompt + model response)
        if (storyHistory.length < 4 || storySegments.length === 0) {
            alert("No more steps to undo."); // Alert if no steps to undo
            return; // Exit the function
        }

        storyHistory.pop(); // Remove the last model response from history
        storyHistory.pop(); // Remove the last user prompt from history

        // Remove the last 4 story segments (user choice, input area, controls, and AI segment)
        for (let i = 0; i < 4; i++) {
            const last = storySegments.pop(); // Get the last segment
            if (last && last.remove) last.remove(); // Remove the segment if it exists and has a remove method
        }
        addTextInputBox(); // Re-add the input box and buttons for the previous state
    });

    // Restart Button
    const restartBtn = document.createElement("button"); // Create the "Restart Story" button
    restartBtn.textContent = "Restart Story"; // Set button text
    restartBtn.className = "restart-button"; // Assign CSS class for styling

    restartBtn.addEventListener("click", () => { // Add a click event listener to the "Restart" button
        // Reset story and regenerate
        storyHistory = []; // Clear the story history
        storySegments.forEach(el => el.remove()); // Remove all existing story segments from the DOM
        storySegments = []; // Clear the storySegments array
        const controls = document.getElementById("story-controls"); // Get the controls div
        if (controls) controls.remove(); // Remove the controls if they exist
        startStory(); // Start a new story
    });

    controlDiv.appendChild(backBtn); // Append the "Go Back" button to the control div
    controlDiv.appendChild(restartBtn); // Append the "Restart Story" button to the control div
  
     // Handles the user's input submission.
    const handleSubmit = async () => {
        const userInput = input.value.trim(); // Get and trim the user's input
        if (!userInput) return; // Do nothing if input is empty

        inputDiv.remove(); // Remove the input box after submission
        controlDiv.remove(); // Remove the control buttons after submission
        addUserChoiceLine(userInput); // Display the user's choice

        // Construct the prompt for the AI based on user's input
        const userPrompt = `Based on the user's response: "${userInput}", continue the interactive story.
        Maintain the same tone, characters, and style. If the story is near its end, conclude it naturally.
        Otherwise, end the segment with four distinct choices labeled A), B), C), and D).
        End the story clearly with the line: "The End." when it concludes.`;

        storyHistory.push({ role: "user", content: userPrompt }); // Add user's prompt to history

        const nextPart = await generateStory(userPrompt); // Generate the next part of the story
        storyHistory.push({ role: "model", content: nextPart }); // Add AI's response to history

        addStorySegment(nextPart); // Display the new story segment
    };

    submitBtn.addEventListener("click", handleSubmit); // Add click listener to the submit button

    input.addEventListener("keydown", (e) => { // Add keydown listener to the input field
    if (e.key === "Enter") { // Check if the Enter key was pressed
        e.preventDefault(); // Prevent default Enter key behavior (e.g., new line in textarea)
        handleSubmit(); // Call handleSubmit when Enter key is pressed
    }
    });

    inputDiv.appendChild(input); // Append input to the input area div
    inputDiv.appendChild(submitBtn); // Append button to the input area div
    storyContainer.appendChild(inputDiv); // Append the input area to the story container
    storyContainer.appendChild(controlDiv); // Append the control buttons to the story container
    storySegments.push(inputDiv); // Add the input div to storySegments for removal later
    storySegments.push(controlDiv); // Add the control div to storySegments for removal later
    scrollToBottom(); // Scroll to bottom to show the input box
}

/**
 * Adds a line to the story display indicating the user's choice.
 * @param {string} userInput The text of the user's choice.
 */
function addUserChoiceLine(userInput) {
    const choiceLine = document.createElement("p"); // Create a paragraph for the user's choice
    choiceLine.className = "user-choice"; // Assign a CSS class
    choiceLine.textContent = `You chose: ${userInput}`; // Set the text content
    storyContainer.appendChild(choiceLine); // Append to the story container
    storySegments.push(choiceLine); // Add the user choice line to storySegments for removal later
    scrollToBottom(); // Scroll to bottom to show the choice
}
