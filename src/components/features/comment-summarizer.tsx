'use client';

import { useState } from 'react';
import { summarizeComments, type SummarizeCommentsInput } from '@/ai/flows/summarize-comments';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import type { VideoComment } from '@/types';

interface CommentSummarizerProps {
  comments: VideoComment[];
  videoId: string;
}

export function CommentSummarizer({ comments, videoId }: CommentSummarizerProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSummarizer, setShowSummarizer] = useState(false);

  const handleSummarize = async () => {
    setIsLoading(true);
    setError(null);
    setSummary(null);

    if (!comments || comments.length === 0) {
      setError("No comments available to summarize.");
      setIsLoading(false);
      return;
    }

    const commentsText = comments.map(c => `${c.user}: ${c.text}`).join('\n');
    const input: SummarizeCommentsInput = { comments: commentsText };

    try {
      const result = await summarizeComments(input);
      setSummary(result.summary);
    } catch (e) {
      console.error('Error summarizing comments:', e);
      setError('Failed to summarize comments. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!showSummarizer) {
    return (
       <Button onClick={() => setShowSummarizer(true)} variant="outline" className="w-full md:w-auto">
        <Sparkles className="mr-2 h-4 w-4" /> Show AI Comment Summary
      </Button>
    )
  }

  return (
    <Card className="mt-6 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Sparkles className="h-5 w-5 text-accent" />
          AI Comment Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="font-semibold mb-2 text-base">Original Comments ({comments.length}):</h3>
          <Textarea
            value={comments.map(c => `${c.user}: ${c.text}`).join('\n')}
            readOnly
            rows={5}
            className="text-sm bg-muted/50"
            aria-label="Original comments"
          />
        </div>
        <Button onClick={handleSummarize} disabled={isLoading} className="w-full md:w-auto mb-4">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          {isLoading ? 'Summarizing...' : 'Generate Summary'}
        </Button>

        {error && (
          <div className="mt-4 p-3 rounded-md bg-destructive/10 text-destructive border border-destructive/20 flex items-center gap-2 text-sm">
            <AlertTriangle className="h-4 w-4" />
            <p>{error}</p>
          </div>
        )}

        {summary && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2 text-base">Summary:</h3>
            <div className="p-3 rounded-md bg-accent/10 text-accent-foreground border border-accent/20 prose prose-sm max-w-none">
              <p>{summary}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
