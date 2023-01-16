import { FC, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import dayjs from "dayjs";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";

import "./index.css";

interface FilterProps {
  onApply: (filterData: FilterData) => void;
}

export interface FilterData {
  statusFilter: string | undefined;
  startDate: any;
  endDate: any;
  regionsFilter: string[];
}

const useStylesFilterInput: any = makeStyles({
  root: {
    "& .MuiInputBase-root": {
      marginLeft: "0",
      marginRight: "8px",
      maxWidth: "240px",
    },
  },
});

const Filter: FC<FilterProps> = ({ onApply }) => {
  const [filterData, setFilterData] = useState<FilterData>({
    statusFilter: "",
    startDate: null,
    endDate: null,
    regionsFilter: [],
  });
  const [status, setStatus] = useState("");
  const [createdStart, setCreatedStart] = useState(null);
  const [createdEnd, setCreatedEnd] = useState(null);
  const [filter, setFilter] = useState(false);
  const [regions, setRegions] = useState<string[]>([]);
  const classes = useStylesFilterInput();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const apllyFilter = () => {
    setFilter(true);
    setFilterData({
      statusFilter: status,
      startDate: createdStart,
      endDate: createdEnd,
      regionsFilter: regions,
    });
    onApply({
      statusFilter: status,
      startDate: createdStart,
      endDate: createdEnd,
      regionsFilter: regions,
    });
  };

  useEffect(() => {
    if (
      status === "" &&
      createdStart === null &&
      createdEnd === null &&
      regions.length === 0
    ) {
      setFilter(false);
    }
  }, [filter, status, createdEnd, createdStart, regions]);

  const resetFiltered = () => {
    setFilterData({
      statusFilter: "",
      startDate: null,
      endDate: null,
      regionsFilter: [],
    });
    setStatus("");
    setCreatedStart(null);
    setCreatedEnd(null);
    setFilter(false);
    setRegions([]);
    onApply({
      statusFilter: "",
      startDate: null,
      endDate: null,
      regionsFilter: [],
    });
  };

  const resetFilteredPage = () => {
    setFilterData({
      statusFilter: "",
      startDate: null,
      endDate: null,
      regionsFilter: [],
    });
    setStatus("");
    setCreatedStart(null);
    setCreatedEnd(null);
    setFilter(false);
    setRegions([]);
    onApply({
      statusFilter: "",
      startDate: null,
      endDate: null,
      regionsFilter: [],
    });
  };

  return filter ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box style={{ display: "flex", padding: "8px" }}>
        {status !== "" ? (
          <Chip
            sx={{
              marginRight: "4px",
              borderRadius: "4px",
            }}
            label={status}
            onDelete={() => {
              setStatus("");
              setFilterData({
                ...filterData,
                statusFilter: "",
              });
              onApply({
                ...filterData,
                statusFilter: "",
              });
            }}
          />
        ) : null}
        {regions.length !== 0
          ? regions.map((el, index) => (
              <Chip
                sx={{
                  marginRight: "4px",
                  borderRadius: "4px",
                }}
                label={el}
                onDelete={() => {
                  setRegions(regions.filter((region) => region !== el));
                  console.log(regions.filter((region) => region !== el));
                  setFilterData({
                    ...filterData,
                    regionsFilter: regions.filter((region) => region !== el),
                  });
                  onApply({
                    ...filterData,
                    regionsFilter: regions.filter((region) => region !== el),
                  });
                }}
              />
            ))
          : null}
        {createdStart !== null && (
          <Chip
            sx={{
              marginRight: "4px",
              borderRadius: "4px",
            }}
            label={`Start Date Created ${dayjs(createdStart).format(
              "DD.MM.YYYY"
            )}`}
            onDelete={() => {
              setCreatedStart(null);
              setFilterData({
                ...filterData,
                startDate: null,
              });
              onApply({
                ...filterData,
                startDate: null,
              });
            }}
          />
        )}
        {createdEnd !== null && (
          <Chip
            sx={{
              marginRight: "4px",
              borderRadius: "4px",
            }}
            label={`start crate data ${dayjs(createdEnd).format("DD.MM.YYYY")}`}
            onDelete={() => {
              setCreatedEnd(null);
              setFilterData({
                ...filterData,
                endDate: null,
              });
              onApply({
                ...filterData,
                endDate: null,
              });
            }}
          />
        )}
      </Box>
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Button variant="text" onClick={resetFilteredPage}>
          Reset All
        </Button>
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        padding: "8px",
      }}
    >
      <Box>
        <FormControl
          className={classes.root}
          size="small"
          sx={{
            width: "240px",
          }}
        >
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="Status"
            onChange={(event) => setStatus(event.target.value as string)}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"active"}>Active</MenuItem>
            <MenuItem value={"inactive"}>InActive</MenuItem>
          </Select>
        </FormControl>
        <Autocomplete
          multiple
          size="small"
          limitTags={4}
          sx={{
            minWidth: "240px",
            maxWidth: "440px",
            display: "inline-flex",
            marginRight: "8px",
          }}
          id="checkboxes-tags-demo"
          disableCloseOnSelect
          value={regions}
          onChange={(event, newValue) => {
            setRegions([...newValue]);
          }}
          options={[
            "Armenia",
            "USA",
            "UK",
            "Georgia",
            "Iran",
            "Wales",
            "France",
            "Spain",
            "Canada",
            "China",
            "Japan",
          ]}
          getOptionLabel={(option) => option}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Target Regions" />
          )}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className={classes.root}
            label="Start Date Created"
            value={createdStart}
            onChange={(newDate) => {
              setCreatedStart(newDate);
            }}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
          <DatePicker
            className={classes.root}
            label="End Date Created"
            value={createdEnd}
            onChange={(newDate) => {
              setCreatedEnd(newDate);
            }}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="text" onClick={resetFiltered}>
          Reset All
        </Button>
        <Button variant="contained" onClick={apllyFilter}>
          Aplly
        </Button>
      </Box>
    </Box>
  );
};

export default Filter;
