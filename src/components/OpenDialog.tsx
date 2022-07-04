import { open } from '@tauri-apps/api/dialog';
import { FC } from 'react';

const OpenDialog: FC = () => {
  const openDialog = () => {
    open().then((files) => console.log({ files }));
  };
  return (
    <button type="button" onClick={openDialog}>
      Open
    </button>
  );
};

export default OpenDialog;
