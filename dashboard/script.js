document.getElementById("logFile").addEventListener("change", handleFile);

function handleFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => processLogs(reader.result);
  reader.readAsText(file);
}

function processLogs(text) {
  const lines = text.split("\n");

  const statusCount = {};
  const ipCount = {};
  const hourCount = {};

  lines.forEach(line => {
    // Example log format:
    // 192.168.1.10 - - [10/Oct/2025:13:55:36] "GET /login HTTP/1.1" 500 1024

    const ipMatch = line.match(/^(\S+)/);
    const statusMatch = line.match(/"\s(\d{3})\s/);
    const timeMatch = line.match(/\[(\d+\/\w+\/\d+):(\d{2})/);

    if (ipMatch) {
      const ip = ipMatch[1];
      ipCount[ip] = (ipCount[ip] || 0) + 1;
    }

    if (statusMatch) {
      const status = statusMatch[1];
      statusCount[status] = (statusCount[status] || 0) + 1;
    }

    if (timeMatch) {
      const hour = timeMatch[2];
      hourCount[hour] = (hourCount[hour] || 0) + 1;
    }
  });

  renderList("status-list", statusCount);
  renderList("ip-list", ipCount);
  renderList("hour-list", hourCount);
}

function renderList(elementId, data) {
  const list = document.getElementById(elementId);
  list.innerHTML = "";

  Object.entries(data)
    .sort((a, b) => b[1] - a[1])
    .forEach(([key, value]) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${key}</span><strong>${value}</strong>`;
      list.appendChild(li);
    });
}
