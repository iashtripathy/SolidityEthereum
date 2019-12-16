/*
path modules is used for cross platform compatibility
ie:Whether the code is running in windows or linux path module gives the correct path
*/
const path = require('path');
const fs = require('fs');
const solc = require('solc');
//__dirname takes us from root directory to Inbox folder
const inboxPath = path.resolve(__dirname,'contracts','inbox.sol');
/*
Now we shall have to read the contents of the inbox.sol
*/
const source = fs.readFileSync(inboxPath,'utf8');
//1 indicates number of contracts to be compiled
//console.log(solc.compile(source,1));
module.exports = solc.compile(source,1).contracts[':Inbox'];
