import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/Theme/theme-provider";
import Home from "./pages/Home";
import { Blogs } from "./pages/Blogs";
import { Blog } from "./pages/Blog";
import { Publish } from "./pages/Publish";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="blog/publish" element={<Publish />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
