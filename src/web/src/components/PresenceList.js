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
import { HubConnectionBuilder } from '@microsoft/signalr';

import toastr from "toastr";

import male from "../assets/male.png";
import female from "../assets/female.png";
import OfficeService from '../services/officeService';
import { useAuth } from "./Auth";

const alertUpdate = (user) =>  {
  toastr.info(user.name + " " + (user.action === "Checkin" ? "came to the office" : "left the office"));
}

export default function PresenceList() {
  var auth = useAuth();
  var officeService = new OfficeService();
  var [peopleInTheOffice, setPeopleInTheOffice] = React.useState([]);

  React.useEffect(() => {
    officeService.list(
      (result) => setPeopleInTheOffice(result),
      () => setPeopleInTheOffice([]));

       const connection = new HubConnectionBuilder()
            .withUrl('https://localhost:7128/hubs/notification')
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(result => {
                console.log('Connected!');

                connection.on('ReceiveNotification', message => {
                  setPeopleInTheOffice(message.office);
                  if (message.user.id !== auth.user.id) {
                    alertUpdate(message.user);
                  }
                });
            })
            .catch(e => console.log('Connection failed: ', e));
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
                    {person.action === "Checkin" ? person.dateCheckin : person.dateCheckout}
                  </Typography>
                </React.Fragment>
              }
            />
            <ListItemIcon>
              {person.action === "Checkin" ? <Work /> : <Home />}
            </ListItemIcon>
          </ListItem>
          {index !== (peopleInTheOffice.length - 1) && <Divider variant="inset" component="li" />}
          </Box>
        )}
    </List>
  );
}