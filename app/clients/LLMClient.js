import { ChatAnthropic } from "@langchain/anthropic";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

const getLLM = () => {
  const model = new ChatAnthropic({
    temperature: 0.9,
    model: "claude-3-sonnet-20240229",
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const prompt = PromptTemplate.fromTemplate(
    "Answer the question as best as you can: {question}"
  );
  
  const parser = new StringOutputParser();

  const chain = RunnableSequence.from([prompt, model, parser]);
  return chain;
}

const generateAnswer = async (LLM, userQue) => {
    const ans = await LLM.invoke({ question: userQue});
    console.log(ans)
    return ans;
}

module.exports = {getLLM, generateAnswer};