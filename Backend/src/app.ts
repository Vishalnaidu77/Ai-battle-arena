import express from 'express'
import runGraph from './ai/graph.ai.js';
import cors from 'cors'


const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.post('/invoke', async (req, res) => {
    const { input } = req.body
    const result = await runGraph(input)
    console.log(result);

    res.json({
        message: "AI response generated successfully.",
        result
    })
})


export default app