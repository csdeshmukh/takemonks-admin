import React, { useState, useEffect } from "react";
import {
  Box,
  TableRow,
  Skeleton,
  TableCell,
  Typography,
  Stack,
  IconButton,
  Tooltip,
  Table,
  TableHead,
  TableBody,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useTranslation } from "react-i18next";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "react-query";
import toast from "react-hot-toast";
import { HeaderBreadcrumbs, Page } from "src/components";
import * as api from "src/services"; // Import your API functions here
import { fDateShort } from "src/utils/formatTime";
import { ar, enUS } from "date-fns/locale";
const headData = [
  { id: "amc", label: "AMC", alignRight: false, sort: true },
  { id: "product", label: "Product", alignRight: false, sort: true },
  { id: "price", label: "Price", alignRight: false },
  { id: "durationType", label: "Duration Type", alignRight: false },
  { id: "durationCount", label: "Duration Count", alignRight: false },
  { id: "createdAt", label: "Created At", alignRight: false, sort: true },
  { id: "", label: "Actions", alignRight: true },
];

const BuyAmcs = () => {
  const { t } = useTranslation("amcs");
  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const searchParam = searchParams.get("search");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedAmcId, setSelectedAmcId] = useState(null);
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();
  const { language } = i18n;
  const deleteAmcMutation = useMutation(api.deleteAmc, {
    onSuccess: () => {
      queryClient.invalidateQueries(["amcs", true, searchParam, pageParam]);
      toast.success("AMC deleted successfully!");
      setOpenDeleteDialog(false);
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Something went wrong!");
      setOpenDeleteDialog(false);
    },
  });
  const {
    data: amcsData,
    isLoading,
    isError,
  } = useQuery(
    ["amcs", searchParam, pageParam],
    () => api.getAmcs(+pageParam || 1, searchParam || ""),
    {
      onError: (err) => {
        toast.error(err.response.data.message || "Something went wrong!");
      },
    }
  );
  let data1 = [];
  //   for (let tempdata of amcsData.data) {
  //     data1.push(tempdata);
  //   }3
  if (amcsData != undefined) {
    console.log(amcsData.data, "data");
    data1 = [...amcsData.data];
    for (let dat of data1) {
      console.log(dat.productId.name);
      if (data1.length) {
        console.log(data1[0].description);
      }
    }
  }

  const navigate = useNavigate();

  const handleDeleteClick = (amcId) => {
    setSelectedAmcId(amcId);
    setOpenDeleteDialog(true);
  };

  const handleEditClick = (amcId) => {
    navigate(`/amcs/edit/${amcId}`);
  };

  return amcsData ? (
    <Page title={`AMCs | ${process.env.REACT_APP_DOMAIN_NAME}`}>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              background: (theme) => theme.palette.primary.main,
            }}
          >
            {headData.map((headCell) => (
              <TableCell
                key={Math.random()}
                align={headCell.alignRight ? "right" : "left"}
                sx={{
                  color: "common.white",
                  bgcolor: "transparent",
                }}
              >
                {t(headCell.label)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* ... (Error and loading handling code remains the same) */}
          {data1.map((row) => (
            <TableRow hover key={row._id}>
              <TableCell
                component="th"
                scope="row"
                padding="none"
                sx={{ maxWidth: 300 }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {isLoading ? (
                    <Skeleton
                      variant="rectangular"
                      width={50}
                      height={50}
                      sx={{ borderRadius: 1 }}
                    />
                  ) : row.cover ? (
                    <img
                      style={{ height: "50px", width: "50px" }}
                      alt={row.cover.title}
                      src={row.cover.url}
                    />
                  ) : (
                    <div style={{ height: "50px", width: "50px" }}></div>
                  )}
                  <Typography variant="subtitle2" noWrap>
                    {isLoading ? (
                      <Skeleton variant="text" width={120} sx={{ ml: 1 }} />
                    ) : row.title.length > 15 ? (
                      `${row.title.slice(0, 15)}...`
                    ) : (
                      row.title
                    )}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell component="th" scope="row" padding="10px">
                {isLoading ? (
                  <Skeleton variant="text" />
                ) : row?.productId?.name?.length > 15 ? (
                  `${row?.productId?.name?.slice(0, 15)}...`
                ) : (
                  row?.productId?.name
                )}
              </TableCell>
              <TableCell component="th" scope="row" padding="10px">
                {isLoading ? <Skeleton variant="text" /> : row.price}
              </TableCell>
              <TableCell component="th" scope="row" padding="10px">
                {isLoading ? (
                  <Skeleton variant="text" />
                ) : (
                  row.durationType.toUpperCase()
                )}
              </TableCell>
              <TableCell component="th" scope="row" padding="10px">
                {isLoading ? <Skeleton variant="text" /> : row.durationCount}
              </TableCell>
              <TableCell>
                {isLoading ? (
                  <Skeleton variant="text" padding="10px" />
                ) : (
                  <>
                    {fDateShort(row.createdAt, language !== "ar" ? enUS : ar)}
                  </>
                )}
              </TableCell>
              <TableCell align="left">
                <Stack direction="row" justifyContent="flex-end">
                  {isLoading ? (
                    <>
                      <Skeleton
                        variant="circular"
                        width={34}
                        height={34}
                        sx={{ mr: 1 }}
                      />
                      <Skeleton variant="circular" width={34} height={34} />
                    </>
                  ) : (
                    <>
                      <Tooltip title="Preview">
                        <IconButton
                          onClick={() => navigate(`/users/${row?._id}`)}
                        >
                          <RemoveRedEyeIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Add Product">
                        <IconButton
                          onClick={() =>
                            navigate(`/users/${row?._id}/addproduct`)
                          }
                        >
                          <AddShoppingCartIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Page>
  ) : null;
};

export default BuyAmcs;
