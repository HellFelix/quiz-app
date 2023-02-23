#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use pyo3::{prelude::*, prepare_freethreaded_python};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![find_words])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn find_words(url: String) -> Vec<Vec<String>> {
    prepare_freethreaded_python();
    let py_scraping = include_str!(concat!(env!("CARGO_MANIFEST_DIR"), "/scraping.py"));

    let from_python = Python::with_gil(|py| -> PyResult<Py<PyAny>> {
        let app: Py<PyAny> = PyModule::from_code(py, py_scraping, "", "")?
            .getattr("quizlet_scrape")?
            .into();
        app.call1(py, (url,))
    });
    
    let convert = Python::with_gil(|py| -> PyResult<Vec<Vec<String>>> {
        from_python?.extract(py)
    });
    

    let values = convert.expect("Could not find values");

    return values;
}

