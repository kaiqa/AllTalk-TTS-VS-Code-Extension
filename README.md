# Alltalk TTS

## Description

This Alltalk TTS extension reads back selected text in the Visual Studio Editor. It has to connect to a running instance of AllTalk via the ip and port specified in the extension settings.

AllTalk is coded to start on 127.0.0.1, meaning that it will ONLY be accessible to the local computer it is running on. If you want to make AllTalk available to other systems on your network, you will need to change its IP address to match the IP address of your network card/computers current IP address. There are two ways to change the IP address:

You can edit the IP address on the "AllTalk Startup Settings".
or in the confignew.jsonfile and change "ip_address": "127.0.0.1", to the IP address of you like to connect to.

AllTalk is based on the Coqui TTS engine, similar to the Coqui_tts extension for Text generation webUI, however supports a variety of advanced features, such as a settings page, low VRAM support, DeepSpeed, narrator, model finetuning, custom models, wav file maintenance. It can also be used with 3rd Party software via JSON calls.
https://github.com/erew123/alltalk_tts

## Features

- Convert selected text to speech.
- Configure IP address, port, voice file, language, and temperature settings.

## Usage

1. Select the text you want to convert to speech.
2. Run the command `Play TTS Audio` from the command palette (`Ctrl+Shift+P`).
3. Right click on selected text and select Play TTS Audio`

## Extension Settings

This extension contributes the following settings:

- IP address of the TTS server.
- port of the TTS server.
- voice file to use.
- language for TTS.
- The temperature value for TTS.

## Requirements

- An active TTS server running at the specified IP and port.
- Supported voice file available on the TTS server.

## Known Issues

The audio output will use a the default player of the operating system, which may not be compatible with all systems.
A wave file is created in the user app folder and can also be played manually by using any media player.

## Release Notes

### 0.0.1

Initial release of Alltalk TTS.
