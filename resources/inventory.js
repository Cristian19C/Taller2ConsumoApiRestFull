const url = 'https://tallerii.fly.dev/inventory/';


async function obtenerInventory() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new error('Fallo en la api');
    }
    // const data = await response.json()
    // console.log(data);

    return response.json();


  } catch (error) {
    console.log(error);
  }
}

async function findById(id_product) {
  try {
    console.log(id_product);
    const response = await fetch(url+id_product);
    if (!response.ok) {
      throw new Error('Fallo en la api');
    }
    return response.json();
  } catch (error) {
    console.log(error);
  }
}


async function addInventory(material){
  try {
    
    const response = await fetch(url, {method:'POST', headers: {'Content-type': 'application/json'}, body:JSON.stringify(material)});
    if(!response){
      throw new error('Fallo en la api');
    }

  } catch (error) {
    console.log(error);
    
  }
}
async function updateInventory(material,id){
  try {
    // console.log(datos);
    const response = await fetch(url+id, {method:'put', headers: {'Content-type': 'application/json'}, body:JSON.stringify(material)});
    if(!response){
      throw new error('Fallo en la api');
    }

  } catch (error) {
    console.log(error);
    
  }
}

async function deleteInventory(id){
  try {
    // console.log(datos);
    const response = await fetch(url+id, {method:'DELETE'});
    if(!response){
      throw new error('Fallo en la api');
    }

    return response.json();
  } catch (error) {
    console.log(error);
    
  }
}




// Exporta el objeto Map
module.exports.obtenerInventory = obtenerInventory;
module.exports.addInventory = addInventory;
module.exports.findById = findById;
module.exports.updateInventory = updateInventory;
module.exports.deleteInventory = deleteInventory;
