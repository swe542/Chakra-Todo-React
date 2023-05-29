import { useState } from "react";
import {
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Body = ({ handleEditPost, handleDeletePost, filteredItems, loading }) => {
  const [confirmAction, setconfirmAction] = useState(false);
  const [deleteId, setdeleteId] = useState(null);

  const handleConfirmDelete = (postId) => {
    setdeleteId(postId);
    setconfirmAction(true);
  };

  const handleDelete = () => {
    handleDeletePost(deleteId);
    setconfirmAction(false);
  };

  const handleCancel = () => {
    setdeleteId(null);
    setconfirmAction(false);
  };

  return (
    <TableContainer
      ml={{ base: "5px", md: "30%" }}
      w={{ base: "100vw", md: "70vw" }}
      mt={{ base: "10px", md: "10px" }}
    >
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            
            <Th>Title</Th>
            <Th width="20%">Hobbies</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <>
              <Flex h="90vh" justifyContent="center" alignItems="center">
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                  
                />
              </Flex>
            </>
          ) : (
            filteredItems.map((post) => (
              <Tr key={post.id}>
              
                <Td>{post.title}</Td>
                {/* <Td>{post.hobbies}</Td> */}
                <Td alignItems='center'>{post.hobbies ? post.hobbies : "-"}</Td>
                <Td>
                  <Link to ="/form">
                  <Button
                    size="xs"
                    w="50px"
                    colorScheme="teal"
                    onClick={() => handleEditPost(post)}
                  >
                    Edit
                  </Button>
                  </Link>
                  <Button
                    size="xs"
                    colorScheme="teal"
                    marginLeft={"10px"}
                    onClick={() => handleConfirmDelete(post.id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      <Modal isOpen={confirmAction} onClose={handleCancel}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete this post?</ModalHeader>
          <ModalBody>Please confirm that you want to delete this post</ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} size='sm' onClick={handleDelete}>
              Delete
            </Button>
            <Button size='sm' onClick={handleCancel}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </TableContainer>
  );
};
export default Body;