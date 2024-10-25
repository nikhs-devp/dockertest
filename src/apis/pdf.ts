import { Request, Response, Router} from 'express';


const apirouter = Router();

apirouter.post('/data', (req: Request, res: Response) => {
  console.log("Success");
  res.send("Success");
});

export default apirouter;