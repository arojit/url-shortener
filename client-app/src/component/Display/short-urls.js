import React from 'react';
import { Grid, List, ListItem, ListItemAvatar, Avatar } from "@mui/material";

import {Item, url_prefix} from '../common';

function ShortURLs(props) {

    return(
        <Grid item xs={12}>
            <Item>
                <List sx={{ width: '100%', maxWidth: 360, }}>
                {props.urls.map((item, index) => (
                    <ListItem key={index}>
                    <ListItemAvatar>
                        <Avatar>
                        {index + 1}
                        </Avatar>
                    </ListItemAvatar>
                    <a href={url_prefix + item.short_url} style={{textDecoration: 'none'}} target="_blank" rel="noreferrer" data-testid={`url-${index}`}>
                        { url_prefix + item.short_url} <br/> {item.hit_counter + " times used"}
                    </a>
                    </ListItem>
                ))}
            </List>
            </Item>
        </Grid>
    );
}

export default ShortURLs;