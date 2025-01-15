'use client'

import React from "react";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  IconButton,
  Text,
  useColorMode,
  Tooltip,
} from "@chakra-ui/react";
import { BsPlus, BsMoonFill, BsSunFill } from "react-icons/bs";
import NextLink from 'next/link'

export default function Navbar() {
  const bg = useColorModeValue("white", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <chakra.header
      bg={bg}
      w="full"
      px={{ base: 2, sm: 4 }}
      py={4}
      shadow="md"
      transition="all 0.2s"
    >
      <Flex alignItems="center" justifyContent="space-between" mx="auto">
        <HStack spacing={3} alignItems="center">
          <chakra.a
            href="/"
            title="Edunify Home Page"
            display="flex"
            alignItems="center"
          >
            <VisuallyHidden>Edunify</VisuallyHidden>
            <Text fontSize="2xl" fontWeight="bold" bgGradient="linear(to-r, purple.500, pink.500)" bgClip="text">
              Edunify
            </Text>
          </chakra.a>
        </HStack>
        <HStack
          spacing={3}
          display={isOpen ? "none" : "flex"}
          alignItems="center"
        >
          <Tooltip label="Add New School" aria-label="Add New School">
            <Button
              as={NextLink}
              href="/add-school"
              colorScheme="purple"
              leftIcon={<BsPlus />}
              size="sm"
            >
              <Text display={{ base: "none", md: "inline" }}>New School</Text>
            </Button>
          </Tooltip>

          <Tooltip label="Toggle color mode" aria-label="Toggle color mode">
            <IconButton
              size="sm"
              fontSize="lg"
              aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
              variant="ghost"
              color="current"
              onClick={toggleColorMode}
              icon={colorMode === 'light' ? <BsMoonFill /> : <BsSunFill />}
            />
          </Tooltip>
        </HStack>
      </Flex>
    </chakra.header>
  );
}

