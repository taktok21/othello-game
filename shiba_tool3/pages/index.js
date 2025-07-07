import { 
  Box, 
  Heading, 
  Text, 
  Button, 
  Container, 
  VStack, 
  HStack,
  useColorModeValue 
} from '@chakra-ui/react';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Box minH="100vh" bg={bgColor}>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <VStack spacing={4}>
            <Heading size="xl" textAlign="center">
              せどり・物販管理ツール
            </Heading>
            <Text fontSize="lg" color="gray.600" textAlign="center">
              効率的な商品管理とリピート販売を実現
            </Text>
          </VStack>

          {/* Navigation Cards */}
          <HStack spacing={6} justify="center" wrap="wrap">
            <Link href="/products">
              <Button
                size="lg"
                colorScheme="blue"
                bg={cardBg}
                p={6}
                h="auto"
                flexDirection="column"
                borderRadius="md"
                boxShadow="md"
              >
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                  商品管理リスト
                </Text>
                <Text fontSize="sm" color="gray.600">
                  ASIN入力で商品情報を自動取得
                </Text>
              </Button>
            </Link>

            <Link href="/repeat">
              <Button
                size="lg"
                colorScheme="green"
                bg={cardBg}
                p={6}
                h="auto"
                flexDirection="column"
                borderRadius="md"
                boxShadow="md"
              >
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                  リピートリスト
                </Text>
                <Text fontSize="sm" color="gray.600">
                  継続販売商品の利益管理
                </Text>
              </Button>
            </Link>

            <Link href="/settings">
              <Button
                size="lg"
                colorScheme="purple"
                bg={cardBg}
                p={6}
                h="auto"
                flexDirection="column"
                borderRadius="md"
                boxShadow="md"
              >
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                  設定
                </Text>
                <Text fontSize="sm" color="gray.600">
                  API設定・自動更新設定
                </Text>
              </Button>
            </Link>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}