import React, { useState, useCallback } from 'react';
import Note from './Note';
import styled from 'styled-components';
import { useQuery } from 'urql';
import { GET_USER_NOTES_QUERY } from '../../graphql';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { INote } from '../../@types';

interface Props {}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  max-width: 350px;
  background-color: ${props => props.theme.color.whitesmoke};
  color: ${props => props.theme.color.midnight};
`;

const Header = styled.h2`
  padding: 20px;
`;

const ListActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-bottom: 1px solid #ccc;
`;

const SortContainer = styled.div`
  cursor: pointer;
  padding: 5px;
`;

const ListContainer = styled.div`
  overflow-y: auto;
  height: 100%;
`;

const NoteList: React.FC = (props: Props) => {
  const [sortBy, setSortBy] = useState<'desc' | 'asc'>('desc');
  const [selectedNote, setSelectedNote] = useState<INote | null>(null);
  const [result] = useQuery({
    query: GET_USER_NOTES_QUERY
  });

  const { data, fetching } = result;
  const notes = data?.getUserNotes ?? [];

  const handleNoteSelect = useCallback(
    (note: INote) => setSelectedNote(note),
    [setSelectedNote]
  );

  if (fetching) return null;
  return (
    <Container>
      <Header>All Notes</Header>
      <ListActionContainer>
        <span>{notes.length} Notes</span>
        <SortContainer>
          <span>{sortBy === 'desc' ? <FiArrowDown /> : <FiArrowUp />}</span>
        </SortContainer>
      </ListActionContainer>
      <ListContainer>
        {notes.map((note: INote) => {
          return (
            <Note
              key={note.id}
              note={note}
              handleNoteSelect={handleNoteSelect}
              isSelected={selectedNote?.id === note.id}
            />
          );
        })}
      </ListContainer>
    </Container>
  );
};

export default NoteList;
