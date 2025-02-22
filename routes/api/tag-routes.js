const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint


//Finding all tags
router.get('/', async(req, res) => {
  try{
    const tagData = await Tag.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err);
  }
});

//Finding Tag by single ID
router.get('/:id', async(req, res) => {
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if(!tagData){
      res.status(404).json({message: 'No tag found with this id'});
      return
    }
    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err);
  }
});

//Creating a new tag
router.post('/', async(req, res) => {
  try{
    const newtagData = await Tag.create(req.body);
    res.status(200).json(newtagData);
  }catch(err){
    res.status(500).json(err);
  }
});

//Update tag name by ID
router.put('/:id', async(req, res) => {
  try{
    const [updatedRows] = await Tag.update(req.body,{
      where: {
        id: req.params.id
      }
    });
    if(updatedRows===0){
      res.status(404).json({message: 'No tag found with this id'});
      return;
    }
    const updatedTag = await Tag.findByPk(req.params.id);
    res.status(200).json(updatedTag);
  }catch(err){
    res.status(400).json(err);
  }
});
//Destroying tag by ID
router.delete('/:id', async(req, res) => {
  try{
    const deletedRows = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if(deletedRows===0){
      res.status(404).json({message: 'No Tag found with this id'});
      return
    }
    res.status(200).json({message: 'Tag deleted succesfully'});
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
