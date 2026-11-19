import ScrollVideo from "./components/ScrollVideo.jsx";
import Sections from "./components/Sections.jsx";
import { screen } from "./data/content.js";

export default function App() {
  return (
    <main className="page">
      <ScrollVideo video={screen.video} chapters={screen.chapters} />
      <Sections />
    </main>
  );
}
