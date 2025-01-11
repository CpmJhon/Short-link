// TinyURL API Key
const API_KEY = "OxllujyRx8jayz8erW06YwndY7KrnKXJafstqWAFEL1zBmhvAHBkdf3aicZ7"; // Ganti dengan API key Anda

// Form dan Elemen Hasil
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
    // Panggilan API ke TinyURL
    const response = await fetch("https://api.tinyurl.com/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        url: longUrl,
        domain: "tiny.one", // Domain short URL (opsional)
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create short URL");
    }

    const data = await response.json();
    const shortUrl = data.data.tiny_url;

    // Tampilkan hasil short URL
    shortUrlDisplay.innerHTML = `<a href="${shortUrl}" target="_blank">${shortUrl}</a>`;
    resultDiv.style.display = "block";
  } catch (error) {
    console.error(error);
    shortUrlDisplay.textContent = "Failed to create short URL. Please try again.";
    resultDiv.style.display = "block";
  }
});
