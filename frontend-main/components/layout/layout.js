import Navbar from './navbar';
import Footer from './footer';
import BackToTop from "./back-to-top";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>
        {children} {/* This will render the page content */}
      </main>
      <BackToTop/>
      <Footer />
    </>
  );
}