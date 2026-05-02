'use server';

import { GoogleGenAI } from "@google/genai";

const client = await new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function aiInteract() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('Api Key not generated');

    const res = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'Explain how AI works in a few words',
    })

    return res.text;
  } catch (err) {
    console.error('aiInteract:::ERROR', err);
  }
}