const InventoryController = require("../controllers/inventory.controller");

module.exports = (app) => {
  app.get("/api/products", InventoryController.getAllProducts);
  app.post("/api/products", InventoryController.createProduct);
  app.get("/api/products/:id", InventoryController.getProduct);
  app.put("/api/products/:id", InventoryController.updateProduct);
  app.delete("/api/products/:id", InventoryController.deleteProduct);
};
