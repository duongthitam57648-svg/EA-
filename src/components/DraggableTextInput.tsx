import { useState, useEffect } from 'react';
import { DraggableElement } from './DraggableElement';

interface DraggableTextInputProps {
  id: string;
  content: string;
  initialTop: number;
  initialLeft: number;
  initialScale: number;
  fixedWidth?: number;  // 固定宽度（像素）
  fixedHeight?: number; // 固定高度（像素）
  showPosition?: boolean; // 是否显示位置信息
  disabled?: boolean; // 是否禁用编辑和拖拽
  onContentChange: (id: string, content: string) => void;
  onPositionChange: (id: string, top: number, left: number) => void;
  onScaleChange: (id: string, scale: number) => void;
}

export function DraggableTextInput({
  id,
  content,
  initialTop,
  initialLeft,
  initialScale,
  fixedWidth,
  fixedHeight,
  showPosition,
  disabled = false,
  onContentChange,
  onPositionChange,
  onScaleChange
}: DraggableTextInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(content);

  // 当 content prop 变化时同步更新内部 value（但不覆盖用户正在编辑的内容）
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
        
        <div 
          className="flex items-center justify-center"
          style={{
            width: fixedWidth ? `${fixedWidth}px` : 'auto',
            height: fixedHeight ? `${fixedHeight}px` : 'auto'
          }}
        >
          {isEditing ? (
            <input
              type="text"
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              className="bg-transparent border-2 border-yellow-400/50 rounded px-2 py-1 text-white outline-none w-full"
              style={{ 
                fontFamily: "'汉仪信黑繁', 'HYXinHei', sans-serif",
                WebkitTextStroke: '3px #FFC107',
                paintOrder: 'stroke fill'
              }}
            />
          ) : (
            <span
              onDoubleClick={handleDoubleClick}
              className={disabled ? "cursor-default select-none block text-center w-full" : "cursor-pointer select-none block text-center w-full"}
              style={{
                fontFamily: "'汉仪信黑繁', 'HYXinHei', sans-serif",
                color: "#FFFFFF",
                WebkitTextStroke: "3px #FFC107",
                paintOrder: "stroke fill",
                fontSize: "24px",
                fontWeight: "bold",
                position: "relative",
                top: "20px",
                left: "30px"
              }}
            >
              {value || '双击编辑'}
            </span>
          )}
        </div>
      </div>
    </DraggableElement>
  );
}