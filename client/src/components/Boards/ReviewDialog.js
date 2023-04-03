// dialog for editing ticket

import React, { useState, useEffect } from "react";

import UseAuth from "../../hooks/UseAuth";

// import dialog from material ui
import Dialog from "@material-ui/core/Dialog";

// import dialog title from material ui
import DialogTitle from "@material-ui/core/DialogTitle";

// import dialog content from material ui
import DialogContent from "@material-ui/core/DialogContent";

// import dialog actions from material ui
import DialogActions from "@material-ui/core/DialogActions";

import { updateBoard } from "../../actions/boardActions";

import Button from "@material-ui/core/Button";

import Select from "react-select";

import { getAllUsers } from "../../actions/userActions";
// dialog should be able to edit ticket title, asignees and story points

const ReviewDialog = (props) => {
  const { open, setOpen, board, isReview } = props;
  const { user } = UseAuth();
  const [content, setContent] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isReview) {
      board.review = content;
      updateBoard(user._id, board._id, board);
    } else {
      board.retrospective = content;
      updateBoard(user._id, board._id, board);
    }

    setOpen(false);
  };

  useEffect(() => {
    setContent("");
    if (isReview) {
      setContent(board.review);
    } else {
      setContent(board.retrospective);
    }
  }, [open]);

  return (
    <Dialog fullWidth={true} open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Add {isReview ? "Review" : "Retrospective"}</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => onSubmit(e)}>
          <input
            className="border border-gray-400 p-2 w-full"
            placeholder={isReview ? "Review" : "Retrospective"}
            onChange={(e) => setContent(e.target.value)}
            type="text"
            name="Content"
            value={content}
          />
          <DialogActions>
            <Button type="submit" color="primary">
              Accept
            </Button>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
