# Shared Utilities

The Shared Utilities module provides common functions and utilities that are available on both client and server sides of the RP Framework.

## Overview

This module contains essential utilities for mathematical operations, string manipulation, logging, and data conversion that are commonly used across different parts of the framework.

## Core Functions

### XP and Level Management

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `RP.GetLevelFromXP(xp)` | `number` | `number` | Converts XP value to player level |
| `RP.GetXPFromLevel(level)` | `number` | `number` | Converts player level to required XP |

### Usage Example
```lua
local playerXP = 1500
local playerLevel = RP.GetLevelFromXP(playerXP)
print("Player level:", playerLevel)

local requiredXP = RP.GetXPFromLevel(5)
print("XP needed for level 5:", requiredXP)
```

## Logging System

The logging system provides structured logging capabilities with different severity levels and custom formatting.

### Log Levels

| Level | Function | Description | Use Case |
|-------|----------|-------------|----------|
| **Info** | `RP.Log.info(...)` | General information messages | Status updates, user actions |
| **Warning** | `RP.Log.warning(...)` | Warning messages | Non-critical issues, deprecated usage |
| **Error** | `RP.Log.error(...)` | Error messages | Critical failures, exceptions |
| **Debug** | `RP.Log.debug(...)` | Debug information | Development debugging (only shown if debug enabled) |
| **Custom** | `RP.Log.custom(...)` | Custom formatted messages | Resource-specific logging |

### Usage Examples

```lua
-- Basic logging
RP.Log.info("Player joined:", playerName)
RP.Log.warning("Deprecated function called")
RP.Log.error("Database connection failed")

-- Debug logging (only shown when debug is enabled)
RP.Log.debug("Processing player data:", json.encode(playerData))

-- Custom logging with resource prefix
RP.Log.custom("Custom message with resource prefix")
-- Output: [resource_name] Custom message with resource prefix
```

### Debug Mode
Debug logging is only active when the framework's debug mode is enabled. This allows for detailed logging during development while keeping production logs clean.

## Utility Functions

### Mathematical Operations

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `RP.Util.RoundFloat(number, precision)` | `number, number` | `number` | Rounds a number to specified decimal places |
| `RP.Util.GroupDigits(number)` | `number` | `string` | Formats a number with comma separators |

### String Operations

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `RP.Util.RandomString(length)` | `number` | `string` | Generates a random alphanumeric string |
| `RP.Util.Trim(string)` | `string` | `string` | Removes leading/trailing whitespace |

### Spatial Operations

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `RP.Util.GetDistance(pos1, pos2, useZ)` | `vector3, vector3, boolean?` | `number` | Calculates distance between two positions |

### Usage Examples

#### Mathematical Operations
```lua
-- Round floating point numbers
local rounded = RP.Util.RoundFloat(3.14159, 2)
print(rounded) -- Output: 3.14

-- Format large numbers with commas
local formatted = RP.Util.GroupDigits(1234567)
print(formatted) -- Output: 1,234,567
```

#### String Operations
```lua
-- Generate random strings
local randomID = RP.Util.RandomString(8)
print(randomID) -- Output: "aB3k9mP2"

-- Clean up strings
local cleanString = RP.Util.Trim("  hello world  ")
print(cleanString) -- Output: "hello world"
```

#### Safe Navigation
```lua
-- Safe navigation with ?. operator
local playerData = someTable?.player?.data
local playerName = playerData?.name or "Unknown"

-- Safe navigation with bracket notation
local playerLevel = someTable?["player"]?["level"] or 1

-- Chain multiple safe navigations
local nestedValue = table1?.section1?.subsection?.value
```

#### Spatial Operations
```lua
local pos1 = vector3(100.0, 200.0, 30.0)
local pos2 = vector3(150.0, 250.0, 35.0)

-- Calculate 2D distance (ignoring height)
local distance2D = #(pos1.xy - pos2.xy)

-- Calculate 3D distance (including height)
local distance3D = #(pos1 - pos2)

print("2D Distance:", distance2D)
print("3D Distance:", distance3D)
```

## Performance Considerations

### GetDistance Function
The `GetDistance` function is designed for convenience but may not be optimal for performance-critical applications. For high-frequency distance calculations, consider using direct vector operations:

```lua
-- High-performance distance calculation
local distance2D = #(pos1.xy - pos2.xy)  -- 2D distance (ignoring height)
local distance3D = #(pos1 - pos2)        -- 3D distance (including height)
```

### Logging Performance
- **Info/Warning/Error** logs are always processed
- **Debug** logs are only processed when debug mode is enabled
- **Custom** logs include resource name resolution
- Consider log level appropriateness for production environments

## Best Practices

### Logging
- **Use appropriate log levels** - Don't use error for warnings
- **Include context** - Provide relevant data with log messages
- **Avoid excessive logging** - Balance detail with performance
- **Use debug sparingly** - Keep production logs clean

### Utility Functions
- **Validate inputs** - Check for nil values before processing
- **Handle edge cases** - Consider boundary conditions
- **Cache results** - Store frequently used calculations
- **Choose appropriate functions** - Use specialized functions for specific needs
- **Use safe navigation** - Leverage `?.` operator for nested table access

### Performance
- **Profile critical paths** - Measure performance impact
- **Use alternatives for high-frequency operations** - Direct calculations vs utility functions
- **Batch operations** - Group related calculations when possible
- **Monitor memory usage** - Large string operations can impact performance

## Integration

The Shared Utilities module is automatically available when you import the RP Framework:

```lua
-- No additional imports needed
local level = RP.GetLevelFromXP(1000)
RP.Log.info("Player level calculated:", level)
local distance = RP.Util.GetDistance(pos1, pos2)
```

All utilities are designed to work seamlessly with other framework modules and provide consistent behavior across client and server environments.