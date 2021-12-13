import axios from "axios";
const apiEndPoint = "http://localhost:3001/posts/";

export const fetchPosts = async () => await axios.get(apiEndPoint);
export const createPost = async (post) => await axios.post(apiEndPoint, post);
