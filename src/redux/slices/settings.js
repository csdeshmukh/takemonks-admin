import { paramCase } from "change-case";
import { sum, map, filter, uniqBy } from "lodash";
import { createSlice } from "@reduxjs/toolkit";

// ----------------------------------------------------------------------

let shippingFee = "0";
const initialState = {
  isAuthenticated: false,
  user: null,
  count: 0,
  currency: "USD",
  symbol: "US$",
  unitRate: null,
  mode: "light",
  language: "en",
  isInitialized: false,
  cartItems: [],
  checkout: {
    activeStep: 0,
    cart: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: parseInt("10"),
    billing: null,
  },
};

const slice = createSlice({
  name: "settings",
  initialState,

  reducers: {
    setLogin(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setLogout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setCurrency(state, action) {
      state.currency = action.payload.prefix;
      state.symbol = action.payload.symbol;
    },
    setInitialize(state) {
      state.isInitialized = true;
    },

    setUnitRate(state, action) {
      state.unitRate = action.payload;
    },
    setCount(state) {
      state.count = state.count + 1;
    },
    setThemeMode(state, action) {
      state.mode = action.payload;
    },
    setLanguage(state, action) {
      state.language = action.payload;
    },
    setCartItems(state, action) {
      console.log("I am  here ");
      const product = action.payload;
      console.log(action.payload, "here in the payLoads");
      const updatedProduct = {
        ...product,
        sku: paramCase(
          `${product[0].name} ${product[0].size} ${product[0].color}`
        ),
      };
      console.log(updatedProduct, " updated data here ");
      console.log(product[0].name);
      const isEmptyCart = state.checkout.cart.length === 0;
      if (isEmptyCart) {
        state.checkout.cart = [...state.checkout.cart, updatedProduct];
        console.log(state.checkout.cart, "isEmpty");
      } else {
        state.checkout.cart = map(state.checkout.cart, (_product) => {
          const isExisted = _product[0].id === updatedProduct[0].id;
          if (isExisted) {
            return {
              ..._product,
              quantity: _product.quantity + 1,
            };
          }
          console.log(_product, "_product here ");
          return _product;
        });
      }
      state.checkout.cart = uniqBy(
        [...state.checkout.cart, updatedProduct],
        "sku"
      );
    },
    getCart(state, action) {
      const cart = action.payload;
      const subtotal = 0;
      //  cart.reduce((acc, prd) => {
      //   const priceSale = prd.priceSale || 0;
      //   const quantity = prd.quantity || 1;
      //   const priceofAmcs = parseFloat(prd.priceofAmcs?.price.toString()) || 0;

      //   const productSubtotal =
      //     priceSale !== 0 ? priceSale * quantity : priceofAmcs * quantity;

      //   return acc + productSubtotal;
      // }, 0);

      let sub = parseFloat(subtotal);
      console.log(subtotal);
      const discount = cart.length === 0 ? 0 : state.checkout.discount;
      const shipping = cart.length === 0 ? 0 : state.checkout.shipping;
      const billing = cart.length === 0 ? 0 : state.checkout.billing;

      let abc = "";
      abc += shipping;
      console.log(" here in the shipping ", shipping, discount, sub);

      let totalCharge = sub + discount;
      return {
        ...state,
        checkout: {
          ...state.checkout,
          cart,
          discount,
          shipping,
          billing,
          subtotal,
          total: sub + discount + parseInt(abc),
        },
      };
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  setLogin,
  setLogout,
  setCount,
  setCurrency,
  setUnitRate,
  setInitialize,
  setThemeMode,
  setCartItems,
  getCart,
} = slice.actions;

// ----------------------------------------------------------------------
