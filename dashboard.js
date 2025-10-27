console.log('dashboard.js loaded');

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('dashboard');
  const searchInput = document.getElementById('search');
  let allLinks = [];

  // Fetch link data
  fetch('http://127.0.0.1:5000/api/links')
    .then(response => response.json())
    .then(data => {
      allLinks = data;
      renderGroupedLinks(allLinks);
    })
    .catch(error => console.error('Error loading links:', error));

  // Search filter
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = allLinks.filter(link =>
      link.title.toLowerCase().includes(query) ||
      link.category.toLowerCase().includes(query)
    );
    renderGroupedLinks(filtered);
  });

  // Group and render links
  function renderGroupedLinks(links) {
    container.innerHTML = '';
    const grouped = {};

    links.forEach(link => {
      if (!grouped[link.category]) grouped[link.category] = [];
      grouped[link.category].push(link);
    });

    Object.keys(grouped).sort().forEach(category => {
      const section = document.createElement('div');
      section.className = 'mb-4';

      const header = document.createElement('h2');
      header.textContent = category;
      header.className = 'h5 border-bottom pb-2 mb-3';
      section.appendChild(header);

      const row = document.createElement('div');
      row.className = 'row gy-3';

      grouped[category].forEach(link => {
        const favicon = link.favicon && link.favicon !== 'null'
          ? link.favicon
          : 'https://www.google.com/s2/favicons?domain=' + link.url;

        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-4';

        card.innerHTML = `
          <div class="card h-100 shadow-sm">
            <div class="card-body d-flex flex-column justify-content-between">
              <div class="d-flex align-items-center mb-2">
                <img src="${favicon}" alt="${link.alt}" class="me-2" style="width:16px;height:16px;">
                <a href="${link.url}" target="_blank" class="text-decoration-none fw-bold">${link.title}</a>
              </div>
              <p class="text-muted small mb-0">Category: ${link.category}</p>
            </div>
          </div>
        `;
        row.appendChild(card);
      });

      section.appendChild(row);
      container.appendChild(section);
    });
  }
});