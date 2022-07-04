import { invoke } from '@tauri-apps/api/tauri';
import { FC } from 'react';

const Rust: FC = () => {
  invoke('simple_command');
  invoke('command_with_message', { message: 'TypeScript' }).then((result) => {
    console.log({ result });
  });
  invoke('command_with_object', {
    message: { field_str: 'some message', field_u32: 12 },
  }).then((result) => {
    console.log({ result });
  });
  for (let arg of [1, 2]) {
    invoke('command_with_error', { arg })
      .then((message) => {
        console.log('command_with_success', message);
      })
      .catch((message) => {
        console.error('command_with_error', message);
      });
  }
  invoke('async_command', { arg: 12 }).then((result) => {
    console.log(result);
  });
  return <></>;
};

export default Rust;
