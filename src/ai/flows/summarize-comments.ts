// Summarize the comments of a video using Genkit.
'use server';

/**
 * @fileOverview Summarizes video comments using an AI model.
 *
 * - summarizeComments - A function that summarizes the comments for a given video.
 * - SummarizeCommentsInput - The input type for the summarizeComments function.
 * - SummarizeCommentsOutput - The return type for the summarizeComments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeCommentsInputSchema = z.object({
  comments: z
    .string()
    .describe('The comments for the video.'),
});

export type SummarizeCommentsInput = z.infer<typeof SummarizeCommentsInputSchema>;

const SummarizeCommentsOutputSchema = z.object({
  summary: z.string().describe('A summary of the comments.'),
});

export type SummarizeCommentsOutput = z.infer<typeof SummarizeCommentsOutputSchema>;

export async function summarizeComments(input: SummarizeCommentsInput): Promise<SummarizeCommentsOutput> {
  return summarizeCommentsFlow(input);
}

const summarizeCommentsPrompt = ai.definePrompt({
  name: 'summarizeCommentsPrompt',
  input: {schema: SummarizeCommentsInputSchema},
  output: {schema: SummarizeCommentsOutputSchema},
  prompt: `Summarize the following comments:

{{{comments}}}`,
});

const summarizeCommentsFlow = ai.defineFlow(
  {
    name: 'summarizeCommentsFlow',
    inputSchema: SummarizeCommentsInputSchema,
    outputSchema: SummarizeCommentsOutputSchema,
  },
  async input => {
    const {output} = await summarizeCommentsPrompt(input);
    return output!;
  }
);
