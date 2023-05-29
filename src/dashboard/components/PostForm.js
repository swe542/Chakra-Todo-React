import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Button, ButtonGroup, Text, Box } from "@chakra-ui/react";

import "../../App.css";
import { Link } from "react-router-dom";
const PostForm = ({
  formData,
  handleInputChange,
  isEditing,
  handleUpdatePost,
  handleAddPost,
  setValue,
  handleAddHobby,
  hobby,
  setHobby,
  value,
}) => {
  const handleDeleteHobby = (event, index) => {
    event.preventDefault();
    const updatedHobby = hobby.filter((_, id) => id !== index);
    setHobby(updatedHobby);
  };

  return (
    <FormControl mt={{ base: "55%", md: "15%" }} ml={{ base: "0", md: "60%" }}>
      <Box
        border={{ base: "0", md: "1px " }}
        borderColor="black"
        w={{ base: "90vw", md: "50vw" }}
        m={{ base: "0 0 ", md: "20px auto 0 auto" }}
        padding={{ base: "5px 8px 5px 8px", md: "20px 50px 20px 50px" }}
      >
        <Text textAlign="center" fontSize="3xl" mb="4px">
          {isEditing ? "Update Post" : "Add Post"}
        </Text>

        <FormLabel htmlFor="title">Title:</FormLabel>
        <Input
          mb="6px"
          size="xs"
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />

        <FormLabel htmlFor="title">UserId:</FormLabel>
        <Input
          mb="6px"
          size="xs"
          type="number"
          id="userId"
          name="userId"
          value={formData.userId}
          onChange={handleInputChange}
        />

        <FormLabel htmlFor="body">Body:</FormLabel>

        <Textarea
          mb="6px"
          size="xs"
          id="body"
          name="body"
          value={formData.body}
          onChange={handleInputChange}
        />

        <Flex mt={3}>
          <FormLabel htmlFor="hobbies">Hobbies</FormLabel>

          <Input
            size="xs"
            name="hobbies"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            width={"42%"}
          />
          <Button
            size="xs"
            marginLeft="2px"
            colorScheme="teal"
            onClick={() => {
              handleAddHobby(); //value is changed in child so setValue("") done in child
              setValue("");
            }}
          >
            +
          </Button>
        </Flex>
        {hobby.map((item, index) => {
          //to display hobby if added or if exists in editing post
          return (
            <Flex key={index} marginTop="7px" marginLeft="14%">
              <Box width='49%'>
                <Input size="xs" value={item} />
              </Box>
          
                
                <Button
              
                size='xs'
                  m="3px"
                  colorScheme="teal"
                  onClick={(event) => handleDeleteHobby(event, index)}
                >
                  -
                </Button>
             
            </Flex>
          );
        })}

        <Flex mt="10px" ml="80%">
         
         
            {isEditing ? (
              <Button
                type="button"
                colorScheme="teal"
                onClick={handleUpdatePost}
              >
                Update
              </Button>
            ) : (
            
              <Button
                type="button"
                colorScheme="teal"
                size="sm"
                onClick={handleAddPost}
              >
                Add
              </Button>
             
            )}
        
        </Flex>
      </Box>
    </FormControl>
  );
};
export default PostForm;
