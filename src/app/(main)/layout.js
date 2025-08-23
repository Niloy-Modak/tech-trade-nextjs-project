import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <NavBar />
      </header>
      <main className="max-w-screen-xl mx-auto px-4 min-h-[calc(100vh-280px)]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
