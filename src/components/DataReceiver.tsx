import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Copy, CheckCircle2, AlertCircle, Link as LinkIcon } from 'lucide-react';
import { receiveStudentData, generateShareLink } from '../api/data-api';
import { StudentData } from '../types/data-types';

interface DataReceiverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * 数据接收组件 - 用于接收后端JSON数据并生成分享链接
 */
export function DataReceiver({ open, onOpenChange }: DataReceiverProps) {
  const [jsonText, setJsonText] = useState('');
  const [shareLink, setShareLink] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [customIp, setCustomIp] = useState('');
  const [useCustomIp, setUseCustomIp] = useState(false);

  // 检测当前URL是否是localhost
  const isLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  // 从localStorage读取保存的IP地址
  useEffect(() => {
    const savedIp = localStorage.getItem('shareLinkIp');
    if (savedIp) {
      setCustomIp(savedIp);
      setUseCustomIp(true);
    }
  }, []);

  const handleReceiveData = () => {
    try {
      setError('');
      setSuccess(false);
      setShareLink('');
      
      // 清理可能的特殊字符和空白
      const cleanedText = jsonText.trim();
      
      if (!cleanedText) {
        throw new Error('JSON内容不能为空');
      }
      
      // 尝试解析JSON
      let data: StudentData;
      try {
        data = JSON.parse(cleanedText);
      } catch (parseError) {
        throw new Error('JSON格式错误：' + (parseError instanceof Error ? parseError.message : '无法解析'));
      }
      
      // 验证必需字段
      if (!data.student_name) {
        throw new Error('缺少必需字段: student_name');
      }
      
      // 生成分享链接
      let baseUrl: string | undefined;
      if (useCustomIp && customIp.trim()) {
        // 使用自定义IP地址或域名
        let url = customIp.trim();
        // 如果已经包含协议，直接使用；否则添加http://
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          // 判断是否是域名（包含点但不全是数字）
          if (url.includes('.') && !/^\d+\.\d+\.\d+\.\d+$/.test(url)) {
            // 是域名，使用https
            url = `https://${url}`;
          } else {
            // 是IP地址，使用http
            url = `http://${url}:3000`;
          }
        }
        baseUrl = url;
        // 保存到localStorage
        localStorage.setItem('shareLinkIp', customIp.trim());
      } else if (isLocalhost) {
        // 如果是localhost，提示用户输入IP地址或域名
        throw new Error('检测到使用localhost，手机无法访问。请在上方输入您的IP地址或部署域名');
      }
      
      const result = receiveStudentData(data, baseUrl);
      
      if (result.success) {
        setShareLink(result.shareLink);
        setSuccess(true);
      } else {
        throw new Error(result.error || '生成链接失败');
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : '处理数据失败');
      setSuccess(false);
      setShareLink('');
    }
  };

  const handleCopyLink = async () => {
    if (!shareLink) return;
    
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // 降级方案：使用传统方法
      const textArea = document.createElement('textarea');
      textArea.value = shareLink;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        console.error('复制失败:', e);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleClear = () => {
    setJsonText('');
    setShareLink('');
    setError('');
    setSuccess(false);
    setCopied(false);
  };

  const handleIpChange = (ip: string) => {
    setCustomIp(ip);
    if (ip.trim()) {
      setUseCustomIp(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LinkIcon className="w-5 h-5" />
            接收后端数据并生成分享链接
          </DialogTitle>
          <DialogDescription>
            粘贴后端传送的JSON数据，系统会自动生成一个可分享的链接，用户点击链接即可在手机上查看
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* IP地址配置（仅在localhost时显示） */}
          {isLocalhost && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <label className="block mb-2 text-sm font-medium text-yellow-800">
                📱 手机访问配置
              </label>
              <p className="text-xs text-yellow-700 mb-3">
                检测到使用localhost，手机无法访问localhost链接。请选择以下方案之一：
              </p>
              
              <div className="space-y-3">
                {/* 方案1：输入IP地址 */}
                <div>
                  <label className="block text-xs font-medium mb-1">方案1：使用IP地址（局域网）</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customIp}
                      onChange={(e) => handleIpChange(e.target.value)}
                      placeholder="例如：192.168.1.100"
                      className="flex-1 px-3 py-2 border border-yellow-300 rounded-lg text-sm"
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        const ip = prompt('请输入您的IP地址（例如：192.168.1.100）\n\n提示：在CMD中输入 ipconfig 可查看IP地址');
                        if (ip) {
                          handleIpChange(ip);
                        }
                      }}
                      className="text-xs whitespace-nowrap"
                    >
                      📋 查看IP
                    </Button>
                  </div>
                  <p className="text-xs text-yellow-600 mt-1">
                    💡 提示：在CMD中输入 <code className="bg-yellow-100 px-1 rounded">ipconfig</code> 查看IPv4地址
                  </p>
                </div>
                
                {/* 方案2：输入部署域名 */}
                <div>
                  <label className="block text-xs font-medium mb-1">方案2：使用部署域名（推荐）</label>
                  <input
                    type="text"
                    value={customIp}
                    onChange={(e) => handleIpChange(e.target.value)}
                    placeholder="例如：your-project.vercel.app 或 your-domain.com"
                    className="w-full px-3 py-2 border border-yellow-300 rounded-lg text-sm"
                  />
                  <p className="text-xs text-yellow-600 mt-1">
                    💡 如果已部署到Vercel/Netlify，输入你的部署域名即可
                  </p>
                </div>
              </div>
              
              <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                <p className="font-medium text-blue-800 mb-1">🚀 推荐：部署到Vercel（免费）</p>
                <p className="text-blue-700">
                  1. 访问 <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="underline">vercel.com</a> 注册账号<br/>
                  2. 连接GitHub仓库并部署<br/>
                  3. 获得永久免费域名，全球可访问
                </p>
              </div>
            </div>
          )}

          {/* JSON输入框 */}
          <div>
            <label className="block mb-2 text-sm font-medium">后端JSON数据：</label>
            <Textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              placeholder='粘贴后端传送的JSON数据，例如：&#10;{&#10;  "student_name": "小明",&#10;  "current_level": 3,&#10;  "current_class_hours": 120,&#10;  ...&#10;}'
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          {/* 成功提示和分享链接 */}
          {success && shareLink && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <div className="text-sm text-green-700 flex-1">数据接收成功！分享链接已生成</div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">分享链接：</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="flex-1 px-3 py-2 border rounded-lg bg-gray-50 text-sm font-mono"
                    onClick={(e) => e.currentTarget.select()}
                  />
                  <Button
                    onClick={handleCopyLink}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        已复制
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        复制
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  💡 复制此链接发送给用户，用户点击链接即可在手机上查看数据
                </p>
                {isLocalhost && useCustomIp && (
                  <p className="text-xs text-green-600 mt-1">
                    ✅ 已使用IP地址：{customIp}，手机可以正常访问
                  </p>
                )}
                {!isLocalhost && (
                  <p className="text-xs text-blue-600 mt-1">
                    ℹ️ 当前使用域名访问，链接可在任何设备上打开
                  </p>
                )}
              </div>
            </div>
          )}

          {/* 操作按钮 */}
          <div className="flex gap-2 justify-end pt-4 border-t">
            <Button variant="outline" onClick={handleClear}>
              清空
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              关闭
            </Button>
            <Button onClick={handleReceiveData} disabled={!jsonText.trim()}>
              接收数据并生成链接
            </Button>
          </div>

          {/* 使用说明 */}
          <details className="border rounded-lg p-4 bg-gray-50">
            <summary className="cursor-pointer text-sm font-medium">
              📖 使用说明
            </summary>
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <p><strong>步骤1：</strong>后端将JSON数据通过POST请求或其他方式传送到前端</p>
              <p><strong>步骤2：</strong>将接收到的JSON数据粘贴到上方输入框</p>
              <p><strong>步骤3：</strong>点击"接收数据并生成链接"按钮</p>
              <p><strong>步骤4：</strong>复制生成的分享链接，发送给用户（可通过微信、短信等）</p>
              <p><strong>步骤5：</strong>用户点击链接后，会自动加载数据并显示在页面上</p>
              <p className="mt-3 text-xs text-gray-500">
                ⚠️ 注意：链接中包含编码后的数据，请确保链接完整。链接可以在任何设备上打开。
              </p>
            </div>
          </details>
        </div>
      </DialogContent>
    </Dialog>
  );
}

