import { emit } from '@tauri-apps/api/event';
import { FC } from 'react';

const EmitMessage: FC = () => {
  const emitMessage = () => {
    emit('front-to-back', 'タイプスクリプトからだよ');
  };

  return (
    <>
      <h1>EmitMessage</h1>
      <button type="button" onClick={emitMessage}>
        submit message
      </button>
    </>
  );
};

export default EmitMessage;
