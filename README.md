# Interactive-Story-Generator <br>

## Project Overview <br>
This repository contains the complete source code for an AI-powered Interactive Story Generator web application. Users select a genre, main character, and writing style, and the app generates an original choose-your-own-adventure style story that continues based on their inputs. The story dynamically unfolds using Google Gemini 1.5 Flash, with typing animations, sound effects, and genre-specific visual themes. <br>

## Features <br>

### Core Functionality <br>
* *AI-Generated Titles & Storylines:* Automatically generates a unique story title and begins the narrative using Google Gemini AI. <br>
* *Branching Interactivity:* Each story segment ends with four choices labeled A–D; users can pick one or type their own to guide the plot. <br>
* *Story Conclusion:* Gemini ends the story naturally if appropriate, with a final line like "The End." that stops further input. <br>
* *User Input:* Users can type A/B/C/D or give creative input to influence the next chapter. <br>
* *Live Typing Effect:* Stories are revealed with a typewriter animation for dramatic effect. <br>
* *Typing Sound Effect:* Background keystroke sound plays during typing animation to enhance immersion. <br>

### Visual & UX Features <br>
* *Genre-Based Styling:* The background, story container, and submit button styles change based on selected genre (Fantasy, Sci-Fi, Romance, Mystery). <br>
* *Scroll-to-Bottom Animation:* Automatically scrolls to the latest story segment as it is generated. <br>
* *Clear User Feedback:* Displays "You chose: ..." between story branches. <br>

## Technologies Used <br>
* *HTML5:* Structure of index and story pages. <br>
* *CSS3:* Styling, responsive layout, and genre-specific theming. <br>
* *JavaScript (ES6+):* Core logic for dynamic UI, typing animation, scroll behavior, and interaction. <br>
* *Node.js & Express:* Backend server to handle API requests and serve static files. <br>
* *Google Gemini 1.5 Flash API:* AI-powered story generation using prompts and memory context. <br>
* *Render:* For deployment of the full stack web app. <br>

## Key Learnings and Development Highlights <br>
* *AI Prompt Engineering:* Careful crafting of prompts to guide the Gemini model in generating relevant story titles, interactive choices, and natural conclusions. <br>
* *State Management with sessionStorage:* Used sessionStorage to persist user selections (genre, character, style) between `index.html` and `story.html`. <br>
* *Genre-Based UI Dynamism:* Applied CSS classes to `<body>` and used conditional logic to switch backgrounds and styles depending on genre. <br>
* *Typing Simulation with Sound:* Combined interval-based string reveal with a looped `typing.wav` audio for immersive storytelling. <br>
* *Markdown Parsing for Formatting:* Converted AI-generated Markdown syntax (like `*italic*`) into real HTML tags using regex. <br>
* *Story Termination Logic:* Implemented AI guidance and frontend detection to gracefully stop the story when it ends with `"The End."` <br>
* *Secure API Integration:* Used a `.env` file to store the Gemini API key securely and excluded it from GitHub using `.gitignore`. <br>

## How to Run Locally <br>
```bash
git clone https://github.com/your-username/Interactive-Story-Generator.git
cd Interactive-Story-Generator
npm install
