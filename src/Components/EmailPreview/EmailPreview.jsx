import React from "react"
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
} from "@chakra-ui/react"
import { extendTheme, ChakraProvider } from "@chakra-ui/react"

const EmailPreview = ({ isOpen, onClose, email, setConfirm, confirm }) => {
  const { fromMail, subject, emailContent, attachments } = email
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
  })

  return (
    <ChakraProvider theme={customTheme}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <Text>
            This is a a sample for the mail you have just requested. Do confirm
            it to start senting mails.
          </Text>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Text>
                <strong>From:</strong> {fromMail}
              </Text>
              <Text>
                <strong>Subject:</strong> {subject}
              </Text>
              <Text>
                <strong>Content:</strong> {emailContent}
              </Text>

              <Text>
                <strong>Attachments:</strong>
              </Text>
              <Text>
                {attachments &&
                  attachments.map(
                    (attachment, index) =>
                      `${
                        attachment.name +
                        (index != attachments.length - 1 ? ", " : "")
                      }`
                  )}
              </Text>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose()
                setConfirm(true)
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  )
}

export default EmailPreview
