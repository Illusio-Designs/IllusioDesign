// src/components/QuillEditor.jsx
import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import './QuillEditor.css'; // Import custom styles

const QuillEditor = ({ initialHtml, onChange }) => {
  const quillRef = useRef(null); // Create a ref for the Quill editor

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.getEditor().setContents(quillRef.current.getEditor().clipboard.convert(initialHtml)); // Set initial content
    }
  }, [initialHtml]);

  const handleChange = (html) => {
    if (onChange) {
      onChange(html); // Call the onChange prop to notify parent component
    }
  };

  return (
    <div className="quill-editor">
      <ReactQuill
        ref={quillRef} // Attach the ref to the ReactQuill component
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['link', 'image'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean'], // Remove formatting button
          ],
        }}
      />
      <div className="output">
        <h2>Output:</h2>
        <div dangerouslySetInnerHTML={{ __html: initialHtml }} />
      </div>
    </div>
  );
};

export default QuillEditor;
