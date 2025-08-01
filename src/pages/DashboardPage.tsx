import { useEffect } from "react";
import {
  Box,
  Text,
  Heading,
  SimpleGrid,
  Image,
  VStack,
  HStack,
  Skeleton,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchServices,
  selectService,
  selectServices,
  Service,
} from "../features/services/serviceSlice";
import { fetchBanner, selectBanner } from "../features/banner/bannerSlice";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const services = useAppSelector(selectServices);
  const banners = useAppSelector(selectBanner);

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchBanner());
  }, [dispatch]);

  const handleSelectService = (service: Service) => {
    dispatch(selectService(service));
    navigate("/transactionNew");
  };

  return (
    <Box maxW="6xl" mx="auto" mt={12} px={6}>
      {services.length === 0 ? (
        <Text color="gray.500">Tidak ada layanan</Text>
      ) : (
        <SimpleGrid columns={[4, 6, 10]} spacing={4} mb={10}>
          {services.map((s: any) => (
            <VStack
              key={s.service_code}
              cursor="pointer"
              onClick={() => handleSelectService(s)}
              p={3}
              borderRadius="md"
              _hover={{ bg: "gray.50" }}
              transition="0.2s"
            >
              <Image
                src={s.service_icon}
                alt={s.service_name}
                boxSize="50px"
                fallback={<Skeleton boxSize="50px" />}
              />
              <Text fontSize="sm" textAlign="center">
                {s.service_name}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      )}

      <Heading size="md" mb={4}>
        Temukan promo menarik
      </Heading>

      {banners.length === 0 ? (
        <Text color="gray.500">Tidak ada banner</Text>
      ) : (
        <HStack spacing={4} overflowX="auto" py={2}>
          {banners.map((b: any, i: number) => (
            <Box minW="220px" key={i}>
              <Image
                src={b.banner_image}
                alt={b.banner_name}
                borderRadius="md"
                boxShadow="md"
                fallbackSrc="https://via.placeholder.com/220x120"
              />
            </Box>
          ))}
        </HStack>
      )}
    </Box>
  );
}
