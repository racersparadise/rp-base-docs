# RP Framework Documentation

Welcome to the RP Framework - a comprehensive FiveM development framework designed for racing servers.

### Installation

```lua
lua54 "yes"

shared_scripts {
    "@ox_lib/init.lua",
    "@rp-base/import.lua",
}
```

## Documentation Structure

### Core Modules
- **[Player System](player)** - Player management, properties, and methods
- **[Server API](rp_server)** - Server-side functionality and player management
- **[Client API](rp_client)** - Client-side utilities and player data
- **[Shared Utilities](rp_shared)** - Common functions and utilities

### Key Features
- **Player Management** - Comprehensive player object with metadata, accounts, and state
- **Dynamic Properties** - Real-time property updates with automatic synchronization
- **Entity Control** - Advanced ped, vehicle, and object spawning with radius-based visibility
- **Utility Functions** - Mathematical operations, string manipulation, and conversion tools

## Getting Started

1. **Install Dependencies** - Ensure ox_lib is properly installed
2. **Import Framework** - Add the import script to your resource
3. **Access Player Objects** - Use `RP.GetPlayerFromSource()` on server or `RP.PlayerData` on client
4. **Explore Documentation** - Navigate through the modules to understand available functionality

## Examples

### Server-Side Player Management
```lua
local player = RP.GetPlayerFromSource(source)
if player then
    player:teleport(100.0, 200.0, 30.0)
    player.metadata.customField = "value" -- automatically replicated in db
    player.xp += 10 -- automatically replicated in db
end
```

### Client-Side Player Data
```lua
local coords = RP.PlayerData.coords
local xp = RP.PlayerData.xp
local rank = RP.GetPlayerRank()

-- for resources without the import
local xp = LocalPlayer.state.metadata_xp -- the metadata can be manipulated by cheaters, don't trust it too much
```