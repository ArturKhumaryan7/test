import Box from "@mui/material/Box";
import { AdminPanelSettingsOutlined, SecurityOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export const columns = [
    { field: "id", headerName: "ID" },
    {
        field: "name",
        headerName: "Name",
        flex: 1,
        cellClassName: "name-column--cell",
    },
    {
        field: "location",
        headerName: "Location",
        headerAlign: "left",
        align: "left",
    },
    {
        field: "createդDate",
        headerName: "Date created",
        flex: 1,
    },
    {
        field: "status",
        headerName: "Status",
        flex: 1,
        renderCell: (status: string) => {
            return (
                <Box
                  width="60%"
                  m="0 auto"
                  p="5px"
                  display="flex"
                  justifyContent="center"
                  borderRadius="4px"
                    /*                  backgroundColor={
                      status === "Active" ? "green" : "yellow"
                    }*/
                >
                    {status === "Active" && <AdminPanelSettingsOutlined />}
                    {status === "inActive" && <SecurityOutlined />}
                    <Typography color={"grey"} sx={{ ml: "5px" }}>
                        {status}
                    </Typography>
                </Box>
            );
        },
    },
    {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions: () => [
            <GridActionsCellItem icon={<EditIcon />} label="Edit" />,
            <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
        ],
    },
];