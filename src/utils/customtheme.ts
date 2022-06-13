import { createTheme } from "@mui/material";

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#fff',
          fontSize: '14px',
          textTransform: 'uppercase',
        },
        body: {
          fontSize: '12px'
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#01579b'
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
        }
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        displayedRows: {
          cursor: 'default',

        }
      }
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: '#fff',
          '&.Mui-active': {
            color: '#fff',
          },
          "&:hover": {
            color: "#ccc !important"
          },
          
        },
        icon :{
          color: "#fff !important",
        }
      },

    }
  }
})