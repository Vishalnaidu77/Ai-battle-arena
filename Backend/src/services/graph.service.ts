import { HumanMessage } from "@langchain/core/messages";
import { StateSchema, MessagesValue, StateGraph, START, END, ReducedValue } from "@langchain/langgraph";
import type { GraphNode } from "@langchain/langgraph";
import { z } from "zod";
import { createAgent, providerStrategy } from "langchain";
import { cohereModel, geminiModel, mistralModel } from "./models.service.js";

const State = new StateSchema({
    messages: MessagesValue,
    solution_1: new ReducedValue(z.string().default(""), {
        reducer: (current, next) => {
            return next
        }
    }),
    solution_2: new ReducedValue(z.string().default(""), {
        reducer: (current, next) => {
            return next
        }
    }),
    judge_recommendation: new ReducedValue(z.object().default({
        solution_1_score: 0,
        solution_2_score: 0
    }), {
        reducer: (current, next) => {
            return next
        }
    })
})

const solutionNode: GraphNode<typeof State> = async (state: typeof State) => {

    console.log(state);
    
    const [mistral_solution, cohere_solution] = await Promise.all([
        mistralModel.invoke(state.messages[0].content),
        cohereModel.invoke(state.messages[0].content)
    ])
    
    return {
        solution_1: mistral_solution.content as string,
        solution_2: cohere_solution.content as string
    }  

}

const judgeNode: GraphNode<typeof State> = async (state: typeof State) => {

    const { solution_1, solution_2 } = state

    console.log('Invoking judge with state', state);
    

    const judge = createAgent({
        model: geminiModel,
        tools: [],
        responseFormat: providerStrategy(z.object({
            solution_1_score: z.number().min(0).max(10),
            solution_2_score: z.number().min(0).max(10),
        }))
    })

    const judgeResponse = await judge.invoke({
        messages: [
            new HumanMessage(
                `You are a judge tasked with evaluating the quallity of two solutions to a ptoblem. The problem is: ${state.messages[0].content}. 
                The first solution is: ${solution_1}. The second solution is: ${solution_2}.
                please provide a score between o and 10 for each solutionn, where 0 means the solution is completely incorrect or irrelevant,
                and 10 means the solution is perfect and ully addresses the problem.
                `
            )
        ]
    })

    const result = judgeResponse.structuredResponse

    return {
        judge_recommendation: result
    }
}

const graph = new StateGraph(State)
    .addNode("solution", solutionNode)
    .addNode("judge", judgeNode)
    .addEdge(START, "solution")
    .addEdge("solution", "judge")
    .addEdge("judge", END)
    .compile()

export default async function(userMessage: string){
    const result = await graph.invoke({
        messages: [
            new HumanMessage(userMessage)
        ]
    })

    return result.messages
}