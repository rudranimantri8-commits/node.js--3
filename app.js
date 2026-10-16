
const cl = console.log();

cl('rani');

const blogs =  [
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    "userId": 1,
    "id": 3,
    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  },
  {
    "userId": 1,
    "id": 4,
    "title": "eum et est occaecati",
    "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
  },
  {
    "userId": 1,
    "id": 5,
    "title": "nesciunt quas odio",
    "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
  },
  {
    "userId": 1,
    "id": 6,
    "title": "dolorem eum magni eos aperiam quia",
    "body": "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
  },
  {
    "userId": 1,
    "id": 7,
    "title": "magnam facilis autem",
    "body": "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas"
  }
]

const PORT = 3000;
const express = require('express');

const app = express();

app.use(express.json());

//get api 

app.get('/api/blogs',(req,res)=> {
    try{
        res.status(200).json({
            ok:true,
            data:blogs
        })
    }catch(err){
        res.status(500).json({
            ok:false,
            message:'Error NOT Found Blogs',
            error:err.message
        })
    }
})

//fetch to sigle blog

app.get('/api/blogs/:id',(req,res)=>{
    try{
        const id = Number(req.params.id);
        const singleblogs = blogs.find(b => b.id === id)
        if(!singleblogs){
            return res.status(404).json({
                ok:false,
                message:"single blog data not found!!!"
            })
        }
        res.status(200).json({
            ok:true,
            body:singleblogs,
            message:"single blog data fetched successfully !!!"

        })
    }catch(err){
        res.status(500).json({
            ok:false,
            message:"something went wrong !!!",
            error:err.message
        })
    }
})

//create api

app.post('/api/blogs',(req,res)=>{
    try{
        let newblog = {
            id:Date.now().toString(),
            userId:req.body.userId,
            title :req.body.title,
            body:req.body.body,
        }

        blogs.push(newblog)

        res.status(201).json({
            ok:true,
            body:newblog,
            message:"blog created successfully !!!"
        })
    }catch(err){
        res.status(500).json({
            ok:false,
            message:"something went wrong !!!",
            error:err.message
        })
    }
})

//update api

app.patch("/api/blogs/:id",(req,res)=>{
    try{
        let updateblogs = blogs.find(blog => blog.id === req.params.id);

        if(!updateblogs){
            return res.status(404).json({
                ok:false,
                message:"blogs not found !!!"
            })
        }

        updateblogs.userId = req.body.userId;
        updateblogs.title = req.body.title;
        updateblogs.body= req.body.body;

        res.status(200).json({
            ok:true,
            body:updateblogs,
            message: "blogs fetched updated successfully !!!!",
        })
    }catch(err){
        res.status(500).json({
            ok:false,
            message:"something went wrong !!!",
            error:err.message
        })
    }
})

//delete api

app.delete("/api/blogs/:id",(req,res)=>{
    try{
        let getIndex = blogs.findIndex(blog => blog.id === req.params.id);

        if(getIndex === -1){
            return res.status(404).json({
                ok : false,
                message:"blogs not fonud !!!"
            })
        }
        let deletedblogs = blogs.splice(getIndex,1);

        res.status(200).json({
            ok:true,
            body:deletedblogs[0],
            message:"data fetched successfully !!!",
        })
    }catch(err){
        res.status(500).json({
            ok:false,
            message:"something went wrong !!!",
            error:err.message
        })
    }
})

//server

app.listen(PORT,()=>{
    cl(`server is running on PORT ${PORT}`);
});
