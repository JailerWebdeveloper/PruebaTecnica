import { useState } from "react";
import { Product } from "../shared/interfaces/ProductInterface";
import { motion, AnimatePresence } from "framer-motion";
import { FaSquarePlus } from "react-icons/fa6";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product;
    direction: "asc" | "desc";
  } | null>(null);

  const handleAddProduct = (product: Product) => {
    setProducts([...products, product]);
    setShowForm(false);
  };

  const handleDeleteProduct = (codigo: number) => {
    setProducts(products.filter((p) => p.codigo !== codigo));
  };

  const handleSort = (key: keyof Product) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedProducts = [...products].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setProducts(sortedProducts);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900"
          >
            Gestión de Productos
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            <FaSquarePlus size={20} />
            <span className=" sm:inline">Nuevo Producto</span>
          </motion.button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-lg max-w-2xl w-full"
              >
                <div className="p-6">
                  <ProductForm
                    onSubmit={handleAddProduct}
                    onCancel={() => setShowForm(false)}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {products.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center"
            >
              <div className="mx-auto max-w-md">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No hay productos registrados
                </h3>
                <p className="text-gray-500">
                  Comienza agregando un nuevo producto usando el botón superior.
                </p>
              </div>
            </motion.div>
          ) : (
            <>
                <ProductList
                  products={products}
                  onDelete={handleDeleteProduct}
                  onSort={handleSort}
                  sortConfig={sortConfig}
              />
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
