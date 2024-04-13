import Header from "./Header";
import Footer from "./Footer";
import MetaTags from "./MetaTags";
import Cursor from './Cursor'

export default function Layout({ children, preview, pageData }) {

  return (
    <div className={`h-full flex flex-col cursor-none`}>
        <MetaTags />
        <Cursor/>
        <Header />
        <main className={`grow relative min-h-screen`}>
          {children}
        </main>
        <Footer />
    </div>
  );
}
