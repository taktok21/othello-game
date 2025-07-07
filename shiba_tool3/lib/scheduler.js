// Scheduler utilities for automatic price updates
// In production, this would integrate with cron jobs or serverless functions

/**
 * Schedule configuration for automatic updates
 */
export const SCHEDULE_CONFIG = {
  DEFAULT_TIME: '02:00',
  TIMEZONE: 'Asia/Tokyo',
  ENABLED: true,
};

/**
 * Parse schedule time string to cron expression
 * @param {string} timeString - Time in format "HH:MM"
 * @returns {string} Cron expression
 */
export const parseScheduleTime = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  // Cron format: minute hour * * *
  return `${minutes} ${hours} * * *`;
};

/**
 * Check if automatic update should run
 * @param {string} scheduleTime - Schedule time in format "HH:MM"
 * @param {boolean} enabled - Whether auto-update is enabled
 * @returns {boolean} True if update should run
 */
export const shouldRunUpdate = (scheduleTime, enabled) => {
  if (!enabled) return false;
  
  const now = new Date();
  const [scheduleHour, scheduleMinute] = scheduleTime.split(':').map(Number);
  
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // Check if current time matches schedule (within 1 minute window)
  return currentHour === scheduleHour && 
         Math.abs(currentMinute - scheduleMinute) <= 1;
};

/**
 * Get next scheduled update time
 * @param {string} scheduleTime - Schedule time in format "HH:MM"
 * @returns {Date} Next update time
 */
export const getNextUpdateTime = (scheduleTime) => {
  const [hours, minutes] = scheduleTime.split(':').map(Number);
  const now = new Date();
  const nextUpdate = new Date();
  
  nextUpdate.setHours(hours, minutes, 0, 0);
  
  // If scheduled time has passed today, set for tomorrow
  if (nextUpdate <= now) {
    nextUpdate.setDate(nextUpdate.getDate() + 1);
  }
  
  return nextUpdate;
};

/**
 * Format time remaining until next update
 * @param {Date} nextUpdateTime - Next update time
 * @returns {string} Formatted time string
 */
export const formatTimeUntilUpdate = (nextUpdateTime) => {
  const now = new Date();
  const diff = nextUpdateTime - now;
  
  if (diff <= 0) return '更新予定時刻が過ぎています';
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `約${hours}時間${minutes}分後`;
  } else {
    return `約${minutes}分後`;
  }
};

/**
 * Batch update function for all products
 * This would be called by the scheduler
 */
export const performBatchUpdate = async () => {
  console.log('Starting batch price update...');
  
  try {
    // In production, this would:
    // 1. Fetch all products that need updating
    // 2. Call external APIs to get current prices
    // 3. Update database with new prices and profits
    // 4. Send notifications if needed
    
    const updateResults = {
      totalProducts: 0,
      updatedProducts: 0,
      errors: [],
      startTime: new Date(),
      endTime: null,
    };
    
    // Mock update process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    updateResults.totalProducts = 10;
    updateResults.updatedProducts = 8;
    updateResults.endTime = new Date();
    
    console.log('Batch update completed:', updateResults);
    return updateResults;
    
  } catch (error) {
    console.error('Batch update failed:', error);
    throw error;
  }
};

/**
 * Scheduler status information
 */
export const getSchedulerStatus = (settings) => {
  const nextUpdate = getNextUpdateTime(settings.updateSchedule);
  const timeUntilUpdate = formatTimeUntilUpdate(nextUpdate);
  
  return {
    enabled: settings.autoUpdateEnabled,
    scheduleTime: settings.updateSchedule,
    nextUpdate,
    timeUntilUpdate,
    cronExpression: parseScheduleTime(settings.updateSchedule),
  };
};