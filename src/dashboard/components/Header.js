import { Button,  Box } from "@chakra-ui/react";
import { FormLabel, Input } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
const Header = ({ sortOrder, handleSortPosts, query, setQuery }) => {
  return (
    <>
      <Box>
        <Flex
          alignItems="center"
          justifyContent="center"
          ml={{ base: "-5px", md: "50%" }}
          mt={{ base: "55%", md: "10%" }}
        >
          <FormLabel htmlFor="search">Search: </FormLabel>
          <Input
            size="xs"
            width="50%"
            type="text"
            placeholder="Search here"
            name="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Button size="xs" colorScheme="teal" onClick={handleSortPosts}>
            Sort {sortOrder === "asc" ? "Ascending" : "Descending"}
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
