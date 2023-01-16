import React, { ChangeEvent, FC, Fragment, useMemo, useState } from "react";
import Switch from "@mui/material/Switch";
import { GridRenderCellParams } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";

import { ConfirmStatusChangeDialog } from "./ConfirmStatusChangeDialog";
import {
  PartnerModel,
  PartnerStatus,
} from "modules/partners/models/partner-models";

export const SwitchStatus: FC<
  GridRenderCellParams<PartnerStatus, PartnerModel, PartnerStatus>
> = ({ id, value }) => {
  const [newStatus, setNewStatus] = useState(value!);
  const [open, setOpen] = useState(false);
  const title = useMemo(() => {
    return value === PartnerStatus.Active ? "Active" : "InActive";
  }, [value]);

  const checked = useMemo(() => {
    return newStatus === PartnerStatus.Active;
  }, [newStatus]);

  const handleChange = (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setNewStatus(checked ? PartnerStatus.Active : PartnerStatus.InActive);
    setOpen(true);
  };

  const handleConfirm = () => {
    setOpen(false);
  };
  const handelClose = () => {
    setNewStatus(value!);
    setOpen(false);
  };

  return (
    <Fragment>
      <Tooltip title={title} arrow>
        <Switch
          checked={checked}
          color={checked ? "success" : "default"}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </Tooltip>
      {open && (
        <ConfirmStatusChangeDialog
          id={id as PartnerModel["id"]}
          status={newStatus}
          onConfirm={handleConfirm}
          onClose={handelClose}
        />
      )}
    </Fragment>
  );
};
