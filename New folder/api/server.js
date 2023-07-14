const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const UserModel = require("./models/Todo");
const UserSignInModel = require("./models/SignIn");
const generateAuthKey = require("./middelware");
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(cors());
 
// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'D:\\Mano\\CRUDiNMERN\\mern\\src\\assets\\prrofile-img');
  },
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
    fieldSize: 10 * 1024 * 1024, // 10MB
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

mongoose
  .connect("mongodb://0.0.0.0:27017/todo-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

// ===================================================LOGIN CONTROLS==============================================
// app.get("/getUserSign", async (req, res) =>{
//   UserSignInModel.find({})
//   .then((resu) => res.json(resu))
//   .catch((err) => res.json(err));
// })

app.post("/createSign", async (req, res) =>{
  const {username, password} = req.body;
  // const newSignInuser =new UserSignInModel(newUser);
  try{
    const hashedPassword = await bcrypt.hash(password, 10);

    const newSignInuser = new UserSignInModel({
      username: username,
      password: hashedPassword,
    })

    const checkUserName = await UserSignInModel.findOne({username: username});

    if(checkUserName){
      res.status(409).json({message: "User Already Exists"});
    }else{
    const resu = await newSignInuser.save();
    res.json(resu);
    }
  }
  catch(error) {
    res.status(500).json({message: "Error creating user", error: error.message})
  }
})

// VALIDATION
app.post("/checkUser", async (req, res) => {
  const { username, password }  = req.body;

  try{
    const resul = await UserSignInModel.findOne({username: username});

    if(resul){
      const isPasswordValid = await bcrypt.compare(password, resul.password)

      if(isPasswordValid){
        const authKey = generateAuthKey.generateAuthKey(100);
        console.log(authKey)
        res.json({ message: "Login Successfull...", authKey})
      }else{
        res.status(401).json({ message: "Incorrect Password...!" })
      }
    }else{
      res.status(404).json({ message: "User Not Found!!!"})
    }
  }catch (err){
    res.status(500).json({ message: "Error while login", err: err.message })
  }

})

//=========================================== TODO APP CONTROLLER ================================================

app.post('/createUser', generateAuthKey.validateAuthkey, upload.single('image'), async (req, res) => {
  const user = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Image file is required" });
  }

  const newUser = new UserModel({
    name: user.name,
    nest: [{
      age: user.age,
      username: user.username,
    }],
    image: req.file.filename, // Save the filename in the "image" field
  });

  try {
    const result = await newUser.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
});

app.get("/getUsers", (req, res) => {
  UserModel.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => res.json(err));
});

app.put("/editUser/:id", generateAuthKey.validateAuthkey, upload.single("image"), async (req, res) => {
  const userId = req.params.id;
  const updatedUser = {
    $set: {
      name: req.body.name,
      "nest.0.age": req.body.age,
      "nest.0.username": req.body.username,
    },
  };
  
  // Check if a new image file was uploaded
  if (req.file) {
    updatedUser.$set.image = req.file.filename; // Set the image filename in the updatedUser object
  }

  try {
    const result = await UserModel.findByIdAndUpdate(userId, updatedUser);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error editing user", error: error.message });
  }
});


app.delete("/deleteUser/:id",  async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await UserModel.findByIdAndDelete(userId);
    if (result) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
});

app.post("/duplicateUser/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.findById(userId);
    if (user) {
      const duplicatedUser = new UserModel({
        name: user.name,
        age: user.age,
        username: user.username,
        image: user.image,
      });
      await duplicatedUser.save();
      res.json(duplicatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error duplicating user", error: error.message });
  }
});

app.listen(3001, () => console.log("Server started on port 3001"));
