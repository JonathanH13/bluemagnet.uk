// Inject nav and footer, highlight active page
(function() {
  const page = window.location.pathname.split('/').pop() || 'index.html';

  const navHTML = `
  <nav>
    <a href="index.html" class="nav-brand" style="text-decoration:none">
      <span class="name">Blue Magnet</span>
      <span class="tag">// Engineering for Medical Research</span>
    </a>
    <ul class="nav-links" id="navLinks">
      <li><a href="index.html">Home</a></li>
      <li><a href="services.html">Services</a></li>
      <li><a href="tacs-hardware.html">tACS Hardware</a></li>
      <li><a href="ti-testing-pcb.html">TI Testing PCB</a></li>
      <li><a href="tacs-switching-module.html">Switching Module</a></li>
      <li><a href="clients.html">Clients</a></li>
      <li><a href="contact.html">Contact</a></li>
      <li><a href="order.html" class="btn btn-solid" style="margin-left:0.5rem">Order / Enquire</a></li>
    </ul>
    <div class="nav-toggle" id="navToggle" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </div>
  </nav>`;

  const footerHTML = `
  <footer>
    <div class="footer-brand">Blue Magnet Ltd</div>
    <ul class="footer-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="services.html">Services</a></li>
      <li><a href="contact.html">Contact</a></li>
      <li><a href="order.html">Order</a></li>
    </ul>
    <div class="footer-meta">© ${new Date().getFullYear()} Blue Magnet Ltd &nbsp;·&nbsp; bluemagnet.uk</div>
  </footer>`;

  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // Highlight active link
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  // Mobile toggle
  document.getElementById('navToggle').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('open');
  });
})();
