// Import Material-UI components and styles
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

// Import the Product interface
import Product from "../Interfaces/Product";

// Define the props for the MultiActionAreaCard component
interface MultiActionAreaCardProps {
  product: Product;
  addToCart: (product: Product) => void; // Lägg till denna prop för att skicka med addToCart-funktionen
}

// dynamic card that adapts to each product
export default function MultiActionAreaCard({
  product,
  addToCart,
}: MultiActionAreaCardProps) {
  const handleAddToCart = () => {
    addToCart(product); // Anropa addToCart-funktionen med aktuell produkt
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={product.image}
          alt={product.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="body1" color="text.primary">
            Antal i lager: {product.inStock} St
          </Typography>
          <Typography variant="h6" color="text.primary">
            Pris: {product.price} kr
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={handleAddToCart} size="small" color="primary">
          Lägg till i varukorgen
        </Button>
      </CardActions>
    </Card>
  );
}
