import React, { useEffect } from "react";
import { Box, Button, Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchHistory,
  incrementOffset,
} from "../features/transaction/transactionSlice";

const TransactionPage = () => {
  const dispatch = useAppDispatch();
  const { loading, error, items, hasMore } = useAppSelector(
    (state) => state.transaction
  );

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  const handleShowMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchHistory());
    }
  };

  return (
    <Box maxW="6xl" mx="auto" mt={12} px={6}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Semua Transaksi
      </Text>

      {loading && items.length === 0 && <Spinner />}
      {error && (
        <Text color="red.500" mb={4}>
          {error}
        </Text>
      )}

      <VStack spacing={3} align="stretch">
        {items.map((item) => {
          const isDebit = item.transaction_type.toLowerCase().includes("topup");
          const amountColor = isDebit ? "green.500" : "red.500";
          const amountPrefix = isDebit ? "+" : "-";

          return (
            <Flex
              key={item.invoice_number}
              p={4}
              borderWidth="1px"
              rounded="xl"
              shadow="sm"
              justify="space-between"
              align="center"
            >
              <Box>
                <Text fontWeight="bold" color={amountColor}>
                  {amountPrefix} Rp{item.total_amount.toLocaleString("id-ID")}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {formatDate(item.created_on)}
                </Text>
              </Box>
              <Text fontSize="sm" color="gray.600" noOfLines={1}>
                {item.description}
              </Text>
            </Flex>
          );
        })}
      </VStack>

      <Flex justify="center" mt={4}>
        <Button variant="link" color="red.500" onClick={handleShowMore}>
          Show more
        </Button>
      </Flex>

      {/* {hasMore && !loading && (
        <Flex justify="center" mt={4}>
          <Button variant="link" color="red.500" onClick={handleShowMore}>
            Show more
          </Button>
        </Flex>
      )} */}

      {!hasMore && items.length > 0 ? (
        <Text mt={4} textAlign="center" color="gray.500">
          Semua transaksi telah ditampilkan.
        </Text>
      ) : (
        <Flex justify="center" mt={4}>
          <Button variant="link" color="red.500" onClick={handleShowMore}>
            Show more
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default TransactionPage;
