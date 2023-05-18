/*eslint-disable*/
import React, {useState} from 'react';
import { Box,TextField, Paper, Typography, Grid,Button,TableCell, TableContainer, Table, TableRow, IconButton } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AutoTrading = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };
    
    const handleEndDateChange = (date) => {
        setEndDate(date);
    };
    
    const handleApplyButtonClick = () => {
        console.log('Apply clicked');
        console.log(`Start Date: ${startDate}`);
        console.log(`End Date: ${endDate}`);
    };
    
    const handleClearButtonClick = () => {
        console.log('Clear clicked');
        setStartDate(null);
        setEndDate(null);
    };
    return(
        <>
        {/* <Grid item xs={12} sm={7.5}> */}
        <Paper sx={{ padding:10, display: 'flex', justifyContent: 'center' }}>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: 8 }}>
        
            <Box display="flex" alignItems="center" >
                <Typography sx={{ mr: 1 }}>기간선택:</Typography>
                <Box display="flex" alignItems="center" sx={{ flexGrow: 1 , marginRight: '10px'}}>
                    <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    dateFormat="yyyy/MM/dd"
                    customInput={<TextField />}
                    sx={{ mr: 1 }}
                    />
                    <Typography sx={{ mx: 1 }}>~</Typography>
                    <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    dateFormat="yyyy/MM/dd"
                    customInput={<TextField />}
                    sx={{ mr: 1 }}
                    />{" "}
                </Box>
                
                <Box  flexGrow={1} />
                
                <Box display="flex" alignItems="center" >
                <Button variant="contained" color="success" onClick={handleApplyButtonClick} sx={{ mr: 1 }}>매매시작</Button>
                <Button variant="contained" color="success" onClick={handleClearButtonClick}>매매종료</Button>
                </Box>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', borderBottomWidth: 2 }}>No.</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', borderBottomWidth: 2 }}>날짜</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', borderBottomWidth: 2 }}>현재 수익률</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', borderBottomWidth: 2 }}>보유 코인 수</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', borderBottomWidth: 2 }}>보유 현금($)</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', borderBottomWidth: 2 }}>매수/매도 신호</TableCell>
                    </TableRow>
                </Table>
            </TableContainer>
        </Grid>
        </Paper>
        {/* </Grid> */}
        </>
    )
};

export default AutoTrading;