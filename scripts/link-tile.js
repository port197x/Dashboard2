Promise.all([
  fetch('./assets/links.json').then(res => res.json()),
  fetch('./assets/categories.json').then(res => res.json())
]).then(([links, categoryIcons]) => {
  renderDashboard(links, categoryIcons);

  document.getElementById('searchInput').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const filtered = links.filter(link =>
      link.title.toLowerCase().includes(query) ||
      link.category.toLowerCase().includes(query)
    );
    renderDashboard(filtered, categoryIcons);
  });
});

function renderDashboard(links, categoryIcons) {
  const container = document.getElementById('dashboard');
  container.innerHTML = '';

  const grouped = groupByCategory(links);

  for (const [category, items] of Object.entries(grouped)) {
    items.sort((a, b) => a.title.localeCompare(b.title));

    const section = document.createElement('div');
    section.classList.add('mb-4');

    const heading = document.createElement('h4');
    heading.setAttribute('id', category.toLowerCase().replace(/\s+/g, '-'));
    const iconSrc = categoryIcons[category];
    const iconHTML = iconSrc
      ? `<img src="${iconSrc}" alt="${category}" class="align-middle me-2" style="width:20px;">`
      : '';
    heading.innerHTML = `${iconHTML}${category}`;
    section.appendChild(heading);

    const row = document.createElement('div');
    row.className = 'row row-cols-2 row-cols-md-4 g-4';

    items.forEach(link => {
      const favicon = link.favicon || '';
      const alt = link.alt || link.title;
      const iconHTML = favicon
        ? `<img src="${favicon}" alt="${alt}" class="mx-auto" style="width:24px;">`
        : `<div class="fs-3">🖥️</div>`;

      const col = document.createElement('div');
      col.className = 'col';

      col.innerHTML = `
        <a href="${link.url}" target="_blank" class="text-decoration-none">
          <div class="card text-center p-3 h-100">
            ${iconHTML}
            <div class="mt-2 fw-bold">${link.title}</div>
          </div>
        </a>
      `;
      row.appendChild(col);
    });

    section.appendChild(row);
    container.appendChild(section);
  }
}

function groupByCategory(links) {
  return links.reduce((acc, link) => {
    acc[link.category] = acc[link.category] || [];
    acc[link.category].push(link);
    return acc;
  }, {});
}
