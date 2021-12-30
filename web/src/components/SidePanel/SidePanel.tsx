import React, { useState } from 'react';
import { useMutation } from 'urql';
import { useRouter } from 'next/router';
import { User } from '../../@types';
import { FiLogOut, FiSearch, FiPlusCircle, FiBook } from 'react-icons/fi';
import styled from 'styled-components';
import { CREATE_NOTE_MUTATION } from '../../graphql/mutations';

interface Props {
  user: User;
}

const SidePanelContainer = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 300px;
  background-color: ${props => props.theme.color.black};
  color: #ccc;
`;

const UserSection = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  align-items: center;
  padding: 20px;
  gap: 15px;
`;

const UserIcon = styled.div`
  background-color: ${props => props.theme.color.primary};
  color: ${props => props.theme.color.white};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoutContainer = styled.div`
  justify-self: flex-end;
  cursor: pointer;
  transition: 0.3s;
  padding: 5px;

  &:hover {
    color: red;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 20px;
  border-radius: 30px;
  background-color: ${props => props.theme.color.midnight};
  margin: 0 20px;
  margin-bottom: 14px;
`;

const SearchInput = styled.input`
  background-color: transparent;
  color: ${props => props.theme.color.white};
  border: none;
  margin-left: 10px;
  font-size: 16px;
  outline: none;
`;

const NewNoteBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  background-color: ${props => props.theme.color.primary};
  color: ${props => props.theme.color.white};
  border-radius: 30px;
  padding: 10px 20px;
  margin: 0 20px;

  &:hover {
    background-color: ${props => props.theme.color.altPrimary};
  }
`;

const MenuContainer = styled.ul`
  margin-top: 20px;
`;

const MenuOption = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 10px 40px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.color.midnight};
  }
`;

const SidePanel: React.FC<Props> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();
  const [, createNote] = useMutation(CREATE_NOTE_MUTATION);

  const handleNewNoteClick = async () => {
    // onclick create new note, push to cache
    // set as active or selected note
    const { error, data } = await createNote({ title: 'Title', content: '' });
  };
  const handleLogoutClick = async () => {};
  return (
    <SidePanelContainer>
      <UserSection>
        <UserIcon>{user.username.substring(0, 1).toUpperCase()}</UserIcon>
        <span>{user.username}</span>
        <LogoutContainer onClick={handleLogoutClick}>
          <FiLogOut />
        </LogoutContainer>
      </UserSection>
      <SearchContainer>
        <FiSearch />
        <SearchInput
          placeholder='Search'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </SearchContainer>
      <NewNoteBtnContainer onClick={handleNewNoteClick}>
        <FiPlusCircle />
        <span>New Note</span>
      </NewNoteBtnContainer>
      <MenuContainer>
        <MenuOption>
          <FiBook />
          <span>All Notes</span>
        </MenuOption>
      </MenuContainer>
    </SidePanelContainer>
  );
};

export default SidePanel;
