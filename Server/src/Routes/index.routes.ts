import { Router , Request , Response} from "express";

const routes = Router()

routes.get('/',(_req:Request,res:Response)=>{
    res.sendFile(process.cwd()+'/pages/index.html')
})
routes.get('/saludo',(_req:Request,res:Response)=>{
    res.json({"hello":"Hello World"})
})

export default routes;