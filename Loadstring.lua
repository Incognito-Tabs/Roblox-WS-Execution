repeat task.wait() until game:IsLoaded()

local Success, Data          = pcall(game.HttpGet, game, "https://raw.githubusercontent.com/Incognito-Tabs/Roblox-WS/main/Client.lua")
local Success, Function      = pcall(loadstring, Data)

Function()
