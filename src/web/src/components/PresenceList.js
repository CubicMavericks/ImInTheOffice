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
import OfficeService from '../services/officeService';

export default function PresenceList() {
  var officeService = new OfficeService();
  var [peopleInTheOffice, setPeopleInTheOffice] = React.useState([]);

  React.useEffect(() => {
    officeService.list(
      (result) => setPeopleInTheOffice(result),
      () => setPeopleInTheOffice([]))
    }, []);

  return (
    !peopleInTheOffice || peopleInTheOffice.length === 0
      ? <Typography>No one has checked in yet...</Typography> 
      : <List sx={{ width: '100%' }}>
      {peopleInTheOffice.map((person, index) =>
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
                    {person.action === "Checkin" ? "Checked in at " : "Checked out at "}
                    {person.action === "Checkin" ? person.dateCheckIn : person.dateCheckOut}
                  </Typography>
                </React.Fragment>
              }
            />
            <ListItemIcon>
              {person.action === "checkIn" ? <Work /> : <Home />}
            </ListItemIcon>
          </ListItem>
          {index !== (peopleInTheOffice.length - 1) && <Divider variant="inset" component="li" />}
          </Box>
        )}
    </List>
  );
}