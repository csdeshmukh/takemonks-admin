import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// slices
import SettingsReducer from "./slices/settings";
import ProductReducer from "./slices/product";

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};
const productPersistConfig = {
  key: "product",
  storage,
  keyPrefix: "redux-",
  whitelist: ["sortBy", "checkout"],
};
const settingsPersistConfig = {
  key: "user",
  storage,
  keyPrefix: "redux-",
  whitelist: ["currency", "symbol", "mode", "language"],
};

const rootReducer = combineReducers({
  settings: persistReducer(settingsPersistConfig, SettingsReducer),
  product: persistReducer(productPersistConfig, ProductReducer),
});

export { rootPersistConfig, rootReducer };
