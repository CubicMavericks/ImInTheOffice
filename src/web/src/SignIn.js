import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./components/Auth";

import logo from "./assets/silvia.svg";

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [signingIn, setSigningIn] = React.useState(false);

  let from = location.state?.from?.pathname || "/";

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    setSigningIn(true);

    auth.signIn(email, 
      () => {
        navigate(from, { replace: true });
      },
      () => {
        setSigningIn(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="logo" />
          <Typography component="h1" variant="h5">
            I'm in the <b>Office.</b>
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={signingIn}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
