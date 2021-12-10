import { Box } from "@mui/system";
import { Work, Home } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import OfficeService from "../services/officeService";
import { useAuth } from "./Auth";

const CheckInButton = () => {
  const officeService = new OfficeService();
  const auth = useAuth();

  const [checkingIn, setCheckingIn] = useState(auth.user.inOffice);
  const [checkingOut, setCheckingOut] = useState(!auth.user.inOffice);

  const handleCheckInOnClick = () => {
    setCheckingIn(true);
    officeService.checkIn(auth.user.id,
      () => {
        auth.setOfficeState(true);
        setCheckingOut(false);
      },
      () => {
        auth.setOfficeState(false);
        setCheckingIn(false);
      });
  };

  const handleCheckOutOnClick = () => {
    setCheckingOut(true);
    officeService.checkOut(auth.user.id,
      () => {
        auth.setOfficeState(false);
        setCheckingIn(false);
      },
      () => {
        auth.setOfficeState(true);
        setCheckingOut(false);
      });
  }

  return (
    <Box
      sx={{
        m: 3,
        flexGrow: 1,
        justifyContent: "space-evenly",
        display: { xs: "flex", md: "flex" },
      }}
    >
      <Button
        variant="contained"
        size="medium"
        disabled={checkingIn}
        onClick={() => handleCheckInOnClick()}
        endIcon={<Work />}
      >
        I'm in the office
      </Button>
      <Button
      variant="contained"
      size="medium"
      endIcon={<Home />}
      disabled={checkingOut}
      onClick={() => handleCheckOutOnClick()}
    >
      I'm not in the office
    </Button>
    </Box>
  );
};

export default CheckInButton;
