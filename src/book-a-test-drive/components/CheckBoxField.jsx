import React from 'react';
import { Checkbox } from '../../components/ui/checkbox';

function CheckBoxField({item, handleInputChange}) {
  return (
    <div className="flex items-center space-x-3">
      <Checkbox id={item.name}  onCheckedChange={(value)=>handleInputChange(item.name,value)}  required={item.required}  className="w-6 h-6 rounded-full border-black text-white bg-white focus:ring-primary" />

      <label htmlFor={item.name} className="text-sm font-semibold">
        {item.label}
      </label>
    </div>

    

  );
}

export default CheckBoxField;
