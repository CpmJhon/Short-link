// Replace this with your Rebrandly API Key
const API_KEY = "7a2648edf866420689f6372a98bcdfd0";

document.getElementById("shorten-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const longUrl = document.getElementById("long-url").value;
  const resultDiv = document.getElementById("result");
  const shortUrlLink = document.getElementById("short-url");
  const errorMessage = document.getElementById("error-message");

  // Clear previous results and errors
  resultDiv.classList.add("hidden");
  shortUrlLink.textContent = "";
  errorMessage.classList.add("hidden");
  errorMessage.textContent = "";

  try {
    const response = await fetch("https://api.rebrandly.com/v1/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": API_KEY,
      },
      body: JSON.stringify({ destination: longUrl }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to shorten URL");
    }

    const data = await response.json();
    shortUrlLink.textContent = data.shortUrl;
    shortUrlLink.href = `https://${data.shortUrl}`;
    resultDiv.classList.remove("hidden");
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove("hidden");
  }
});
