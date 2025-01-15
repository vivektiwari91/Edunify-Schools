'use client'
import React from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Text,
  Heading,
  useColorModeValue,
  Divider
} from "@chakra-ui/react";
import { ArrowForwardIcon } from '@chakra-ui/icons';
import SchoolCardsSection from './components/Cards';

export default function App() {
  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')}>
      <Container maxW="container.xl" px={8} py={24}>
        <Stack spacing={8} alignItems="center" textAlign="center">
          <Heading
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="bold"
            lineHeight="none"
            letterSpacing={{ base: "normal", md: "tight" }}
            color={useColorModeValue('gray.900', 'gray.100')}
          >
            Discover and Add{" "}
            <Text
              as="span"
              bgClip="text"
              bgGradient="linear(to-r, green.400,purple.500)"
              fontWeight="extrabold"
            >
              Schools
            </Text>{" "}
            to Your Community
          </Heading>

          <Text
            maxW="2xl"
            fontSize={{ base: "lg", md: "xl" }}
            color={useColorModeValue('gray.600', 'gray.300')}
          >
            Our platform allows you to easily add schools, explore them, and view
            detailed information about each school. Simply click on any school
            card to access the school's full details, including its programs,
            facilities, and more.
          </Text>
        </Stack>
      </Container>
      <Divider />
      <SchoolCardsSection />
    </Box>
  );
}

