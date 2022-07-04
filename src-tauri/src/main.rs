use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct MyMessage {
    field_str: String,
    field_u32: u32,
}

#[cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
#[tauri::command]
fn simple_command() {
    println!("I was invoked from JS!");
}

#[tauri::command]
fn command_with_message(message: String) -> String {
    format!("hello {}", message)
}

#[tauri::command]
fn command_with_object(message: MyMessage) -> MyMessage {
    let MyMessage {
        field_str,
        field_u32,
    } = message;

    MyMessage {
        field_str: format!("hello {}", field_str),
        field_u32: field_u32 + 1,
    }
}

fn main() {
    let context = tauri::generate_context!();

    println!("{:?}", &context.package_info());

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            simple_command,
            command_with_message,
            command_with_object
        ])
        .menu(if cfg!(target_os = "macos") {
            tauri::Menu::os_default(&context.package_info().name)
        } else {
            tauri::Menu::default()
        })
        .run(context)
        .expect("error while running tauri application");
}
