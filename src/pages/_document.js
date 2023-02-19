import { Html, Head, Main, NextScript } from "next/document";
import dynamic from "next/dynamic";
import { Container } from "react-bootstrap";
export default function Document() {
  const Navbar = dynamic(() => import("../components/NavBar/NavBar.js"), {
    suspense: true,
  });
  return (
    <Html lang="fr">
      <Head />
      <body>
        <Container>
          <Navbar />
          <Main />
          <NextScript />
        </Container>
      </body>
    </Html>
  );
}
