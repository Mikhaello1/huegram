import e from "express";
// import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import usersRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import commentsRoutes from "./routes/comments.js"
import likesRoutes from "./routes/likes.js"
import storiesRoutes from "./routes/stories.js"
import postsRoutes from "./routes/posts.js"
import searchAccountsHistoryRouter from "./routes/searchAccountsHistory.js"


const app = e();

dotenv.config();

app.use(e.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/search", searchAccountsHistoryRouter)
app.use("/api/users", usersRoutes)
app.use("/api/auth", authRoutes)





app.get('/users', (req, res) => {
    const q = "SELECT * FROM huegram.users"; 
    db.query(q, (err, data) => {
        if(err) return res.send(err);
        return res.send(data);
    })
})


app.get('/', (req, res) => {
    res.send('HUEGRAM');
});

// app.post('/auth/login', (req, res) => {
//     console.log(req.body);
    
//     const token = jwt.sign(
//         {
//             email: req.body.email,
//             fuulName: 'Мамут Рахал',
//         },
//         'secret123',
//     );

//     res.json({
//         succes: true,
//         token,
//     });
// });



app.listen(4444, err => {
    if (err) return console.log(err);

    console.log('SERVER OK!');
});