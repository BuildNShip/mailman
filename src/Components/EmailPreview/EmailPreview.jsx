import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Stack,
  Box,
} from "@chakra-ui/react";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";

const EmailPreview = ({ isOpen, onClose, email, setConfirm, confirm }) => {
  const { fromMail, subject, emailContent, attachments } = email;
  const customTheme = extendTheme({
    components: {
      Modal: {
        baseStyle: {
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          },
          content: {
            backgroundColor: "gray.800",
            color: "white",
          },
        },
      },
    },
  });

  console.log(emailContent);

  return (
    <ChakraProvider theme={customTheme}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#282727" color="#fff">
          <ModalHeader borderBottom="1px solid #3c3c3c" pb={2} fontSize="lg">
            Are you sure?
          </ModalHeader>
          <ModalCloseButton color="#fff" _hover={{ color: "#fff" }} />
          <ModalBody>
            <Stack spacing={4}>
              <Text color="#2ba6a6">
                This is a sample for the mail you have just requested. Do
                confirm it to start sending mails.
              </Text>
              <Text>
                <strong>From:</strong> {fromMail}
              </Text>
              <Text>
                <strong>Subject:</strong> {subject}
              </Text>
              <Text style={{ whiteSpace: "pre-line" }}>
                <strong>Content:</strong> {emailContent}
              </Text>
              {attachments && attachments.length > 0 && (
                <Text>
                  <strong>Attachments:</strong>
                </Text>
              )}

              <Stack direction="row" alignItems="center">
                {attachments &&
                  attachments.map((attachment, index) => (
                    <Box key={index} className="attachments">
                      <label htmlFor={`attachment-${index}`}>Browse...</label>
                      <span>{attachment.name}</span>
                      <input
                        type="file"
                        id={`attachment-${index}`}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => handleAttachmentChange(e, index)}
                      />
                    </Box>
                  ))}
              </Stack>
            </Stack>
          </ModalBody>

          <ModalFooter borderTop="1px solid #3c3c3c">
            <Button colorScheme="teal" mr={3} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={() => {
                onClose();
                setConfirm(true);
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default EmailPreview;
