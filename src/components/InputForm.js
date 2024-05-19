import { useContext, useEffect, useState } from "react";
import { InputContext } from "../App";
import { ChromePicker } from "react-color";

const InputForm = () => {
  const { getQrCode, inputValue } = useContext(InputContext);
  const { setInputValue } = useContext(InputContext);
  const [color, setColor] = useState("#054080");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  useEffect(() => {
    setInputValue({ ...inputValue, color: color });
  }, [color]);

  const handleChange = (color) => setColor(color.hex);

  const handleOnChange = (e) =>
    setInputValue({ ...inputValue, url: e.target.value });
  const handleSubmit = () => getQrCode();

  useEffect(() => {
    handleSubmit();
  }, [inputValue.url, inputValue.color]);

  return (
    <div className="col-span-2 p-6 grid gap-4">
      <div>
        <label className="font-semibold text-md">Your URL</label>
        <input
          type="url"
          className="w-full border-2 py-1 px-3 text-gray-700 rounded-sm"
          placeholder="https://example.com"
          value={inputValue.url}
          onChange={handleOnChange}
        />
      </div>

      <div>
        <label className="font-semibold text-md">Color</label>
        <div className="flex items-center gap-2">
          <div
            onClick={() => setDisplayColorPicker(!displayColorPicker)}
            style={{ background: color }}
            className="w-10 h-8 cursor-pointer border-4"
          ></div>
          <span>{color}</span>
        </div>
        {displayColorPicker && (
          <div className="absolute mt-2">
            <ChromePicker color={color} onChange={handleChange} />
          </div>
        )}
      </div>

      <button
        disabled={!inputValue.url}
        onClick={handleSubmit}
        style={{ marginTop: "10rem", visibility: "hidden" }}
        className="bg-blue-400 m max-w-xs ml-auto px-4 py-2 text-white rounded-sm mt-4 hover:bg-blue-500 disabled:bg-gray-300"
      >
        Generate QrCode
      </button>
    </div>
  );
};

export default InputForm;
