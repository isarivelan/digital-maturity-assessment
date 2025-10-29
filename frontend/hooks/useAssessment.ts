// hooks/useAssessment.ts - Custom React Hook
import { useState, useCallback, useEffect } from 'react';
import { assessmentAPI, Message, Dimension } from '@/lib/api';

export const useAssessment = () => {
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [currentDimension, setCurrentDimension] = useState('strategy');
  const [dimensions, setDimensions] = useState<Dimension[]>([]);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [dimensionScores, setDimensionScores] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize assessment
    const init = async () => {
      try {
        const [startResponse, dimensionsResponse] = await Promise.all([
          assessmentAPI.startAssessment(sessionId),
          assessmentAPI.getDimensions(),
        ]);

        setDimensions(dimensionsResponse.dimensions);
        setConversation([
          { role: 'assistant', content: startResponse.message },
        ]);
      } catch (error) {
        console.error('Failed to initialize assessment:', error);
      }
    };

    init();
  }, [sessionId]);

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;

    setIsLoading(true);
    const userMessage: Message = { role: 'user', content: message };
    const updatedHistory = [...conversation, userMessage];
    setConversation(updatedHistory);

    try {
      const response = await assessmentAPI.sendMessage(
        sessionId,
        currentDimension,
        message,
        updatedHistory
      );

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.response,
      };
      setConversation([...updatedHistory, assistantMessage]);

      if (response.dimension_score) {
        setDimensionScores(prev => ({
          ...prev,
          [currentDimension]: response.dimension_score!,
        }));
      }

      if (response.is_complete && response.next_dimension) {
        setCurrentDimension(response.next_dimension);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setConversation([
        ...updatedHistory,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [conversation, currentDimension, sessionId]);

  const changeDimension = useCallback((dimensionId: string) => {
    setCurrentDimension(dimensionId);
    // Optionally reload conversation for that dimension
  }, []);

  return {
    sessionId,
    currentDimension,
    dimensions,
    conversation,
    dimensionScores,
    isLoading,
    sendMessage,
    changeDimension,
  };
};