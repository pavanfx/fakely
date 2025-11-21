import { GoogleGenAI, Type } from "@google/genai";
import { AppType, ThemeType, Message } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateConversation = async (
  app: AppType,
  theme: ThemeType,
  themName: string
): Promise<Message[]> => {
  const systemInstruction = `You are a creative writer designed to generate realistic text message conversations for social media screenshots. 
  Generate a short conversation (5-8 messages) between two people using the specific slang and style typical for the platform '${app}'.
  The conversation should strictly follow the theme: '${theme}'.
  The participants are 'me' (the user taking the screenshot) and 'them' (the person named ${themName}).
  
  Platform Styles:
  - If 'Instagram': Use GenZ casual slang, lowercase usually, 'u' instead of 'you'.
  - If 'Tinder': Flirty, direct, or awkward depending on theme.
  - If 'WhatsApp': Slightly more formal or casual depending on relationship, uses emojis often.
  - If 'TikTok': Very short, brainrot slang (cooked, ate, real), trends.

  Theme Guidelines:
  - 'Flirty': Playful, romantic interest, emojis, teasing.
  - 'Crush': Nervous, excited, subtle hints, trying to impress.
  - 'Dating': Planning a date, discussing logistics, "getting to know you" phase.
  - 'Friendly': Casual, checking in, making plans, low stakes.
  - 'Bestie': High energy, inside jokes, slang, gossip, "tea", CAPS LOCK for emphasis.
  - 'Professional': Polite, work-related, formal grammar, no slang, "Per my last email" energy.
  - 'Stranger': Awkward, "who is this?", marketplace inquiry, or wrong number.
  - 'Ignore': 'them' is dry/short replies (one word), 'me' is trying too hard or double texting.
  - 'Red Flag': 'them' is love bombing, controlling, weirdly aggressive, or narcissistic.
  - 'Toxic': Manipulative, gaslighting, mean, playing victim.
  - 'Argument': Conflict, angry, defensive, short snappy sentences.
  - 'Breakup': Sad, serious, "we need to talk", closure or lack thereof.
  - 'Ex': Nostalgic, bitter, "miss you" texts at 2am, or awkward reconnecting.
  - 'Gossip': Sharing secrets, "did you hear about...", shocked reactions.
  
  Ensure the conversation flows naturally and feels authentic to the selected theme and platform.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a ${theme} conversation for ${app}.`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            messages: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sender: {
                    type: Type.STRING,
                    enum: ["me", "them"],
                  },
                  content: {
                    type: Type.STRING,
                  },
                  time: {
                    type: Type.STRING,
                    description: "Time string like '10:30 AM' or 'Now'",
                  },
                },
                required: ["sender", "content"],
              },
            },
          },
        },
      },
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return data.messages.map((msg: any, index: number) => ({
        ...msg,
        id: `msg-${index}`,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error generating conversation:", error);
    // Fallback in case of error
    return [
      { id: 'err1', sender: 'them', content: 'Hey, did you get my message?', time: 'Now' },
      { id: 'err2', sender: 'me', content: 'Sorry, connection error. Try again!', time: 'Now' },
    ];
  }
};