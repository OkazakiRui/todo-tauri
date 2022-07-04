import { open } from '@tauri-apps/api/dialog';
import { FC } from 'react';
import Rust from './components/Rust';
import Todo from './components/Todo';

const App: FC = () => {
  const openDialog = () => {
    open().then((files) => console.log({ files }));
  };

  return (
    <>
      <Rust />
      <Todo />
    </>
  );
};

export default App;
