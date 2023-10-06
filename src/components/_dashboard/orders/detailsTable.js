import React from "react";
// material
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  Box,
  Skeleton,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const Tablehead = ["product", "color", "quantity", "size", "price"];
const ThumbImgStyle = styled("img")(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: "cover",
  margin: theme.spacing(0, 2),
  borderRadius: theme.shape.borderRadiusSm,
}));
export default function ItemsTable({ data, isLoading, currency, amcsItem }) {
  console.log(data, "data");
  console.log(amcsItem);
  const { t } = useTranslation("common");
  return (
    <TableContainer>
      <Table sx={{ minWidth: 800, overflow: "auto" }}>
        <TableHead>
          <TableRow>
            {Tablehead.map((headCell, i) => (
              <TableCell key={`head-${i}`}>{t(headCell)}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(isLoading ? Array.from(new Array(3)) : data.items).map((row, i) => (
            <TableRow key={`row-${i}`}>
              <TableCell>
                {row ? (
                  <Box
                    sx={{
                      py: 2,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ThumbImgStyle alt={row?.name} src={row?.cover} />
                    <Typography variant="subtitle2" noWrap>
                      {row?.name}
                    </Typography>
                  </Box>
                ) : (
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Skeleton variant="rect" width={64} height={64} />
                    <Skeleton variant="text" width={100} />
                  </Stack>
                )}
              </TableCell>
              <TableCell>
                {row ? (
                  row.color ? (
                    row.color
                  ) : (
                    "N/A"
                  )
                ) : (
                  <Skeleton variant="text" width={100} />
                )}
              </TableCell>

              <TableCell>
                {row ? row?.quantity : <Skeleton variant="text" width={100} />}
              </TableCell>
              <TableCell>
                {row ? row?.size : <Skeleton variant="text" width={100} />}
              </TableCell>
              <TableCell>
                {row ? (
                  `${currency || "US$"} ${row.priceSale}`
                ) : (
                  <Skeleton variant="text" width={100} />
                )}
              </TableCell>
            </TableRow>
          ))}
          {amcsItem?.map((amcsData1, i) => (
            <TableRow>
              <TableCell style={{ display: "flex" }}>
                <img
                  style={{ height: "100px", width: "100px" }}
                  alt="product image"
                  src={amcsData1.priceofAmcs?.cover?.url}
                />
                <></>
              </TableCell>
              <TableCell>
                {" "}
                {isLoading ? (
                  <Skeleton variant="text" width={120} />
                ) : (
                  amcsData1.priceofAmcs.title
                )}
                <br></br>
                {isLoading ? (
                  <div variant="text" width={120} />
                ) : (
                  amcsData1.description
                )}
              </TableCell>
              <TableCell align="left">
                {isLoading ? (
                  <Skeleton variant="text" width={38} />
                ) : (
                  amcsData1.quantity
                )}
              </TableCell>
              <TableCell>
                <>
                  <div component="span" variant="body2" color="text.secondary">
                    duration:
                  </div>
                  {amcsData1.priceofAmcs.durationCount}{" "}
                  {amcsData1.priceofAmcs.durationType}
                </>
              </TableCell>

              <TableCell align="left">
                {isLoading ? (
                  <div variant="text" width={38} />
                ) : (
                  amcsData1.priceofAmcs.price
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
