import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../shared/interfaces/ProductInterface';
import { FaXmark } from "react-icons/fa6";
import FormInput from '../shared/Forminput';

interface ProductFormProps {
    onSubmit: (product: Product) => void;
    onCancel: () => void;
}

function ProductForm({ onSubmit, onCancel }: ProductFormProps) {
    const [formData, setFormData] = useState<Omit<Product, 'creacion'>>({
        codigo: 0,
        nombre: '',
        descripcion: '',
        cantidad: 0
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct: Product = {
            ...formData,
            creacion: new Date().toISOString()
        };
        onSubmit(newProduct);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'codigo' || name === 'cantidad' ? Number(value) : value
        }));
    };

    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                staggerChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={formVariants}
            className="bg-white rounded-lg p-6"
        >
            <div className="flex justify-between items-center mb-6">
                <motion.h2
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-xl font-semibold text-gray-900"
                >
                    Nuevo Producto
                </motion.h2>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onCancel}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <FaXmark size={24} />
                </motion.button>
            </div>

            <motion.form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <FormInput
                        label="Código"
                        name="codigo"
                        type="number"
                        value={formData.codigo}
                        onChange={handleChange}
                        required
                    />
                    <FormInput
                        label="Nombre"
                        name="nombre"
                        type="text"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <FormInput
                    label="Descripción"
                    name="descripcion"
                    type="textarea"
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                />

                <FormInput
                    label="Cantidad"
                    name="cantidad"
                    type="number"
                    value={formData.cantidad}
                    onChange={handleChange}
                    required
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-end gap-4"
                >
                    <motion.button
                        type="button"
                        onClick={onCancel}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Cancelar
                    </motion.button>
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Guardar Producto
                    </motion.button>
                </motion.div>
            </motion.form>
        </motion.div>
    );
};

export default ProductForm;