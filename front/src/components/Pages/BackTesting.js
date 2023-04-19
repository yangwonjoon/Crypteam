import React from 'react';
import { Grid, Box } from '@mui/material';

const BackTesting = () => {
    return(
        <>
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
                오른
            {/* 왼쪽 영역 */}
            </Grid>
            <Grid item xs={12} sm={6}>
            {/* 오른쪽 영역 */}
            왼
            </Grid>
        </Grid>
        </Box>
        </>
    )
};

export default BackTesting;