import { FC, ReactNode } from "react";
import Box from "@mui/material/Box";
import MuiModal from "@mui/material/Modal";

import ModalHeader from "./ModalHeader";

const style = {
  position: "absolute" as "absolute",
  height: "364px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#FFFFFF",
  boxShadow: 24,
  padding: "16px",
  borderRadius: "4px",
};

interface ModalProps {
  title: string;
  size?: "sm" | "md";
  children?: ReactNode;
  onClose: () => void;
  footer?: ReactNode;
}

export const Modal: FC<ModalProps> = ({
  title,
  size,
  onClose,
  children,
  footer,
}) => {
  return (
    <MuiModal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-head"
      aria-describedby="modal-to-edit-and-change"
    >
      <Box sx={style}>
        <ModalHeader title={title} onClose={onClose} />
        {children}
        {footer && footer}
      </Box>
    </MuiModal>
  );
};
