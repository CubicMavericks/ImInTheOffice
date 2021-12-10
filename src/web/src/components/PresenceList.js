import * as React from 'react';

import { Box, ListItemIcon } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Work, Home } from '@mui/icons-material';

import male from "../assets/male.png";
import female from "../assets/female.png";

export default function PresenceList() {
  // Todo replace this with API call.
  const data = [
    {
      name: "Alexandre",
      email: "",
      action: "checkOut",
      actionTime: "18:00 P.M",
      avatar: "male",
    },
    {
      name: "Filipe",
      email: "",
      action: "checkIn",
      actionTime: "09:00 A.M",
      avatar: "female",
    },
    {
      name: "Alexandre",
      email: "",
      action: "checkIn",
      actionTime: "07:00 A.M",
      avatar: "male",
    }
  ];

  return (
    !data || data.length === 0
      ? <Typography>No one has checked in yet...</Typography> 
      : <List sx={{ width: '100%' }}>
      {data.map((person, index) =>
          <Box key={index}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={person.name} src={person.avatar === "male" ? male : female}  />
            </ListItemAvatar>
            <ListItemText
              primary={person.name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {person.action === "checkIn" ? "Checked in at " : "Checked out at "}
                    {person.actionTime}
                  </Typography>
                </React.Fragment>
              }
            />
            <ListItemIcon>
              {person.action === "checkIn" ? <Work /> : <Home />}
            </ListItemIcon>
          </ListItem>
          {index !== (data.length - 1) && <Divider variant="inset" component="li" />}
          </Box>
        )}
    </List>
  );
}