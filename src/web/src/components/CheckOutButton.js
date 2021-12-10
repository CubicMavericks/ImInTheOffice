import { Home } from "@mui/icons-material";
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
      endIcon={<Home />}
      disabled={checkingOut}
      onClick={() => handleOnClick()}
    >
      I'm not in the office
    </Button>
  );
};

export default CheckInButton;

// TODO
// 1 - Change check in and checkout to register the type of action
// 2 - Sign end point should return status (checkin/checkout)
// 3 - Fetch list of today's attendancy order by reverse datetime.
