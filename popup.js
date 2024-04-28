// Function to handle the button click event
function handleClick() {
  // Get the currently active tab
  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      const currentUrl = tabs[0].url;

      // Check if the current URL is an Amazon product page
      if (isAmazonUrl(currentUrl)) {
        // Shorten the Amazon link
        const shortenedLink = shortenAmazonLink(currentUrl);

        // Display the shortened link in the popup
        displayShortenedLink(shortenedLink);
      } else {
        displayShortenedLink("Not an Amazon link");
      }
    }
  });
}

// Function to check if a URL is an Amazon product page
function isAmazonUrl(url) {
  const amazonPattern =
    /https:\/\/www\.amazon\.(com|fr|co\.uk|de|es|it|co\.jp|com\.au|ca|com\.mx|nl|com\.br|com\.tr|ae|in|sg|sa)\/(.*?\/)?dp\/[A-Z0-9]+.*/;
  return amazonPattern.test(url);
}

// Function to shorten an Amazon link
function shortenAmazonLink(link) {
  // Define a regex pattern to match Amazon product URLs
  const pattern =
    /https:\/\/www\.amazon\.(com|fr|co\.uk|de|es|it|co\.jp|com\.au|ca|com\.mx|nl|com\.br|com\.tr|ae|in|sg|sa)\/(.*?\/)?dp\/([A-Z0-9]+).*/;

  // Use the regex pattern to extract the necessary parts from the input link
  const match = link.match(pattern);

  if (match) {
    const top_leveldomain = match[1];
    const product_id = match[3];

    // Create the shortened Amazon link
    const shortened_link = `https://www.amazon.${top_leveldomain}/dp/${product_id}/`;

    return shortened_link;
  } else {
    return "Not an Amazon link";
  }
}

// Function to display the shortened link in the popup
function displayShortenedLink(shortenedLink) {
  const messageDiv = document.getElementById("message");
  if (shortenedLink == "Not an Amazon link") {
    messageDiv.innerHTML = `
      <p>Not an Amazon link</p>`;
  } else {
    messageDiv.innerHTML = `
    <p>Shortened Amazon Link:</p>
    <a href="${shortenedLink}" target="_blank">${shortenedLink}</a>
    <button id="copyButton">Copy to Clipboard</button>
  `;

    // Add a click event listener to the copy button
    const copyButton = document.getElementById("copyButton");
    copyButton.addEventListener("click", () => {
      copyToClipboard(shortenedLink);
    });
  }
}

// Function to copy text to the clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

// Add a click event listener to the button
const button = document.getElementById("clickMeButton");
button.addEventListener("click", handleClick);
