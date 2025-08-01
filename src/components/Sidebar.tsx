import {
  Box,
  Flex,
  Image,
  Text,
  Link as ChakraLink,
  Spacer,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "../assets/logo.png";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { label: "Top Up", path: "/topup" },
    { label: "Transaction", path: "/transaction" },
    { label: "Akun", path: "/account" },
  ];

  return (
    <Box maxW="6xl" mx="auto">
      <Flex
        as="header"
        align="center"
        px={6}
        py={4}
        boxShadow="sm"
        bg="white"
        position="sticky"
        top={0}
        zIndex={10}
      >
        <Flex align="center" gap={2}>
          <Link to={"/dashboard"}>
            <Image src={logoImg} alt="SIMS PPOB" boxSize="30px" />
            <Text fontWeight="bold">SIMS PPOB</Text>
          </Link>
        </Flex>

        <Spacer />

        <Flex gap={4}>
          {navItems.map((item) => (
            <ChakraLink
              key={item.path}
              as={Link}
              to={item.path}
              px={3}
              py={2}
              borderRadius="md"
              fontWeight="medium"
              color={isActive(item.path) ? "red" : "gray.600"}
              _hover={{ color: "red" }}
            >
              {item.label}
            </ChakraLink>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Sidebar;
