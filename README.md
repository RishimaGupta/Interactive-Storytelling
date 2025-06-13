# Interactive Storytelling Web Application

## Deployed Link (for demo)<br>
interactive-storytelling-production.up.railway.app <br>

## Project Overview

This is a dynamic and engaging interactive storytelling web application that allows users to embark on a "choose-your-own-adventure" style narrative. Users begin by customizing their story's `genre`, a `key character`, and a `writing style`. The application then leverages the power of Artificial Intelligence (Google Gemini) to generate unique story segments in real-time, offering multiple choices to influence the narrative's direction and ensure a personalized and immersive storytelling experience.

## Features

* **Dynamic Story Generation:** Utilizes the Google Gemini AI to generate captivating story titles and segments on the fly, ensuring a unique narrative for each playthrough.
* **Branching Narratives:** The AI is prompted to end story segments with four distinct choices (A, B, C, D), allowing users to steer the plot. Subsequent AI generations are based on the user's selected choice, creating a true "choose-your-own-adventure" experience.
* **Natural Conclusion:** The AI is instructed to conclude the story naturally when it reaches its end, providing a complete narrative arc.
* **Configurable Story Elements:** Users can define the `genre`, `character`, and `writing style` at the outset, leading to a wide variety of story possibilities.
* **Genre-Specific Theming:** The application dynamically applies unique background images, container colors, and button styles based on the chosen story genre (e.g., fantasy, sci-fi, romance), greatly enhancing immersion.
* **Smooth User Experience:** New story text is revealed character by character with an accompanying typing animation and sound, creating a sense of anticipation.
* **Markdown Formatting:** Basic markdown (`**bold**`, `*italic*`) in AI responses is converted to HTML for rich text display.
* **User Controls:**
    * **"Go Back" Functionality:** Allows users to undo their last choice and revert to the previous story segment, offering flexibility.
    * **"Restart Story" Functionality:** Provides a quick way for users to begin a completely new narrative from the start page.
* **Responsive Design:** The application's layout adapts seamlessly to different screen sizes (mobile, tablet, desktop).

## Technologies Used

* **Frontend:**
    * **HTML5:** For structuring the web pages and content.
    * **CSS3:** For styling, layout, responsive design, and animations.
    * **JavaScript (ES6+):** For client-side interactivity, dynamic content updates, and API communication.
* **Backend:**
    * **Node.js:** The JavaScript runtime environment.
    * **Express.js:** Web framework for creating the API endpoint.
    * **`dotenv`:** To manage environment variables securely.
    * **`cors`:** Middleware for Cross-Origin Resource Sharing.
    * **Google Generative AI SDK (`@google/generative-ai`):** To interact with the Google Gemini AI model.
* **AI Model:**
    * **Gemini 1.5 Flash:** Used for generating story content and branching narratives.

## Setup and Running Instructions

To set up and run this project locally, follow these steps:

1.  **Clone the Repository:**
    ```bash
    git clone <https://github.com/RishimaGupta/Interactive-Storytelling>
    cd <Interactive-Storytelling>
    ```
    (Or, if you just have the files, ensure they are organized with `server.js` at the root and `index.html`, `script.js`, `story.html`, `story.js`, `style.css`, and any image/audio assets in a `public/` subdirectory.)

2.  **Install Node.js:**
    If you don't have Node.js installed, download it from [nodejs.org](https://nodejs.org/).

3.  **Install Dependencies:**
    Open your terminal or command prompt, navigate to the project's root directory (where `server.js` is located), and run:
    ```bash
    npm install express cors dotenv @google/generative-ai
    ```

4.  **Get a Gemini API Key:**
    * Go to Google AI Studio: <https://aistudio.google.com/app/apikey>
    * Generate a new API key.

5.  **Create `.env` file:**
    In the root directory of your project (same level as `server.js`), create a new file named `.env` and add your Gemini API key to it in the following format:
    ```
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
    ```
    Replace `YOUR_GEMINI_API_KEY_HERE` with the actual key you obtained.

6.  **Run the Server:**
    In your terminal, from the project's root directory, run:
    ```bash
    node server.js
    ```
    You should see a message indicating "Server is running on http://localhost:3000".

7.  **Access the Application:**
    Open your web browser and navigate to `http://localhost:3000`.

## Usage

1.  **Start:** Visit `http://localhost:3000` in your web browser.
2.  **Customize:** On the initial page, select a story `genre` from the dropdown, enter a `character` (e.g., "wizard", "robot", "detective"), and specify a `writing style` (e.g., "adventurous", "dramatic", "funny").
3.  **Generate:** Click the "Generate Story" button to get your unique story title and the first segment.
4.  **Interact:** Read the story segment. When presented with choices (A, B, C, D), type your choice or a custom response into the input field and press Enter or click "Submit".
5.  **Navigate:** Use the "Go Back" button to revisit previous decision points or the "Restart Story" button to begin a new adventure from scratch.

Enjoy your interactive storytelling experience!
