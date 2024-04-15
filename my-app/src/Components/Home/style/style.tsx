import styled from "@emotion/styled";
import {  Container, Typography } from "@mui/material";

export const ProductCardWrapper = styled(Container)`
  margin-top: 100px;
`;

export const ProductDescription = styled(Typography)`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Number of lines to show */
    -webkit-box-orient: vertical;
    line-height: 1.5; /* Adjust line height as needed */
`;
export const ProductTitle = styled(Typography)`
  color: black;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Number of lines to show */
  -webkit-box-orient: vertical;
  line-height: 1.5; /* Adjust line height as needed */
`;
export const CenteredContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top:80px;
`;
