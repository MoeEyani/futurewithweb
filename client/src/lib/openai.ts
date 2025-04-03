// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user

export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

// Use proxy function instead of direct OpenAI call
export const generateChatResponse = async (messages: ChatMessage[]): Promise<string> => {
  try {
    // Use the proxy endpoint with the right parameters
    const response = await fetch('/api/openai-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endpoint: 'chat.completions.create',
        params: {
          model: "gpt-4o",
          messages: messages,
        }
      }),
    });
    
    if (!response.ok) {
      // If API fails, return a user-friendly message
      console.error(`API response error: ${response.status}`);
      return "I'm sorry, but I'm temporarily unavailable. Please try again later or contact support for assistance.";
    }
    
    const data = await response.json();
    
    // Check if the API response contains an error
    if (data.success === false) {
      console.error("OpenAI API error:", data.message || "Unknown error");
      return "I'm sorry, but I'm temporarily unavailable. Please try again later or contact support for assistance.";
    }
    
    return data.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error generating chat response:", error);
    // Return a graceful fallback instead of throwing an error
    return "I'm sorry, but I'm temporarily unavailable. Please try again later or contact support for assistance.";
  }
};

// Function to analyze business needs based on input text
export const analyzeBusinessNeeds = async (businessDescription: string): Promise<{
  challenges: string[];
  recommendations: string[];
  priority: 'high' | 'medium' | 'low';
}> => {
  try {
    // Use the proxy endpoint with the right parameters
    const response = await fetch('/api/openai-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endpoint: 'chat.completions.create',
        params: {
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are a business consulting expert. Analyze the business description and provide challenges, recommendations, and priority level in JSON format."
            },
            {
              role: "user",
              content: `Analyze this business: ${businessDescription}`
            }
          ],
          response_format: { type: "json_object" }
        }
      }),
    });
    
    if (!response.ok) {
      // If API fails, return a fallback response that indicates the API is unavailable
      console.error(`API response error: ${response.status}`);
      return {
        challenges: ["The AI analysis is temporarily unavailable."],
        recommendations: ["Please try again later or contact support for assistance."],
        priority: "medium",
      };
    }
    
    const data = await response.json();
    
    // Check if the API response contains an error
    if (data.success === false) {
      console.error("OpenAI API error:", data.message || "Unknown error");
      return {
        challenges: ["The AI analysis is temporarily unavailable."],
        recommendations: ["Please try again later or contact support for assistance."],
        priority: "medium",
      };
    }
    
    const result = JSON.parse(data.choices[0].message.content || '{}');
    
    return {
      challenges: result.challenges || [],
      recommendations: result.recommendations || [],
      priority: result.priority || 'medium',
    };
  } catch (error) {
    console.error("Error analyzing business needs:", error);
    // Return a graceful fallback instead of throwing an error
    return {
      challenges: ["The AI analysis is temporarily unavailable."],
      recommendations: ["Please try again later or contact support for assistance."],
      priority: "medium",
    };
  }
};

// Generate personalized case study based on client info
export const generateCaseStudy = async (
  industry: string, 
  challenges: string, 
  companySize: string
): Promise<{
  title: string;
  summary: string;
  approach: string[];
  outcomes: string[];
  testimonial: string;
}> => {
  try {
    // Use the proxy endpoint with the right parameters
    const response = await fetch('/api/openai-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endpoint: 'chat.completions.create',
        params: {
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "Generate a realistic case study for a business consulting scenario based on the provided information. Return JSON with title, summary, approach, outcomes, and testimonial."
            },
            {
              role: "user",
              content: `Create a case study for a ${companySize} company in the ${industry} industry facing these challenges: ${challenges}`
            }
          ],
          response_format: { type: "json_object" }
        }
      }),
    });
    
    if (!response.ok) {
      // If API fails, return a fallback response that indicates the API is unavailable
      console.error(`API response error: ${response.status}`);
      return {
        title: "Case Study Generation Temporarily Unavailable",
        summary: "Our AI-powered case study generator is currently unavailable. Please try again later or contact support for assistance.",
        approach: ["Service currently unavailable"],
        outcomes: ["Service currently unavailable"],
        testimonial: "",
      };
    }
    
    const data = await response.json();
    
    // Check if the API response contains an error
    if (data.success === false) {
      console.error("OpenAI API error:", data.message || "Unknown error");
      return {
        title: "Case Study Generation Temporarily Unavailable",
        summary: "Our AI-powered case study generator is currently unavailable. Please try again later or contact support for assistance.",
        approach: ["Service currently unavailable"],
        outcomes: ["Service currently unavailable"],
        testimonial: "",
      };
    }
    
    const result = JSON.parse(data.choices[0].message.content || '{}');
    
    return {
      title: result.title || "Case Study",
      summary: result.summary || "",
      approach: result.approach || [],
      outcomes: result.outcomes || [],
      testimonial: result.testimonial || "",
    };
  } catch (error) {
    console.error("Error generating case study:", error);
    // Return a graceful fallback instead of throwing an error
    return {
      title: "Case Study Generation Temporarily Unavailable",
      summary: "Our AI-powered case study generator is currently unavailable. Please try again later or contact support for assistance.",
      approach: ["Service currently unavailable"],
      outcomes: ["Service currently unavailable"],
      testimonial: "",
    };
  }
};