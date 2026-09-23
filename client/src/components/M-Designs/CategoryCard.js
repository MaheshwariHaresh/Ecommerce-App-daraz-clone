import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function CategoryCard({ name, image }) {
  return (
    <Card
      sx={{
        height: 150,
        bgcolor: "#fff",
        boxShadow: "none",
        borderRadius: "none",
        transition: "transform 0.3s ease",
        "&:hover": {
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        },
        "&& .MuiCardActionArea-root": {
          bgcolor: "#fff !important",
        },
        "&& .MuiCardActionArea-root:hover": {
          bgcolor: "#fff !important",
        },
        "&& .MuiCardActionArea-focusHighlight": {
          display: "none !important",
          bgcolor: "transparent !important",
        },
        "&& .MuiTouchRipple-root": {
          display: "none !important",
        },
      }}
    >
      <CardActionArea
        disableRipple
        disableTouchRipple
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: "10px",
          bgcolor: "#fff !important",
          "&:hover": {
            bgcolor: "transparent !important",
          },
          /* double-guard inside CardActionArea too */
          "& .MuiCardActionArea-focusHighlight": {
            display: "none !important",
            bgcolor: "transparent !important",
          },
          "& .MuiTouchRipple-root": {
            display: "none !important",
          },
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{
            width: 80,
            height: 80,
            objectFit: "contain",
            mb: "8px",
            backgroundColor: "transparent",
          }}
        />
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            fontSize: "0.8rem",
            color: "#333",
            textTransform: "capitalize",
            backgroundColor: "transparent",
          }}
        >
          {name}
        </Typography>
      </CardActionArea>
    </Card>
  );
}
