import React from "react";
import { Box } from "@mui/material";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Tooltip from "@mui/material/Tooltip";

const sidebarItems = [
  { label: "Top", icon: <ArrowUpwardIcon />, link: "#top" },
  { label: "Flash Sale", icon: <FlashOnIcon />, link: "#flash-sale-section" },
  { label: "Categories", icon: <CategoryIcon />, link: "#categories-section" },
  { label: "Just for You", icon: <PersonIcon />, link: "#justforyou-section" },
];

export default function SideBarNav() {
  return (
    <Box
      sx={{
        position: "fixed",
        left: "0px",
        top: "65%",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        zIndex: 1000,
      }}
    >
      {sidebarItems.map((item, i) => (
        <Box
          key={i}
          component="a"
          href={item.link}
          sx={{
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
            border: "1px solid #fff",
            borderRadius: "3px",
            width: "40px",
            height: "40px",
            fontSize: "12px",
            color: "gray",
            cursor: "pointer",
            "&:hover": {
              color: "#f85606",
            },
          }}
        >
          <Tooltip title={item.label} placement="right-start">
            {item.icon}
          </Tooltip>
        </Box>
      ))}
    </Box>
  );
}
