/*eslint-disable*/
import { useState } from 'react';
import '../../css/Notice.css';
import { TextField, Paper, Typography, Grid,Button,TableCell, TableContainer, Table, TableRow, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

//예시(거래소,공지사항)
const categories = ['전체', '거래소1', '거래소2', '거래소3', '거래소4'];
const notices = [
    { id: 1, category: '거래소1', title: '제목1', date: '2022-12-01' },
    { id: 2, category: '거래소3', title: '제목2', date: '2022-11-25' },
    { id: 3, category: '거래소4', title: '제목3', date: '2022-11-20' },
    { id: 4, category: '거래소2', title: '제목4', date: '2022-11-15' },
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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
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
      <Grid item xs={1} sm={2} >
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            거래소
          </Typography>
          {categories.map((category) => (
            <Typography key={category} sx={{ marginBottom: 1, cursor: 'pointer' }} onClick={() => handleCategoryClick(category)}>
              {category}
            </Typography>
          ))}
          {/* 배열 categories순회 map함수는 배열의 각 요소를 함수에 적용하고
          그 결과를 새로운 배열로 반환 . 각 요소를 하나의 typography요소로 변환하고
          생성된 모든 요소를 배열로 반환.
          key 프롭은 배열의 요소를 식별하는 역할, sx프롭은 스타일 지정. */}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={7.5}>
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
                <TableCell sx={{ fontWeight: 'bold', borderBottomWidth: 2 }}>조회수</TableCell>
              </TableRow>

              {filteredNotices.map((notice, index) => (
              <TableRow key={notice.id}>
                  <TableCell component="th" scope="row" sx={{ borderBottomWidth: 2 }}>
                  {index + 1}
                  </TableCell>
                  <TableCell sx={{ borderBottomWidth: 2 }}>{notice.title}</TableCell>
                  <TableCell sx={{ borderBottomWidth: 2 }}>{notice.date}</TableCell>
                  <TableCell sx={{ borderBottomWidth: 2 }}>{notice.views}</TableCell>
              </TableRow>
              ))}
            </Table>
            </TableContainer>

        </Paper>
      </Grid>
    </Grid>
  );
};

export default Notices;
