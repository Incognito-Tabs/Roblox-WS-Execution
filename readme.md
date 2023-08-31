# Roblox WS Execution

Roblox WS Execution is an extension designed for Roblox executors that support WebSocket connections. It streamlines the execution of code within your executor by providing a convenient "WS Execute" button on the status bar. This functionality is especially valuable for users who, in the past, had to endure the time-consuming process of manually copying code from their Visual Studio Code editor to the executor.

## Multi-Account Support

Roblox WS Execution takes your convenience a step further by offering seamless support for multiple accounts. If you find yourself engaged in multi-Roblox instances and managing a plethora of accounts, this feature is tailored for you. With Roblox WS Execution's multi-account support, you can effortlessly execute code across various game instances while maintaining a smooth and organized experience.

### How to Use Multi-Account Support

Using the multi-account feature is as intuitive as the standard "WS Execute" button:

1. Launch your Roblox game within the executor as you normally would.
2. Allow the game to fully load, ensuring you're ready to dive into your creative process.
3. Click on the "WS Execute" button, triggering a drop-down menu that displays a list of connected usernames.

   ![WS Execute Button](https://i.imgur.com/ipzfCf2.png)

4. Choose the account under which you want to execute the code from the list. After selecting the desired account, the extension will execute the Lua code for that account.

   ![Connected Usernames](https://i.imgur.com/t7xmFi8.png)

This addition makes managing multiple accounts and executing code in various game instances a breeze. No more juggling separate executors or tedious setups—Roblox WS Execution streamlines the process for you.

## Installation

To leverage the power of Roblox WS Execution, follow these simple steps:

1. Ensure you have a Roblox executor that supports WebSocket connections.

2. Create a new text file within your executor's autoexec folder. The file's name is not critical.

3. Open the newly created text file and paste the provided Lua code snippet:

```lua
repeat task.wait() until game:IsLoaded()

local Success, Data       = pcall(game.HttpGet, game, "https://raw.githubusercontent.com/lncoognito/Roblox-WS/main/Client.lua")
local Success, Function   = pcall(loadstring, Data)

Function()
```

The content of the file is crucial; it must match the provided Lua code. This snippet ensures that essential functions are loaded and executed upon your game's launch.

## Effortless Usage

Roblox WS Execution's user-friendly interface makes execution a breeze:

1. Launch your Roblox game within the executor.

2. Wait for the game to load completely.

3. Locate the "WS Execute" button on the status bar or a similar location within the executor's interface.

   ![WS Execute Button](https://i.imgur.com/ipzfCf2.png)

4. Embrace the seamless execution of your Lua code by clicking the "WS Execute" button.

## Valuable Notes

- Make sure your chosen Roblox executor supports WebSocket connections for optimal functionality.

- A stable internet connection is essential since the extension fetches necessary code from a remote source.

- Always exercise caution when executing code and rely on scripts solely from trusted sources.

## Legal Disclaimer

Roblox WS Execution is provided on an "as-is" basis and is not officially endorsed by Roblox Corporation. Use it at your own discretion and risk.

## License

This project is licensed under the MIT License.