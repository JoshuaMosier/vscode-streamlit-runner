// extension.js
const vscode = require('vscode');
const path = require('path');

function activate(context) {
    // Register the command that will be called from the context menu
    let disposable = vscode.commands.registerCommand('streamlit-runner.runFile', async (uri) => {
        // Get the file path from the URI
        const filePath = uri.fsPath;
        
        // Only proceed if it's a Python file
        if (!filePath.endsWith('.py')) {
            vscode.window.showErrorMessage('This command only works with Python files.');
            return;
        }

        // Create a new terminal for this Streamlit instance
        const fileName = path.basename(filePath);
        const terminal = vscode.window.createTerminal(`Streamlit: ${fileName}`);

        // Show the terminal
        terminal.show();

        // Change directory to the file's directory
        const fileDir = path.dirname(filePath);
        terminal.sendText(`cd "${fileDir}"`);

        // Run streamlit with the file
        terminal.sendText(`streamlit run "${filePath}"`);
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};