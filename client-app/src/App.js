import React from 'react';
import { Grid } from "@mui/material";

import UrlBox from './component/Input/url-box';
import NavBar from './component/AppBar/navbar';

function App() {

  return (
    <Grid container style={{padding: 20}}>
      <NavBar></NavBar>
      <UrlBox></UrlBox>
    </Grid>
  );
}

export default App;
