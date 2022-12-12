import {useState} from "react";
import Box from "@mui/material/Box";
import {DataGrid} from '@mui/x-data-grid';
import {dataTeam} from "./data";
import CustomToolbar from "./CustomToolbar";
import {columns} from "./columns";
import {partnersData} from "./interfaces";
import HeaderName from "./HeaderName";

import "./index.css"

function Partners() {
    const [pageSize, setPageSize] = useState(10)
    const [data, setData] = useState(dataTeam)
    console.log(data)
    return (
        <div>
          <HeaderName/>
         <Box sx={{ height: 700, width: '1152px'}}>
            <DataGrid
                components={{Toolbar: CustomToolbar}}
                componentsProps={{toolbar: {data: (data: partnersData[]) => setData(data) }}}
                // @ts-ignore
                columns={columns}
                rows={ data }
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[10, 20]}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
            />
         </Box>
        </div>
    );
}

export default Partners