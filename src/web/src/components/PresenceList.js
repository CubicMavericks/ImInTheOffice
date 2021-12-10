import * as React from 'react';

import { Box, ListItemIcon } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { ThumbUp, ThumbDown } from '@mui/icons-material';

export default function PresenceList() {
  const data = [
    {
      name: "Alexandre",
      email: "",
      action: "checkOut",
      actionTime: "18:00 P.M",
      avatar: "",
    },
    {
      name: "Filipe",
      email: "",
      action: "checkIn",
      actionTime: "09:00 A.M",
      avatar: "",
    },
    {
      name: "Alexandre",
      email: "",
      action: "checkIn",
      actionTime: "07:00 A.M",
      avatar: "",
    }
  ];

  return (
    <List sx={{ width: '100%' }}>
      {data.map((person, index) =>
          <Box key={index}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={person.name} src={person.avatar} />
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
              {person.action === "checkIn" ? <ThumbUp /> : <ThumbDown />}
            </ListItemIcon>
          </ListItem>
          {index !== (data.length - 1) && <Divider variant="inset" component="li" />}
          </Box>
        )}
    </List>
  );
}