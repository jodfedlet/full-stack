import StartUp from "./startUp";

let port = process.env.PORT || '3333';

StartUp.app.listen(port, function(){
    console.log(`The api project is running at the port: ${port}`);
})