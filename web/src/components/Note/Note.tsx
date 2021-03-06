import React, { memo } from 'react';
import styled from 'styled-components';
import { useMutation } from 'urql';
import { INote } from '../../@types';
import { FiTrash2 } from 'react-icons/fi';
import { DELETE_NOTE_MUTATION } from '../../graphql/mutations';

interface Props {
  note: INote;
  isSelected: boolean;
  handleNoteSelect: (note: INote) => void;
}

type DefaultDateTimeType = 'numeric' | '2-digit' | undefined;

interface DateOptions {
  month: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined;
  day: DefaultDateTimeType;
  year: DefaultDateTimeType;
}

interface TimeOptions {
  hour: DefaultDateTimeType;
  minute: DefaultDateTimeType;
  second: DefaultDateTimeType;
}

interface NoteContainerProps {
  isSelected: boolean;
}

const NoteContainer = styled.div<NoteContainerProps>`
  cursor: pointer;
  padding: 20px;
  border-bottom: 1px solid #f2f2f2;
  color: #737373;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props =>
    props.isSelected ? props.theme.color.white : 'initial'};

  &:hover {
    background-color: #eee;
    .delete-btn {
      visibility: visible;
    }
  }
`;

const DeleteBtnContainer = styled.div`
  cursor: pointer;
  padding: 5px;

  &:hover {
    transition: 0.3s;
    color: red;
  }
`;

const Title = styled.div`
  color: ${props => props.theme.color.midnight};
  font-weight: bold;
`;

const NoteDetails = styled.div`
  margin-bottom: 5px;
`;

const STRIPE_HTML_REGEX = /<[^>]*>?/gm;

const Note: React.FC<Props> = ({ note, isSelected, handleNoteSelect }) => {
  const [, deleteNote] = useMutation(DELETE_NOTE_MUTATION);
  const dateOptions: DateOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  };
  const timeOptions: TimeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  const date = note?.dateAdded ? new Date(note?.dateAdded) : new Date();
  const displayDate = new Intl.DateTimeFormat('en-US', dateOptions).format(
    date
  );
  const displayTime = new Intl.DateTimeFormat('en-US', timeOptions).format(
    date
  );

  const handleDeleteNote = async () => {
    const { error } = await deleteNote({ noteId: note.id });
    if (error) console.error(error);
  };

  return (
    <NoteContainer
      isSelected={isSelected}
      onClick={() => handleNoteSelect(note)}
    >
      <NoteDetails>
        <Title>{note.title}</Title>
        <div>{note.content.replace(STRIPE_HTML_REGEX, '').slice(0, 20)}</div>
        <small>
          {displayDate} at {displayTime}
        </small>
      </NoteDetails>
      <DeleteBtnContainer onClick={handleDeleteNote}>
        <FiTrash2 />
      </DeleteBtnContainer>
    </NoteContainer>
  );
};

export default memo(Note);
