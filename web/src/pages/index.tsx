import type { NextPage } from 'next';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { withAuth, SidePanel, NoteList, Editor } from '../components';
import { User, INote, NoteOrderBy } from '../@types';
import { useQuery, useMutation } from 'urql';
import { GET_USER_NOTES_QUERY, SEARCH_NOTES } from '../graphql';
import { UPDATE_NOTE_MUTATION } from '../graphql/mutations';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

interface Props {
  user: User;
}

const Home: NextPage<Props> = ({ user }: Props) => {
  const [selectedNote, setSelectedNote] = useState<INote | null>(null);
  const [orderBy, setOrderBy] = useState<NoteOrderBy>('DESC');
  const [saving, setSaving] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [, updateNote] = useMutation(UPDATE_NOTE_MUTATION);
  const [result] = useQuery({
    query: GET_USER_NOTES_QUERY,
    pause: searchTerm.length > 0
  });

  const [searchResult] = useQuery({
    query: SEARCH_NOTES,
    variables: { searchText: searchTerm },
    pause: searchTerm.length === 0
  });

  const { data, fetching } = result;

  const notes = useMemo(() => {
    const notesForDisplay = searchTerm
      ? searchResult?.data?.searchNotes
      : data?.getUserNotes;
    return notesForDisplay?.sort((a: INote, b: INote) => {
      const date1 = new Date(a.dateAdded);
      const date2 = new Date(b.dateAdded);
      return orderBy?.toLowerCase() === 'desc'
        ? date1 < date2
          ? 1
          : -1
        : date1 > date2
        ? 1
        : -1;
    });
  }, [data, orderBy, searchResult, searchTerm]);

  const handleNoteSelect = useCallback(
    (note: INote) => setSelectedNote(note),
    [setSelectedNote]
  );

  const toggleOrderBy = useCallback(
    () => setOrderBy(curr => (curr === 'DESC' ? 'ASC' : 'DESC')),
    [setOrderBy]
  );

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentNote = { ...selectedNote } as INote;
      setSelectedNote({ ...currentNote, title: e.target.value });
    },
    [selectedNote]
  );

  const handleContentChange = useCallback(
    (value: string) => {
      const currentNote = { ...selectedNote } as INote;
      setSelectedNote({ ...currentNote, content: value });
    },
    [selectedNote]
  );

  const handleSearchTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  useEffect(() => {
    // default selected to most recent note
    if (Array.isArray(notes) && notes.length) setSelectedNote(notes[0]);
  }, [notes]);

  useEffect(() => {
    // auto save every 5 seconds
    const saveNoteChanges = async () => {
      if (selectedNote) {
        setSaving(true);
        const { error } = await updateNote({
          id: selectedNote.id,
          title: selectedNote.title,
          content: selectedNote.content
        });

        if (error) return console.error(error);
      }
    };

    const interval = setInterval(() => saveNoteChanges(), 5 * 1000);
    const timeout = setTimeout(() => setSaving(false), 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [selectedNote, updateNote]);

  if (fetching || searchResult.fetching) return null;

  return (
    <Container>
      <SidePanel
        user={user}
        searchTerm={searchTerm}
        handleSearchTextChange={handleSearchTextChange}
      />
      <NoteList
        notes={notes}
        handleNoteSelect={handleNoteSelect}
        orderBy={orderBy}
        selectedNote={selectedNote}
        toggleOrderBy={toggleOrderBy}
      />
      <Editor
        selectedNote={selectedNote}
        handleTitleChange={handleTitleChange}
        handleContentChange={handleContentChange}
        isSaving={saving}
      />
    </Container>
  );
};

export default withAuth<Props>(Home);
