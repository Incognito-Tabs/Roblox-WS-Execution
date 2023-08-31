repeat task.wait() until game:IsLoaded()

local Success, Data			= pcall(game.HttpGet, game, "https://raw.githubusercontent.com/lncoognito/Roblox-WS/main/Client.lua")
local Success, Function 	= pcall(loadstring, Data)

Function()