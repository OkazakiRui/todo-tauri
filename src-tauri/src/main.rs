#![cfg_attr(
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

fn main() {
    let context = tauri::generate_context!();

    println!("{:?}", &context.package_info());

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            simple_command,
            command_with_message
        ])
        .menu(if cfg!(target_os = "macos") {
            tauri::Menu::os_default(&context.package_info().name)
        } else {
            tauri::Menu::default()
        })
        .run(context)
        .expect("error while running tauri application");
}
