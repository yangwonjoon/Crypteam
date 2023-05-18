/*eslint-disable*/
import { useState } from 'react';
import '../../css/Notice.css';
import { TextField, Paper, Typography, Grid,Button,
  TableCell, TableContainer, Table, TableRow, Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText, DialogActions} from '@mui/material';


  import SearchIcon from '@mui/icons-material/Search';


const notices = [
    { id: 1, title: '백테스팅 사용법', date: '2023-04-27', 
      content:'백테스팅 사용법은 다음과 같습니다 백테스팅 사용방법 설명 공지사항' }
    // { id: 2, title: '제목2', date: '2022-11-25' },
    // { id: 3, title: '제목3', date: '2022-11-20' },
    // { id: 4, title: '제목4', date: '2022-11-15' },
];

const Notices = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    // 검색기능
    console.log(`"${searchValue}" 검색`);
  }

  const [selectedNotice, setSelectedNotice] = useState(null);

  const handleNoticeClick = (notice) => {
    setSelectedNotice(notice);
  };

  const handleClose = () => {
    setSelectedNotice(null);
  };

  const filteredNotices = notices.filter((notice) => {
    if (selectedCategory === '전체') {
      return notice.title.toLowerCase().includes(searchValue.toLowerCase());
    } else {
      return notice.category === selectedCategory && notice.title.toLowerCase().includes(searchValue.toLowerCase());
    }
  });

  const handleSearch = () => {
    // 검색어를 입력 후 검색 버튼을 클릭할 때 실행되는 함수
    console.log('검색어:', searchValue);
  };

  

  return (
    <Grid container spacing={2} sx={{paddingTop:10, display: 'flex', justifyContent: 'center'}} >
        {/* 거래소랑 공지사항 칸 간격 */}
      {/* <Grid item xs={1} sm={2} >
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            거래소
          </Typography>
          {categories.map((category) => (
            <Typography key={category} sx={{ marginBottom: 1, cursor: 'pointer' }} onClick={() => handleCategoryClick(category)}>
              {category}
            </Typography>
          ))}
        </Paper>
      </Grid> */}
      
      <Grid item xs={12} sm={10}>
        <Paper sx={{ padding: 2 }}>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
            <Grid item>
              <Typography variant="h5">공지사항</Typography>
            </Grid>
            <Grid item >
              <TextField
                size="small"
                placeholder="검색"
                value={searchValue}
                onChange={handleSearchChange}
              />
              <Button variant="contained" color="success" onClick={handleSearchClick}>
              검색
              </Button>
            </Grid> 
          </Grid>

            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', borderBottomWidth: 2 }}>No.</TableCell>
                <TableCell sx={{ fontWeight: 'bold', borderBottomWidth: 2 }}>제목</TableCell>
                <TableCell sx={{ fontWeight: 'bold', borderBottomWidth: 2 }}>등록일</TableCell>
              </TableRow>

              {notices.map((notice) => (
              <TableRow key={notice.id}>
                  <TableCell sx={{ borderBottomWidth: 2 }}>{notice.id}</TableCell>
                  <TableCell
                    onClick={() => handleNoticeClick(notice)}
                    sx={{ borderBottomWidth: 2, cursor: 'pointer' }}
                  >
                    {notice.title}
                  </TableCell>
                  <TableCell sx={{ borderBottomWidth: 2 }}>{notice.date}</TableCell>
              </TableRow>
              ))}
            </Table>
            </TableContainer>

            <Dialog open={selectedNotice !== null} onClose={handleClose} sx={{ maxWidth: '5000vh', maxHeight: '5000vh' }}>
              <DialogTitle>{selectedNotice?.title}</DialogTitle>
              <DialogContent>
                <DialogContentText>{selectedNotice?.content}</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>
                  x
                </Button>
              </DialogActions>
            </Dialog>

        </Paper>
      </Grid>
    </Grid>
  );
};

export default Notices;