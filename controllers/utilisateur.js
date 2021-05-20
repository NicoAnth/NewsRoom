const {readFile}= require('fs');
const {promisify}= require('util');
const a= promisify(readFile);


module.exports=async=>{
    const contenu =  a('views/General.ejs', {encoding:'utf-8'});
    return contenu;
}