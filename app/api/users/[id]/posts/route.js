import Prompt from "@models/promptModel";
import { connectToDB } from "@utils/database";
import express from "express";
const app = express()
app.use(express.json())

export const GET = async (request,res) => {
    const { id } = res.params;

    try {
        await connectToDB();
        const prompts = await Prompt.find({creator:id}).populate("creator")

        return new Response(JSON.stringify(prompts), { status: 200 })
         //res.status(200).json(prompts)
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
         //res.status(500).json({message:"Failed to find prompts"})
        
    }
}

// import Prompt from "@models/promptModel";
// import { connectToDB } from "@utils/database";

// export const GET = async (request, { params }) => {
//     try {
//         await connectToDB()

//         const prompts = await Prompt.find({ creator: params.id }).populate("creator")

//         return new Response(JSON.stringify(prompts), { status: 200 })
//     } catch (error) {
//         return new Response("Failed to fetch prompts created by user", { status: 500 })
//     }
// } 