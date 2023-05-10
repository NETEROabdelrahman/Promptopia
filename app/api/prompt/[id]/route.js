import Prompt from "@models/promptModel";
import { connectToDB } from "@utils/database";


//GET THE POST 
export const GET = async (request,{params}) => {
    const id = params.id
    console.log(id)

    try {
        await connectToDB();
        const prompt = await Prompt.findById(id)
        console.log(prompt)
        if (!prompt) return new Response("Prompt Not Found", { status: 404 });


        return new Response(JSON.stringify(prompt), { status: 200 })
        
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch the prompt", { status: 500 })
         
        
    }
}
//UPDATE THE POST 
export const PATCH = async (request,{params}) => {
    const { prompt, tag } = await request.json();
    
    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);
        
        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        
        await existingPrompt.save();
        
        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
}
//DELETE THE POST 
export const DELETE = async (request,{params}) => {
    console.log(request)
    try {
        await connectToDB();

        // deleting the prompt
        await Prompt.findByIdAndRemove(params.id)
        
        return new Response("Successfully deleted the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error deleting Prompt", { status: 500 });
    }
}