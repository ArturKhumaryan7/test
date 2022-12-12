import {useState} from "react";
import {GridFilterListIcon, GridToolbarContainer} from "@mui/x-data-grid";
import QuickSearchToolbar from "./QuickSearchToolbar";
import ShowFilter from "./Filter";

import "./index.css"

// @ts-ignore
const CustomToolbar = ({data}) => {
    const [filter, setFilter] = useState(false)
    const [count, setCount] = useState(0)

    return (
        <GridToolbarContainer>
            <div className="toolBarContainer">
                <QuickSearchToolbar/>
                <GridFilterListIcon onClick={()=> setFilter(!filter)}/>
                {!!count ? <span className="badge">{count}</span> : null}
            </div>
            {filter ?  <ShowFilter count={(count: number) => setCount(count)} data={data}/> : null}
        </GridToolbarContainer>
    );
}

export default CustomToolbar