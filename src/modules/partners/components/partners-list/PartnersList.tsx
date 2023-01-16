import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridFilterListIcon,
  GridSortModel,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import InputBase from "@mui/material/InputBase";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CommentIcon from "@mui/icons-material/Comment";
import EditIcon from "@mui/icons-material/Edit";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Typography from "@mui/material/Typography";

import PartnerForm from "./PartnerForm";
import Filter, { FilterData } from "./Filter";
import { Header } from "./Header";
import EmptyIcon from "./EmptyIcon";
import { useGetData } from "modules/partners/api/hooks/useGetData";
import { PartnerModel } from "modules/partners/models/partner-models";
import { SwitchStatus } from "./SwitchStatus";

import "./index.css";

export const PartnersList = () => {
  const [pageSize, setPageSize] = useState<number>(20);
  const [page, setPage] = useState<number>(0);
  const [filter, setFilter] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [partner, setPartner] = useState<PartnerModel>();
  const [sortModel, setSortModel] = useState({});

  const queryOptions = useMemo(
    () => ({
      page: page + 1,
      pageSize,
      sortModel,
    }),
    [page, pageSize, sortModel]
  );

  const { data = [], isFetching, isError } = useGetData(queryOptions);

  const loading = !isError && isFetching;

  const handleSortModelChange = useCallback((sortModel: GridSortModel) => {
    setSortModel({ sortModel: [...sortModel] });
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
    setPartner(undefined);
  };

  const editPartner = useCallback(
    (row: PartnerModel) => () => {
      setPartner(row);
      setOpenModal(true);
    },
    []
  );

  useEffect(() => {
    data.filter(
      (el: PartnerModel) =>
        el.name.toLowerCase().includes(searchInputValue.toLowerCase()) ||
        el.id.toString().includes(searchInputValue)
    );
  }, [searchInputValue, data]);

  const handleFilterChange = (filterData: FilterData) => {
    const filterCount = Object.values(filterData)
      .filter((el) => el !== "" && el !== null && el.length !== 0)
      .reduce((acc, el, index) => {
        if (Array.isArray(el)) {
          return acc + el.length;
        } else {
          return acc + 1;
        }
      }, 0);
    setCount(filterCount);
  };

  const columns = useMemo<GridColumns<PartnerModel>>(
    () => [
      {
        field: "id",
        headerName: "Id",
        headerAlign: "center",
        align: "center",
        minWidth: 40,
        maxWidth: 130,
        width: 90,
      },
      {
        field: "name",
        headerName: "Name",
        cellClassName: "name-column--cell",
        flex: 1,
        minWidth: 100,
        maxWidth: 320,
        width: 181,
        renderCell: ({ value }) => {
          return (
            <Tooltip title={value} arrow>
              <Typography
                sx={{
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
                variant="body1"
              >
                {value}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        field: "contactEmail",
        headerName: "Partner Email",
        cellClassName: "name-column--cell",
        flex: 1,
        minWidth: 120,
        maxWidth: 320,
        width: 181,
        renderCell: ({ value }) => {
          return (
            <Tooltip title={value} arrow>
              <Typography
                sx={{
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
                variant="body1"
              >
                {value}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        field: "contactPersonName",
        headerName: "Person Name",
        cellClassName: "name-column--cell",
        flex: 1,
        minWidth: 120,
        maxWidth: 360,
        width: 220,
        renderCell: ({ value }) => {
          return (
            <Tooltip title={value} arrow>
              <Typography
                sx={{
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
                variant="body1"
              >
                {value}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        field: "targetRegions",
        headerName: "Target Region",
        headerAlign: "left",
        align: "left",
        flex: 1,
        minWidth: 100,
        maxWidth: 240,
        width: 140,
        type: "singleSelect",
        renderCell: ({ value }) => {
          return (
            <Tooltip title={value.join(", ")} arrow>
              <Typography
                sx={{
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
                variant="body1"
              >
                {value.join(", ")}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        field: "creationDate",
        headerName: "Date created",
        flex: 1,
        minWidth: 90,
        maxWidth: 240,
        width: 140,
        renderCell: ({ value }) => {
          return (
            <Tooltip title={value} arrow>
              <Typography
                sx={{
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
                variant="body1"
              >
                {value}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        field: "status",
        headerName: "Status",
        minWidth: 75,
        width: 100,
        maxWidth: 160,
        renderCell: (params) => {
          return <SwitchStatus {...params} />;
        },
      },
      {
        field: "actions",
        type: "actions",
        minWidth: 55,
        width: 100,
        maxWidth: 150,
        getActions: (params) => [
          <GridActionsCellItem
            icon={
              <Tooltip title="Brands" arrow>
                <FindInPageIcon />
              </Tooltip>
            }
            label="Search"
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            showInMenu
            onClick={editPartner(params.row)}
          />,
          <GridActionsCellItem
            icon={<PendingActionsIcon />}
            label="Log history"
            showInMenu
            disabled
          />,
          <GridActionsCellItem
            icon={<AddCommentIcon />}
            label="Add note"
            showInMenu
            disabled
          />,
          <GridActionsCellItem
            icon={<CommentIcon />}
            label="View notes"
            showInMenu
            disabled
          />,
        ],
      },
    ],
    [editPartner]
  );

  return (
    <Box>
      <Box
        sx={{
          height: "100%",
          maxWidth: "100%",
          borderRadius: "4px",
          minWidth: 700,
          margin: "0px 16px",
        }}
      >
        <Header
          onCloseModal={handleCloseModal}
          openModal={openModal}
          changeModal={setOpenModal}
        />
        <Box
          sx={{
            maxWidth: "100%",
            minWidth: 700,
            borderRadius: 2,
            gap: 2,
          }}
        >
          <Box
            sx={{
              padding: "8px",
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box className="searchInput">
              <SearchIcon className="searchIcon" />
              <InputBase
                placeholder="Search..."
                value={searchInputValue}
                onChange={(event) => setSearchInputValue(event.target.value)}
              />
              <Box>
                {searchInputValue !== "" && (
                  <ClearOutlinedIcon
                    className="searchClearIcon"
                    onClick={() => setSearchInputValue("")}
                  />
                )}
              </Box>
            </Box>
            {filter ? (
              <Badge badgeContent={count} color="primary">
                <GridFilterListIcon
                  className="filterIcon"
                  onClick={() => setFilter(!filter)}
                />
              </Badge>
            ) : (
              <GridFilterListIcon
                className="filterIcon"
                onClick={() => setFilter(!filter)}
              />
            )}
          </Box>
          {filter && <Filter onApply={handleFilterChange} />}
        </Box>
        <Box
          sx={{
            height: filter ? 625 : 711,
            backgroundColor: "#FFFFFF",
            borderRadius: "4px",
            minWidth: 700,
            maxWidth: "100%",
          }}
        >
          <DataGrid
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "700",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#F3F4F6",
              },
              "& .MuiDataGrid-virtualScrollerRenderZone": {
                width: "100%",
              },
            }}
            components={{
              NoRowsOverlay: EmptyIcon,
            }}
            rowHeight={44}
            headerHeight={40}
            loading={loading}
            rowCount={100}
            rows={data}
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode="server"
            sortingMode="server"
            onSortModelChange={handleSortModelChange}
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[20, 40, 60]}
            columns={columns}
            disableSelectionOnClick
            disableColumnSelector
            columnThreshold={5}
            disableColumnMenu={true}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      </Box>
      {openModal && (
        <PartnerForm partner={partner} onClose={handleCloseModal} />
      )}
    </Box>
  );
};
