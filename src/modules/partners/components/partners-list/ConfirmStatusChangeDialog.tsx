import { FC } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useQueryClient } from "@tanstack/react-query";

import { useChangeStatus } from "modules/partners/api/hooks/useChangeStatus";
import {
  PartnerModel,
  PartnerStatus,
} from "modules/partners/models/partner-models";
import { partnerList } from "modules/partners/api/constant";

interface ConfirmStatusChangeProps {
  id: PartnerModel["id"];
  onConfirm: () => void;
  status: PartnerStatus;

  onClose: () => void;
}
export const ConfirmStatusChangeDialog: FC<ConfirmStatusChangeProps> = ({
  id,
  onConfirm,
  status,
  onClose,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutate } = useChangeStatus();
  const queryClient = useQueryClient();
  const handleClose = () => {
    mutate(
      { id: id, status: status },
      {
        onSuccess: () => {
          onConfirm();
          enqueueSnackbar("the partner status update successfully", {
            variant: "success",
          });
          queryClient.invalidateQueries({ queryKey: [partnerList] });
        },
        onError: () => {
          onClose();
          enqueueSnackbar("something get wrong", {
            variant: "error",
          });
        },
      }
    );
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      aria-labelledby="confirm-dialog"
      aria-describedby="confirm-dialog-to-change-status"
    >
      <DialogTitle
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "16px",
        }}
        id="alert-dialog-title"
      >
        {"Confirmation"}
        <CloseOutlinedIcon
          sx={{
            fontSize: "20px",
            color: "rgba(0, 0, 0, 0.54)",
            cursor: "pointer",
          }}
          className="modalClosIcon"
          onClick={onClose}
        />
      </DialogTitle>
      <DialogContent sx={{ padding: "8px 16px" }}>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to {`${status}ate`} the partner?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: "16px" }}>
        <Button sx={{ marginRight: "10px" }} variant="text" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleClose} variant="contained" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
