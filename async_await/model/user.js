const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, select: false},
    created: {type: Date, default: Date.now}
});

//Usar a função pré-save
UserSchema.pre("save", async function(next){
    let user = this;

    if(!user.isModified("password")){
        return next();
    }else{
        //Criptografa a senha
        user.password = await bcrypt.hash(user.password, 10);
        return next();
    }
});

module.exports = mongoose.model("User", UserSchema);