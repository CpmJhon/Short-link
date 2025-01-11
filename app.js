// Masukkan API Key Rebrandly
const API_KEY = "7a2648edf866420689f6372a98bcdfd0";

// Ambil elemen DOM
const longUrlInput = document.getElementById("long-url");
const generateButton = document.getElementById("generate-button");
const resultContainer = document.getElementById("result");
const shortUrlLink = document.getElementById("short-url");
const errorMessage = document.getElementById("error-message");

// Fungsi untuk mempersingkat URL
async function shortenUrl(longUrl) {
  const endpoint = "https://api.rebrandly.com/v1/links";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": API_KEY,
    },
    body: JSON.stringify({
      destination: longUrl,
      domain: { fullName: "rebrand.ly" },
    }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
}

// Event Listener pada tombol "Generate"
generateButton.addEventListener("click", async () => {
  const longUrl = longUrlInput.value.trim();

  // Validasi input
  if (!longUrl) {
    errorMessage.textContent = "Please enter a valid URL.";
    errorMessage.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    return;
  }

  // Reset pesan error
  errorMessage.classList.add("hidden");

  try {
    // Panggil fungsi untuk mempersingkat URL
    const result = await shortenUrl(longUrl);
    shortUrlLink.textContent = result.shortUrl;
    shortUrlLink.href = result.shortUrl;
    resultContainer.classList.remove("hidden");
  } catch (error) {
    errorMessage.textContent = `Failed to shorten URL: ${error.message}`;
    errorMessage.classList.remove("hidden");
    resultContainer.classList.add("hidden");
  }
});
