import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useColorMode,
  useColorModeValue,
  Container,
  Heading,
  Spacer,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

export default function Layout({ children }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box minH="100vh">
      {/* Header */}
      <Box bg={bg} borderBottom="1px" borderColor={borderColor} py={4}>
        <Container maxW="container.xl">
          <Flex align="center">
            <NextLink href="/" passHref>
              <Link>
                <Heading size="lg" color="blue.500">
                  せどりツール
                </Heading>
              </Link>
            </NextLink>
            
            <Spacer />
            
            <HStack spacing={4}>
              <NextLink href="/products" passHref>
                <Link fontWeight="medium">商品管理</Link>
              </NextLink>
              <NextLink href="/repeat" passHref>
                <Link fontWeight="medium">リピートリスト</Link>
              </NextLink>
              <NextLink href="/settings" passHref>
                <Link fontWeight="medium">設定</Link>
              </NextLink>
              
              <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
              />
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Box as="main">
        {children}
      </Box>
    </Box>
  );
}