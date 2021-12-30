import React from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { INote } from '../../@types';
import 'react-quill/dist/quill.snow.css';

// need to dynamically import ReactQuill since it relies on the document object which is undefined in SSR
const ReactQuill = dynamic(
  () => {
    return import('react-quill');
  },
  { ssr: false }
);

interface Props {
  selectedNote?: INote;
}

const EditorContainer = styled.div`
  width: 100%;
  padding: 10px;

  .ql-picker-label {
    svg {
      display: none;
    }
  }
`;

const NoteTitleInput = styled.input`
  border: none;
  outline: none;
  padding: 18px;
  font-size: 30px;
  width: 100%;

  &:disabled {
    background: transparent;
    cursor: not-allowed;
  }
`;

const Editor: React.FC<Props> = ({ selectedNote }) => {
  const handleChange = (value: string) => {
    console.log('value', value);
  };

  return (
    <EditorContainer>
      <NoteTitleInput
        value={selectedNote?.title ?? 'Title'}
        disabled={!selectedNote}
        placeholder='Title'
      />
      <ReactQuill
        theme='snow'
        value={selectedNote?.content ?? ''}
        readOnly={!selectedNote}
        placeholder='Start writing here'
        onChange={handleChange}
      />
    </EditorContainer>
  );
};

export default Editor;
