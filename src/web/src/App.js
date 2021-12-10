import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Box, Grid, Paper } from "@mui/material";

import CustomAppBar from "./components/CustomAppBar";
import CheckInButton from "./components/CheckInButton";
import CheckOutButton from "./components/CheckOutButton";
import PresenceList from "./components/PresenceList";

import logo from "./assets/mark.svg";

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <CustomAppBar />
        <Container maxWidth="md">
          <Box
            sx={{
              m: 3,
              flexGrow: 1,
              justifyContent: "space-evenly",
              display: { xs: "flex", md: "flex" },
            }}
          >
            <CheckInButton />
            <CheckOutButton />
          </Box>
        </Container>
        <Container maxWidth="md">
          <Box
            sx={{
              m: 3,
              flexGrow: 1,
              justifyContent: "space-evenly",
              display: { xs: "flex", md: "flex" },
            }}
          >
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <PresenceList />
              </Paper>
            </Grid>
          </Box>
        </Container>
        <Container maxWidth="sm">
          <img src={logo} alt="logo" />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
