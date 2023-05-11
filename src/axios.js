//this library is used in alternative to postman 
//to get all the requests for the pages to load
import axios from "axios";

const instance=axios.create({
    baseURL:"https://api.themoviedb.org/3",
});

export default instance;