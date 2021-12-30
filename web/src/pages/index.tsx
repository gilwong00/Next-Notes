import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { withAuth, SidePanel, NoteList, Editor } from '../components';
import { User } from '../@types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

interface Props {
  user: User;
}

const Home: NextPage<Props> = ({ user }: Props) => {
  return (
    <Container>
      <SidePanel user={user} />
      {/* Editor goes here */}
      <>
        <NoteList />
        <Editor />
      </>
    </Container>
  );
};

export default withAuth<Props>(Home);
