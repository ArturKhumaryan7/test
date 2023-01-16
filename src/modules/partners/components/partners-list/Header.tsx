import { FC } from "react";
import Box from "@mui/material/Box";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PartnerForm from "./PartnerForm";

interface HeaderProps {
  onCloseModal: () => void;
  openModal: boolean;
  changeModal: (modal: boolean) => void;
}

export const Header: FC<HeaderProps> = ({
  onCloseModal,
  openModal,
  changeModal,
}) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          maxWidth: "100%",
          marginBottom: "8px",
          marginTop: "8px",
          minWidth: "500",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Partners list</Typography>
        <Button
          variant="contained"
          startIcon={<AddOutlinedIcon />}
          onClick={() => changeModal(true)}
        >
          Create Partner
        </Button>
      </Box>
      {openModal && <PartnerForm onClose={onCloseModal} />}
    </Box>
  );
};
