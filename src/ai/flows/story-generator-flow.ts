
'use server';
/**
 * @fileOverview A flow for generating success stories.
 *
 * - generateStory - A function that generates a success story based on a title.
 * - StoryInput - The input type for the generateStory function.
 * - StoryOutput - The return type for the generateStory function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const StoryInputSchema = z.object({
  title: z.string().describe('The title of the success story.'),
});
export type StoryInput = z.infer<typeof StoryInputSchema>;

const StoryOutputSchema = z.object({
  title: z.string().describe('The original title of the story.'),
  summary: z
    .string()
    .describe('A compelling, engaging summary of the success story, written in 2-3 sentences.'),
});
export type StoryOutput = z.infer<typeof StoryOutputSchema>;

export async function generateStory(input: StoryInput): Promise<StoryOutput> {
  return storyGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'storyGeneratorPrompt',
  input: { schema: StoryInputSchema },
  output: { schema: StoryOutputSchema },
  prompt: `You are an expert copywriter for a government institution called the Wafaqi Mohtasib (Federal Ombudsman), which resolves citizen complaints against government maladministration.

Your task is to write a short, compelling success story summary based on the provided title. The summary should be engaging, written in the third person, and highlight how the Mohtasib's intervention led to a positive outcome for a citizen.

The tone should be professional, hopeful, and empathetic.

Title: {{{title}}}

Generate a summary for this story.
`,
});

const storyGeneratorFlow = ai.defineFlow(
  {
    name: 'storyGeneratorFlow',
    inputSchema: StoryInputSchema,
    outputSchema: StoryOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
