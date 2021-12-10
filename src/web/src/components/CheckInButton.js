import { Work } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";

const CheckInButton = () => {
  const [checkingIn, setCheckingIn] = useState(false);

  const handleInClick = () => {
    // TODO: make request here.
    setCheckingIn(true);
  }

  return (
    <div>
      <Button
        variant="contained"
        size="medium"
        disabled={checkingIn}
        onClick={() => handleInClick()}
        endIcon={<Work />}
      >
        I'm in the office
      </Button>
    </div>
  );
};

export default CheckInButton;
