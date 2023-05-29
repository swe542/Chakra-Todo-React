import { Box, Text, List, ListItem, Divider } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <Box
        p={{ base: "0 0 15px 0", md: "0px 0 0 0 " }}
        w={{ base: "100%", md: "20vw" }}
        h={{ base: "auto", md: "100vh" }}
        backgroundColor="hsl(199, 15%, 67%)"
        position="fixed"
        left="0"
        top="0"
       zIndex='999'
        boxShadow="0px 2px 12px  rgb(119,136,153)"
        borderBottom={{ base: "1px solid #E2E8F0", md: "none" }}
      >
        <Box>
          <Text
            // borderBottom= "-1"
            boxShadow="0px 5px 5px rgba(0, 0, 0, 0.1)"
            textAlign="center"
            mb={{ base: "3", md: "3" }}
            padding="20px 0 20px 0"
            fontWeight="bold"
          >
            My App
          </Text>
          <List  >
          <Link to="/">
            <ListItem mt={{base:'2', md:'4'}}  textAlign="center">
             Dashboard
            </ListItem>
            </Link>
            
            <Link to="/table">
            <ListItem mt={{base:'2', md:'4'}}  textAlign="center">
              TableView
            </ListItem>
            </Link>
         
            <Link to="/form">
            <ListItem mt={{base:'2', md:'4'}}   textAlign="center">
              PostForm
            </ListItem>
            </Link>
            
          </List>
        </Box>
      </Box>
      <Outlet />
    </>
  );
};

export default SideBar;

