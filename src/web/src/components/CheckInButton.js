import { ThumbUp } from "@mui/icons-material";
import { Button } from "@mui/material";

const CheckInButton = () => {
  return (
    <div>
      <Button
        variant="contained"
        size="medium"
        endIcon={<ThumbUp />}
      >
        I'm in the office!
      </Button>
    </div>
  );
};

export default CheckInButton;
