import React, { memo } from 'react';
import Note from './Note';
import styled from 'styled-components';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { INote, NoteOrderBy } from '../../@types';

interface Props {
  notes: Array<INote>;
  selectedNote: INote | null;
  orderBy: NoteOrderBy;
  handleNoteSelect: (note: INote) => void;
  toggleOrderBy: () => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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

const NoteList: React.FC<Props> = ({
  notes,
  selectedNote,
  orderBy,
  handleNoteSelect,
  toggleOrderBy
}) => {
  return (
    <Container>
      <Header>All Notes</Header>
      <ListActionContainer>
        <span>{notes?.length} Notes</span>
        <SortContainer onClick={toggleOrderBy}>
          <span>
            {orderBy.toLowerCase() === 'desc' ? <FiArrowDown /> : <FiArrowUp />}
          </span>
        </SortContainer>
      </ListActionContainer>
      {notes?.length && (
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
      )}
    </Container>
  );
};

export default memo(NoteList);
