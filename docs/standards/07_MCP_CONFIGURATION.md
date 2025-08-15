# 📚 Shared Development Standard
# Part of common standards library used by both Claude and Gemini

# MCP (Model Context Protocol) Configuration

This document outlines the MCP server configurations for Claude and Gemini CLI tools, including setup, file locations, and authentication methods.

## Overview

MCP servers provide additional capabilities to AI tools like accessing GitHub APIs, Grafana monitoring, and documentation services. This setup uses:

- **Context7**: Documentation and code example retrieval
- **Grafana**: Monitoring and observability data access  
- **GitHub**: Repository and issue management via GitHub Copilot API

## File Locations

### Claude Code
- **Global config**: `~/.claude.json` → symlinked to `~/.ai-dev-standards/claude/.claude.json`
- **Project config**: `.mcp.json` (for project-specific servers)
- **Legacy config**: `~/.claude/settings.json` (still used for some settings)

### Gemini CLI
- **Global config**: `~/.gemini/settings.json` → symlinked via `~/.gemini` → `~/.ai-dev-standards/gemini/`
- Uses directory symlink approach, not individual file symlinks

## Current MCP Server Configuration

### Context7 Server
```json
"context7": {
  "command": "npx",
  "args": ["-y", "@upstash/context7-mcp@latest"]
}
```

### Grafana Server
```json
"grafana": {
  "command": "mcp-grafana",
  "args": [],
  "env": {
    "GRAFANA_URL": "http://your-grafana.example.com:3000/",
    "GRAFANA_API_KEY": "YOUR_GRAFANA_API_KEY"
  }
}
```

### GitHub Server
```json
"github": {
  "httpUrl": "https://api.githubcopilot.com/mcp/",
  "headers": {
    "Authorization": "$(security find-generic-password -w -s githubtoken)"
  },
  "timeout": 5000
}
```

## Authentication Setup

### GitHub Token (Keychain Storage)

The GitHub MCP server uses a Personal Access Token stored securely in macOS Keychain.

**Add or Update token in keychain:**
```bash
# This command is idempotent. It deletes the old password if it exists, then adds the new one.
security delete-generic-password -s githubtoken 2>/dev/null || true
security add-generic-password -s githubtoken -a github -w "YOUR_GITHUB_PAT_HERE"
```

**Verify token storage:**
```bash
security find-generic-password -s githubtoken -w
```

**Token persistence:**
- Remains in keychain permanently until manually removed
- Survives system reboots and updates
- Only removed by explicit deletion or keychain reset

**Remove token (if needed):**
```bash
security delete-generic-password -s githubtoken
```

## Verification Commands

### Claude Code
```bash
# Check MCP server status
claude
/mcp

# Expected output shows: context7, grafana, github servers loaded
```

### Gemini CLI
```bash
# Gemini automatically loads MCP servers from settings.json
# Verify by attempting to use MCP functions
```

## Configuration Differences

| Aspect | Claude Code | Gemini CLI |
|--------|-------------|------------|
| Config File | `.claude.json` | `settings.json` |
| Symlink Method | File symlink | Directory symlink |
| Format | JSON with `mcpServers` | JSON with `mcpServers` |
| Additional Fields | userID, projects, etc. | selectedAuthType, etc. |

## Troubleshooting

### MCP Servers Not Loading
1. Verify symlinks: `ls -la ~/.claude.json ~/.gemini`
2. Check JSON syntax: `cat ~/.claude.json | jq .`
3. Verify keychain token: `security find-generic-password -s githubtoken`

### GitHub Authentication Failures
1. Ensure token exists in keychain
2. Verify token has required permissions (repo, read:org, etc.)
3. Check token hasn't expired on GitHub

### Server Connection Issues
1. Test network connectivity to server URLs
2. Verify server processes are running (for stdio servers)
3. Check timeout settings for HTTP servers

## Security Notes

- GitHub token stored in macOS Keychain (encrypted)
- Grafana API key should be loaded from a secure source like environment variables or keychain, not stored in config files
- MCP servers run with user permissions only
- HTTP servers use HTTPS connections where possible

## Maintenance

### Updating Servers
- Context7: Auto-updates via `npx -y` flag
- Grafana: Update `mcp-grafana` package manually
- GitHub: HTTP service, no local updates needed

### Rotating Credentials
1. Generate new GitHub token
2. Update keychain: `security add-generic-password -s githubtoken -a github -w "NEW_TOKEN"`
3. No restart required - tokens fetched dynamically

---

*Last updated: $(date '+%Y-%m-%d')*
