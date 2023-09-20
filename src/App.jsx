import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Notification from "./components/Notification/Notification";

// layouts
import View from "./layouts/View";

// views
import Home from "./views/Home/Home";

function App() {
  return (
    <Suspense>
      <Notification />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<View />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
