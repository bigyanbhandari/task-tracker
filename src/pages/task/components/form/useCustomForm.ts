import { useState } from 'react';

interface Props {
  initialValues: Record<string, string>;
}

export const useCustomForm = ({ initialValues = {} }: Props) => {
  const [formData, setFormData] = useState(initialValues);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const reset = () => {
    setFormData(initialValues);
  };
  //previously not chanigg field cause type issue  fix that
  const register = (name: string) => ({
    name,
    value: formData[name] || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.value,
      }));
    },
  });

  return {
    formData,
    setFormData,
    register,
    handleSubmit,
    reset,
  };
};
