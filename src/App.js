import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./dashboard/components/Header";
import Body from "./dashboard/components/Body";
import PostForm from "./dashboard/components/PostForm";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import { Box, ChakraProvider, Text } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import SideBar from "./dashboard/sidebar/SideBar";


const baseURL = "https://jsonplaceholder.typicode.com/posts";

function Task() {
 
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    userId: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredItems = posts.filter((post) => {
    return post.title.toLowerCase().includes(query.toLowerCase()); //if query is empty string (""), display all cause all strings have empty string
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseURL}?userId=3`)
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    if (formData.title.trim() == "") {
      toast("Title needed.");
    } else {
      const newPost = { ...formData, id: uuidv4(), hobbies: hobby.toString() }; //to separate hobby array elements with comma
      setPosts((prevState) => [...prevState, newPost]);
      setFormData({
        title: "",
        body: "",
        userId: "",
      });
      setHobby([]); //to empty hobby array so nothing is displayed after posting,
    }
  };

  const handleEditPost = (post) => {
    setFormData(post);
    setIsEditing(true);
    if (post.hobbies) {
      //if hobbies exist in the post then to display them in hobby array
      setHobby(post.hobbies.split(","));
    } else {
      setHobby([]); //else show nothing with empty array
    }
    
  };

  const handleUpdatePost = (e) => {
    e.preventDefault();
    const updatedForm = { ...formData, hobbies: hobby.toString() }; //if hobbies exists then overwrite else new hobbies created
    if (formData.title.trim() === "") {
      toast("Title Required");
    } else {
      const updatedPosts = posts.map((post) =>
        post.id === formData.id ? updatedForm : post
      );
      setPosts(updatedPosts);
      setIsEditing(false);
      setFormData({
        title: "",
        body: "",
        userId: "",
      });
      setHobby([]); //to empty hobby array so nothing is displayed after updating
    }
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  const handleSortPosts = () => {
    const titleArray = posts.map((post) => post.title); //only titles
    const sortedTitleArray =
      sortOrder === "asc" ? titleArray.sort() : titleArray.reverse();
    // console.log("SortedTitleArray",sortedTitleArray)
    const sortedPosts = sortedTitleArray.map(
      (
        title //gives posts with ordered titles
      ) => posts.find((post) => post.title === title)
    );
    // console.log("sortedPosts",sortedPosts)
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setPosts(sortedPosts);
  };

  const [hobby, setHobby] = useState([]); //array to store hobby given by value
  const [value, setValue] = useState(""); //input value pushed to hobby

  function handleAddHobby() {
    // e.preventDefault();
    if (value != "") {
      setHobby((prev) => [...prev, value]);
    }
  }

  return (
    <BrowserRouter>
      <ChakraProvider>
        <Box m={"5%"} width={"max-content"} top="0">
          <Routes>
            <Route path="/" element={<SideBar />}>
              <Route
                index
                element={<>
                <Box mt={{base:'55%', md:'5%'}}></Box>
                <Text  textAlign={{base:'center',md:'none'}} ml={{base:'none',md:'50%'}} fontSize={{base:"2xl",md:"3xl"}} >Posts</Text>
                  <Body
                    handleEditPost={handleEditPost}
                    handleDeletePost={handleDeletePost}
                    filteredItems={filteredItems}
                    loading={loading}
                  />
                  </>
                }
              />
              <Route path="table" element={
              <>
                <Header
        sortOrder={sortOrder}
        handleSortPosts={handleSortPosts}
        query={query}
        setQuery={setQuery}
      />
              <Body
                    handleEditPost={handleEditPost}
                    handleDeletePost={handleDeletePost}
                    filteredItems={filteredItems}
                    loading={loading}
                  />
                  </>
                  } />
              <Route
                path="form"
                element={
                  <PostForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    isEditing={isEditing}
                    handleUpdatePost={handleUpdatePost}
                    handleAddPost={handleAddPost}
                    setValue={setValue}
                    handleAddHobby={handleAddHobby}
                    hobby={hobby}
                    setHobby={setHobby}
                    value={value}
                  />
                }
              />
            </Route>
          </Routes>
        

          <Toaster />
        </Box>
      </ChakraProvider>
    </BrowserRouter>
  );
}
export default Task;


