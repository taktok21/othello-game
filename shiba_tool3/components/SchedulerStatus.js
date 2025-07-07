import {
  Box,
  Text,
  Badge,
  VStack,
  HStack,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import { TimeIcon, CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { getSchedulerStatus } from '../lib/scheduler';

export default function SchedulerStatus({ settings }) {
  if (!settings) return null;

  const status = getSchedulerStatus(settings);

  return (
    <Box p={4} bg="gray.50" borderRadius="md" borderWidth="1px">
      <VStack align="start" spacing={3}>
        <HStack justify="space-between" width="100%">
          <Text fontWeight="bold" fontSize="sm">
            自動更新スケジュール
          </Text>
          <Badge 
            colorScheme={status.enabled ? 'green' : 'gray'}
            variant="solid"
          >
            {status.enabled ? 'ON' : 'OFF'}
          </Badge>
        </HStack>

        {status.enabled && (
          <>
            <HStack>
              <Icon as={TimeIcon} color="blue.500" />
              <Text fontSize="sm">
                更新時刻: 毎日 {status.scheduleTime}
              </Text>
            </HStack>

            <HStack>
              <Icon as={CheckCircleIcon} color="green.500" />
              <Text fontSize="sm">
                次回更新: {status.timeUntilUpdate}
              </Text>
            </HStack>

            <Tooltip label={`Cron式: ${status.cronExpression}`}>
              <Text fontSize="xs" color="gray.500" cursor="help">
                {status.nextUpdate.toLocaleString('ja-JP')} 予定
              </Text>
            </Tooltip>
          </>
        )}

        {!status.enabled && (
          <HStack>
            <Icon as={WarningIcon} color="orange.500" />
            <Text fontSize="sm" color="gray.600">
              自動更新が無効になっています
            </Text>
          </HStack>
        )}
      </VStack>
    </Box>
  );
}