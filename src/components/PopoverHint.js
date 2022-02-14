import React, { useEffect, useRef } from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

export default function SimplePopover(props) {
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const divRef = React.useRef();


  // function handleClose() {
  //   setAnchorEl(null)
  // }

  // useEffect(() => {
  //   setAnchorEl(divRef.current);
  // }, [divRef]);

  let open = props.subNotFound;
  const id = open ? "simple-popover" : undefined;
  const ref = useRef(null);


  return (
    <div>
      <div ref={ref}></div>
      <Popover
        id={id}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 80, left: 100 }}
        open={props.subNotFound}
        // anchorEl={ref}
        onClose={props.handleClose}
        anchorOrigin={{
          vertical: "center",
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
