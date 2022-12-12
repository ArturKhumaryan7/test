import {GridToolbarQuickFilter} from "@mui/x-data-grid";
import Box from "@mui/material/Box";

import "./index.css"

function QuickSearchToolbar() {

    return (
        <Box
            sx={{
                p: 0.5,
                pb: 0,
            }}
        >
            <GridToolbarQuickFilter />
        </Box>
    );
}

export default QuickSearchToolbar