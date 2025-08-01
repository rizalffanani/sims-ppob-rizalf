import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Image,
  Heading,
  Text,
  Link as ChakraLink,
  useToast,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import illustrationImg from "../assets/illustration.png";
import logoImg from "../assets/logo.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      navigate("/dashboard");
    } else if (login.rejected.match(result)) {
      const errorMessage = error;
      toast({
        title: "Gagal login",
        description: errorMessage,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minH="100vh">
      <Flex
        w={{ base: "100%", md: "50%" }}
        direction="column"
        justify="center"
        px="8"
      >
        <Box maxW="sm" mx="auto" w="full">
          <Flex justify="center" mb="6" gap={2}>
            <Image src={logoImg} boxSize="24px" alt="logo" />
            <Text fontSize="lg" fontWeight="semibold">
              SIMS PPOB
            </Text>
          </Flex>

          <Heading size="lg" mb="6" textAlign="center">
            Masuk atau buat akun untuk memulai
          </Heading>

          <form onSubmit={handleSubmit}>
            <FormControl mb="4" isRequired>
              <Input
                type="email"
                placeholder="masukan email anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl mb="4" isRequired>
              <Input
                type="password"
                placeholder="masukan password anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button
              type="submit"
              isLoading={loading}
              colorScheme="red"
              width="full"
              mb="2"
            >
              Masuk
            </Button>
          </form>

          <Text fontSize="sm" mt="4" textAlign="center">
            belum punya akun?{" "}
            <ChakraLink
              as={Link}
              to="/register"
              color="red.500"
              fontWeight="semibold"
            >
              registrasi di sini
            </ChakraLink>
          </Text>
        </Box>
      </Flex>
      <Box
        display={{ base: "none", md: "flex" }}
        w="50%"
        bg="#FFF1F0"
        alignItems="center"
        justifyContent="center"
      >
        <Image src={illustrationImg} alt="illustration" maxW="400px" />
      </Box>
    </Flex>
  );
}
