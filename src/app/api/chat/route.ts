import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!, // SERVER ONLY
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return NextResponse.json({
      text: response.text,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "AI failed to respond" },
      { status: 500 },
    );
  }
}
