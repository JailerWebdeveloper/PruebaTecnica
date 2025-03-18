import { motion, AnimatePresence } from 'framer-motion';
import { FaTrashCan, FaArrowUp } from "react-icons/fa6";
import { Product } from '../shared/interfaces/ProductInterface';

interface ProductListProps {
    products: Product[];
    onDelete: (codigo: number) => void;
    onSort: (key: keyof Product) => void;
    sortConfig: { key: keyof Product; direction: 'asc' | 'desc' } | null;
}

const ProductList = ({
    products,
    onDelete,
    onSort,
    sortConfig
}: ProductListProps) => {
    if (products.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12 bg-white rounded-lg shadow-md"
            >
                <p className="text-gray-500 text-lg">No hay productos registrados</p>
            </motion.div>
        );
    }

    const getSortIcon = (key: keyof Product) => {
        if (sortConfig?.key === key) {
            return (
                <FaArrowUp
                    size={16}
                    className={`inline-block ml-1 ${sortConfig.direction === 'desc' ? 'transform rotate-180' : ''
                        }`}
                />
            );
        }
        return <FaArrowUp size={16} className="inline-block ml-1 text-gray-400" />;
    };

    const tableVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const rowVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={tableVariants}
            className="bg-white rounded-lg shadow-md overflow-hidden"
        >
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => onSort('codigo')}
                        >
                            Código {getSortIcon('codigo')}
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => onSort('nombre')}
                        >
                            Nombre {getSortIcon('nombre')}
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Descripción
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => onSort('cantidad')}
                        >
                            Cantidad {getSortIcon('cantidad')}
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => onSort('creacion')}
                        >
                            Fecha Creación {getSortIcon('creacion')}
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    <AnimatePresence>
                        {products.map((product) => (
                            <motion.tr
                                key={product.codigo}
                                variants={rowVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                layout
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {product.codigo}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {product.nombre}
                                </td>
                                <td className="px-6 py-4 text-sm max-w-xs truncate text-gray-500">
                                    {product.descripcion}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {product.cantidad}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(product.creacion).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => onDelete(product.codigo)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <FaTrashCan size={20} />
                                    </motion.button>
                                </td>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                </tbody>
            </table>
        </motion.div>
    );
};

export default ProductList;