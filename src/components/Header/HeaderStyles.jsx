import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    notifiBody: {
      "& >div": {
        padding: 5,
        maxHeight: '80vh',
        minWidth: '400px',
        width: '400px'
      },
    },
    scrollPanel: {
      "& .p-scrollpanel-content": {
        padding: 0,
      },
    },
    tabHeader: {
      "& .Mui-selected": {
        borderRadius: "15px",
        backgroundColor: "#91c1ff",
        color: "#1059b8 !important",
      },
      "& >div ": {
        padding: "10px",
      },
      "& >div>div button": {
        color: "black",
        width: "85px",
        fontSize: "10.5px",
        minWidth: "80px",
        padding: "0",
        textTransform: "none",
        height: "28px",
        minHeight: "28px",
      },
    },
    avatar: {
      width: "50px",
      height: "50px",
      borderRadius: '100%'
    }
  })
);
