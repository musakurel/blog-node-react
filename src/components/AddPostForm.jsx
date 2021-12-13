import React, { useState } from "react";
import { createPost } from "../actions/post";
import FileBase64 from "react-file-base64";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import {
  Button,
  TextField,
  Select,
  Input,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useForm } from "react-hook-form";

import { Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

const tags = ["fun", "prograaming", "normal"];
console.log(tags);
const postSchema = yup.object().shape({
  title: yup.string().required,
  subtitle: yup.string().required,
  content: yup.string().min(20).required,
  tag: yup.mixed().oneOf(tags),
});

const AddPostForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const { register, handleSubmit, control, errors, reset } = useForm({
    resolver: yupResolver(postSchema),
  });

  const onSubmit = (data) => {
    //dispatch creatre form actions
    dispatch(createPost({ ...data, image: file }));
    clearForm();
  };
  const clearForm = () => {
    reset();
    setFile(null);
    handleClose();
  };

  const classes = useStyles();
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Yeni yazı oluştur</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Yeni bir yazı eklemek için aşağıdaki formu doldurun
        </DialogContentText>
        <div className={classes.root}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="title"
              label="Başlık"
              name="title"
              variant="outlined"
              className={classes.textField}
              size="small"
              {...register("message", {
                required: "Required",
              })}
              fullWidth
            />
            <TextField
              id="subtitle"
              label="Alt Başlık"
              name="subtitle"
              variant="outlined"
              className={classes.textField}
              size="small"
              {...register("message", {
                required: "Required",
              })}
              fullWidth
            />

            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  input={<Input />}
                  className={classes.textField}
                  fullWidth
                >
                  {tags.map((tag, index) => {
                    return (
                      <MenuItem key={index} value={tag}>
                        {tag}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
              control={control}
              name="tag"
              defaultValue={tags[0]}
            />

            <TextField
              id="content"
              label="İçerik"
              name="content"
              multiline
              rows={4}
              variant="outlined"
              className={classes.textField}
              size="small"
              {...register("message", {
                required: "Required",
              })}
              fullWidth
            />

            <FileBase64
              multiple={false}
              onDone={({ base64 }) => setFile(base64)}
            />
          </form>
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={clearForm}>
          Vazgeç
        </Button>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          onClick={() => handleSubmit(onSubmit)()}
        >
          Yayınla
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPostForm;
