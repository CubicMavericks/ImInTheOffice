import { Button } from "@mui/material";
import "./App.css";

import { useAuth } from "./components/Auth";

const App = () => {
  const auth = useAuth();

  return <Button onClick={() => auth.signOut()}>Sign Out</Button>;
};

export default App;
