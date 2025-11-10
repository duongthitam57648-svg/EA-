import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { X } from 'lucide-react';

export function MusicPlayerClickable() {
  const [isTopVideoOpen, setIsTopVideoOpen] = useState(false);
  const [isBottomVideoOpen, setIsBottomVideoOpen] = useState(false);

  return (
    <>
      {/* 上方视频点击区域 - 学前例句 */}
      <div
        className="absolute cursor-pointer hover:bg-white/10 transition-all duration-200 rounded-lg"
        style={{
          top: '20%',
          left: '10%',
          width: '80%',
          height: '25%',
        }}
        onClick={() => setIsTopVideoOpen(true)}
      />

      {/* 下方视频点击区域 - 学后例句 */}
      <div
        className="absolute cursor-pointer hover:bg-white/10 transition-all duration-200 rounded-lg"
        style={{
          top: '52%',
          left: '10%',
          width: '80%',
          height: '25%',
        }}
        onClick={() => setIsBottomVideoOpen(true)}
      />

      {/* 上方视频播放对话框 */}
      <Dialog open={isTopVideoOpen} onOpenChange={setIsTopVideoOpen}>
        <DialogContent className="max-w-4xl w-[90vw] h-[80vh] p-0 bg-black border-none">
          <DialogTitle className="sr-only">学前例句视频</DialogTitle>
          <DialogDescription className="sr-only">播放学前例句学习视频</DialogDescription>
          <button
            onClick={() => setIsTopVideoOpen(false)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="w-full h-full flex items-center justify-center">
            <video
              className="w-full h-full object-contain"
              controls
              autoPlay
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            >
              您的浏览器不支持视频播放
            </video>
          </div>
        </DialogContent>
      </Dialog>

      {/* 下方视频播放对话框 */}
      <Dialog open={isBottomVideoOpen} onOpenChange={setIsBottomVideoOpen}>
        <DialogContent className="max-w-4xl w-[90vw] h-[80vh] p-0 bg-black border-none">
          <DialogTitle className="sr-only">学后例句视频</DialogTitle>
          <DialogDescription className="sr-only">播放学后例句学习视频</DialogDescription>
          <button
            onClick={() => setIsBottomVideoOpen(false)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="w-full h-full flex items-center justify-center">
            <video
              className="w-full h-full object-contain"
              controls
              autoPlay
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            >
              您的浏览器不支持视频播放
            </video>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}