import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { RichTextEditor as MantineRichTextEditor } from "@mantine/tiptap";
import Link from "@tiptap/extension-link";
import { Color } from "@tiptap/extension-color";
import TextStyle from '@tiptap/extension-text-style';
import "@mantine/tiptap/styles.css";
import { MantineProvider } from "@mantine/core";
import "./rich_text.css";
interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const RichTextEditorApp = ({ value, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Link,TextStyle, Color],
    content: value,
    
    onUpdate: ({ editor }) => {
      
      
      onChange(editor.getHTML());
    },
  });


  return (
    <MantineProvider theme={{ fontFamily: "Inter, sans-serif" }}>
      <div className="prose max-w-none">
        <MantineRichTextEditor
          className="bgInput"
          classNames={{
            root: "bg-transparent",
            content: "bg-transparent",
            toolbar: "bg-transparent",
          }}
          editor={editor}
          content={value}
        >
          <MantineRichTextEditor.Toolbar>
          <MantineRichTextEditor.ControlsGroup>
          
          <MantineRichTextEditor.H3 />
          <MantineRichTextEditor.H4 />
          <MantineRichTextEditor.H5 />
        </MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.ControlsGroup>
              <MantineRichTextEditor.Bold />
              <MantineRichTextEditor.Italic />
            </MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.ColorPicker
          colors={[

            '#fa5252',
            '#e64980',
            '#be4bdb',
            '#7950f2',
            '#4c6ef5',
            '#228be6',
            '#15aabf',
            '#12b886',
            '#40c057',
            '#82c91e',
            '#fab005',
            '#fd7e14',
          ]}
        />
            <MantineRichTextEditor.ControlsGroup>
              <MantineRichTextEditor.Link />
              <MantineRichTextEditor.Unlink />
            </MantineRichTextEditor.ControlsGroup>
           
            <MantineRichTextEditor.ControlsGroup>
              <MantineRichTextEditor.BulletList />
              <MantineRichTextEditor.OrderedList />
            </MantineRichTextEditor.ControlsGroup>
          </MantineRichTextEditor.Toolbar>

          <MantineRichTextEditor.Content />
        </MantineRichTextEditor>
      </div>
    </MantineProvider>
  );
};


