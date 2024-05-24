const vscode = require('vscode');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Use a static import for development/debug mode
let open;
try {
    open = require('open');
    console.log('Static import of open module succeeded.');
} catch (err) {
    console.log('Static import of open module failed, will use dynamic import.');
}

async function activate(context) {
    console.log('Congratulations, your extension "alltalkTTS" is now active!');

    const playTTS = vscode.commands.registerCommand('alltalktts.playTTS', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const text = editor.document.getText(selection);

            if (text) {
                const config = vscode.workspace.getConfiguration('alltalktts');
                const ip = config.get('ip');
                const port = config.get('port');
                const voice = config.get('voice');
                const language = config.get('language');
                const temperature = config.get('temperature');

                const encodedText = encodeURIComponent(text);
                const outputFile = 'stream_output.wav';
                const streamingUrl = `http://${ip}:${port}/api/tts-generate-streaming?text=${encodedText}&voice=${voice}&language=${language}&output_file=${outputFile}&temperature=${temperature}`;

                try {
                    console.log(`Requesting TTS audio from: ${streamingUrl}`);
                    // Download the audio file
                    const response = await axios.get(streamingUrl, { responseType: 'arraybuffer' });
                    console.log('TTS audio file downloaded successfully.');

                    // Save the audio file
                    const tempDir = os.tmpdir();
                    const filePath = path.join(tempDir, outputFile);
                    console.log(`Saving audio file to: ${filePath}`);
                    fs.writeFileSync(filePath, Buffer.from(response.data), 'binary');
                    console.log(`Audio file saved to: ${filePath}`);

                    // Verify the file exists before attempting to play it
                    if (fs.existsSync(filePath)) {
                        console.log('Audio file exists, attempting to open...');
                        try {
                            if (!open) {
                                // Use dynamic import if static import failed
                                open = (await import('open')).default;
                            }
                            // Play the audio file using the default OS audio player
                            await open(filePath);
                            vscode.window.showInformationMessage('Playing TTS audio...');
                            console.log('Audio playback started.');
                        } catch (openErr) {
                            console.error('Error during audio playback:', openErr);
                            vscode.window.showErrorMessage('Failed to play the audio file.');
                        }
                    } else {
                        vscode.window.showErrorMessage('Audio file does not exist.');
                        console.error('Audio file does not exist at path:', filePath);
                    }
                } catch (error) {
                    vscode.window.showErrorMessage('Failed to request TTS audio.');
                    console.error('Error during TTS request or file save:', error);
                }
            } else {
                vscode.window.showErrorMessage('No text selected!');
            }
        }
    });

    context.subscriptions.push(playTTS);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};