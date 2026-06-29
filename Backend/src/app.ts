import express from 'express'
import runGraph from './ai/graph.ai.js';


const app = express()

app.get('/', (req, res) => {
    console.log("Jai Shree ram");
})

app.get('/get-res', async (req, res) => {
    const result = await runGraph('Write factorial number code in js.')
    console.log(result);

    res.json({
        result
    })
})


export default app