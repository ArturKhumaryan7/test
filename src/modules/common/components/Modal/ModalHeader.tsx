import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import React, { FC } from "react";

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

const ModalHeader: FC<ModalHeaderProps> = ({ title, onClose }) => {
  return (
    <Box
      sx={{
        height: "49px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
      }}
    >
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {title}
      </Typography>
      <CloseOutlinedIcon
        sx={{
          fontSize: "20px",
          marginRight: "6px",
          color: "rgba(0, 0, 0, 0.54)",
          cursor: "pointer",
        }}
        className="modalClosIcon"
        onClick={onClose}
      />
    </Box>
  );
};

export default ModalHeader;
