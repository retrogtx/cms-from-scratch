import express from "express";

const app = express();
app.use(express.json());

app.post("/user/signup", function(req, res) {
    res.json({
        message: "signup endpoint"
    })
})

app.post("/user/signin", function(req, res) {
    res.json({
        message: "signup endpoint"
    })
})

app.get("/user/purchases", function(req, res) {
    res.json({
        message: "signup endpoint"
    })
})

app.post("/course/purchase", function(req, res) {
    // you would expect the user to pay you money
    res.json({
        message: "signup endpoint"
    })
})

app.get("/courses", function(req, res) {
    res.json({
        message: "signup endpoint"
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
