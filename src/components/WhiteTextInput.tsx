import { useState, useEffect } from 'react';
import { DraggableElement } from './DraggableElement';

interface WhiteTextInputProps {
  id: string;
  content: string;
  initialTop: number;
  initialLeft: number;
  initialScale: number;
  showPosition?: boolean; // 是否显示位置信息
  maxCharsPerLine?: number; // 每行最多显示的字符数，超过自动换行
  disabled?: boolean; // 是否禁用编辑和拖拽
  onContentChange: (id: string, content: string) => void;
  onPositionChange: (id: string, top: number, left: number) => void;
  onScaleChange: (id: string, scale: number) => void;
}

// 解析文本，将数字部分分离出来
function parseTextWithNumbers(text: string) {
  const parts = [];
  const regex = /(\d+)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // 添加数字前的文本
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
    }
    // 添加数字
    parts.push({ type: 'number', content: match[0] });
    lastIndex = match.index + match[0].length;
  }
  
  // 添加剩余的文本
  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return parts;
}

// 将文本按指定字符数自动换行
function splitTextByChars(text: string, maxCharsPerLine?: number): string[] {
  if (!maxCharsPerLine) {
    return [text];
  }
  
  const lines: string[] = [];
  let currentLine = '';
  
  for (let i = 0; i < text.length; i++) {
    currentLine += text[i];
    
    // 当前行达到最大字符数时换行
    if (currentLine.length === maxCharsPerLine) {
      lines.push(currentLine);
      currentLine = '';
    }
  }
  
  // 添加最后一行
  if (currentLine.length > 0) {
    lines.push(currentLine);
  }
  
  return lines;
}

export function WhiteTextInput({
  id,
  content,
  initialTop,
  initialLeft,
  initialScale,
  showPosition,
  maxCharsPerLine,
  disabled = false,
  onContentChange,
  onPositionChange,
  onScaleChange
}: WhiteTextInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(content);

  // 当 content prop 变化时，更新内部的 value 状态
  useEffect(() => {
    setValue(content);
  }, [content]);

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

  const renderContent = () => {
    const displayText = value || '双击编辑';
    
    // 如果设置了每行字符数，则按行分割文本
    if (maxCharsPerLine) {
      const lines = splitTextByChars(displayText, maxCharsPerLine);
      return (
        <div className="flex flex-col">
          {lines.map((line, lineIndex) => {
            const parts = parseTextWithNumbers(line);
            return (
              <div key={lineIndex}>
                {parts.map((part, partIndex) => (
                  <span
                    key={partIndex}
                    style={{
                      fontSize: part.type === 'number' ? '40px' : '24px',
                      fontWeight: 'bold'
                    }}
                  >
                    {part.content}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
      );
    }
    
    // 默认渲染（不换行）
    const parts = parseTextWithNumbers(displayText);
    return parts.map((part, index) => (
      <span
        key={index}
        style={{
          fontSize: part.type === 'number' ? '40px' : '24px',
          fontWeight: 'bold'
        }}
      >
        {part.content}
      </span>
    ));
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
            className="bg-transparent border-2 border-black/50 rounded px-2 py-1 text-black outline-none"
            style={{ 
              fontFamily: "'汉仪信黑繁', 'HYXinHei', sans-serif",
              fontSize: '24px',
              fontWeight: 'bold'
            }}
          />
        ) : (
          <span
            onDoubleClick={handleDoubleClick}
            className={disabled ? "cursor-default select-none text-black" : "cursor-pointer select-none text-black"}
            style={{
              fontFamily: "'汉仪信黑繁', 'HYXinHei', sans-serif"
            }}
          >
            {renderContent()}
          </span>
        )}
      </div>
    </DraggableElement>
  );
}