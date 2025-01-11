// app.js

// TinyURL API Key
const API_KEY = "VfUKuzir3aQHIm0684mhg5Y8u1TtCyjJZ47v4OwK8ZxkyQ1tMRzXUqOMiCm1"; // Ganti dengan API key Anda

// Elemen DOM
const form = document.getElementById("shorten-form");
const longUrlInput = document.getElementById("long-url");
const resultDiv = document.getElementById("result");
const shortUrlDisplay = document.getElementById("short-url");

// Event Listener untuk Form
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Mencegah refresh halaman

  const longUrl = longUrlInput.value.trim(); // URL panjang dari input
  if (!longUrl) {
    alert("Please enter a valid URL.");
    return;
  }

  try {
    const response = await fetch("https://api.tinyurl.com/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        url: longUrl,
        domain: "tinyurl.com", // Domain short URL (opsional)
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const shortUrl = data.data.tiny_url;

    // Tampilkan hasil short URL
    shortUrlDisplay.innerHTML = `<a href="${shortUrl}" target="_blank">${shortUrl}</a>`;
    resultDiv.classList.remove("hidden");
  } catch (error) {
    console.error("Error while creating short URL:", error);
    shortUrlDisplay.textContent = "Failed to create short URL. Please try again.";
    resultDiv.classList.remove("hidden");
  }
});
