import { Routes, Route } from "react-router-dom";

import "./App.css";
import SignIn from "./SignIn";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;
