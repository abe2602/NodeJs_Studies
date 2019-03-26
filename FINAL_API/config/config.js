const env = process.env.NODE_ENV || "dev";

const config = ()=>{
    switch(env) {
        case 'dev':
        return {
            bd_string: "mongodb+srv://user_admin:12345@clusterapi-a0jao.mongodb.net/test?retryWrites=true",
            jwt_pass: "12345",
            token_time: "7d"
        }

        case 'hml':
        return {
            bd_string: "mongodb+srv://user_admin:12345@clusterapi-a0jao.mongodb.net/test?retryWrites=true",
            jwt_pass: "12345",
            token_time: "7d"
        }

        case 'prod':
        return {
            bd_string: "mongodb+srv://user_admin:12345@clusterapi-a0jao.mongodb.net/test?retryWrites=true",
            jwt_pass: "12345",
            token_time: "7d"
        }
    }
}

console.log("API INICIADA EM " + env);

module.exports = config();