import React, { useEffect } from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

export default function SimplePopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const divRef = React.useRef();


  function handleClose() {
    setAnchorEl(null);
  }

  useEffect(() => {
    setAnchorEl(divRef.current);
  }, [divRef]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Typography ref={divRef}></Typography>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <Typography>Click to expand comments section</Typography>
      </Popover>
    </div>
  );
}
