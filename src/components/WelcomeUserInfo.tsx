import { DraggableElement } from './DraggableElement';
import avatarImage from 'figma:asset/d561a8b5b2d5acc4981d1decbd17f555fb649c7b.png';
import { updateAppData } from '../data/app-config';
import { WelcomePagePositions } from '../types/app-data';
import { useAppData } from '../hooks/useAppData';

export function WelcomeUserInfo() {
  // 使用响应式数据
  const appData = useAppData();
  const { avatar, name, grade } = appData.userInfo;
  const positions = appData.welcomePagePositions;

  // 保存位置变化
  const handlePositionChange = (element: keyof WelcomePagePositions, top: number, left: number) => {
    const newPositions: WelcomePagePositions = {
      ...appData.welcomePagePositions,
      [element]: {
        ...appData.welcomePagePositions[element],
        top,
        left
      }
    };
    updateAppData({ welcomePagePositions: newPositions });
  };

  // 保存缩放变化
  const handleScaleChange = (element: keyof WelcomePagePositions, scale: number) => {
    const newPositions: WelcomePagePositions = {
      ...appData.welcomePagePositions,
      [element]: {
        ...appData.welcomePagePositions[element],
        scale
      }
    };
    updateAppData({ welcomePagePositions: newPositions });
  };

  return (
    <>
      {/* Avatar - 可独立拖动 */}
      <DraggableElement 
        initialTop={positions.avatar.top} 
        initialLeft={positions.avatar.left}
        initialScale={positions.avatar.scale}
        onPositionChange={(top, left) => handlePositionChange('avatar', top, left)}
        onScaleChange={(scale) => handleScaleChange('avatar', scale)}
      >
        <div className="relative">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
            <img 
              src={avatar || avatarImage} 
              alt={name}
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>
        </div>
      </DraggableElement>
      
      {/* Name - 可独立拖动 */}
      <DraggableElement 
        initialTop={positions.name.top} 
        initialLeft={positions.name.left}
        initialScale={positions.name.scale}
        onPositionChange={(top, left) => handlePositionChange('name', top, left)}
        onScaleChange={(scale) => handleScaleChange('name', scale)}
      >
        <span className="text-white text-2xl tracking-wide drop-shadow-lg" style={{ fontFamily: "'汉仪信黑繁', 'HYXinHei', sans-serif" }}>{name}</span>
      </DraggableElement>
      
      {/* Grade - 可独立拖动 */}
      <DraggableElement 
        initialTop={positions.grade.top} 
        initialLeft={positions.grade.left}
        initialScale={positions.grade.scale}
        onPositionChange={(top, left) => handlePositionChange('grade', top, left)}
        onScaleChange={(scale) => handleScaleChange('grade', scale)}
      >
        <span className="text-white/90 drop-shadow-md" style={{ fontFamily: "'汉仪信黑繁', 'HYXinHei', sans-serif" }}>{grade}</span>
      </DraggableElement>
    </>
  );
}
