export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo" aria-label="Footer">
      <div className="container footer-grid">
        <div className="footer-left">
          <div className="footer-brand mono">MAXON SOLUTIONS</div>
          <div className="footer-sub muted">
            Software Engineer · Web Platforms · Security
          </div>
        </div>

        <div className="footer-center">
          <nav className="footer-nav" aria-label="Footer navigation">
            <a href="#work">Work</a>
            <a href="#blog">Blog</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="footer-cred mono">
            <span className="clearance">[ CONFIDENTIAL ]</span>
            <span className="sep">|</span>
            <span>Encrypted · Private · Audit-ready</span>
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-contact">
            <a href="mailto:hello@maxonreid.com">hello@maxonreid.com</a>
            <a href="#" className="social">
              GitHub
            </a>
          </div>
          <div className="footer-copy muted">© 2026 Maximiliano Brito Torres</div>
        </div>
      </div>
    </footer>
  );
}
