function renderStatusTiles() {
  const container = document.getElementById('statusTiles');

  const services = [
    {
      name: 'GitHub',
      url: 'https://www.githubstatus.com/',
      icon: 'assets/icons/GithubFill.svg',
      summaryId: 'github-summary'
    },
    {
      name: 'Cloudflare',
      url: 'https://www.cloudflarestatus.com/',
      icon: 'assets/icons/cloudflare.svg',
      summaryId: 'cloudflare-summary'
    }
  ];

  services.forEach(service => {
    const card = document.createElement('div');
    card.className = 'col';

    card.innerHTML = `
      <div class="card h-100 border-light shadow-sm">
        <div class="card-body">
          <div class="d-flex align-items-center gap-2 mb-2">
            <img src="${service.icon}" alt="${service.name} icon" width="20" height="20">
            <h6 class="mb-0">${service.name} Status</h6>
          </div>
          <div id="${service.summaryId}" class="small text-muted">Loading...</div>
        </div>
        <div class="card-footer bg-transparent border-0 text-end">
          <a href="${service.url}" class="btn btn-sm btn-outline-secondary">View</a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

let lastCloudflareStatus = '';
let lastCloudflareIncidents = 0;

async function fetchCloudflareSummary() {
  try {
    const res = await fetch('https://www.cloudflarestatus.com/api/v2/summary.json');
    const data = await res.json();

    const statusDesc = data.status?.description || 'Unknown';
    const lastUpdated = data.page?.updated_at || 'N/A';
    const activeIncidents = data.incidents?.length || 0;
    const now = new Date().toLocaleTimeString();

    const changed = statusDesc !== lastCloudflareStatus || activeIncidents !== lastCloudflareIncidents;
    const highlight = changed ? 'text-danger fw-bold' : 'text-muted';

    document.getElementById('cloudflare-summary').innerHTML = `
      <div class="${highlight}">
        Status: ${statusDesc}<br>
        Active Incidents: ${activeIncidents}<br>
        Last Updated: ${new Date(lastUpdated).toLocaleString()}<br>
        Checked: ${now}
      </div>
    `;

    lastCloudflareStatus = statusDesc;
    lastCloudflareIncidents = activeIncidents;

  } catch (error) {
    document.getElementById('cloudflare-summary').innerHTML =
      `<span class="text-danger">Error fetching Cloudflare status</span>`;
    console.error('Cloudflare Summary Error:', error);
  }
}

let lastGitHubStatus = '';

async function fetchGitHubSummary() {
  try {
    const res = await fetch('https://www.githubstatus.com/api/v2/summary.json');
    const data = await res.json();

    const statusDesc = data.status?.description || 'Unknown';
    const lastUpdated = data.page?.updated_at || 'N/A';
    const activeIncidents = data.incidents?.length || 0;
    const now = new Date().toLocaleTimeString();

    const changed = statusDesc !== lastGitHubStatus || activeIncidents > 0;
    const highlight = changed ? 'text-danger fw-bold' : 'text-muted';

    document.getElementById('github-summary').innerHTML = `
      <div class="${highlight}">
        Status: ${statusDesc}<br>
        Active Incidents: ${activeIncidents}<br>
        Last Updated: ${new Date(lastUpdated).toLocaleString()}<br>
        Checked: ${now}
      </div>
    `;

    lastGitHubStatus = statusDesc;

  } catch (error) {
    document.getElementById('github-summary').innerHTML =
      `<span class="text-danger">Error fetching GitHub status</span>`;
    console.error('GitHub Summary Error:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderStatusTiles();
  fetchCloudflareSummary();
  fetchGitHubSummary();
  setInterval(fetchCloudflareSummary, 60 * 60 * 1000);
  setInterval(fetchGitHubSummary, 60 * 60 * 1000);
});