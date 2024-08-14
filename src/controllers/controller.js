const { Product, ProductImage, ProductOption, Category } = require('../models'); 
// GET /products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [ProductImage, ProductOption, Category]
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter produtos', error: error.message });
  }
};

// GET /products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [ProductImage, ProductOption, Category]
    });
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter o produto', error: error.message });
  }
};

// POST /products
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar o produto', error: error.message });
  }
};

// PUT /products/:id
exports.updateProduct = async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedProduct = await Product.findByPk(req.params.id);
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar o produto', error: error.message });
  }
};

// DELETE /products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send(); // Sem corpo na resposta
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar o produto', error: error.message });
  }
};
