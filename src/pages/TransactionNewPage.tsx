import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Image,
  Input,
  Button,
  HStack,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchServices,
  clearSelectedService,
} from "../features/services/serviceSlice";
import {
  newTransaction,
  fetchHistory,
} from "../features/transaction/transactionSlice";
import { getBalance } from "../features/balance/balanceSlice";
import CustomModal from "../components/Modal";

const TransactionNewPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectedService = useAppSelector(
    (state) => state.services.selectedService
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedService) navigate("/dashboard");
  }, [selectedService, navigate]);

  const handleTransaction = async () => {
    if (!selectedService) return;

    setLoading(true);
    try {
      await dispatch(
        newTransaction({ service_code: selectedService.service_code })
      )
        .unwrap()
        .then(() => {
          dispatch(getBalance());
          dispatch(fetchHistory());
        });
      onOpen();
    } catch {
      alert("Gagal melakukan transaksi.");
    } finally {
      setLoading(false);
    }
  };

  if (!selectedService) return null;

  return (
    <Box maxW="6xl" mx="auto" mt={12} px={6}>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        text={`Pembayaran ${selectedService.service_name}`}
        amount={selectedService.service_tariff}
      />
      <Text mb={2} fontWeight="semibold">
        PemBayaran
      </Text>

      <HStack spacing={3} mb={4}>
        <Image
          src={selectedService.service_icon}
          alt={selectedService.service_name}
          boxSize="32px"
          fallbackSrc="https://via.placeholder.com/40?text=No+Icon"
        />
        <Text fontWeight="bold">{selectedService.service_name}</Text>
      </HStack>

      <HStack mb={4}>
        <Input
          type="number"
          isReadOnly
          value={selectedService.service_tariff}
          bg="gray.50"
          borderColor="gray.300"
          _focus={{ borderColor: "gray.300", boxShadow: "none" }}
        />
      </HStack>

      <Button
        colorScheme="red"
        size="md"
        width="100%"
        mb={2}
        onClick={handleTransaction}
        isLoading={loading}
      >
        Bayar
      </Button>

      <Button
        variant="ghost"
        size="sm"
        width="100%"
        onClick={() => dispatch(clearSelectedService())}
      >
        Kembali ke daftar layanan
      </Button>
    </Box>
  );
};

export default TransactionNewPage;
