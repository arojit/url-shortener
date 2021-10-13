import { Paper, styled } from "@mui/material";
export const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    display: 'flex',  justifyContent:'center', alignItems:'center',
    color: theme.palette.text.secondary,
}));

export const url_prefix = "http://localhost:5000/";
