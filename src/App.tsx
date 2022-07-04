import { FC } from 'react';
import EmitMessage from './components/EmitMessage';
import OpenDialog from './components/OpenDialog';
import Rust from './components/Rust';
import Todo from './components/Todo';

const App: FC = () => {
  return (
    <>
      <EmitMessage />
      <OpenDialog />
      <Rust />
      <Todo />
    </>
  );
};

export default App;
