export default function OldEditor() {
  return (
    <div
      id="editorContainer"
      className="mb-5 w-[500px] mx-auto  rounded-md border-4 border-gray-600"
    >
      <fieldset className=" bg-gray-600 flex justify-between px-5 py-1 items-center">
        <button
          className="fontStyle italic"
          onClick={() => {
            document.execCommand("italic", false, null);
          }}
          title="Italic"
        >
          <span>
            <BiItalic />
          </span>
        </button>
        <button
          className="fontStyle bold"
          onClick={() => {
            document.execCommand("bold", false, null);
          }}
          title="Bold"
        >
          <span>
            <FaBold />
          </span>
        </button>
        <button
          className="fontStyle underline"
          onClick={() => {
            document.execCommand("underline", false, null);
          }}
          title={"Underline"}
        >
          <span>
            <FaUnderline />
          </span>
        </button>
        <select
          id="input-font"
          className="h-7 w-32 items-center py-0 cursor-pointer bg-zinc-600"
          title="Font Family"
          onChange={() => {
            const myFont = document.getElementById("input-font").value;
            document.execCommand("fontName", false, myFont);
          }}
        >
          <option value="Arial" className="p-2">
            Arial
          </option>
          <option value="Arial Black">Arial Black</option>
          <option value="Sans serif">Sans serif</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>

          <option value="Courier New">Courier New</option>
          <option value="Verdana">Verdana</option>
          <option value="Georgia">Georgia</option>
          <option value="Palatino">Palatino</option>
          <option value="Garamond">Garamond</option>
          <option value="Comic Sans MS">Comic Sans MS</option>

          <option value="Tahoma">Tahoma</option>
          <option value="Comic Sans MS">Comic Sans MS</option>
        </select>

        <button
          onClick={() => {
            document.execCommand("justifyLeft", false, null);
          }}
          title="Align Left"
        >
          <span>
            <BiAlignLeft />
          </span>
        </button>
        <button
          onClick={() => {
            document.execCommand("justifyCenter", false, null);
          }}
          title="Align Center"
        >
          <span>
            <BiAlignMiddle />
          </span>
        </button>
        <button
          onClick={() => {
            document.execCommand("justifyRight", false, null);
          }}
          title="Align Right"
        >
          <span>
            <BiAlignRight />
          </span>
        </button>
        <button
          onClick={() => {
            document.execCommand("justifyFull", false, null);
          }}
          title="Align Justify"
        >
          <span>
            <BiAlignJustify />
          </span>
        </button>

        <button
          onClick={() => {
            document.execCommand("insertOrderedList", false, null);
          }}
          title="Ordered List"
        >
          <span>
            <AiOutlineOrderedList />
          </span>
        </button>
        <button
          onClick={() => {
            document.execCommand("insertUnorderedList", false, null);
          }}
          title="Ordered List"
        >
          <span>
            <AiOutlineUnorderedList />
          </span>
        </button>
        <input
          className="w-11 h-7 border-zinc-800 border"
          type="color"
          title="Color"
          onChange={() => {
            var myColor = document.getElementById("myColor").value;
            document.execCommand("foreColor", false, myColor);
          }}
          id="myColor"
        />
      </fieldset>

      <div
        ref={editor1}
        contentEditable="true"
        data-text="Enter comment...."
        className="focus:outline-none h-[300px]  py-2 px-4  overflow-y-scroll text-[#91a3a8]"
      ></div>
    </div>
  );
}
