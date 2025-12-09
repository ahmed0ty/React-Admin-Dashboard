import React from "react";
import {
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Tooltip,
  styled,
  useTheme,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { grey } from "@mui/material/colors";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  HomeOutlined as HomeOutlinedIcon,
  PeopleOutlined as PeopleOutlinedIcon,
  ContactsOutlined as ContactsOutlinedIcon,
  ReceiptOutlined as ReceiptOutlinedIcon,
  PersonOutlined as PersonOutlinedIcon,
  CalendarTodayOutlined as CalendarTodayOutlinedIcon,
  HelpOutlineOutlined as HelpOutlineOutlinedIcon,
  BarChartOutlined as BarChartOutlinedIcon,
  PieChartOutlineOutlined as PieChartOutlineOutlinedIcon,
  TimelineOutlined as TimelineOutlinedIcon,
  MapOutlined as MapOutlinedIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const menuArray1 = [
  { text: "Dashboard", icon: <HomeOutlinedIcon />, path: "/" },
  { text: "Manage Team", icon: <PeopleOutlinedIcon />, path: "/team" },
  { text: "Contacts Information", icon: <ContactsOutlinedIcon />, path: "/contacts" },
  { text: "Invoices Balances", icon: <ReceiptOutlinedIcon />, path: "/invoices" },
];

const menuArray2 = [
  { text: "Profile Form", icon: <PersonOutlinedIcon />, path: "/form" },
  { text: "Calendar", icon: <CalendarTodayOutlinedIcon />, path: "/calendar" },
  { text: "FAQ Page", icon: <HelpOutlineOutlinedIcon />, path: "/faq" },
];

const menuArray3 = [
  { text: "Bar Chart", icon: <BarChartOutlinedIcon />, path: "/bar" },
  { text: "Pie Chart", icon: <PieChartOutlineOutlinedIcon />, path: "/pie" },
  { text: "Line Chart", icon: <TimelineOutlinedIcon />, path: "/line" },
  { text: "Geography Chart", icon: <MapOutlinedIcon />, path: "/geography" },
];

const SideBar = ({ open, handleDrawerClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const renderMenu = (menuArray) =>
    menuArray.map((item) => (
      <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
        <Tooltip title={open ? "" : item.text} placement="left">
          <ListItemButton
            onClick={() => navigate(item.path)}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              bgcolor:
                location.pathname === item.path
                  ? theme.palette.mode === "dark"
                    ? grey[800]
                    : grey[300]
                  : "transparent",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </Tooltip>
      </ListItem>
    ));

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>

      <Divider />

      <Avatar
        sx={{
          mx: "auto",
          width: open ? 88 : 44,
          height: open ? 88 : 44,
          my: 1,
          border: "2px solid grey",
          transition: "0.25s",
        }}
        alt="Ahmed Abdelbaky"
        src="/assets/Me.jpg" // ← المسار الصحيح
      />

      <Typography align="center" sx={{ fontSize: open ? 17 : 0, transition: "0.25s" }}>
        ahmed abdelbaky
      </Typography>
      <Typography
        align="center"
        sx={{ fontSize: open ? 15 : 0, transition: "0.25s", color: theme.palette.info.main }}
      >
        Admin
      </Typography>

      <Divider />
      <List>{renderMenu(menuArray1)}</List>
      <Divider />
      <List>{renderMenu(menuArray2)}</List>
      <Divider />
      <List>{renderMenu(menuArray3)}</List>
    </Drawer>
  );
};

export default SideBar;
