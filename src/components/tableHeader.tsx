import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { Box } from "@mui/system";
import { Book } from "../data-manage/model/book-model";
import { Order } from "../utils/constants";
import { visuallyHidden } from '@mui/utils';

interface BookHeadCell {
    disablePadding: boolean;
    id: keyof Book;
    label: string;
    numeric: boolean;
}

const bookHeadCells: readonly BookHeadCell[] = [
    {
        id: 'title',
        numeric: false,
        disablePadding: false,
        label: 'title',
    },
    {
        id: 'author',
        numeric: false,
        disablePadding: false,
        label: 'author',
    },
    {
        id: 'published',
        numeric: true,
        disablePadding: false,
        label: 'published',
    },
    {
        id: 'genre',
        numeric: false,
        disablePadding: false,
        label: 'genre',
    },
    {
        id: 'borrower',
        numeric: false,
        disablePadding: false,
        label: 'borrower',
    },
];

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Book) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

export default function EnhancedBookTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Book) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell align="center">Si No</TableCell>
                {bookHeadCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'center' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell align="center">Action</TableCell>
            </TableRow>
        </TableHead>
    );
}