document.addEventListener("DOMContentLoaded", () => {
  // Ensures the script runs only after the entire HTML document has been loaded and parsed.
  const form = document.getElementById("storyForm"); // Get the story form element by its ID.

  form.addEventListener("submit", (event) => {
    // Add an event listener for the form submission.
    event.preventDefault(); // Prevent the default form submission behavior (page reload).

    // Get the selected genre, entered character, and writing style from the form inputs.
    const genre = document.getElementById("genre").value;
    const character = document.getElementById("character").value;
    const style = document.getElementById("style").value;

    // Save user input to sessionStorage so it can be accessed on the next page.
    sessionStorage.setItem("genre", genre);
    sessionStorage.setItem("character", character);
    sessionStorage.setItem("style", style);

    // Navigate the user to the story.html page.
    window.location.href = "story.html";
  });
});
