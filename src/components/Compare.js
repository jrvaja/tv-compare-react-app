import React, {
  useEffect,
  useState,
  // useState
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import fetchRecords from "../services/tvRecords";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import map from "lodash/map";
import get from "lodash/get";
import set from "lodash/set";
import TvDetails from "./TvDetails";

const allowToCompare = 2;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  headerItem: {
    background: "#c3c3c3",
  },
  media: {
    height: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  particularHead: {
    height: 248,
  },
}));

const Compare = () => {
  const classes = useStyles();
  const [featuresList, setFeaturesList] = useState([]);
  const [tvs, setTvs] = useState({});

  useEffect(() => {
    async function fetchData() {
      let features = {};
      let tv = {};
      const response = await fetchRecords();

      const {
        compareSummary: { titles, images, productPricingSummary },
        featuresList,
      } = response;

      const updatedFeatureList = {};
      featuresList.forEach((feature) => {
        let features = {};
        feature.features.forEach((item) => {
          features[item.featureName] = item.values;
        });
        updatedFeatureList[feature.title] = features;
      });

      // Preparing Features
      featuresList.forEach((element) => {
        features[element.title] = map(element.features, "featureName");
      });
      setFeaturesList(features);

      // Preparing TVS
      Object.keys(titles).forEach((key) => {
        tv[key] = {
          ...titles[key],
          image: images[key],
          summary: productPricingSummary[key],
        };
        Object.keys(features).forEach((featureKey) => {
          features[featureKey].forEach((subKey) => {
            set(
              tv,
              `${key}.${featureKey}.${subKey}`,
              get(updatedFeatureList, `${featureKey}.${subKey}.${key}`)
            );
          });
        });
      });
      setTvs(tv);
    }
    fetchData();
  }, [setFeaturesList, setTvs]);

  const featuresListEle = Object.keys(featuresList).map((key) => {
    const items = featuresList[key].map((item) => {
      return (
        <ListItem>
          <ListItemText primary={item} />
        </ListItem>
      );
    });

    return (
      <React.Fragment>
        <ListItem className={classes.headerItem}>
          <ListItemText primary={key} />
        </ListItem>
        {items}
      </React.Fragment>
    );
  });

  return (
    <React.Fragment>
      <Container maxWidth="xl" className={classes.root}>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item xs={3}>
                <div className={classes.paper}>
                  <div className={classes.particularHead}>
                    <h2>Compare</h2>
                  </div>
                  <List>{featuresListEle}</List>
                </div>
              </Grid>
              {Array.from(Array(allowToCompare)).map((i) => (
                <TvDetails tvs={tvs} featuresList={featuresList} eleIndex={i} />
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default React.memo(Compare);
