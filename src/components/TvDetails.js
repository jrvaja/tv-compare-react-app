import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  headerItem: {
    background: "#c3c3c3",
  },
  media: {
    height: 200,
    margin: "0 auto",
    display: "block",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    width: "100%",
  },
  particularHead: {
    height: 248,
  },
}));

const TvDetails = ({ tvs, featuresList, eleIndex }) => {
  const classes = useStyles();
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedTv, setSelectedTv] = useState(null);

  const handleChange = (event) => {
    const selected = event.target.value;
    setSelectedModel(selected);
    if (selected) {
      setSelectedTv(tvs[selected]);
    }
  };

  const tvSelectOption = Object.keys(tvs).map((key) => (
    <MenuItem value={key} key={key}>
      {tvs[key].title}
    </MenuItem>
  ));

  return (
    <Grid item xs={4}>
      <div>
        <div>
          <img
            className={classes.media}
            src={
              selectedTv !== null && selectedTv !== ""
                ? selectedTv.image
                : "https://dummyimage.com/300x200/c3c3c3/c3c3c3.png"
            }
            alt=""
          />
          {/*  */}
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">
              Choose a product
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedModel}
              onChange={handleChange}
            >
              <MenuItem value="">Choose a Product</MenuItem>
              {tvSelectOption}
            </Select>
          </FormControl>
        </div>
        <List>
          {selectedTv !== null && selectedTv !== ""
            ? Object.keys(featuresList).map((key, index) => {
                const items = featuresList[key].map((item) => {
                  const val = selectedTv[key][item];
                  return (
                    <ListItem>
                      <ListItemText primary={val} key={val} />
                    </ListItem>
                  );
                });

                return (
                  <React.Fragment key={`${eleIndex}-${key}`}>
                    <ListItem className={classes.headerItem}>
                      <ListItemText primary="&nbsp;" />
                    </ListItem>
                    {items}
                  </React.Fragment>
                );
              })
            : null}
        </List>
      </div>
    </Grid>
  );
};

export default TvDetails;
