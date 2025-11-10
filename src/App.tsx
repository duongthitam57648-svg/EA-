import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Database, Share2 } from 'lucide-react';
import { UserInfoEditor } from './components/UserInfoEditor';
import { UserInfoDisplay } from './components/UserInfoDisplay';
import { WelcomeUserInfo } from './components/WelcomeUserInfo';
import { StatsUserInfo } from './components/StatsUserInfo';
import { StatsPageTextBoxes } from './components/StatsPageTextBoxes';
import { ChartPageTextBoxes } from './components/ChartPageTextBoxes';
import { EnvelopeClickable } from './components/EnvelopeClickable';
import { ProgressTreeTextBoxes } from './components/ProgressTreeTextBoxes';
import { ComparisonPageTextBoxes } from './components/ComparisonPageTextBoxes';
import { MusicPlayerClickable } from './components/MusicPlayerClickable';
import { PlanningPageTextBoxes } from './components/PlanningPageTextBoxes';
import { DataEditor } from './components/DataEditor';
import { DataReceiver } from './components/DataReceiver';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { AppData } from './types/app-data';
import { getAppData, saveAppData } from './data/app-config';
import { getDataFromUrl, mapStudentDataToAppData } from './api/data-api';
import welcomeImage from 'figma:asset/9fee4b681cbda3919cd035eb425ad5d8317d4684.png';
import statsImage from 'figma:asset/9c1bf778e7fc1f176a39799fb420c53106cf3092.png';
import chartImage from 'figma:asset/a8c7a71410837d9dfde3bdaed70d3bf10be2bb42.png';
import envelopeImage from 'figma:asset/237dd7d588b574917278d162384f59e917382c83.png';
import scienceGrowthImage from 'figma:asset/fd37aaf8a45b866ff48ef9de466aa043754e9f4b.png';
import levelTreeImage from 'figma:asset/55c42311803650009284a2d5b6ff04aae1f47cb9.png';
import progressTreeImage from 'figma:asset/95ea47ecd4f9924c0a82462a41c80b0c6db41f47.png';
import comparisonImage from 'figma:asset/6b875c33ec24be761a11e392e4aa13d2e247b727.png';
import musicPlayerImage from 'figma:asset/9572ee653271434821e4d7c25fc2f5c20f44c3ee.png';
import hedgehogImage from 'figma:asset/f7a5298804f5ad584c6ebc95617db56034b2da5b.png';
import brandImage from 'figma:asset/6c7793e71ef1c6b8819047b6616e42c36a1c6b5e.png';

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // 应用数据配置
  const [appData, setAppData] = useState<AppData>(getAppData());
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingData, setIsEditingData] = useState(false);
  const [isReceivingData, setIsReceivingData] = useState(false); // 数据接收模式
  const [isAdjustMode, setIsAdjustMode] = useState(false); // 位置调整模式
  const [showPositionData, setShowPositionData] = useState(false); // 显示位置数据模态框
  const [positionDataText, setPositionDataText] = useState(''); // 位置数据文本
  
  // 检测是否是通过分享链接打开的（只读模式）
  const [isReadOnlyMode, setIsReadOnlyMode] = useState(false);

  // 从URL参数加载数据（如果存在）
  useEffect(() => {
    const urlData = getDataFromUrl();
    if (urlData) {
      // 将URL中的学生数据映射到应用数据
      const mappedData = mapStudentDataToAppData(urlData, getAppData());
      setAppData(mappedData);
      // 设置为只读模式
      setIsReadOnlyMode(true);
      // 清除URL参数，避免刷新时重复加载
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []); // 只在组件挂载时执行一次

  // 保存数据到localStorage
  useEffect(() => {
    saveAppData(appData);
  }, [appData]);

  const pages = [
    { id: 0, image: welcomeImage, alt: 'Welcome Page' },
    { id: 1, image: statsImage, alt: 'Stats Page' },
    { id: 2, image: chartImage, alt: 'Chart Page' },
    { id: 3, image: envelopeImage, alt: 'Envelope Page' },
    { id: 4, image: scienceGrowthImage, alt: 'Science Growth Page' },
    { id: 5, image: levelTreeImage, alt: 'Level Tree Page' },
    { id: 6, image: progressTreeImage, alt: 'Progress Tree Page' },
    { id: 7, image: comparisonImage, alt: 'Comparison Page' },
    { id: 8, image: musicPlayerImage, alt: 'Music Player Page' },
    { id: 9, image: hedgehogImage, alt: 'Hedgehog Page' },
    { id: 10, image: brandImage, alt: '51Talk Brand Page' },
  ];

  const goToPage = (index: number) => {
    if (index === currentPage) return;
    setDirection(index > currentPage ? 1 : -1);
    setCurrentPage(index);
  };

  const goToPrevious = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < pages.length - 1) {
      setDirection(1);
      setCurrentPage(currentPage + 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // 恢复页面滑动功能，即使在只读模式下也可以滑动切换页面
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // 恢复页面滑动功能，即使在只读模式下也可以滑动切换页面
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;

    if (isUpSwipe && currentPage < pages.length - 1) {
      goToNext();
    }
    if (isDownSwipe && currentPage > 0) {
      goToPrevious();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // 恢复页面滑动功能，即使在只读模式下也可以滑动切换页面
    setTouchEnd(null);
    setTouchStart(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // 恢复页面滑动功能，即使在只读模式下也可以滑动切换页面
    if (touchStart === null) return;
    setTouchEnd(e.clientY);
  };

  const handleMouseUp = () => {
    if (!touchStart || !touchEnd) {
      setTouchStart(null);
      setTouchEnd(null);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;

    if (isUpSwipe && currentPage < pages.length - 1) {
      goToNext();
    }
    if (isDownSwipe && currentPage > 0) {
      goToPrevious();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Mobile container */}
      <div className="relative w-full h-full max-w-md bg-white md:rounded-3xl md:shadow-2xl overflow-hidden touch-none">
        {/* Pages container */}
        <div 
          className="relative w-full h-full select-none touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-y'
          }}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentPage}
              custom={direction}
              initial={{
                opacity: 0,
                scale: 0.95
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              exit={{
                opacity: 0,
                scale: 1.05
              }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="absolute inset-0"
            >
              <div className="relative w-full h-full">
                <ImageWithFallback
                  src={pages[currentPage].image}
                  alt={pages[currentPage].alt}
                  className="w-full h-full object-cover pointer-events-none"
                />
                
                {/* User info overlay on welcome page (page 0) */}
                {currentPage === 0 && (
                  <WelcomeUserInfo />
                )}
                
                {/* Clickable button area for first page */}
                {currentPage === 0 && (
                  <button
                    onClick={goToNext}
                    className="absolute bottom-[12%] left-1/2 -translate-x-1/2 w-[70%] h-[7%] cursor-pointer z-20"
                    aria-label="开启旅程"
                  />
                )}
                
                {/* User info overlay on stats page (page 1) */}
                {currentPage === 1 && (
                  <StatsUserInfo />
                )}
                
                {/* Text boxes on stats page (page 1) */}
                {currentPage === 1 && (
                  <StatsPageTextBoxes showPosition={isAdjustMode && !isReadOnlyMode} disabled={isReadOnlyMode} />
                )}
                
                {/* Text boxes on chart page (page 2) */}
                {currentPage === 2 && (
                  <ChartPageTextBoxes showPosition={isAdjustMode && !isReadOnlyMode} disabled={isReadOnlyMode} />
                )}
                
                {/* Envelope clickable on envelope page (page 3) */}
                {currentPage === 3 && (
                  <EnvelopeClickable 
                    envelopeData={appData.envelopePageData}
                  />
                )}
                
                {/* Text boxes on progress tree page (page 6) */}
                {currentPage === 6 && (
                  <ProgressTreeTextBoxes showPosition={isAdjustMode && !isReadOnlyMode} disabled={isReadOnlyMode} />
                )}
                
                {/* Text boxes on comparison page (page 7) */}
                {currentPage === 7 && (
                  <ComparisonPageTextBoxes showPosition={isAdjustMode && !isReadOnlyMode} disabled={isReadOnlyMode} />
                )}
                
                {/* Text boxes on music player page (page 8) */}
                {currentPage === 8 && (
                  <MusicPlayerClickable />
                )}
                
                {/* Text boxes on hedgehog page (page 9) */}
                {currentPage === 9 && (
                  <PlanningPageTextBoxes showPosition={isAdjustMode && !isReadOnlyMode} disabled={isReadOnlyMode} />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentPage
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Edit user info button - 只读模式下隐藏 */}
        {!isReadOnlyMode && (
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md"
            aria-label="Edit user info"
          >
            <Settings size={20} />
          </button>
        )}
        
        {/* User info editor */}
        {isEditing && !isReadOnlyMode && (
          <UserInfoEditor
            userInfo={appData.userInfo}
            onSave={(newUserInfo) => setAppData({ ...appData, userInfo: newUserInfo })}
            onClose={() => setIsEditing(false)}
          />
        )}
        
        {/* Edit data button - 只读模式下隐藏 */}
        {!isReadOnlyMode && (
          <button
            onClick={() => setIsEditingData(!isEditingData)}
            className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-md z-10"
            aria-label="Edit data"
          >
            <Database size={20} />
          </button>
        )}
        
        {/* Data receiver button - 只读模式下隐藏 */}
        {!isReadOnlyMode && (
          <button
            onClick={() => setIsReceivingData(!isReceivingData)}
            className="absolute top-16 left-4 bg-white rounded-full p-2 shadow-md z-10"
            aria-label="Receive data"
            title="接收后端数据"
          >
            <Share2 size={20} />
          </button>
        )}
        
        {/* Position adjust mode toggle button - 只读模式下隐藏 */}
        {!isReadOnlyMode && (
          <button
            onClick={() => setIsAdjustMode(!isAdjustMode)}
            className={`absolute top-28 left-4 rounded-full p-2 shadow-md z-10 transition-colors ${
              isAdjustMode ? 'bg-blue-500 text-white' : 'bg-white text-black'
            }`}
            aria-label="Toggle position adjust mode"
            title="位置调整模式"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        )}
        
        {/* Export positions button - 只读模式下隐藏 */}
        {isAdjustMode && !isReadOnlyMode && (
          <button
            onClick={() => {
              const data = getAppData();
              const positions = {
                statsPageTextBoxes: data.statsPageTextBoxes.map(box => ({
                  id: box.id,
                  position: box.position
                })),
                chartPageTextBoxes: data.chartPageTextBoxes.map(box => ({
                  id: box.id,
                  position: box.position
                })),
                progressTreeTextBoxes: data.progressTreeTextBoxes.map(box => ({
                  id: box.id,
                  position: box.position
                })),
                comparisonPageTextBoxes: data.comparisonPageTextBoxes.map(box => ({
                  id: box.id,
                  position: box.position
                })),
                musicPlayerTextBoxes: data.musicPlayerTextBoxes.map(box => ({
                  id: box.id,
                  position: box.position
                })),
                planningPageTextBoxes: data.planningPageTextBoxes.map(box => ({
                  id: box.id,
                  position: box.position
                }))
              };
              setPositionDataText(JSON.stringify(positions, null, 2));
              setShowPositionData(true);
            }}
            className="absolute top-40 left-4 bg-green-500 text-white rounded-full px-3 py-2 shadow-md z-10 text-xs"
            aria-label="Export positions"
          >
            📋 导出
          </button>
        )}
        
        {/* Data receiver */}
        {isReceivingData && !isReadOnlyMode && (
          <DataReceiver
            open={isReceivingData}
            onOpenChange={setIsReceivingData}
          />
        )}
        
        {/* Data editor */}
        {isEditingData && !isReadOnlyMode && (
          <DataEditor
            appData={appData}
            onSave={setAppData}
            onClose={() => setIsEditingData(false)}
          />
        )}
        
        {/* Position data modal */}
        {showPositionData && !isReadOnlyMode && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-bold">位置数据（复制下方内容）</h2>
                <button
                  onClick={() => setShowPositionData(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-auto p-4">
                <textarea
                  value={positionDataText}
                  readOnly
                  className="w-full h-full min-h-[400px] font-mono text-xs border rounded p-2"
                  onClick={(e) => e.currentTarget.select()}
                />
              </div>
              <div className="p-4 border-t bg-gray-50 text-sm text-gray-600">
                💡 提示: 点击文本框自动全选，然后按 Ctrl+C (或 Cmd+C) 复制
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}