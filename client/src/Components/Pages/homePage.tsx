import {
  Box,
  Typography,
  styled,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addItemToCart,
  fetchCategories,
  fetchItems,
} from "../../Redux/cart/cartActions";
import { useState, useEffect } from "react";
import { Category, CartItem } from "../../Redux/cart/cartTypes";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#f5f5f5",
  color: theme.palette.text.primary,
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  backgroundColor: "#4caf50",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#388e3c",
  },
}));

const HomePage = () => {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState<Category | undefined>(undefined); // עדכון לסוג הנכון של הקטגוריה
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: any) => state.cart.items);
  const categories = useAppSelector((state: any) => state.cart.categories);
  const totalItems = cartItems.reduce(
    (total: number, item: CartItem) => total + item.quantity,
    0
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchItems());
  }, [dispatch]);

  const handleAddItem = () => {
    if (itemName && category) {
      const existingItem = cartItems.find(
        (item: CartItem) =>
          item.name === itemName && item.category.name === category.name
      );

      if (existingItem) {
        dispatch(
          addItemToCart({ ...existingItem, quantity: existingItem.quantity + 1 })
        );
      } else {
        dispatch(
          addItemToCart({
            name: itemName,
            category, // כאן הקטגוריה היא אובייקט
            quantity: 1,
          })
        );
      }

      setItemName("");
      setCategory(undefined); // כדי לאפס את הקטגוריה אחרי הוספת המוצר
    }
  };

  const groupItemsByCategory = () => {
    const groupedItems: { [key: string]: CartItem[] } = {};

    cartItems.forEach((item: CartItem) => {
      const categoryName = item.category.name; // גישה לשם מתוך האובייקט
      if (!groupedItems[categoryName]) {
        groupedItems[categoryName] = [];
      }
      groupedItems[categoryName].push(item);
    });

    return groupedItems;
  };

  const groupedItems = groupItemsByCategory();

  return (
    <StyledBox>
      <Typography variant="h3" gutterBottom>
        רשימת קניות
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <TextField
            label="שם מוצר"
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            value={category ? category.name : ""} // מציג את שם הקטגוריה הנוכחית
            onChange={(e) =>
              setCategory(
                categories.find((cat: Category) => cat.name === e.target.value)
              )
            } // עדכון לקטגוריה הנכונה
            displayEmpty
            fullWidth
          >
            <MenuItem value="" disabled>
              קטגוריה
            </MenuItem>
            {categories.map((cat: Category) => (
              <MenuItem key={cat.id} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>

        </Grid>
        <Grid item xs={12}>
          <StyledButton variant="contained" onClick={handleAddItem}>
            הוסף מוצר
          </StyledButton>
        </Grid>
      </Grid>
      <Typography variant="h5" gutterBottom>
        סה"כ מוצרים בסל: {totalItems}
      </Typography>
      <Box mt={4} width="100%">
        <Typography variant="h6" gutterBottom>
          מוצרים בסל:
        </Typography>
        {Object.keys(groupedItems).map((categoryName: string) => (
          <Box key={categoryName} mb={2}>
            <Typography variant="h6" gutterBottom>
              {categoryName} (
              {groupedItems[categoryName].reduce(
                (total: number, item: CartItem) => total + item.quantity,
                0
              )}
              )
            </Typography>
            {groupedItems[categoryName].map((item: CartItem, index: number) => (
              <Box key={index} mb={1}>
                <Typography variant="body1">
                  {item.name} ({item.quantity})
                </Typography>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </StyledBox>
  );
};

export default HomePage;
