import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { MenuItemProps } from "@softland/mfe-loader";
import Icon from "@mui/material/Icon";
const MenuItem: FC<MenuItemProps> = ({ text, icon, path }) => {
  return (
    <Button
      sx={{
        margin: "10px",
      }}
      component={RouterLink}
      to={path || ""}
      startIcon={<Icon>{icon}</Icon>}
      variant="contained"
    >
      {text}
    </Button>
  );
};
export default MenuItem;
