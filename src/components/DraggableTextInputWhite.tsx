import { useState, useEffect } from 'react';
import { DraggableElement } from './DraggableElement';

interface DraggableTextInputWhiteProps {
  id: string;
  content: string;
  initialTop: number;
  initialLeft: number;
  initialScale: number;
  showPosition?: boolean; // 是否显示位置信息
  disabled?: boolean; // 是否禁用编辑和拖拽
  onContentChange: (id: string, content: string) => void;
  onPositionChange: (id: string, top: number, left: number) => void;
  onScaleChange: (id: string, scale: number) => void;
}

export function DraggableTextInputWhite({
  id,
  content,
  initialTop,
  initialLeft,
  initialScale,
  showPosition,
  disabled = false,
  onContentChange,
  onPositionChange,
  onScaleChange
}: DraggableTextInputWhiteProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(content);

  // 同步外部 content 的变化到内部 value（但不覆盖用户正在编辑的内容）
  useEffect(() => {
    if (!isEditing) {
      setValue(content);
    }
  }, [content, isEditing]);

  const handleDoubleClick = () => {
    if (disabled) return; // 如果禁用，不允许编辑
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onContentChange(id, value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      onContentChange(id, value);
    }
  };

  return (
    <DraggableElement
      initialTop={initialTop}
      initialLeft={initialLeft}
      initialScale={initialScale}
      disabled={disabled}
      onPositionChange={(top, left) => onPositionChange(id, top, left)}
      onScaleChange={(scale) => onScaleChange(id, scale)}
    >
      <div className="relative">
        {/* 位置信息显示 */}
        {showPosition && (
          <div 
            className="absolute -top-6 left-0 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none"
            style={{ fontFamily: 'monospace' }}
          >
            T: {initialTop.toFixed(1)}% | L: {initialLeft.toFixed(1)}%
          </div>
        )}
        
        {isEditing ? (
          <input
            type="text"
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            className="bg-transparent border-2 border-white/50 rounded px-2 py-1 text-white outline-none"
            style={{ 
              fontFamily: "'汉仪信黑繁', 'HYXinHei', sans-serif"
            }}
          />
        ) : (
          <span
            onDoubleClick={handleDoubleClick}
            className={disabled ? "cursor-default select-none" : "cursor-pointer select-none"}
            style={{
              fontFamily: "'汉仪信黑繁', 'HYXinHei', sans-serif",
              color: '#FFFFFF',
              fontSize: '24px',
              fontWeight: 'bold'
            }}
          >
            {value || '双击编辑'}
          </span>
        )}
      </div>
    </DraggableElement>
  );
}