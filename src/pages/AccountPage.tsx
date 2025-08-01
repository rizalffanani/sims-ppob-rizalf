import React, { useRef, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getProfile,
  saveProfile,
  uploadProfileImage,
  logout,
} from "../features/auth/authSlice";
import defaultImg from "../assets/profil.png";
import profilImg from "../assets/profil.png";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const profile = useAppSelector((state) => state.auth.user);
  const [edit, setEdit] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const toast = useToast();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    setEmail(profile?.email || "");
    setFirstName(profile?.first_name || "");
    setLastName(profile?.last_name || "");
  }, [profile]);

  const handleSave = () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast({
        title: "Gagal",
        description: "Nama depan dan nama belakang tidak boleh kosong",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    dispatch(saveProfile({ first_name: firstName, last_name: lastName })).then(
      () => {
        toast({
          title: "Profile updated!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setEdit(false);
      }
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 100 * 1024) {
      dispatch(uploadProfileImage(file));
    } else {
      toast({
        title: "Gagal",
        description: "Ukuran gambar maksimal 100KB",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4} textAlign="center">
        Account
      </Text>

      <Flex direction="column" align="center" mb={6}>
        <Box
          position="relative"
          onClick={() => {
            if (inputFileRef.current) inputFileRef.current.click();
          }}
          cursor="pointer"
        >
          <Avatar
            size="xl"
            name={`${firstName} ${lastName}`}
            src={
              profile?.profile_image?.includes("null")
                ? profilImg
                : profile?.profile_image || profilImg
            }
          />
        </Box>
        <input
          ref={inputFileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />
        <Text fontSize="lg" fontWeight="semibold" mt={3}>
          {firstName} {lastName}
        </Text>
      </Flex>

      <VStack spacing={4} maxW="sm" mx="auto">
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isDisabled={!edit}
            type="email"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Nama Depan</FormLabel>
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            isDisabled={!edit}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Nama Belakang</FormLabel>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            isDisabled={!edit}
          />
        </FormControl>

        {edit ? (
          <>
            <Button w="full" colorScheme="red" onClick={handleSave}>
              Simpan
            </Button>
            <Button
              w="full"
              colorScheme="red"
              variant="outline"
              onClick={() => setEdit(false)}
            >
              Batalkan
            </Button>
          </>
        ) : (
          <>
            <Button
              w="full"
              variant="outline"
              colorScheme="red"
              onClick={() => setEdit(true)}
            >
              Edit Profile
            </Button>
            <Button w="full" colorScheme="red" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default ProfilePage;
