import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { FaBold, FaItalic } from "react-icons/fa";
import { GoListOrdered } from "react-icons/go";
import { AiOutlineUnorderedList } from "react-icons/ai";
import TextAlign from "@tiptap/extension-text-align";
import { RiAlignLeft, RiAlignRight } from "react-icons/ri";
import { GrTextAlignCenter } from "react-icons/gr";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";

import PropTypes from "prop-types";

const DetailsField = ({ setInputs, content = "" }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },

        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      FontFamily,
      TextStyle,
    ],

    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      //   console.log(content);
      setInputs((prev) => ({
        ...prev,
        details: content,
        description: content,
      }));
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    content: content,
  });

  return (
    <div className="flex flex-col  gap-2 border-4 border-[#374151] bg-[#374151] rounded-md">
      {editor && (
        <div className="border-input flex gap-2 py-2 px-1  flex-wrap">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`${
              editor.isActive("bold") ? "bg-slate-500" : "bg-slate-600"
            } flex items-center justify-center rounded-sm w-7 h-7 `}
          >
            <FaBold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`${
              editor.isActive("italic") ? "bg-slate-500" : "bg-slate-600"
            } flex items-center justify-center rounded-sm w-7 h-7  `}
          >
            <FaItalic className="w-4 h-4" />
          </button>
          <select
            name="font"
            onChange={(e) =>
              editor.chain().focus().setFontFamily(e.target.value).run()
            }
            className={`${
              editor.isActive("textStyle") ? "bg-slate-500" : "bg-slate-600"
            } flex items-center justify-center rounded-sm  `}
          >
            <option value="Arial">Arial</option>
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
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`${
              editor.isActive({ textAlign: "left" })
                ? "bg-slate-500"
                : "bg-slate-600"
            } flex items-center justify-center rounded-sm w-7 h-7  `}
          >
            <RiAlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`${
              editor.isActive({ textAlign: "right" })
                ? "bg-slate-500"
                : "bg-slate-600"
            } flex items-center justify-center rounded-sm w-7 h-7  `}
          >
            <RiAlignRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`${
              editor.isActive({ textAlign: "center" })
                ? "bg-slate-500"
                : "bg-slate-600"
            } flex items-center justify-center rounded-sm w-7 h-7  `}
          >
            <GrTextAlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`${
              editor.isActive("orderedList") ? "bg-slate-500" : "bg-slate-600"
            } flex items-center justify-center rounded-sm w-7 h-7  `}
          >
            <GoListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`${
              editor.isActive("bulletList") ? "bg-slate-500" : "bg-slate-600"
            } flex items-center justify-center rounded-sm w-7 h-7  `}
          >
            <AiOutlineUnorderedList className="w-4 h-4" />
          </button>
        </div>
      )}
      <EditorContent
        placeholder="heyy"
        editor={editor}
        className=" min-h-40 bg-slate-800 text-slate-400"
      />
    </div>
  );
};

DetailsField.propTypes = {
  setInputs: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};

export default DetailsField;
