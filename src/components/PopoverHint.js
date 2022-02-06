import React, { useEffect } from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

export default function SimplePopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const divRef = React.useRef();


  // function handleClose() {
  //   setAnchorEl(null)
  // }

  useEffect(() => {
    setAnchorEl(divRef.current);
  }, [divRef]);

  let open = props.subNotFound;
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Typography ref={divRef}></Typography>
      <Popover
        id={id}
        open={props.subNotFound}
        anchorEl={anchorEl}
        onClose={props.handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <Typography>Subreddit not found</Typography>
      </Popover>
    </div>
  );
}
