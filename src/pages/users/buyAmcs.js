import {
  HeaderBreadcrumbs,
  ProductNewForm,
  Toolbar,
  Page,
} from "src/components";
// notification
import toast from "react-hot-toast";
// api
import { useQuery } from "react-query";
import * as api from "src/services";
import { useTranslation } from "react-i18next";
import BuyAmcs from "src/components/forms/user/buyAmcs";

const buyAmcs = () => {
  return (
    <Page title={`Add User | ${process.env.REACT_APP_DOMAIN_NAME}`}>
      <Toolbar>
        <HeaderBreadcrumbs
          heading="User List"
          links={[
            { name: "dashboard", href: "/" },
            { name: "users", href: "/users" },
            { name: "buy" },
          ]}
        />
      </Toolbar>
      <BuyAmcs></BuyAmcs>
    </Page>
  );
};

export default buyAmcs;
import React, { useState } from "react";

//components

// export default function AddUser() {
//     const { t } = useTranslation("user");

//     return (

//     );
// }
