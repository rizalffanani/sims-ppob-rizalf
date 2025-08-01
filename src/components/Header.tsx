import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Flex,
  Avatar,
  Text,
  Heading,
  Button,
  Icon,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getProfile } from "../features/auth/authSlice";
import { getBalance, selectBalance } from "../features/balance/balanceSlice";
export default function Header() {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);
  const balance = useAppSelector(selectBalance);
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getBalance());
  }, [dispatch]);

  if (loading) return <p>Loading profile...</p>;

  return (
    <Box maxW="6xl" mx="auto" mt={12} px={6}>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Box>
          <Avatar
            name={`${user?.first_name} ${user?.last_name}`}
            src={user?.profile_image}
            size="md"
          />
          <Text fontSize="sm" color="gray.600">
            Selamat datang,
          </Text>
          <Heading size="lg">
            {user?.first_name} {user?.last_name}
          </Heading>
        </Box>
        <Box
          bg="red.500"
          color="white"
          p={6}
          borderRadius="xl"
          position="relative"
          minW="300px"
        >
          <Text fontSize="sm" mb={2}>
            Saldo anda
          </Text>
          <Heading fontSize="2xl" letterSpacing={1}>
            Rp {showBalance ? balance.toLocaleString("id-ID") : "•".repeat(8)}
          </Heading>
          <Button
            onClick={() => setShowBalance((prev) => !prev)}
            variant="link"
            size="sm"
            mt={2}
            leftIcon={showBalance ? <ViewOffIcon /> : <ViewIcon />}
            color="whiteAlpha.800"
          >
            Lihat Saldo
          </Button>

          {/* Optional: Background pattern */}
          <Box
            position="absolute"
            right={3}
            bottom={3}
            opacity={0.1}
            fontSize="8xl"
          >
            ~
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}
