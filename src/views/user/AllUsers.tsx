import React from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack, TablePagination, Box, TableSortLabel } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../data-manage/hooks';
import { deleteUser, setSelectedUserId, setUserDialogue } from '../../data-manage/features/user';
import { Roles, User } from '../../data-manage/model/user-model';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { visuallyHidden } from '@mui/utils';

type Order = 'asc' | 'desc';


export default function AllUsers() {

    const dispatch = useAppDispatch();
    const userState = useAppSelector((state) => state.userManagement);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof User>('name');
   

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
        dispatch(setSelectedUserId(id));
        dispatch(setUserDialogue(true));
    }

    const handleUserDelete = (id: number) => {
        dispatch(deleteUser(id));
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const createSortHandler = (property: keyof User) => (event: React.MouseEvent<unknown>) => {
        handleRequestSort(event, property);
    };

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof User,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <Box component="div">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Si No</TableCell>
                            <TableCell key="name" align="left" sortDirection={orderBy === "name" ? order : false}>
                                <TableSortLabel active={orderBy === "name"} direction={orderBy === "name" ? order : 'asc'} onClick={createSortHandler("name")}>Name
                                    {orderBy === "name" ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}</TableSortLabel>
                            </TableCell>
                            <TableCell key="role" align="left" sortDirection={orderBy === "role" ? order : false}>
                                <TableSortLabel active={orderBy === "role"} direction={orderBy === "role" ? order : 'asc'} onClick={createSortHandler("role")}>Role
                                    {orderBy === "role" ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}</TableSortLabel>
                            </TableCell>
                            <TableCell align="center">Delete User</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userState.users && userState.users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).sort(getComparator(order,orderBy)).map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    {user.id}
                                </TableCell>
                                <TableCell align="left" component="th" scope="row">
                                    {user.name}
                                </TableCell>
                                <TableCell align="left">{Roles[user.role]}</TableCell>
                                <TableCell align="center">
                                    <Stack direction="row" spacing={2} justifyContent="center"
                                        alignItems="center">
                                        <EditIcon onClick={() => handleUserEdit(user.id)} />
                                        <DeleteIcon onClick={() => handleUserDelete(user.id)} />
                                    </Stack></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[5, 10, 25]}
                    count={userState.users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage} />
            </TableContainer>

        </Box>
    )
}
