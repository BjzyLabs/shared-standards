# ⚠️ DEPRECATED: shared-standards

**This repository is deprecated and no longer maintained.**

## Migration Information

This repository has been superseded by the inline `shared/` directories in:
- **[BjzyLabs/claude-standards](https://github.com/BjzyLabs/claude-standards)** (source of truth)
- **[BjzyLabs/gemini-standards](https://github.com/BjzyLabs/gemini-standards)** (auto-synced)

## Why Was This Deprecated?

The git submodule approach was replaced with:
- ✅ **Direct `shared/` directories** in each standards repo
- ✅ **GitHub Actions auto-sync** from claude-standards → gemini-standards  
- ✅ **Simplified management** without submodule complexity
- ✅ **Single source of truth** in claude-standards

## Historical Context

This repository previously served as a git submodule for shared development standards. The architecture was refactored in 2024/2025 to use automated synchronization instead.

## What to Use Instead

For universal development standards, use:
- **Claude users**: [BjzyLabs/claude-standards](https://github.com/BjzyLabs/claude-standards)
- **Gemini users**: [BjzyLabs/gemini-standards](https://github.com/BjzyLabs/gemini-standards)

Both repos contain the same `shared/` content, automatically synchronized.

---

**Repository archived on:** [Current Date]  
**Deprecated in favor of:** claude-standards + gemini-standards with auto-sync
