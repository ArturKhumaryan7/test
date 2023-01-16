import React from "react";
import { PartnersList } from "./partners-list/PartnersList";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { SnackbarProvider } from "notistack";

const queryPartners = new QueryClient();

export const Partners = () => {
  return (
    <QueryClientProvider client={queryPartners}>
      <SnackbarProvider
        autoHideDuration={4000}
        maxSnack={2}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        style={{
          borderRadius: "12px",
        }}
        iconVariant={{
          success: <CheckCircleOutlineIcon sx={{ marginRight: "7px" }} />,
        }}
      >
        <PartnersList />
      </SnackbarProvider>
    </QueryClientProvider>
  );
};
