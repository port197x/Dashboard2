document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const targetEl = document.querySelector(targetId);

    if (targetEl) {
      e.preventDefault(); // Stop default jump

      // Collapse the menu if open
      const navbarCollapse = document.querySelector('.navbar-collapse');
      const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
      bsCollapse.hide();

      // Wait for collapse animation to finish, then scroll
      setTimeout(() => {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 350); // Bootstrap collapse animation is ~300ms
    }
  });
});