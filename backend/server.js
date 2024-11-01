import express from'express';
const app=express();
app.get("/", (req, res)=>{
res.send('am enjoying')
});

const PORT=5000;
app.listen(PORT, ()=>{
  console.log(`Am running on port ${PORT}`)
})