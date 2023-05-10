import Prompt from "@models/promptModel";
import { connectToDB } from "@utils/database";
import express from "express";
const app = express()
app.use(express.json())

export const POST = async (request,res) => {
    const { userId, prompt, tag } = await request.json();

    try {
        await connectToDB();
        const newPrompt = new Prompt({ creator: userId, prompt, tag });

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })
         //res.status(201).json(newPrompt)
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
         //res.status(500).json({message:"Failed to create a new prompt"})
        
    }
}