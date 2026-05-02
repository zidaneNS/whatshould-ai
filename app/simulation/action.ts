'use server';

import { GoogleGenAI } from "@google/genai";
import z from "zod";
import { AiResult } from "./components/AiResultItem";
import zodToJsonSchema from "zod-to-json-schema";
import { cleanAIResponse } from "../helpers/cleanAIResponse";
import { safeJsonParse } from "../helpers/safeJsonParse";

export type RequestState = {
  errors?: {
    prompt?: string[],
    aikoAs?: string[],
  },
  message?: string;
  success?: boolean;
  data?: {
    best?: AiResult;
    realistic?: AiResult;
    worst?: AiResult;
  };
} | undefined;

const requestSchema = z.object({
  prompt: z.string().min(1),
  aikoAs: z.string().optional(),
});

const resultSchema = z.object({
  best: z.object({
    outcome: z.string().describe('The result of the decision make'),
    reason: z.string().describe('The reason of why the outcome happen'),
    advice: z.string().describe('Simple advice to respond the outcome'),
  }).describe('Best outcome from the decision'),
  realistic: z.object({
    outcome: z.string().describe('The result of the decision make'),
    reason: z.string().describe('The reason of why the outcome happen'),
    advice: z.string().describe('Simple advice to respond the outcome'),
  }).describe('Realistic outcome from the decision'),
  worst: z.object({
    outcome: z.string().describe('The result of the decision make'),
    reason: z.string().describe('The reason of why the outcome happen'),
    advice: z.string().describe('Simple advice to respond the outcome'),
  }).describe('Worst outcome from the decision'),
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateAnswers(prevState: any, formData: FormData): Promise<RequestState> {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error('Api key not found');
    }
    const validatedFields = requestSchema.safeParse({
      prompt: formData.get('prompt'),
      aikoAs: formData.get('aikoAs') || undefined,
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const { prompt, aikoAs } = validatedFields.data;

    const aiPrompt = `
    You are Aiko, ${aikoAs ? aikoAs : 'an intelligent decision simulation AI'},

    Your task is to analyze a user's decision and simulate 3 possible scenarios:
    1. Best case
    2. Realistic case
    3. Worst case

    For EACH scenario, you MUST return:
    - outcome: what happens
    - reason: why it happens
    - advice: what the user should do

    IMPORTANT RULES:
    - Respond ONLY in valid JSON
    - Do NOT include explanations outside JSON
    - Do NOT use markdown
    - Keep responses concise but meaningful
    - Use a realistic and practical tone

    Return ONLY valid JSON with this EXACT structure:

    {
      "best": {
        "outcome": "...",
        "reason": "...",
        "advice": "..."
      },
      "realistic": {
        "outcome": "...",
        "reason": "...",
        "advice": "..."
      },
      "worst": {
        "outcome": "...",
        "reason": "...",
        "advice": "..."
      }
    }

    Do NOT return strings. Do NOT flatten fields.

    User decision: ${prompt}
    `;

    const aiRes = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: aiPrompt,
      config: {
        responseMimeType: 'application/json',
        responseJsonSchema: zodToJsonSchema(resultSchema as any),
      }
    });

    if (aiRes.text) {
      const raw = aiRes.text || '';

      const cleaned = cleanAIResponse(raw);

      let parsed = safeJsonParse(cleaned);

      if (parsed && typeof parsed.best === 'string') {
        parsed = {
          best: JSON.parse(parsed.best),
          realistic: JSON.parse(parsed.realistic),
          worst: JSON.parse(parsed.worst),
        };
      }

      const validated = resultSchema.safeParse(parsed);

      if (!validated.success) {
        throw new Error('Invalid AI structure');
      }

      return {
        data: validated.data,
        success: true,
      };
    }

    return {
      message: 'text is not defined',
    }
  } catch (err: any) {
    console.error('generateAnswers:::ERROR', err);

    if (safeJsonParse(err.message || '')?.error?.code === 429) {
      return {
        message: 'Api key invalid / limit quota is 0',
      }
    }

    return {
      message: err?.message || 'Something went wrong'
    }
  }
}