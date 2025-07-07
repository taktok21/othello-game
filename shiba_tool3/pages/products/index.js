import {
  Box,
  Container,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Text,
  Input,
  HStack,
  VStack,
  Badge,
  IconButton,
  useToast,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Layout from '../../components/Layout';
import { productApi } from '../../lib/api';
import { formatCurrency, getProfitColor, isSellingTime } from '../../utils/calculations';

export default function ProductsPage() {
  const [newAsin, setNewAsin] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const toast = useToast();
  const queryClient = useQueryClient();

  // Fetch products
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await productApi.getProducts();
      return response.data;
    },
  });

  // Add product mutation
  const addProductMutation = useMutation({
    mutationFn: async ({ asin, targetPrice }) => {
      const response = await productApi.getProductByASIN(asin, targetPrice);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      setNewAsin('');
      setTargetPrice('');
      setIsAdding(false);
      toast({
        title: '商品を追加しました',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: '商品の追加に失敗しました',
        description: error.response?.data?.message || 'エラーが発生しました',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: (id) => productApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      toast({
        title: '商品を削除しました',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: '商品の削除に失敗しました',
        description: error.response?.data?.message || 'エラーが発生しました',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleAddProduct = () => {
    if (!newAsin.trim()) {
      toast({
        title: 'ASINを入力してください',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const parsedTargetPrice = targetPrice ? parseFloat(targetPrice) : null;
    addProductMutation.mutate({ asin: newAsin.trim(), targetPrice: parsedTargetPrice });
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('この商品を削除しますか？')) {
      deleteProductMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <Container maxW="container.xl" py={8}>
          <VStack spacing={4}>
            <Spinner size="xl" />
            <Text>商品データを読み込み中...</Text>
          </VStack>
        </Container>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Container maxW="container.xl" py={8}>
          <Alert status="error">
            <AlertIcon />
            商品データの読み込みに失敗しました: {error.message}
          </Alert>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={6} align="stretch">
          <Heading>商品管理リスト</Heading>

          {/* Add Product Form */}
          <Box p={4} bg="gray.50" borderRadius="md">
            <VStack spacing={4}>
              <HStack width="100%" spacing={4}>
                <Input
                  placeholder="ASIN を入力"
                  value={newAsin}
                  onChange={(e) => setNewAsin(e.target.value)}
                  maxW="200px"
                />
                <Input
                  placeholder="目標価格 (オプション)"
                  type="number"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  maxW="150px"
                />
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="blue"
                  onClick={handleAddProduct}
                  isLoading={addProductMutation.isPending}
                  loadingText="追加中..."
                >
                  商品データ取得
                </Button>
              </HStack>
              <Text fontSize="sm" color="gray.600">
                ASINを入力して「商品データ取得」をクリックすると、商品情報が自動で取得されます
              </Text>
            </VStack>
          </Box>

          {/* Products Table */}
          {products.length === 0 ? (
            <Alert status="info">
              <AlertIcon />
              商品が登録されていません。ASINを入力して商品を追加してください。
            </Alert>
          ) : (
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>商品画像</Th>
                    <Th>商品名</Th>
                    <Th>現在価格</Th>
                    <Th>目標価格</Th>
                    <Th>仕入価格</Th>
                    <Th>入金額</Th>
                    <Th>利益</Th>
                    <Th>売り時</Th>
                    <Th>操作</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products.map((product) => {
                    const isSellTime = isSellingTime(product.currentPrice, product.targetPrice);
                    return (
                      <Tr key={product.id} bg={isSellTime ? 'green.50' : 'inherit'}>
                        <Td>
                          {product.imageUrl && (
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              boxSize="60px"
                              objectFit="cover"
                              borderRadius="md"
                            />
                          )}
                        </Td>
                        <Td maxW="200px">
                          <Text fontSize="sm" noOfLines={2}>
                            {product.name}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            ASIN: {product.asin}
                          </Text>
                        </Td>
                        <Td>{formatCurrency(product.currentPrice)}</Td>
                        <Td>{formatCurrency(product.targetPrice)}</Td>
                        <Td>{formatCurrency(product.purchasePrice)}</Td>
                        <Td>{formatCurrency(product.netIncome || 0)}</Td>
                        <Td>
                          <Text
                            color={`${getProfitColor(product.profit)}.500`}
                            fontWeight="bold"
                          >
                            {formatCurrency(product.profit)}
                          </Text>
                        </Td>
                        <Td>
                          {isSellTime && (
                            <Badge colorScheme="green" variant="solid">
                              売り時
                            </Badge>
                          )}
                        </Td>
                        <Td>
                          <HStack spacing={2}>
                            <IconButton
                              aria-label="編集"
                              icon={<EditIcon />}
                              size="sm"
                              variant="ghost"
                            />
                            <IconButton
                              aria-label="削除"
                              icon={<DeleteIcon />}
                              size="sm"
                              variant="ghost"
                              colorScheme="red"
                              onClick={() => handleDeleteProduct(product.id)}
                              isLoading={deleteProductMutation.isPending}
                            />
                          </HStack>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Box>
          )}
        </VStack>
      </Container>
    </Layout>
  );
}