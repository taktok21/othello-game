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
  Progress,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, RepeatIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Layout from '../../components/Layout';
import { repeatApi } from '../../lib/api';
import { formatCurrency, getProfitColor } from '../../utils/calculations';

export default function RepeatPage() {
  const [newAsin, setNewAsin] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const toast = useToast();
  const queryClient = useQueryClient();

  // Fetch repeat products
  const { data: repeatProducts = [], isLoading, error } = useQuery({
    queryKey: ['repeat-products'],
    queryFn: async () => {
      const response = await repeatApi.getRepeatProducts();
      return response.data;
    },
  });

  // Add repeat product mutation
  const addRepeatProductMutation = useMutation({
    mutationFn: async ({ asin, purchasePrice }) => {
      const response = await repeatApi.createRepeatProduct({ asin, purchasePrice });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['repeat-products']);
      setNewAsin('');
      setPurchasePrice('');
      toast({
        title: 'リピート商品を追加しました',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: 'リピート商品の追加に失敗しました',
        description: error.response?.data?.message || 'エラーが発生しました',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  // Delete repeat product mutation
  const deleteRepeatProductMutation = useMutation({
    mutationFn: (id) => repeatApi.deleteRepeatProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['repeat-products']);
      toast({
        title: 'リピート商品を削除しました',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  // Update all prices mutation
  const updateAllPricesMutation = useMutation({
    mutationFn: () => repeatApi.updateAllPrices(),
    onSuccess: () => {
      queryClient.invalidateQueries(['repeat-products']);
      toast({
        title: '全商品の価格を更新しました',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: '価格更新に失敗しました',
        description: error.response?.data?.message || 'エラーが発生しました',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleAddRepeatProduct = () => {
    if (!newAsin.trim()) {
      toast({
        title: 'ASINを入力してください',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!purchasePrice || parseFloat(purchasePrice) <= 0) {
      toast({
        title: '仕入価格を正しく入力してください',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    addRepeatProductMutation.mutate({ 
      asin: newAsin.trim(), 
      purchasePrice: parseFloat(purchasePrice) 
    });
  };

  const handleDeleteRepeatProduct = (id) => {
    if (window.confirm('このリピート商品を削除しますか？')) {
      deleteRepeatProductMutation.mutate(id);
    }
  };

  const handleUpdateAllPrices = () => {
    updateAllPricesMutation.mutate();
  };

  // Calculate summary statistics
  const totalProducts = repeatProducts.length;
  const profitableProducts = repeatProducts.filter(p => p.currentProfit > 0).length;
  const totalProfit = repeatProducts.reduce((sum, p) => sum + p.currentProfit, 0);

  if (isLoading) {
    return (
      <Layout>
        <Container maxW="container.xl" py={8}>
          <VStack spacing={4}>
            <Spinner size="xl" />
            <Text>リピート商品データを読み込み中...</Text>
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
            リピート商品データの読み込みに失敗しました: {error.message}
          </Alert>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between">
            <Heading>リピートリスト</Heading>
            <Button
              leftIcon={<RepeatIcon />}
              colorScheme="green"
              onClick={handleUpdateAllPrices}
              isLoading={updateAllPricesMutation.isPending}
              loadingText="更新中..."
            >
              全商品価格更新
            </Button>
          </HStack>

          {/* Summary Statistics */}
          {totalProducts > 0 && (
            <HStack spacing={8} p={4} bg="gray.50" borderRadius="md">
              <VStack>
                <Text fontSize="2xl" fontWeight="bold">{totalProducts}</Text>
                <Text fontSize="sm" color="gray.600">登録商品数</Text>
              </VStack>
              <VStack>
                <Text fontSize="2xl" fontWeight="bold" color="green.500">
                  {profitableProducts}
                </Text>
                <Text fontSize="sm" color="gray.600">利益商品数</Text>
              </VStack>
              <VStack>
                <Text fontSize="2xl" fontWeight="bold" color={getProfitColor(totalProfit) + '.500'}>
                  {formatCurrency(totalProfit)}
                </Text>
                <Text fontSize="sm" color="gray.600">合計利益</Text>
              </VStack>
            </HStack>
          )}

          {/* Add Repeat Product Form */}
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
                  placeholder="仕入価格"
                  type="number"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  maxW="150px"
                />
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="blue"
                  onClick={handleAddRepeatProduct}
                  isLoading={addRepeatProductMutation.isPending}
                  loadingText="追加中..."
                >
                  リピート商品追加
                </Button>
              </HStack>
              <Text fontSize="sm" color="gray.600">
                リピート販売したい商品のASINと仕入価格を入力してください。
                売値は現在のカート価格に自動で設定され、利益は毎日更新されます。
              </Text>
            </VStack>
          </Box>

          {/* Repeat Products Table */}
          {repeatProducts.length === 0 ? (
            <Alert status="info">
              <AlertIcon />
              リピート商品が登録されていません。ASINと仕入価格を入力してリピート商品を追加してください。
            </Alert>
          ) : (
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>商品名</Th>
                    <Th>ASIN</Th>
                    <Th>現在売値</Th>
                    <Th>仕入価格</Th>
                    <Th>入金額</Th>
                    <Th>利益</Th>
                    <Th>利益率</Th>
                    <Th>自動更新</Th>
                    <Th>操作</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {repeatProducts.map((product) => {
                    const profitMargin = product.currentPrice > 0 
                      ? ((product.currentProfit / product.currentPrice) * 100).toFixed(1)
                      : 0;
                    
                    return (
                      <Tr key={product.id}>
                        <Td maxW="200px">
                          <Text fontSize="sm" noOfLines={2}>
                            {product.name}
                          </Text>
                        </Td>
                        <Td>
                          <Text fontSize="xs" color="gray.500">
                            {product.asin}
                          </Text>
                        </Td>
                        <Td>{formatCurrency(product.currentPrice || 0)}</Td>
                        <Td>{formatCurrency(product.purchasePrice)}</Td>
                        <Td>{formatCurrency(product.netIncome || 0)}</Td>
                        <Td>
                          <Text
                            color={`${getProfitColor(product.currentProfit)}.500`}
                            fontWeight="bold"
                          >
                            {formatCurrency(product.currentProfit)}
                          </Text>
                        </Td>
                        <Td>
                          <Text
                            color={profitMargin > 0 ? 'green.500' : 'red.500'}
                          >
                            {profitMargin}%
                          </Text>
                        </Td>
                        <Td>
                          <Badge 
                            colorScheme={product.autoUpdate ? 'green' : 'gray'}
                            variant="solid"
                          >
                            {product.autoUpdate ? 'ON' : 'OFF'}
                          </Badge>
                        </Td>
                        <Td>
                          <IconButton
                            aria-label="削除"
                            icon={<DeleteIcon />}
                            size="sm"
                            variant="ghost"
                            colorScheme="red"
                            onClick={() => handleDeleteRepeatProduct(product.id)}
                            isLoading={deleteRepeatProductMutation.isPending}
                          />
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Box>
          )}

          {/* Info Alert */}
          <Alert status="info">
            <AlertIcon />
            <Box>
              <Text fontWeight="bold">リピートリストについて</Text>
              <Text fontSize="sm">
                リピートリストに登録された商品は、毎日深夜に自動で価格と利益が更新されます。
                利益がプラスになった商品から優先的に仕入れを検討してください。
              </Text>
            </Box>
          </Alert>
        </VStack>
      </Container>
    </Layout>
  );
}