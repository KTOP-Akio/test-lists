import React, { useState } from 'react';
import styled from 'styled-components';

interface ListItem {
  id: number;
  title: string;
  children: ListItem[];
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const ListItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border: 1px solid #ccc;
  margin: 5px 0;
`;

const Button = styled.button`
  margin-left: 10px;
`;

const App: React.FC = () => {
  const [list, setList] = useState<ListItem>({
    id: 1,
    title: 'Main Parent',
    children: [],
  });

  const addDescendant = (parentId: number) => {
    const newList = { ...list };
    const newTitle = prompt('Enter title for descendant');
    if (newTitle) {
      const newItem: ListItem = {
        id: Date.now(),
        title: newTitle,
        children: [],
      };
      findAndAddDescendant(newList, parentId, newItem);
      setList(newList);
    }
  };

  const findAndAddDescendant = (item: ListItem, parentId: number, newItem: ListItem) => {
    if (item.id === parentId) {
      item.children.push(newItem);
    } else {
      item.children.forEach((child) => findAndAddDescendant(child, parentId, newItem));
    }
  };

  const deleteItem = (id: number) => {
    if (id === 1) return alert('Cannot delete main parent!');
    const newList = { ...list };
    findAndDeleteItem(newList, id);
    setList(newList);
  };

  const findAndDeleteItem = (item: ListItem, id: number): boolean => {
    const index = item.children.findIndex((child) => child.id === id);
    if (index !== -1) {
      item.children.splice(index, 1);
      return true;
    } else {
      return item.children.some((child) => findAndDeleteItem(child, id));
    }
  };

  const renderList = (item: ListItem) => (
    <ListContainer key={item.id}>
      <ListItemContainer>
        {item.title}
        <div>
          <Button onClick={() => addDescendant(item.id)}>Add Child</Button>
          <Button onClick={() => deleteItem(item.id)}>Delete</Button>
        </div>
      </ListItemContainer>
      {item.children.length > 0 && item.children.map((child) => renderList(child))}
    </ListContainer>
  );

  return (
    <MainContainer>
      <h1>Nested List</h1>
      {renderList(list)}
    </MainContainer>
  );
};

export default App;
