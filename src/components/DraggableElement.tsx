import { useState, useRef, useEffect } from 'react';
import { Maximize2 } from 'lucide-react';

interface DraggableElementProps {
  children: React.ReactNode;
  initialTop: number;
  initialLeft: number;
  initialScale?: number;
  onPositionChange?: (top: number, left: number) => void;
  onScaleChange?: (scale: number) => void;
  disabled?: boolean; // 是否禁用拖拽功能
}

export function DraggableElement({ 
  children, 
  initialTop, 
  initialLeft, 
  initialScale = 1,
  onPositionChange,
  onScaleChange,
  disabled = false
}: DraggableElementProps) {
  const [position, setPosition] = useState({ top: initialTop, left: initialLeft });
  const [scale, setScale] = useState(initialScale);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const resizeStartRef = useRef({ x: 0, y: 0, scale: 1 });
  const positionRef = useRef(position);
  const scaleRef = useRef(scale);

  // 当 initialTop/initialLeft/initialScale 变化时同步更新内部 state
  useEffect(() => {
    setPosition({ top: initialTop, left: initialLeft });
  }, [initialTop, initialLeft]);

  useEffect(() => {
    setScale(initialScale);
  }, [initialScale]);

  // 保持 ref 同步
  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  const updatePosition = (newPosition: { top: number; left: number }) => {
    setPosition(newPosition);
    onPositionChange?.(newPosition.top, newPosition.left);
  };

  const updateScale = (newScale: number) => {
    const clampedScale = Math.max(0.3, Math.min(3, newScale));
    setScale(clampedScale);
    onScaleChange?.(clampedScale);
  };

  // 键盘控制
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isFocused) return;
    
    const step = e.shiftKey ? 5 : 1; // Shift 加速移动
    
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        updatePosition({ ...positionRef.current, top: positionRef.current.top - step });
        break;
      case 'ArrowDown':
        e.preventDefault();
        updatePosition({ ...positionRef.current, top: positionRef.current.top + step });
        break;
      case 'ArrowLeft':
        e.preventDefault();
        updatePosition({ ...positionRef.current, left: positionRef.current.left - step });
        break;
      case 'ArrowRight':
        e.preventDefault();
        updatePosition({ ...positionRef.current, left: positionRef.current.left + step });
        break;
      case '+':
      case '=':
        e.preventDefault();
        updateScale(scaleRef.current + 0.1);
        break;
      case '-':
      case '_':
        e.preventDefault();
        updateScale(scaleRef.current - 0.1);
        break;
    }
  };

  // 鼠标滚轮缩放
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    updateScale(scaleRef.current + delta);
  };

  // 拖动位置 - 优化版本
  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) {
      // 如果禁用，不阻止事件冒泡，让页面滑动功能正常工作
      return;
    }
    if ((e.target as HTMLElement).closest('.resize-handle')) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY
    };
    // 只有在启用拖拽时才阻止事件冒泡
    e.stopPropagation();
    
    // 自动聚焦以启用键盘控制
    elementRef.current?.focus();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    
    const newPosition = {
      top: positionRef.current.top + (deltaY / window.innerHeight) * 100,
      left: positionRef.current.left + (deltaX / window.innerWidth) * 100
    };
    
    updatePosition(newPosition);
    
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY
    };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 监听全局鼠标事件以提高流畅度
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) {
      // 如果禁用，不阻止事件冒泡，让页面滑动功能正常工作
      return;
    }
    if ((e.target as HTMLElement).closest('.resize-handle')) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
    // 只有在启用拖拽时才阻止事件冒泡
    e.stopPropagation();
    elementRef.current?.focus();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    // 如果正在拖拽，阻止事件冒泡，避免触发页面滑动
    e.stopPropagation();
    
    const deltaX = e.touches[0].clientX - dragStartRef.current.x;
    const deltaY = e.touches[0].clientY - dragStartRef.current.y;
    
    const newPosition = {
      top: positionRef.current.top + (deltaY / window.innerHeight) * 100,
      left: positionRef.current.left + (deltaX / window.innerWidth) * 100
    };
    
    updatePosition(newPosition);
    
    dragStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // 调整大小 - 优化版本
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (disabled) return; // 如果禁用，直接返回
    e.stopPropagation();
    setIsResizing(true);
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      scale: scaleRef.current
    };
  };

  const handleResizeMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    
    const deltaX = e.clientX - resizeStartRef.current.x;
    const deltaY = e.clientY - resizeStartRef.current.y;
    const delta = (deltaX + deltaY) / 2;
    
    const newScale = resizeStartRef.current.scale + (delta / 100);
    updateScale(newScale);
  };

  const handleResizeMouseUp = () => {
    setIsResizing(false);
  };

  // 监听全局调整大小事件
  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResizeMouseMove);
      window.addEventListener('mouseup', handleResizeMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleResizeMouseMove);
        window.removeEventListener('mouseup', handleResizeMouseUp);
      };
    }
  }, [isResizing]);

  const handleResizeTouchStart = (e: React.TouchEvent) => {
    if (disabled) return; // 如果禁用，直接返回
    e.stopPropagation();
    setIsResizing(true);
    resizeStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      scale: scaleRef.current
    };
  };

  const handleResizeTouchMove = (e: React.TouchEvent) => {
    if (!isResizing) return;
    
    const deltaX = e.touches[0].clientX - resizeStartRef.current.x;
    const deltaY = e.touches[0].clientY - resizeStartRef.current.y;
    const delta = (deltaX + deltaY) / 2;
    
    const newScale = resizeStartRef.current.scale + (delta / 100);
    updateScale(newScale);
  };

  const handleResizeTouchEnd = () => {
    setIsResizing(false);
  };

  return (
    <div 
      ref={elementRef}
      tabIndex={disabled ? -1 : 0}
      className={`absolute z-10 ${disabled ? 'cursor-default' : (isDragging ? 'cursor-grabbing' : 'cursor-grab')} outline-none group`}
      style={{ 
        top: `${position.top}%`, 
        left: `${position.left}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        borderRadius: '12px'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={disabled ? undefined : handleKeyDown}
      onFocus={() => !disabled && setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onWheel={disabled ? undefined : handleWheel}
    >
      {children}
      
      {/* 调整大小手柄 - 鼠标悬停时显示（禁用模式下隐藏） */}
      {!disabled && (
        <div
          className="resize-handle absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500/80 backdrop-blur-sm rounded-full shadow-lg cursor-nwse-resize flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all z-20 opacity-0 group-hover:opacity-100"
          onMouseDown={handleResizeMouseDown}
          onTouchStart={handleResizeTouchStart}
          onTouchMove={handleResizeTouchMove}
          onTouchEnd={handleResizeTouchEnd}
        >
          <Maximize2 size={14} className="text-white" />
        </div>
      )}
      
      {/* 可视化提示框 - 悬停时显示（禁用模式下隐藏） */}
      {!disabled && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-2">
            <span>🖱️ 拖动移动</span>
            <span className="text-gray-400">|</span>
            <span>🔍 滚轮缩放</span>
          </div>
        </div>
      )}
    </div>
  );
}