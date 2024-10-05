import express from 'express'
import bodyParser  from 'body-parser'
import ejs from 'ejs'
const app = express();
const PORT = process.env.PORT || 3000;
const ArrayHolder=[];
const ValueHolder=[];
app.use(express.static("public"))
app.get("/",(req,res)=>{
    res.render("index.ejs",{
        value:""
    })
});
app.use(bodyParser.urlencoded({ extended: true }));
function myfunc(req,res,next){
    let content= req.body.text
    ArrayHolder.push(content);
    res.render("viewPost.ejs",{
            Data :content,
            ArrayDetails :ArrayHolder,
            ArrayLength : ArrayHolder.length        
    })
    next();
}
app.post("/submit",(req,res)=>{
    let content= req.body.text
    ArrayHolder.push(content)
    res.render("viewPost.ejs",{
            Data :content,
            ArrayDetails :ArrayHolder || [],
            ArrayLength : ArrayHolder.length,
            index: ValueHolder,
            check:1
    })
})
app.post("/update",(req,res)=>{
        res.render("index.ejs",{
            temp:1,
            value: ArrayHolder[req.body.action]
        })
        const newArray= ArrayHolder.splice(req.body.action,1)
})
app.post("/delete",(req,res)=>{
        const newArray= ArrayHolder.splice(req.body.action,1)
        res.render("viewPost.ejs",{
            BlogId: req.body.BlogId,
            Data :1,
            ArrayDetails :ArrayHolder,
            ArrayLength : ArrayHolder.length,
            check:0    
    })
    })
app.get("/viewPost.ejs",(req,res)=>{
        res.render("viewPost.ejs",{
            Data :1,
            ArrayDetails :ArrayHolder,
            ArrayLength : ArrayHolder.length
        })
})
app.get("/index.ejs",(req,res)=>{
    res.render("index.ejs",{
        value:""
    })
})
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
