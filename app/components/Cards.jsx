'use client'

import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  SimpleGrid,
  Container,
  VStack,
  Spinner,
  Fade
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

function SchoolCard({ school }) {
  return (
    <Center py={6}>
      <Box h={'full'} display={'flex'} flexDir={'column'}
        role={'group'}
        p={6}
        maxW={'380px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
        transition="all 0.3s ease"
        _hover={{ transform: 'translateY(-5px)' }}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'200px'}
        >
          <Image
            src={`data:image/jpeg;base64,${school.image}`}
            alt={school.name}
            borderRadius="md"
            objectFit="cover"
            width="100%"
            height="200px"
          />
        </Box>
        <Stack flex={1} pt={10} align={'center'}>
          <Heading fontWeight={800} fontSize={'2xl'} fontFamily={'body'} minHeight={'60px'}>
            {school.name}
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <Text fontWeight={500} fontSize={'xl'} minHeight={'60px'}>
              {school.address}
            </Text>
          </Stack>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            {school.city}
          </Text>
        </Stack>
      </Box>
    </Center>
  )
}

export default function SchoolCardsSection() {
  const [schools, setSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('/api/schools');
        if (!response.ok) {
          throw new Error('Failed to fetch schools');
        }
        const data = await response.json();
        setSchools(data.schools);
      } catch (error) {
        console.error('Error fetching schools:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchools();
  }, []);

  return (
    <Box py={12} position="relative">
      {/* Fade effect background */}
      <Fade in={isLoading}>
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bg="rgba(0, 0, 0, 0.2)"
          zIndex={1}
          display="flex"
          flexDirection="column"
        />
        <Center position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" zIndex={2}>
          <Spinner size="xl" />
        </Center>
      </Fade>

      <Container maxW="container.xl">
        <VStack spacing={8} mb={12}>
          <Heading as="h2" size="xl" textAlign="center">
            Explore Our Schools
          </Heading>
          <Text fontSize="lg" textAlign="center" maxW="2xl">
            Discover a diverse range of educational institutions in our network. From elementary schools to high schools and specialized academies, find the perfect fit for your educational journey.
          </Text>
        </VStack>

        {/* Render the schools only after loading */}
        {!isLoading && (
          <SimpleGrid columns={[1, null, 2, 3]} spacing={10}>
            {schools.map((school, index) => (
              <SchoolCard key={index} school={school} />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
}
