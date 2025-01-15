'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Textarea,
  useToast,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Container,
  InputGroup,
  InputLeftAddon,
  Stack,
  Flex,
  Icon,
  chakra,
  VisuallyHidden,
  FormErrorMessage,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

export default function AddSchoolForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const toast = useToast()
  const router = useRouter()
  const [uploadedFileName, setUploadedFileName] = React.useState(null)

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'image') {
          if (value[0]) formData.append('image', value[0])
        } else {
          formData.append(key, value)
        }
      })

      const response = await fetch('/api/schools', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to add school')
      }

      toast({
        title: "Success",
        description: "School added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      })

      router.push('/') // Assuming you have a page to list schools
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add school. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Container maxW="container.md" centerContent py={8}>
      <Card width="100%" boxShadow="lg">
        <CardHeader>
          <Heading size="lg" textAlign="center">Add New School</Heading>
          <Text mt={2} textAlign="center" color="gray.600">
            Please provide accurate information about the school.
          </Text>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={6}>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>School Name</FormLabel>
                <Input
                  {...register("name", { required: "School name is required" })}
                  placeholder="Enter school name"
                />
                <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.address}>
                <FormLabel>Address</FormLabel>
                <Textarea
                  {...register("address", { required: "Address is required" })}
                  placeholder="Enter school address"
                  rows={3}
                />
                <FormErrorMessage>{errors.address && errors.address.message}</FormErrorMessage>
              </FormControl>

              <SimpleGrid columns={2} spacing={6} width="100%">
                <FormControl isInvalid={!!errors.city}>
                  <FormLabel>City</FormLabel>
                  <Input
                    {...register("city", { required: "City is required" })}
                    placeholder="Enter city"
                  />
                  <FormErrorMessage>{errors.city && errors.city.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.state}>
                  <FormLabel>State</FormLabel>
                  <Input
                    {...register("state", { required: "State is required" })}
                    placeholder="Enter state"
                  />
                  <FormErrorMessage>{errors.state && errors.state.message}</FormErrorMessage>
                </FormControl>
              </SimpleGrid>

              <FormControl isInvalid={!!errors.contact}>
                <FormLabel>Contact Number</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="+91" />
                  <Input
                    {...register("contact", {
                      required: "Contact number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Invalid phone number"
                      }
                    })}
                    placeholder="Enter contact number"
                  />
                </InputGroup>
                <FormErrorMessage>{errors.contact && errors.contact.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  placeholder="Enter email address"
                />
                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.image}>
                <FormLabel>School Image</FormLabel>
                <Flex
                  mt={1}
                  justify="center"
                  px={6}
                  pt={5}
                  pb={6}
                  borderWidth={2}
                  borderStyle="dashed"
                  rounded="md"
                >
                  <Stack spacing={1} textAlign="center">
                    <Icon
                      mx="auto"
                      boxSize={12}
                      color="gray.400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Icon>
                    <Flex
                      fontSize="sm"
                      color="gray.600"
                      alignItems="baseline"
                    >
                      <chakra.label
                        htmlFor="file-upload"
                        cursor="pointer"
                        rounded="md"
                        fontSize="md"
                        color="brand.600"
                        pos="relative"
                        _hover={{
                          color: "brand.400",
                        }}
                      >
                        <span>Upload a file</span>
                        <VisuallyHidden>
                          <input
                            id="file-upload"
                            type="file"
                            accept="image/jpeg,image/jpg,image/png"
                            {...register("image", {
                              required: "Image is required",
                              validate: {
                                fileSize: (files) => !files[0] || files[0].size <= 5000000 || "File size must be less than 5MB",
                                fileType: (files) => !files[0] || ['image/jpeg', 'image/jpg', 'image/png'].includes(files[0].type) || "Only JPEG, JPG, and PNG files are allowed"
                              },
                              onChange: (e) => {
                                if (e.target.files && e.target.files[0]) {
                                  setUploadedFileName(e.target.files[0].name)
                                }
                              }
                            })}
                          />
                        </VisuallyHidden>
                      </chakra.label>
                      <Text pl={1}>or drag and drop</Text>
                    </Flex>
                    <Text
                      fontSize="xs"
                      color="gray.500"
                    >
                      PNG, JPG, GIF up to 5MB
                    </Text>
                  </Stack>
                </Flex>
                {uploadedFileName && (
                  <Text color="green.500" fontSize="sm" mt={2}>
                    Image successfully uploaded: {uploadedFileName}
                  </Text>
                )}
                <FormErrorMessage>{errors.image && errors.image.message}</FormErrorMessage>
              </FormControl>
            </VStack>

            <Button
              mt={6}
              colorScheme="purple"
              size="lg"
              width="100%"
              type="submit"
              isLoading={isSubmitting}
              loadingText="Saving..."
              leftIcon={<AddIcon />}
            >
              Save School
            </Button>
          </form>
        </CardBody>
      </Card>
    </Container>
  )
}

