import { useState, useEffect } from 'react';
import { getAppData } from '../data/app-config';
import { AppData } from '../types/app-data';

/**
 * 自定义 Hook，用于响应式地获取 AppData
 * 当 localStorage 中的数据变化时，自动更新组件
 */
export function useAppData(): AppData {
  const [appData, setAppData] = useState<AppData>(getAppData());

  useEffect(() => {
    const handleStorageChange = () => {
      setAppData(getAppData());
    };

    // 监听 storage 事件（跨标签页）
    window.addEventListener('storage', handleStorageChange);
    
    // 监听自定义事件（同一标签页内的更新）
    window.addEventListener('appDataUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('appDataUpdated', handleStorageChange);
    };
  }, []);

  return appData;
}
