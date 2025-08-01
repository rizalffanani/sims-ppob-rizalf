import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useAppDispatch } from "../app/hooks";
import { saveTopup } from "../features/balance/balanceSlice";
import CustomModal from "../components/Modal";

const TopUpPage = () => {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const presetAmounts = [10000, 20000, 50000, 100000, 250000, 500000];
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleTopUp = async () => {
    if (amount < 10000 || amount > 1000000) {
      toast({
        title: "Gagal",
        description:
          "Nominal top up minimal Rp10.000 dan maksimal Rp1.000.000.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    if (amount <= 0) return;

    setLoading(true);
    try {
      await dispatch(saveTopup({ top_up_amount: amount }));
      onOpen();
    } catch {
      alert("Terjadi kesalahan saat top up.");
    } finally {
      setLoading(false);
    }
  };

  const handlePresetClick = (value: number) => {
    setAmount(value);
  };

  return (
    <Box maxW="6xl" mx="auto" mt={12} px={6}>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        text={"Top Up"}
        amount={amount}
      />
      <Text mb={2} fontWeight="medium">
        Silahkan masukan <br />
        <Text as="span" fontWeight="bold">
          Nominal Top Up
        </Text>
      </Text>
      <Flex gap={4} flexDir={{ base: "column", md: "row" }}>
        <Box flex="1">
          <Input
            placeholder="masukkan nominal Top Up"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            mb={4}
          />
          <Button
            colorScheme="gray"
            isDisabled={loading || amount <= 0}
            isLoading={loading}
            onClick={handleTopUp}
            width="full"
          >
            Top Up
          </Button>
        </Box>

        <SimpleGrid columns={{ base: 3, md: 3 }} spacing={2}>
          {presetAmounts.map((value) => (
            <Button
              key={value}
              variant="outline"
              onClick={() => handlePresetClick(value)}
            >
              Rp{value.toLocaleString("id-ID")}
            </Button>
          ))}
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default TopUpPage;
