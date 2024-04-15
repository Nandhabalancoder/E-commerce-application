import React from "react";
import { Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "10vh",
        background: "#f5c011",
        marginTop: 100,
      }}
    >
      <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <footer
          style={{
            background: "#f5c011",
            color: "#fff",
            padding: "20px 0",
            textAlign: "center",
          }}
        >
          {/* Footer content */}
          <Typography
            variant="body1"
            color="inherit"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            © 2024 My Website. All rights reserved.
          </Typography>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
