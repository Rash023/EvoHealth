import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/Theme/theme-provider";
import Home from "./pages/Home";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
