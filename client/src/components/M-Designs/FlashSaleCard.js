import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

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

const FlashSaleCard = ({
  price,
  oldPrice = 108,
  title,
  description,
  discount,
  image,
}) => {
  return (
    <Card sx={cardStyles}>
      {/* Product Image */}
      <Box
        sx={{
          height: "190px",
          width: "100%",
          backgroundColor: "#fff",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Product Info */}
      <CardContent
        sx={{ padding: "10px 12px", flexGrow: 1, position: "relative" }}
      >
        {description && (
          <Typography
            variant="body1"
            color="#333"
            sx={{
              display: "-webkit-box",
              fontWeight: 400,
              textTransform: "capitalize",
              fontSize: "0.95rem",
              lineHeight: "1.3",
              mt: "6px",
              height: "38px", // consistent height for two lines
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 2, // limit to 2 lines
              WebkitBoxOrient: "vertical",
              wordBreak: "break-word",
            }}
          >
            {description}
          </Typography>
        )}

        <Typography
          variant="body1"
          color="error"
          sx={{ fontWeight: "bold", mt: "6px" }}
        >
          Rs.{Number(price).toLocaleString("en-IN")}
        </Typography>

        {oldPrice && (
          <Typography
            component="span"
            sx={{
              color: "gray",
              fontSize: "0.8rem",
              textDecoration: "line-through",
            }}
          >
            Rs.{oldPrice}
          </Typography>
        )}

        <Typography
          component="span"
          sx={{
            fontSize: "0.8rem",
            position: "absolute",
            left: "57px",
            bottom: "25px",
          }}
        >
          -{discount}%
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FlashSaleCard;
