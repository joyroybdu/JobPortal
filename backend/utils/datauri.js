// import DataUriParser from "datauri/parser.js"
// import path from "path";
// const getUri=(file)=>{
//     const parser=new DataUriParser();
//     const extName=path.extname(file.originalname).toString();
//     return parser.format(extName,file.buffer);
// }
// export default dataUri;

import DataUriParser from "datauri/parser.js";
import path from "path";

// Define the getDataUri function
const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};

export default getDataUri;
