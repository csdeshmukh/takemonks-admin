import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  TableRow,
  Skeleton,
  TableCell,
  Typography,
  IconButton,
  Table,
  TableHead,
  TableBody,
} from "@mui/material";
import { addCart, deleteCart, resetCart } from "src/redux/slices/product";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
// import { deleteProduct } from "src/redux/slices/product"; // Import your delete action here

const AllCart = () => {
  const dispatch = useDispatch();
  const isLoading = false;
  const cartItems = useSelector((state) => state?.product?.checkout);
  console.log(cartItems, "Cart Items");
  useEffect(() => {
    // Dispatch the getCart action to fetch cart data
    // dispatch(getCart());
  }, [dispatch]);

  const onDelete = (sku) => {
    // Dispatch the deleteProduct action with the SKU to remove the item from the cart
    dispatch(resetCart());
  };

  return (
    <div>
      <h1>Cart</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price Sale</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.cart.map((product) => {
            const { cover, sku, name, price, quantity, priceSale } = product[0];
            return (
              <TableRow key={sku}>
                <TableCell>
                  {isLoading ? (
                    <Skeleton variant="rectangular" width={100} height={100} />
                  ) : (
                    <Box>
                      <img
                        style={{ height: "50px", width: "50px" }}
                        src={cover} // Use src instead of href
                        alt={name}
                      />
                    </Box>
                  )}
                </TableCell>
                <TableCell>
                  {isLoading ? <Skeleton variant="text" width={50} /> : name}
                </TableCell>
                <TableCell>
                  {isLoading ? (
                    <Skeleton variant="text" width={30} />
                  ) : (
                    quantity
                  )}
                </TableCell>
                <TableCell>
                  {isLoading ? (
                    <Skeleton variant="text" width={50} />
                  ) : (
                    priceSale
                  )}
                </TableCell>
                <TableCell>
                  {isLoading ? (
                    <Skeleton variant="circular" width={40} height={40} />
                  ) : (
                    <IconButton
                      aria-label="delete"
                      color="primary"
                      onClick={() => onDelete(sku)}
                    >
                      <DeleteOutlineRoundedIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllCart;
