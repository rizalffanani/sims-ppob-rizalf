import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Image,
  Heading,
  Text,
  Link as ChakraLink,
  useToast,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { register } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import illustrationImg from "../assets/illustration.png";
import logoImg from "../assets/logo.png";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // tambahan
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Password tidak cocok",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const result = await dispatch(
      register({ email, firstName, lastName, password })
    );

    if (register.fulfilled.match(result)) {
      toast({
        title: "Registrasi berhasil",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else if (register.rejected.match(result)) {
      const errorMessage = error;
      toast({
        title: "Gagal registrasi",
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
            Lengkapi data untuk membuat akun
          </Heading>

          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="masukkan email anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              mb={3}
              required
            />
            <Input
              type="text"
              placeholder="nama depan"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              mb={3}
              required
            />
            <Input
              type="text"
              placeholder="nama belakang"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              mb={3}
              required
            />
            <Input
              type="password"
              placeholder="buat password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              mb={3}
              required
            />
            <Input
              type="password"
              placeholder="konfirmasi password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              mb={3}
              required
            />
            <Button
              type="submit"
              isLoading={loading}
              colorScheme="red"
              width="full"
              mb="2"
            >
              Registrasi
            </Button>
          </form>

          <Text fontSize="sm" mt="4" textAlign="center">
            Sudah punya akun? login{" "}
            <ChakraLink
              as={Link}
              to="/login"
              color="red.500"
              fontWeight="semibold"
            >
              di sini
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
