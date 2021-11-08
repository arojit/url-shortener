import React, { useState, useEffect } from 'react';

import { Button, Grid, TextField, Alert, Tooltip, ListItemText } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';

import isURL from 'validator/lib/isURL';

import ShortURLs from '../Display/short-urls';
import {Item, url_prefix} from '../common';
import design from '../style';

function UrlBox() {
    let urlRef = React.createRef();
    let [showTinyURL, setShowTinyURL] = useState(Boolean);
    let [isInvalidURL, setIsInvalidURL] = useState(Boolean);
    let [short_url, setShort_url] = useState('');
    let [allURL, setAllURL] = useState(Array);
    let [copyTooltipText, setCopyTooltipText] = useState('Copy');

    useEffect(() => {
        updateUrlList();
    }, []);
    
    function handleSubmit() {
        setIsInvalidURL(false);
        setShowTinyURL(false);

        let original_url = urlRef.current.value;

        if(!isURL(original_url)) {
            setIsInvalidURL(true);
        }
        else {
            setIsInvalidURL(false);

            urlRef.current.value = null;
    
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ original_url:  original_url})
            };
            fetch('http://localhost:5000/api/generate-tiny-url', requestOptions)
            .then(response => response.json())
            .then(response => {
            console.log(response);
            setShort_url(response.short_url);
            setShowTinyURL(true);
            updateUrlList();
            
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        }
    }
    
    function updateUrlList() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        return fetch('http://localhost:5000/api/fetch-all-url', requestOptions)
        .then(response => response.json())
        .then(response => {
            setAllURL(response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }

    function copyURL() {
        navigator.clipboard.writeText(url_prefix + short_url);
        setCopyTooltipText("Copied");
    }

    return(
        <Grid container style={{padding: 20}}>
            <Grid item xs={12}>
                <Item>
                    <TextField id="standard-basic" label="URL" variant="standard" style={{width: '60ch'}} inputRef={urlRef} data-testid="url-input"></TextField>
                    <Button variant="contained" onClick={handleSubmit} data-testid="make-short-url-button" style={design.button2}>Make Short</Button>
                </Item>
                <Item>
                { showTinyURL ? <Alert severity="success" style={{width: '60ch'}}>
                    <a href={url_prefix + short_url} target="_blank" rel="noreferrer">{url_prefix + short_url}</a>
                    — check it out! <Tooltip title={copyTooltipText} placement="top"><Button onClick={copyURL} onMouseOut={() => setCopyTooltipText("Copy")}><ContentCopyIcon></ContentCopyIcon></Button></Tooltip></Alert> : null}
                { isInvalidURL ? <Alert severity="error" style={{width: '60ch'}}> Not a Valid URL! </Alert> : null}
                </Item>
            </Grid>

            <Grid item xs={12}>
                {allURL.length > 0 ? <Item><ListItemText>List of short URLs 
                    <Button onClick={updateUrlList}><RefreshIcon style={{cursor: 'pointer'}}></RefreshIcon></Button>
                    </ListItemText></Item> : null}
                <ShortURLs urls={allURL}></ShortURLs>
            </Grid>
        </Grid>
    );
}

export default UrlBox;