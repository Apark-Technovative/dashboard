import {
  BiBold,
  BiItalic,
  BiUnderline,
  BiStrikethrough,
  BiListUl,
  BiListOl,
  BiHeading,
} from "react-icons/bi";

export default function TiptapToolbar({ editor }) {
  if (!editor) return null;

 const btn =
  "p-2 border rounded cursor-pointer hover:bg-gray-100 transition text-gray-700";

  const active = "bg-[#5932EA] text-white";

  return (
    <div className="flex items-center gap-2 mb-2">
      {/* Bold */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${btn} ${editor.isActive("bold") ? active : ""}`}
      >
        <BiBold />
      </button>

      {/* Italic */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${btn} ${editor.isActive("italic") ? active : ""}`}
      >
        <BiItalic />
      </button>

      {/* Underline */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`${btn} ${editor.isActive("underline") ? active : ""}`}
      >
        <BiUnderline />
      </button>

      {/* Strike */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${btn} ${editor.isActive("strike") ? active : ""}`}
      >
    <BiStrikethrough />
      </button>

      {/* Heading */}
      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        className={`${btn} ${
          editor.isActive("heading", { level: 2 }) ? active : ""
        }`}
      >
       <BiHeading />
      </button>

      {/* Bullet list */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${btn} ${
          editor.isActive("bulletList") ? active : ""
        }`}
      >
      <BiListUl />

      </button>

      {/* Ordered list */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${btn} ${
          editor.isActive("orderedList") ? active : ""
        }`}
      >
        <BiListOl />


      </button>

      
    </div>
  );
}
