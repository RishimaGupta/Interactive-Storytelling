document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("storyForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const genre = document.getElementById("genre").value;
    const character = document.getElementById("character").value;
    const style = document.getElementById("style").value;

    // Save user input to sessionStorage
    sessionStorage.setItem("genre", genre);
    sessionStorage.setItem("character", character);
    sessionStorage.setItem("style", style);

    // Navigate to story page
    window.location.href = "story.html";
  });
});
