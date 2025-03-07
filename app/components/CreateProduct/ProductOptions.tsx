import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

type Option = {
  name: string;
  values: string[];
};

const ProductOptions = () => {
  const [options, setOptions] = useState<Option[]>([]);
  const [newOptionName, setNewOptionName] = useState("");
  const [newOptionValue, setNewOptionValue] = useState("");

  const handleAddOption = () => {
    setOptions([...options, { name: newOptionName, values: [newOptionValue] }]);
    setNewOptionName("");
    setNewOptionValue("");
  };

  const handleAddOptionValue = (index: number) => {
    const updatedOptions = [...options];
    updatedOptions[index].values.push(newOptionValue);
    setOptions(updatedOptions);
    setNewOptionValue("");
  };

  return (
    <Card className="w-full mt-5 bg-white dark:bg-black-100 p-3 rounded-lg shadow flex flex-col">
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
          Option Name
        </label>
        <Input
          type="text"
          value={newOptionName}
          onChange={(e) => setNewOptionName(e.target.value)}
          placeholder="Enter option name"
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
          Option Value
        </label>
        <Input
          type="text"
          value={newOptionValue}
          onChange={(e) => setNewOptionValue(e.target.value)}
          placeholder="Enter option value"
          className="w-full"
        />
      </div>
      <Button onClick={handleAddOption} className="mt-4">
        Add Option
      </Button>
      <div className="mt-5">
        {options.map((option, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-gray-700 dark:text-white text-sm font-bold mb-2">
              {option.name}
            </h3>
            <ul>
              {option.values.map((value, valueIndex) => (
                <li key={valueIndex} className="text-gray-700 dark:text-white">
                  {value}
                </li>
              ))}
            </ul>
            <div className="mt-2">
              <Input
                type="text"
                value={newOptionValue}
                onChange={(e) => setNewOptionValue(e.target.value)}
                placeholder="Enter option value"
                className="w-full"
              />
              <Button
                onClick={() => handleAddOptionValue(index)}
                className="mt-2"
              >
                Add Value
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProductOptions;
