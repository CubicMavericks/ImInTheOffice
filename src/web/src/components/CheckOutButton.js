import { ThumbDown } from "@mui/icons-material";
import { Button } from "@mui/material";

const CheckInButton = () => {
  return (
    <Button
      variant="contained"
      size="medium"
      endIcon={<ThumbDown />}
    >
      I'm not in the office
    </Button>
  );
};

export default CheckInButton;
