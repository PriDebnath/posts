import React, { useState } from "react";
import { Button } from "@mui/material";
import { Dialog, DialogProps } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogContentText } from "@mui/material";
import { DialogTitle } from "@mui/material";

function FullPostModal(props: any) {
  const { open, setOpen, post } = props;
  const [scroll, setScroll] = useState<DialogProps["scroll"]>("paper");

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{post.title}</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {post.body}
          </DialogContentText>
          <DialogContentText sx={{ padding: "1rem 0 0.5rem 0", color: "blue" }}>
            {" "}
            Tags - {post.tags?.join(" , ")}
          </DialogContentText>
          <DialogContentText
            sx={{ padding: "0.5rem 0 1rem 0", fontFamily: "mono" }}
          >
            {" "}
            {post.time}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button sx={{ color: "red" }} onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default FullPostModal;
