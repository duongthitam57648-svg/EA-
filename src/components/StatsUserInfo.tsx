import { DraggableElement } from './DraggableElement';
import avatarImage from 'figma:asset/d561a8b5b2d5acc4981d1decbd17f555fb649c7b.png';
import { updateAppData } from '../data/app-config';
import { useAppData } from '../hooks/useAppData';

export function StatsUserInfo() {
  const appData = useAppData();
  const { avatar, name } = appData.userInfo;
  const positions = appData.statsPagePositions;

  // 保存头像位置变化
  const handleAvatarPositionChange = (top: number, left: number) => {
    updateAppData({ 
      statsPagePositions: {
        ...appData.statsPagePositions,
        avatar: {
          ...appData.statsPagePositions.avatar,
          top,
          left
        }
      }
    });
  };

  // 保存头像缩放变化
  const handleAvatarScaleChange = (scale: number) => {
    updateAppData({ 
      statsPagePositions: {
        ...appData.statsPagePositions,
        avatar: {
          ...appData.statsPagePositions.avatar,
          scale
        }
      }
    });
  };

  // 保存名字位置变化
  const handleNamePositionChange = (top: number, left: number) => {
    updateAppData({ 
      statsPagePositions: {
        ...appData.statsPagePositions,
        name: {
          ...appData.statsPagePositions.name,
          top,
          left
        }
      }
    });
  };

  // 保存名字缩放变化
  const handleNameScaleChange = (scale: number) => {
    updateAppData({ 
      statsPagePositions: {
        ...appData.statsPagePositions,
        name: {
          ...appData.statsPagePositions.name,
          scale
        }
      }
    });
  };

  return (
    <>
      {/* 头像 - 独立可拖动 */}
      <DraggableElement
        initialTop={positions.avatar.top}
        initialLeft={positions.avatar.left}
        initialScale={positions.avatar.scale}
        onPositionChange={handleAvatarPositionChange}
        onScaleChange={handleAvatarScaleChange}
      >
        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
          <img 
            src={avatar || avatarImage} 
            alt={name}
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>
      </DraggableElement>
      
      {/* 名字 - 独立可拖动 - 固定宽度容器，左对齐显示 */}
      <DraggableElement
        initialTop={positions.name.top}
        initialLeft={positions.name.left}
        initialScale={positions.name.scale}
        onPositionChange={handleNamePositionChange}
        onScaleChange={handleNameScaleChange}
      >
        <div 
          className="flex items-center" 
          style={{ 
            width: '150px',
            height: '40px'
          }}
        >
          <span 
            className="text-white drop-shadow-lg truncate block text-left w-full" 
            style={{ 
              fontFamily: "'汉仪信黑繁', 'HYXinHei', sans-serif", 
              fontSize: '24px'
            }}
          >
            {name}
          </span>
        </div>
      </DraggableElement>
    </>
  );
}