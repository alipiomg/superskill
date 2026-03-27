import { processMessage } from './ruleEngine';
import { callClaudeAPI } from './apiClient';
import { buildSystemPrompt } from './contextBuilder';

export async function sendMessage(message, userContext, currentPath, options = {}) {
  const { useAPI = false, apiKey = null } = options;

  // First try rule engine
  const ruleResponse = processMessage(message, userContext, currentPath);

  // If rule engine handled it well (not UNKNOWN intent), return it
  if (!ruleResponse.isUnknown && !useAPI) {
    return ruleResponse;
  }

  // If API mode is enabled and we have a key, try API
  if (useAPI && apiKey) {
    try {
      const systemPrompt = buildSystemPrompt(userContext);
      const apiResponse = await callClaudeAPI(message, systemPrompt, apiKey);
      return { text: apiResponse, links: [], chips: [] };
    } catch (error) {
      return {
        text: `Error al conectar con la IA: ${error.message}. Usando modo offline.`,
        links: [],
        chips: ruleResponse.chips,
      };
    }
  }

  // Fallback to rule engine response (even if unknown)
  return ruleResponse;
}
