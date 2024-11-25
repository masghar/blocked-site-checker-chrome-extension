const websites = [
  { url: "https://www.facebook.com", icon: "fab fa-facebook" },
  { url: "https://www.twitter.com", icon: "fab fa-twitter" },
  { url: "https://www.youtube.com", icon: "fab fa-youtube" },
  { url: "https://www.instagram.com", icon: "fab fa-instagram" },
  { url: "https://www.signal.org", icon: "fab fa-signal" },
  { url: "https://web.telegram.org", icon: "fab fa-telegram" },
  { url: "https://www.google.com", icon: "fab fa-google" },
  { url: "https://www.gmail.com", icon: "fas fa-envelope" }
];

const statusList = document.getElementById("status-list");

websites.forEach(({ url, icon }) => {
  const listItem = document.createElement("li");
  listItem.innerHTML = `
    <div class="icon-and-status">
      <i class="icon ${icon}"></i>
      <span class="status">${url}: Checking...</span>
    </div>
    <i class="fas fa-spinner spinner"></i>
  `;
  statusList.appendChild(listItem);

  const statusText = listItem.querySelector(".status");
  const spinner = listItem.querySelector(".spinner");

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onload = () => {
    spinner.remove();
    if (xhr.status >= 200 && xhr.status < 400) {
      statusText.textContent = `${url}: Accessible`;
      statusText.classList.add("accessible");
    } else {
      statusText.textContent = `${url}: Blocked`;
      statusText.classList.add("blocked");
    }
  };

  xhr.onerror = () => {
    spinner.remove();
    statusText.textContent = `${url}: Blocked`;
    statusText.classList.add("blocked");
  };

  xhr.send();
});
