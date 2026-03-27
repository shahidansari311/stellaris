/**
 * Generates calming response text and audio tags based on escalation score.
 */
const responses = [
  { 
    min: 8, max: 10, 
    text: "I hear that you're very frustrated, and I'm here to listen. Let's take a breath and work through this together.",
    tags: ["authoritative", "firm", "grounding"]
  },
  { 
    min: 5, max: 7, 
    text: "I understand that things are getting tense. I'm focusing on finding a solution that works for you.",
    tags: ["empathetic", "acknowledging", "calm"]
  },
  { 
    min: 1, max: 4, 
    text: "I appreciate your patience throughout this. I'm glad we can resolve this smoothly.",
    tags: ["warm", "affirming", "resolved", "soothing"]
  }
];

const getCalmResponse = (score) => {
  const result = responses.find(r => score >= r.min && score <= r.max);
  return result || responses[responses.length - 1]; // Default to lowest if score is very low
};

module.exports = { getCalmResponse };
