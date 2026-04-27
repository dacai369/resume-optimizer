import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCcw, Copy, Download, Briefcase } from 'lucide-react';
import { useAppStore } from '../store';
import { HighlightCard } from '../components/HighlightCard';

function buildMarkdown(session: any): string {
  const lines: string[] = [];
  if (session.parsedJd) {
    lines.push(`# 简历亮点 - ${session.parsedJd.title}`);
    lines.push('');
  } else {
    lines.push('# 简历亮点');
    lines.push('');
  }
  lines.push(`> ${session.highlights.summary}`);
  lines.push('');

  session.highlights.highlights.forEach((h: any) => {
    lines.push(`## ${h.title}`);
    lines.push(h.description);
    lines.push('');
    lines.push(`**关键词：** ${h.keywords.join(' · ')}`);
    lines.push('');
  });

  return lines.join('\n');
}

export function HighlightsPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { session, resetSession } = useAppStore();
  const [allCopied, setAllCopied] = useState(false);
  const [mdCopied, setMdCopied] = useState(false);

  React.useEffect(() => {
    if (!session || session.id !== sessionId || !session.highlights) {
      navigate('/');
    }
  }, [session, sessionId, navigate]);

  if (!session || !session.highlights) {
    return <div className="min-h-screen flex items-center justify-center">加载中...</div>;
  }

  const handleRestart = () => {
    resetSession();
    navigate('/');
  };

  const handleCopyAll = () => {
    const text = session.highlights!.highlights
      .map((h: any) => `【${h.title}】\n${h.description}\n关键词：${h.keywords.join('、')}`)
      .join('\n\n');
    navigator.clipboard.writeText(text).then(() => {
      setAllCopied(true);
      setTimeout(() => setAllCopied(false), 2000);
    });
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(buildMarkdown(session)).then(() => {
      setMdCopied(true);
      setTimeout(() => setMdCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          返回首页
        </button>

        {/* 头部 */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">简历亮点提取完成！</h1>
              {session.parsedJd && (
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Briefcase className="w-4 h-4" />
                  <span>针对岗位：{session.parsedJd.title}</span>
                </div>
              )}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={handleCopyMarkdown}
                className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                title="复制为 Markdown 格式"
              >
                <Download className="w-4 h-4" />
                {mdCopied ? 'Markdown 已复制' : 'MD 格式'}
              </button>
              <button
                onClick={handleCopyAll}
                className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm transition-colors"
              >
                <Copy className="w-4 h-4" />
                {allCopied ? '已复制全部' : '复制全部'}
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-5 border border-blue-100">
            <p className="text-gray-700 text-sm leading-relaxed">{session.highlights.summary}</p>
          </div>
        </div>

        {/* 亮点卡片 */}
        <div className="space-y-4 mb-8">
          {session.highlights.highlights.map((highlight: any, index: number) => (
            <HighlightCard key={index} highlight={highlight} index={index} />
          ))}
        </div>

        {/* 提示 */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6 text-sm text-amber-700">
          💡 <strong>使用建议：</strong>以上内容为模板，建议结合你的真实项目经历和具体数据（如"提升性能20%"、"完成xxx项目"）进行个性化填充，让简历更有说服力。
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleRestart}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-white text-gray-700 border-2 border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-all"
          >
            <RefreshCcw className="w-5 h-5" />
            换个 JD 重新测评
          </button>
        </div>
      </div>
    </div>
  );
}
