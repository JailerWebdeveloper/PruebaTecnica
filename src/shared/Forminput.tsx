import React from 'react';
import { motion } from 'framer-motion';

interface FormInputProps {
  label: string;
  name: string;
  type: 'text' | 'number' | 'textarea';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
}

const FormInput = ({
  label,
  name,
  type,
  value,
  onChange,
  required = false,
  rows = 3
}:FormInputProps) => {
  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    blur: {
      scale: 1
    }
  };

  const labelVariants = {
    initial: { y: 0, opacity: 0.7 },
    focus: { y: -5, opacity: 1 }
  };

  return (
    <div className="relative">
      <motion.label
        initial="initial"
        whileFocus="focus"
        variants={labelVariants}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </motion.label>
      {type === 'textarea' ? (
        <motion.textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          required={required}
          initial="blur"
          whileFocus="focus"
          variants={inputVariants}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        />
      ) : (
        <motion.input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          initial="blur"
          whileFocus="focus"
          variants={inputVariants}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        />
      )}
    </div>
  );
};

export default FormInput;