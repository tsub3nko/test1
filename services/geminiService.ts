import { GoogleGenAI, Type } from "@google/genai";
import { SynergyAnalysis } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeSynergy = async (ingredients: string[]): Promise<SynergyAnalysis> => {
  const model = "gemini-2.5-flash";
  
  const ingredientList = ingredients.filter(Boolean).join(", ");
  
  const prompt = `Analyze the nutritional synergy between these ingredients: ${ingredientList}. 
  Focus on how much stronger the effect is together compared to apart.
  If there are 3 or more ingredients, determine if they form a specific "stack" or "trio" effect.
  Determine if it helps with ABSORPTION (Kinetic) or creates a better EFFECT (Dynamic).
  
  IMPORTANT: Write the summary, pros, and cons in SIMPLE, easy-to-understand language suitable for a general audience. Avoid complex scientific jargon unless necessary.
  
  For "chartData", generate a "Benefit Index" (scale 1-10) for a Bar Chart comparison:
  - Create items for each individual ingredient with a baseline score (e.g., 3 or 4).
  - Create a final item "Synergy (All)" with a significantly higher score (e.g., 9 or 10) to visually show the exponential benefit.
  
  Example: [{name: 'Turmeric Alone', value: 3}, {name: 'Pepper Alone', value: 3}, {name: 'Synergy (All)', value: 10}]
  
  Return a structured JSON analysis.
  `;

  const response = await ai.models.generateContent({
    model: model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER, description: "Overall Synergy score 0-100" },
          magnitude: { type: Type.NUMBER, description: "Effect strength/intensity 0-100" },
          amplification: { type: Type.STRING, description: "Multiplier string, e.g. '200%', '3x', 'Optimal'" },
          type: { type: Type.STRING, enum: ["Kinetic", "Dynamic"], description: "Kinetic = Absorption, Dynamic = Effect" },
          synergyName: { type: Type.STRING, description: "Fun or simple name for the combo" },
          summary: { type: Type.STRING, description: "Simple, easy to read analysis." },
          pros: { type: Type.ARRAY, items: { type: Type.STRING } },
          cons: { type: Type.ARRAY, items: { type: Type.STRING } },
          scientificConsensus: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
          mechanism: { type: Type.STRING, description: "Biological mechanism" },
          riskLevel: { type: Type.STRING, enum: ["None", "Low", "Moderate", "High"] },
          impactDomain: { type: Type.STRING, enum: ["Cognitive", "Physical", "Metabolic", "Immune"], description: "Primary area of benefit" },
          chartData: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                value: { type: Type.NUMBER },
                fill: { type: Type.STRING, nullable: true }
              }
            }
          }
        },
        required: ["score", "magnitude", "amplification", "type", "synergyName", "summary", "pros", "cons", "scientificConsensus", "mechanism", "riskLevel", "impactDomain", "chartData"]
      }
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as SynergyAnalysis;
  }
  
  throw new Error("Failed to analyze synergy.");
};

export const chatWithAI = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    history: history,
    config: {
      systemInstruction: "You are SynergyCore AI. You help people understand food combinations. Explain things simply, like you are talking to a friend. Be accurate but avoid using too much technical jargon."
    }
  });

  const result = await chat.sendMessage({ message });
  return result.text;
};