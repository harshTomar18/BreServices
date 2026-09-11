export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          © {new Date().getFullYear()} <strong>BRE_SERVICES</strong>. Built with React 19, Vite, Express, and MongoDB.
        </div>
        <div>
          Modular Architecture • Decoupled Client/Server
        </div>
      </div>
    </footer>
  );
}
