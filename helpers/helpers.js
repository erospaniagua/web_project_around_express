const fs = require('fs');
const path = require('path');
const userPath = path.join(__dirname, "../data/users.json");
const getUsers = (req, res)=>{

  let fileUserReader =  fs.createReadStream(userPath, { encoding: 'utf8' });

  fileUserReader.on('error', (err) => {
    console.error('Error leyendo archivo:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Error al leer el archivo');
  });

  res.on('error', (err) => {
    console.error('Error en la respuesta:', err);
  });

    res.writeHead(200,{'Content-Type': 'application/json'});

    fileUserReader.pipe(res);
}
const getCards = (req, res)=>{
  const cardsPath = path.join(__dirname, '../data/cards.json');
  let fileCardsReader = fs.createReadStream(cardsPath, { encoding: 'utf8' });
  fileCardsReader.on('error', (err) => {
    console.error('Error leyendo archivo:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Error al leer el archivo');
  });

  res.on('error', (err) => {
    console.error('Error en la respuesta:', err);
  });

  res.writeHead(200,{'Content-Type': 'application/json'});
  fileCardsReader.pipe(res);
}

const getUser = (req,res)=>{
  const { id } = req.params;
  fs.readFile(userPath, 'utf8', (err, data)=>{
    if (err) {
      console.error('Error reading file:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
    try {
      const users = JSON.parse(data);
      const user = users.find(u => u._id === id);

      if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'User not found' }));
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON data' }));
    }
  })

}



module.exports = {getUsers, getCards,getUser}