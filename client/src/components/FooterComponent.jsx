import { Container } from "react-bootstrap";

/// Application footer with social media and portfolio links.
const FooterComponent = () => {
  const footerLinkStyle = {
    color: "var(--text-dim)",
    textDecoration: "none",
    fontSize: "0.8rem",
    transition: "color 0.2s",
  };

  return (
    <footer className="py-4 mt-auto">
      <Container className="text-center">
        <div className="d-flex justify-content-center gap-4 mb-2">
          <a
            href="https://mrullldhm.vercel.app/#contact"
            target="_blank"
            rel="noreferrer"
            style={footerLinkStyle}
          >
            Portfolio
          </a>
          <a
            href="https://www.linkedin.com/in/mrullldhm/"
            target="_blank"
            rel="noreferrer"
            style={footerLinkStyle}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/mrullldhm"
            target="_blank"
            rel="noreferrer"
            style={footerLinkStyle}
          >
            GitHub
          </a>
        </div>
        <p
          className="mb-0"
          style={{
            color: "var(--text-dim)",
            fontSize: "0.7rem",
            fontWeight: "500",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            opacity: 0.8,
          }}
        >
          © 2024 AMIRUL ADHAM. ALL RIGHTS RESERVED.
        </p>
      </Container>
    </footer>
  );
};

export default FooterComponent;
