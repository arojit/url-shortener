import React from 'react';
import { Grid } from "@mui/material";

import UrlBox from './component/Input/url-box';

function App() {

  return (
    <Grid container style={{padding: 20}}>
      <UrlBox></UrlBox>
    </Grid>
  );
}

export default App;
