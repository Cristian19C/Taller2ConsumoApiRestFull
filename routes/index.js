//enrutamiento
//elemtos necesarios para hacer enrutamiento
const express = require('express')
const path = require('path');
const fs = require('fs')
const PDFDocument = require('pdfkit');
const router = express.Router()

const {obtenerInventory, addInventory, findById, updateInventory, deleteInventory} = require('../resources/inventory');
const { log } = require('console');

// const filePath = path.join(__dirname, '..', 'resources', 'inventory.json');

router.get('/', (req, res) => res.render('index', {'title': 'Pagina inicio'}))

router.get('/inventory', async (req, res) => {
  const inventario = await obtenerInventory()
  res.render ('inventory', {'title': 'Inventario', 'data':inventario.data})
})



router.get('/add', async(req, res) => {
  console.log('agregar');
  const inventario = await obtenerInventory()
  res.render('addInventory', {'title': 'Agregar inventario', 'data':inventario.data})
})

router.post('/add', async(req,res)=>{
      
      const {id_product, name, price, number, description, brand} = req.body

      
    // Agregar el nuevo registro al objeto 'data'
      data = {
      id_product: id_product,
      name: name,
      price: Number(price),
      number: Number(number),
      description: description,
      brand: brand
    };
    const addInventario = await addInventory(data)

    
    res.redirect('/')
})

router.get('/:id', async(req, res) => {
  
  console.log('entri');
    const id = req.params.id;
    console.log(id);
    const inventario = await findById(id)
    console.log(inventario);
    res.render('updateInventory', {'title': 'Actualizar registros','data':inventario.data })

});

router.post('/update/:id', async(req, res) => {
  console.log('hola');
  const id = req.params.id;
  console.log(id);
  const {id_product, name, price, number, description, brand} = req.body

      
    // Agregar el nuevo registro al objeto 'data'
      data = {
      id_product: id_product,
      name: name,
      price: Number(price),
      number: Number(number),
      description: description,
      brand: brand
    };
    const updateInventario = await updateInventory(data,id)

    
    res.redirect('/inventory')


});

router.get('/delete/:id', async(req, res) => {
    
  console.log('borrar');
        const id_product = req.params.id;
        console.log(id_product);
        
      const inventario = await deleteInventory(id_product) 
    res.redirect('/inventory')

});



router.get('/pdf/Generar', async(req, res) => {
  console.log('entro a generar pdf');
  const inventario = await obtenerInventory()
  
  const doc = new PDFDocument();

  // Encabezado del PDF
  doc.fontSize(18).text('Detalles del Producto', { align: 'center' });
  doc.moveDown();
  // Contenido del PDF
  // console.log(inventory);
  inventario.data.forEach(element =>  {
    doc.fontSize(12)
      .text(`ID: ${element.id_product}`)
      .text(`Nombre: ${element.name}`)
      .text(`Precio: ${element.price}`)
      .text(`Cantidad: ${element.number}`)
      .text(`Descripción: ${element.description}`)
      .text(`Marca: ${element.brand}`)
      .moveDown();
  });

  // // Guardar el archivo PDF en el servidor
  const pdfFilePath = path.join(__dirname, '..', 'resources', 'product_details.pdf');
  doc.pipe(fs.createWriteStream(pdfFilePath));
  doc.end();

  res.download(pdfFilePath); // Descargar el archivo PDF generado

});



module.exports = router
