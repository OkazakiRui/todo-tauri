import { FC } from 'react';
import OpenDialog from './components/OpenDialog';
import Rust from './components/Rust';
import Todo from './components/Todo';

const App: FC = () => {
  return (
    <>
      <OpenDialog />
      <Rust />
      <Todo />
    </>
  );
};

export default App;
