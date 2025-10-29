// lib/api.ts - API Client
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export interface ChatResponse {
  response: string;
  dimension_score?: number;
  is_complete: boolean;
  next_dimension?: string;
}

export interface Dimension {
  id: string;
  label: string;
  order: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const assessmentAPI = {
  async startAssessment(sessionId: string) {
    const response = await fetch(`${API_BASE_URL}/api/assessment/start?session_id=${sessionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  },

  async sendMessage(
    sessionId: string,
    dimension: string,
    message: string,
    conversationHistory: Message[]
  ): Promise<ChatResponse> {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sessionId,
        dimension,
        message,
        conversation_history: conversationHistory,
      }),
    });
    return response.json();
  },

  async getDimensions(): Promise<{ dimensions: Dimension[] }> {
    const response = await fetch(`${API_BASE_URL}/api/dimensions`);
    return response.json();
  },

  async getMaturityLevels() {
    const response = await fetch(`${API_BASE_URL}/api/maturity-levels`);
    return response.json();
  },
};