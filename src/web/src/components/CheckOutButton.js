import { ThumbDown } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";



const CheckInButton = () => {
  const [checkingOut, setCheckingOut] = useState(false);

  const handleOnClick = () => {
    // TODO: make request here.
    setCheckingOut(true);
  }

  return (
    <Button
      variant="contained"
      size="medium"
      endIcon={<ThumbDown />}
      disabled={checkingOut}
      onClick={() => handleOnClick()}
    >
      I'm not in the office
    </Button>
  );
};

export default CheckInButton;
