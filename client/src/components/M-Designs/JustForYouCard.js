import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Rating } from "@mui/material";

const cardStyles = {
  width: "190px",
  height: "320px",
  borderRadius: "0px",
  boxShadow: "none",
  transition: "box-shadow 0.2s ease",
  "&:hover": {
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    cursor: "pointer",
  },
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: "#fff",
  boxSizing: "border-box",
};

const JustForYouCard = ({
  image,
  name,
  description,
  price,
  discount = 10,
  rating,
}) => {
  return (
    <Card sx={cardStyles}>
      {/* Product Image */}
      <Box
        sx={{
          height: "190px",
          width: "100%",
          backgroundColor: "#f5f5f5",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Product Info */}
      <CardContent sx={{ padding: "10px 12px", flexGrow: 1 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            height: "36px",
            textTransform: "capitalize",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description.substring(0, 70)}
        </Typography>

        <Typography
          variant="body1"
          color="error"
          sx={{ fontWeight: "bold", mt: "6px" }}
        >
          Rs.{Number(price).toLocaleString("en-IN")}
          {discount && (
            <Typography
              component="span"
              sx={{
                color: "gray",
                fontSize: "0.8rem",
                ml: "6px",
              }}
            >
              -{discount}%
            </Typography>
          )}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mt: "4px" }}>
          <Rating
            name="read-only"
            value={rating || 4}
            precision={0.5}
            readOnly
            size="small"
          />
          <Typography variant="caption" sx={{ ml: "4px", color: "gray" }}>
            ({Math.floor(Math.random() * 2000) + 10})
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JustForYouCard;
