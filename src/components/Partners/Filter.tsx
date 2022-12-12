import { useState} from "react";
import {Autocomplete, Button, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {dataTeam} from "./data";

import "./index.css"

// @ts-ignore
function ShowFilter ({count, data}) {
    const [status, setStatus] = useState('');
    const [createdStart, setCreatedStart] = useState(null);
    const [createdEnd, setCreatedEnd] = useState(null);
    const [filter, setFilter] = useState(false)

    const option = ['all', 'Active', 'inActive']

    function apllayFilter () {
        setFilter(true)
        data(dataTeam.filter((el) => el.status === 'Active'))
        if (status || createdStart || createdEnd){
            if (status && createdStart && createdEnd) {
                count(3)
            } else if ((status && createdStart) || (createdEnd && createdStart) || (status && createdEnd) ) {
                count(2)
            } else {
                count(1)
            }
        }
    }

    function resetFiltered () {
        data(dataTeam)
        count(0)
        setStatus('')
        setCreatedStart(null)
        setCreatedEnd(null)
    }

    function resetFilteredPage () {
        data(dataTeam)
        count(0)
        setStatus('')
        setCreatedStart(null)
        setCreatedEnd(null)
        setFilter(false)
    }
    return (

        filter ?
            <div className="filteredContainer">
                {status !== '' ? <p className="acssesText">{status}</p> : null}
                {createdStart !== null ?  <p className="startText">{`start crate data ${createdStart}`}</p>: null}
                {createdEnd !== null ?  <p className="startText">{`start crate data ${createdEnd}`}</p>: null}
                <Button variant="text" onClick={resetFilteredPage}>Reset</Button>
            </div>
            : <div className="filterContainer">
                <div className="filterInput">
                    <Autocomplete
                        value={status}
                        onChange={(event, newValue) => {
                            // @ts-ignore
                            setStatus(newValue);
                        }}
                        id="controllable-states-demo"
                        options={option}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Status" />}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Start created data"
                            value={createdStart}
                            onChange={(newDate) => {
                                setCreatedStart(newDate);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                            label="End created data"
                            value={createdEnd}
                            onChange={(newDate) => {
                                setCreatedEnd(newDate);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
                <div className="filterButton">
                    <Button variant="text" onClick={resetFiltered}>Reset</Button>
                    <Button variant="contained" onClick={apllayFilter}>Applay</Button>
                </div>
            </div>

    )
}

export default ShowFilter