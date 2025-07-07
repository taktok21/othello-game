import {
  Box,
  Container,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Button,
  Alert,
  AlertIcon,
  useToast,
  Card,
  CardBody,
  CardHeader,
  Text,
  HStack,
  Select,
  Divider,
} from '@chakra-ui/react';
import SchedulerStatus from '../../components/SchedulerStatus';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Layout from '../../components/Layout';
import { settingsApi } from '../../lib/api';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    keeperApiKey: '',
    rakutenId: '',
    autoUpdateEnabled: false,
    updateSchedule: '02:00',
  });
  
  const toast = useToast();
  const queryClient = useQueryClient();

  // Fetch settings
  const { data: fetchedSettings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const response = await settingsApi.getSettings();
      return response.data;
    },
    onSuccess: (data) => {
      setSettings(data);
    },
  });

  // Update settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: (data) => settingsApi.updateSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['settings']);
      toast({
        title: '設定を保存しました',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: '設定の保存に失敗しました',
        description: error.response?.data?.message || 'エラーが発生しました',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  // Test API connection mutation
  const testApiMutation = useMutation({
    mutationFn: ({ apiType, credentials }) => 
      settingsApi.testApiConnection(apiType, credentials),
    onSuccess: (data) => {
      toast({
        title: 'API接続テスト成功',
        description: data.data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: 'API接続テスト失敗',
        description: error.response?.data?.message || 'API接続に失敗しました',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveSettings = () => {
    updateSettingsMutation.mutate(settings);
  };

  const handleTestApi = (apiType) => {
    const credentials = {
      keeperApiKey: settings.keeperApiKey,
      rakutenId: settings.rakutenId,
    };
    testApiMutation.mutate({ apiType, credentials });
  };

  return (
    <Layout>
      <Container maxW="container.md" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading>設定</Heading>

          {/* API Settings */}
          <Card>
            <CardHeader>
              <Heading size="md">API設定</Heading>
              <Text fontSize="sm" color="gray.600">
                外部APIとの連携に必要な設定を行います
              </Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={6}>
                {/* Keeper API Key */}
                <FormControl>
                  <FormLabel>Keeper APIキー</FormLabel>
                  <HStack>
                    <Input
                      type="password"
                      value={settings.keeperApiKey}
                      onChange={(e) => handleInputChange('keeperApiKey', e.target.value)}
                      placeholder="Keeper APIキーを入力"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleTestApi('keeper')}
                      isLoading={testApiMutation.isPending}
                      isDisabled={!settings.keeperApiKey}
                    >
                      テスト
                    </Button>
                  </HStack>
                  <Text fontSize="xs" color="gray.500" mt={2}>
                    商品情報の取得に使用されます
                  </Text>
                </FormControl>

                {/* Rakuten ID */}
                <FormControl>
                  <FormLabel>楽天ID</FormLabel>
                  <HStack>
                    <Input
                      value={settings.rakutenId}
                      onChange={(e) => handleInputChange('rakutenId', e.target.value)}
                      placeholder="楽天IDを入力"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleTestApi('rakuten')}
                      isLoading={testApiMutation.isPending}
                      isDisabled={!settings.rakutenId}
                    >
                      テスト
                    </Button>
                  </HStack>
                  <Text fontSize="xs" color="gray.500" mt={2}>
                    楽天商品の価格情報取得に使用されます
                  </Text>
                </FormControl>
              </VStack>
            </CardBody>
          </Card>

          {/* Auto Update Settings */}
          <Card>
            <CardHeader>
              <Heading size="md">自動更新設定</Heading>
              <Text fontSize="sm" color="gray.600">
                価格情報の自動更新に関する設定を行います
              </Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={6}>
                {/* Auto Update Toggle */}
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="auto-update" mb="0">
                    深夜の自動更新を有効にする
                  </FormLabel>
                  <Switch
                    id="auto-update"
                    isChecked={settings.autoUpdateEnabled}
                    onChange={(e) => handleInputChange('autoUpdateEnabled', e.target.checked)}
                  />
                </FormControl>

                {/* Update Schedule */}
                {settings.autoUpdateEnabled && (
                  <FormControl>
                    <FormLabel>更新時刻</FormLabel>
                    <Select
                      value={settings.updateSchedule}
                      onChange={(e) => handleInputChange('updateSchedule', e.target.value)}
                    >
                      <option value="01:00">午前1時</option>
                      <option value="02:00">午前2時</option>
                      <option value="03:00">午前3時</option>
                      <option value="04:00">午前4時</option>
                      <option value="05:00">午前5時</option>
                    </Select>
                    <Text fontSize="xs" color="gray.500" mt={2}>
                      指定した時刻に自動的に価格情報が更新されます
                    </Text>
                  </FormControl>
                )}
              </VStack>
            </CardBody>
          </Card>

          {/* Scheduler Status */}
          <SchedulerStatus settings={settings} />

          {/* Save Button */}
          <Button
            colorScheme="blue"
            size="lg"
            onClick={handleSaveSettings}
            isLoading={updateSettingsMutation.isPending}
            loadingText="保存中..."
          >
            設定を保存
          </Button>

          {/* Warning Alert */}
          <Alert status="warning">
            <AlertIcon />
            <Box>
              <Text fontWeight="bold">重要な注意事項</Text>
              <Text fontSize="sm">
                APIキーは暗号化して保存されますが、適切に管理してください。
                自動更新機能を有効にすると、指定した時刻に外部APIを呼び出します。
              </Text>
            </Box>
          </Alert>
        </VStack>
      </Container>
    </Layout>
  );
}