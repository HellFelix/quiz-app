# Quiz Taking Tool
This is an app I built that can be used to take a quizlet quiz by providing a url.

## Usage
### Prerequisites
This is an app that runs with [tauri](https://tauri.app/) using npm. Provided you have [node.js](https://nodejs.org/en/) installed and you have [set up your Rust environment locally](https://www.rust-lang.org/learn/get-started), you're good to go!

Also note that you must be using python3.10 and install dependencies 'requests' and 'beautifulsoup4'.

To install the dependencies, run
```bash
pip install requests
pip install beautifulsoup4
```

### Setup
To run the app, clone this repository  
```bash
git clone git@github.com:HellFelix/quiz-app.git
```
navigate to the directory 
```bash
cd quiz-app
```
install node modules
```bash
npm install
```
then run the app
```bash
npm run tauri dev
```

### Navigate the app

Upon opening the app, you'll be greeted by an input space and a "Take Quiz" button. You can input a link to a quizlet study set and then just click the button to take the quiz! If you wish to take the quiz with the terms and answers reversed, instead click the "Take Quiz (reversed)" button.

## Troubleshooting

### ModuleNotFoundError
If given the following message upon trying to take the quiz
```
thread 'main' panicked at 'Could not find values: PyErr { type: <class 'ModuleNotFoundError'>, value: ModuleNotFoundError("No module named 'requests'"), traceback: Some(<traceback object at 0x7fa97f853b40>) }', src/main.rs:34:26
```
you might be running a different version of python. To check which python you're using, run
```bash
which python
```
If the command returns something like
```
/usr/bin/python
```
you are not using the correct version of python. To check if you have python3.10 installed locally, run
```bash
which python3.10
```
If you do have python3.10 installed, you can make a temporary alias in order to make the program work:
```bash
alias python=python3.10
alias pip=pip3.10
python -m pip install --upgrade pip
pip install requests
pip install beautifulsoup4
```
If you do not have python3.10 installed, you can install it via your package manager.
