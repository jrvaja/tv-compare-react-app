import axios from "axios";

const fetchRecords = () => {
  return axios
    .get("http://www.mocky.io/v2/5e86ec5531000011d8814754")
    .then((data) => {
      return data.data.products;
    })
    .catch((e) => {});
};

export default fetchRecords;
