# RP (Client)

Base shared object

## PlayerData

### Properties
| Name        | Type     | Description                     |
|-------------|----------|---------------------------------|
|`ped`        |number    | Player's ped entity             |
|`coords`     |vector3   | Player's coordinates            |
|`state`      |table     | Player's state                  |
|`heading`    |number    | Player's heading                |
|`accounts`   |table     | Player's accounts (currency)    |
|`metadata`   |table     | Player's metadata               |
|`identifier` |string    | Player's identifier             |
|`group`      |string    | Player's permission group       |
|`xp`         |number    | Player's XP                     |
|`pid`        |number    | Player's database ID            |
|`sid`        |number    | Player's server ID              |

### Dynamic properties

#### Coords
- If read, it gets the current coords either from natives or ox_lib
- If written to, teleports the player to those coordinates

#### Heading
- If read, it gets the current heading using natives
- If written to, sets the player's heading

#### Ped
- If read, it gets the current ped either from natives or ox_lib
- Can't be written to

#### State
- If read, it gets the player's state `LocalPlayer.state`
- Can't be written to

#### XP
- If read, it just gets XP from the metadata
- Can't be written to

#### Sid
- If read, it gets the player's server id from natives or ox_lib
- Can't be written to

## Modules
- [Util](rp_client?id=util)
- [Log](rp_client?id=log)
- [Blips](rp_client?id=blips)
- [Converts](rp_client?id=converts)

## RP
- `RP.TriggerServerCallback(name, cb, ...)` - Triggers a server callback
- `RP.Teleport(x, y, z, heading?)` or `RP.Teleport(coords, heading?)` - Teleports the player
- `RP.GetPlayerRank()` - Gets the player's rank from XP
- `RP.GetLevelFromXP(xp)` - Gets the level from XP
- `RP.GetXPFromLevel(level)` - Gets the XP from level
- `RP.RequestModel(modelHash: number|string, cb?)` - Requests a model and calls the cb function if provided
-- cb here is useless, it always blocks idk what i was thinking
- `RP.RequestStreamedTextureDict(dict, cb?)` - Streams a texture dict and calls the callback function if provided
-- Asynchronous (doesn't return object, only in callback and doesn't block execution)
- `RP.RequestStreamedTextureDictSync(dict)` - Streams a texture dict
-- Synchronous (returns object and blocks execution)
- `RP.SpawnObject(model: string|number, coords: vector3|table, cb?)` - Spawns an object and calls the callback function if provided
-- Asynchronous (doesn't return object, only in callback and doesn't block execution)
-- Will load model if needed
-- `cb` - function(object)
- `RP.SpawnObjectSync(model: string|number, coords: vector3|table)` - Spawns an object
-- Synchronous (returns object and blocks execution)
-- Will load model if needed
- `RP.SpawnLocalObject(model: string|number, coords: vector3|table, cb?)` - Spawns a local object and calls the callback function if provided
-- Asynchronous (doesn't return object, only in callback and doesn't block execution)
-- Will load model if needed
-- `cb` - function(object)
- `RP.SpawnLocalObjectSync(model: string|number, coords: vector3|table)` - Spawns a local object
-- Synchronous (returns object and blocks execution)
-- Will load model if needed
- `RP.DeleteVehicle(veh)` - Deletes the vehicle
- `RP.SpawnVehicle(model: string|number, coords: vector3|table, heading, cb?)` - Spawns a vehicle and calls the callback function if provided
-- Asynchronous (doesn't return object, only in callback and doesn't block execution)
-- Will load model if needed
-- `cb` - function(veh)
- `RP.SpawnVehicleSync(model: string|number, coords: vector3|table, heading)` - Spawns a vehicle
-- Synchronous (returns object and blocks execution)
-- Will load model if needed
-- `cb` - function(veh)
- `RP.SpawnLocalVehicle(model: string|number, coords: vector3|table, heading, cb?)` - Spawns a local vehicle and calls the callback function if provided
-- Asynchronous (doesn't return object, only in callback and doesn't block execution)
-- Will load model if needed
-- `cb` - function(veh)
- `RP.SpawnLocalVehicleSync(model: string|number, coords: vector3|table, heading)` - Spawns a local vehicle
-- Synchronous (returns object and blocks execution)
-- Will load model if needed
-- `cb` - function(veh)
- `RP.GetVehicleProperties(veh)` - Gets vehicle properties
-- Maybe better to use [lib.getVehicleProperties](https://overextended.dev/ox_lib/Modules/VehicleProperties/Client#libgetvehicleproperties)
- `RP.SetVehicleProperties(veh, props)` - Sets vehicle properties
-- Maybe better to use [lib.setVehicleProperties](https://overextended.dev/ox_lib/Modules/VehicleProperties/Client#libsetvehicleproperties)
- `RP.DrawText3D(pos: vector3|table, text, scale, color: table)` - Draws 3D text - propositional
-- `color` - {r, g, b}
-- Very slow, lot of ms
-- Needs to be called every frame
- `RP.DrawText3DNonProp(pos: vector3|table, text, scale, color: table)` - Draws 3D text - not propositional
-- `color` - {r, g, b}
-- Very slow, lot of ms
-- Needs to be called every frame
- `RP.DrawText(x, y, text, scale, color)` - Draw 2D text
-- `color` - {r, g, b}
-- Needs to be called every frame
-- Better to use [TextUI](https://overextended.dev/ox_lib/Modules/Interface/Client/textui)
- `RP.ShowHelpText(text)` - Show help text
-- Needs to be called every frame
-- Better to use [TextUI](https://overextended.dev/ox_lib/Modules/Interface/Client/textui)
- `RP.KeyBoard(text)` - Show on-screen keyboard
-- `text` - Text to show at the top of the window
-- Returns the input text or nil if cancelled
-- Better to use [Input Dialogs](https://overextended.dev/ox_lib/Modules/Interface/Client/input)
- `RP.ShowNotification(text, duration)` - Show a notification
-- `duration` - ms
-- Not implemented

## Util
- `RP.Util.RoundFloat(number, precision)` - Rounds a number to the specified number of digits after the floating point
- `RP.Util.RandomString(length)` - Generates a random string with specified length
- `RP.Util.GroupDigits(number)` - Formats a number with commas
- `RP.Util.GetDistance(pos1, pos2, useZ)` - Gets distance between coords
-- `useZ` - Wether to use Z (height) or not, if set to false or not provided, it will check in a cylinder rather than a sphere
-- Probably slow, use direct calculations
- `RP.Util.Trim(string)` - Trims whitespace from a string

## Log
- `RP.Log.info(...)` - Logs an info message
- `RP.Log.warning(...)` - Logs a warning message
- `RP.Log.error(...)` - Logs an error message
- `RP.Log.debug(...)` - Logs a debug message
-- Only shows if debug is true
- `RP.Log.custom(...)` - Logs a custom message
-- Prints "[resource_name] ...`

## Blips
- `RP.Blips.SetBlipInfoTitle(blip, title, rockstarVerified)` - Sets the blip's title and rockstar icon
- `RP.Blips.SetBlipInfoImage(blip, dict, texture)` - Sets the blip's image
- `RP.Blips.SetBlipInfoEconomy(blip, rp, money)` - Sets the blip's RP and money values
- `RP.Blips.AddBlipInfoHeader(blip, leftText, rightText)` - Sets the blip's header
- `RP.Blips.AddBlipInfoName(blip, leftText, rightText)` - Sets the blip's name
- `RP.Blips.AddBlipInfoText(blip, leftText, rightText)` - Sets the blip's text
- `RP.Blips.AddBlipInfoIcon(blip, leftText, rightText, iconId, iconColor, checked)` - Sets the blip's [icon](https://docs.fivem.net/docs/game-references/blips/)
- `RP.Blips.SetBlipPath(blip, path)` - Not actually sure what this does lol
- there's more but idk what half of these do tbh, check old scripts that use these

## Converts
- `RP.Converts.PreferredSpeedUnit()` - Gets the user's preffered unit (kmh|mph)
- `RP.Converts.SpeedToPreferred(speed)` - Converts the speed from GTA units to preferred units
- `RP.Converts.DistanceToPreferred(distance)` - Converts the distance from GTA units to preferred units
- `RP.Converts.FormatPreferredDistance(distance, longUnit?, precision?)` - Format the distance to proper units (m -> km, ft -> mi)
-- `distance` - Preferred distance from `DistanceToPreferred`
-- `longUnit` - true/false, if true will use longer units (m->meter(s), ft->(foot/feet))
-- `precision` - How many numbers to keep after the floating point