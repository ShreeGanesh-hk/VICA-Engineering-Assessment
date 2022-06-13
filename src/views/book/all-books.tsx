import React from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer,  TableRow, Stack, TablePagination, Box,  Button } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../data-manage/hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Book } from '../../data-manage/model/book-model';
import EnhancedBookTableHead from '../../components/tableHeader';
import { Order } from '../../utils/constants';
import { deleteBook, setBookDialog, setSelectedBookId } from '../../data-manage/features/books';


export default function AllBooks() {

    const dispatch = useAppDispatch();
    const { books } = useAppSelector((state) => state.bookManagement);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Book>('title');


    function getComparator<Key extends keyof any>(
        order: Order,
        orderBy: Key,
    ): (
            a: { [key in Key]: number | string },
            b: { [key in Key]: number | string },
        ) => number {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const handleUserEdit = (id: number) => {
        dispatch(setSelectedBookId(id));
        dispatch(setBookDialog(true));
    }

    const handleUserDelete = (id: number) => {
        dispatch(deleteBook(id));
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Book,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <Box component="div">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <EnhancedBookTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={books.length}
                    />
                    <TableBody>
                        {books && books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).sort(getComparator(order, orderBy)).map((book, index) => (
                            <TableRow
                                key={book.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="left" component="th" scope="row">
                                    {book.title}
                                </TableCell>
                                <TableCell align="left">{book.author}</TableCell>
                                <TableCell align="center">{book.published}</TableCell>
                                <TableCell align="left">{book.genre}</TableCell>
                                <TableCell align="left">{book.borrower === "" ? <Button>Borrow</Button> : book.borrower}</TableCell>
                                <TableCell align="center">
                                    <Stack direction="row" spacing={2} justifyContent="center"
                                        alignItems="center">
                                        <EditIcon onClick={() => handleUserEdit(book.id)} />
                                        <DeleteIcon onClick={() => handleUserDelete(book.id)} />
                                    </Stack></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[5, 10, 25]}
                    count={books.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage} />
            </TableContainer>

        </Box>
    )
}
