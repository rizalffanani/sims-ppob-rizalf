import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Center,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  text: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  amount,
  text,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    onClose();
    navigate("/dashboard");
  };

  return (
    <Modal isOpen={isOpen} onClose={handleBack} isCentered>
      <ModalOverlay />
      <ModalContent textAlign="center" py={6}>
        <Center>
          <CheckCircleIcon w={12} h={12} color="green.400" />
        </Center>
        <ModalHeader fontSize="lg" fontWeight="bold">
          {text} sebesar
        </ModalHeader>
        <ModalBody>
          <Text fontSize="2xl" fontWeight="bold" mb={1}>
            Rp{amount.toLocaleString("id-ID")}
          </Text>
          <Text>berhasil!</Text>
        </ModalBody>
        <ModalFooter textAlign="center">
          <Button variant="link" color="red.500" w="full" onClick={handleBack}>
            Kembali ke Beranda
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
