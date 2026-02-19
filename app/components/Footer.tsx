export default function Footer() {
  return (
    <footer className="bg-[#0a0a0c] border-t border-white/[0.03] py-16 px-0" role="contentinfo" aria-label="Footer">
      <div className="w-[92%] max-w-[1200px] mx-auto grid gap-12 grid-cols-1 md:grid-cols-3">
        <div className="space-y-3">
          <div className="font-mono tracking-[8px] font-semibold text-sm text-[#e6e7ea]">MAXON SOLUTIONS</div>
          <div className="text-sm text-[#9ea0a8]">
            Software Engineer · Web Platforms · Security
          </div>
        </div>

        <div className="space-y-4">
          <nav className="flex gap-6" aria-label="Footer navigation">
            <a href="#work" className="text-sm text-[#9ea0a8] hover:text-[#d6b46b] transition-colors">Work</a>
            <a href="#blog" className="text-sm text-[#9ea0a8] hover:text-[#d6b46b] transition-colors">Blog</a>
            <a href="#services" className="text-sm text-[#9ea0a8] hover:text-[#d6b46b] transition-colors">Services</a>
            <a href="#contact" className="text-sm text-[#9ea0a8] hover:text-[#d6b46b] transition-colors">Contact</a>
          </nav>

          <div className="font-mono text-xs text-[#9ea0a8] flex gap-3">
            <span className="text-[#d6b46b]">[ CONFIDENTIAL ]</span>
            <span>|</span>
            <span>Encrypted · Private · Audit-ready</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            <a href="mailto:hello@maxonreid.com" className="text-sm text-[#e6e7ea] hover:text-[#d6b46b] transition-colors">hello@maxonreid.com</a>
            <a href="#" className="text-sm text-[#9ea0a8] hover:text-[#d6b46b] transition-colors">
              GitHub
            </a>
          </div>
          <div className="text-xs text-[#9ea0a8]">© 2026 Maximiliano Brito Torres</div>
        </div>
      </div>
    </footer>
  );
}
