import { Request, Response, Router} from 'express';
import { fromBase64, fromBuffer, fromPath } from "pdf2pic";
import { PDFDocument } from 'pdf-lib';


const apirouter = Router();

apirouter.post('/pdf', async(req: Request, res: Response) => {
  try{
    const buffer = await getsupabasefile();
    if(buffer){
     const pages: number =  await splitPdf(buffer);
     for (let i=0; i<pages; i++){
      await pdf2img(buffer,i+1);
     }
    }
    res.send("Success");
  }catch(error){
    res.send((error as Error).message);
  }
});

async function pdf2img(buffer: Buffer, pagenumber: number){
try {

  const convert = fromBuffer(buffer);
  
  convert(pagenumber, { responseType: "base64" })
    .then((base64) => {
      console.log(`Page ${pagenumber} is now converted as image`);
  
      return;
    });
}catch(error){
  console.error(`Error converting page ${pagenumber}:`, error);
    throw new Error(`Error converting page ${pagenumber}: ${(error as Error).message}`);
}
}

async function getsupabasefile(){
  const fileurl = "https://borfnczrxdwlfilewkfj.supabase.co/storage/v1/object/sign/test/Interviews/testpdf.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZXN0L0ludGVydmlld3MvdGVzdHBkZi5wZGYiLCJpYXQiOjE3Mjk4ODkxMDUsImV4cCI6MTczMDQ5MzkwNX0.AcdpiSm9XAuKw6xdasxa5h8rzY_uwT0B1BzbqrM7Tig&t=2024-10-25T20%3A45%3A05.488Z";
  try {
    const response = await fetch(fileurl, {
      method: 'GET',
      headers: {
      }
    });

    if (!response.ok) {
      console.error('Failed to fetch the file:', response.statusText);
      return null;
    }

    const arraybuffer = await response.arrayBuffer();
    const buffer1 = Buffer.from(arraybuffer)
    console.log('File fetched successfully');
    return buffer1;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}


async function splitPdf(buffer: Buffer): Promise<number> {
  try {
    const originalPdf = await PDFDocument.load(buffer);
  const numPages = originalPdf.getPageCount();
  
  return numPages;
  }catch(error){
    throw new Error((error as Error).message);
  }
}




export default apirouter;