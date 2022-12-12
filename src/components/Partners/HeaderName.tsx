import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {createTheme, ThemeProvider} from "@mui/material";

const HeaderName = () => {

    const theme = createTheme({
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        width: "177px",
                        height: "36px",
                        background: "#5048E5",
                        borderRadius: "8px",
                        fontWeight: "500",
                        lineHeight: "24px",
                        letterSpacing: "0.4px",
                        textTransform: "uppercase",
                        padding: "0",
                        color: "#FFFFFF"
                    },
                },
            },
            MuiSvgIcon: {
                styleOverrides: {
                    root: {
                        fontSize: '20px',
                        marginRight: "6px",
                        color: '#FFFFFF'
                    }
                }
            }
        },
    });

    return (
        <ThemeProvider theme={theme}>
           <Box sx={{
                display: 'flex',
                width: '1152px',
                marginBottom: '8px',

            }}>
            <div className="partnersHeader">Partners list</div>
            <Button variant="contained" size="medium">
                <AddOutlinedIcon/>CREATE PARTNER
            </Button>
          </Box>
        </ThemeProvider>
    )
}

export default HeaderName