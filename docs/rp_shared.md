# RP (Shared)

Shared RP object functions/properties

## RP

- `RP.GetLevelFromXP(xp)` - Gets level from XP
- `RP.GetXPFromLevel(level)` - Gets XP from level

## Log

- `RP.Log.info(...)` - Logs an info message
- `RP.Log.warning(...)` - Logs a warning message
- `RP.Log.error(...)` - Logs an error message
- `RP.Log.debug(...)` - Logs a debug message
-- Only shows if debug is true
- `RP.Log.custom(...)` - Logs a custom message
-- Prints "[resource_name] ...`

## Util

- `RP.Util.RoundFloat(number, precision)` - Rounds a number to the specified number of digits after the floating point
- `RP.Util.RandomString(length)` - Generates a random string with specified length
- `RP.Util.GroupDigits(number)` - Formats a number with commas
- `RP.Util.GetDistance(pos1, pos2, useZ)` - Gets distance between coords
-- `useZ` - Wether to use Z (height) or not, if set to false or not provided, it will check in a cylinder rather than a sphere
-- Probably slow, use direct calculations
- `RP.Util.Trim(string)` - Trims whitespace from a string

## Events

- `_rp-base:restart` - Gets triggered when the base gets restarted
-- Networked on client, not networked on server