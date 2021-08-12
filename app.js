const express = require('express');
const app = express();
const port = 3000;
const fetch = require('node-fetch');

app.get('/', async (req, res) => {
try {
    const sparqlQuery = 'SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20%3FtargetDOB%20%3FtargetDOD%20%3Fstart%20%3Fend%20%3Fsitelinks%0AWHERE%20%7B%0A%20%20wd%3AQ303%20wdt%3AP569%20%3FtargetDOB%20%3B%0A%20%20%20%20%20%20%20%20%20%20wdt%3AP570%20%3FtargetDOD%20.%0A%20%20%3Fitem%20%20wdt%3AP31%2Fwdt%3AP279*%20wd%3AQ1920219%20.%20%23%20instance%20of%20any%20subclass%20of%20social%20issue%0A%20%20MINUS%20%7B%20%3Fitem%20wdt%3AP31%2Fwdt%3AP279*%20wd%3AQ350604%20.%20%7D%20%23%20minus%20any%20instances%20of%20any%20subclass%20of%20armed%20conflict%0A%20%20MINUS%20%7B%20%3Fitem%20wdt%3AP31%2Fwdt%3AP279*%20wd%3AQ8065%20.%20%7D%20%23%20minus%20natural%20disasters%0A%20%20%3Fitem%20wdt%3AP580%20%3Fstart%20%3B%0A%20%20%20%20%20%20%20%20wdt%3AP582%20%3Fend%20%3B%0A%20%20%20%20%20%20%20%20wikibase%3Asitelinks%20%3Fsitelinks%20%3B%0A%20%20%20%20%20%20%20%20%20%0A%20%20FILTER%20(%3Fend%20%3E%3D%20%3FtargetDOB%20%26%26%20%3Fstart%20%3C%3D%20%3FtargetDOD)%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22.%20%7D%0A%0A%7D%0A%0AORDER%20BY%20DESC(%3Fsitelinks)%0ALIMIT%2050';
    const format = 'json'
    const data = await fetch(`https://query.wikidata.org/sparql?query=${sparqlQuery}&format=${format}`)
        .then(r => r.json())

    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error.response.body);
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})