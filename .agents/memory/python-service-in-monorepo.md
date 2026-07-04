---
name: Python service in pnpm monorepo
description: How to add a Python (e.g. FastAPI) backend when no Python artifact type exists in createArtifact
---

`createArtifact` only supports `expo`, `data-visualization`, `mockup-sandbox`, `react-vite`, `slides`, `video-js` — there is no Python/FastAPI artifact type.

**Approach used:** installed `python-3.11` + pip packages via the package-management skill, wrote the Python app under `artifacts/<name>/`, then added a second `[[services]]` block to an *existing* api-kind artifact's `artifact.toml` (via `verifyAndReplaceArtifactToml`) with its own `localPort` and `paths`. This creates a second Replit workflow (`<artifact>: <service name>`) alongside the existing one — no new artifact registration needed.

**Why:** the platform's artifact system is oriented around its known scaffolds; a raw language runtime + manual service entry is the only way to run a second, differently-stacked backend process under the same reverse proxy.

**How to apply:**
- Pick an unused `localPort` (check all `artifacts/*/.replit-artifact/artifact.toml` first) and an unused `paths` prefix.
- The proxy does NOT rewrite paths — the Python app itself must serve routes under that same prefix (e.g. mount FastAPI routers with `prefix="/fastapi"`, and set `docs_url`/`openapi_url` accordingly too).
- The service's dev `run` command's cwd is the *artifact directory declared at the top of that toml*, not the Python app's own directory and not the workspace root. Use `cd /home/runner/workspace/artifacts/<python-app> && python -m uvicorn main:app --host 0.0.0.0 --port $PORT --reload` (absolute `cd`) rather than uvicorn's `--app-dir` flag, which is resolved relative to the wrong cwd and silently fails import with "Could not import module main".
- After editing artifact.toml, the new workflow appears as `NOT_STARTED` and needs an explicit `restart_workflow` call before it's picked up.
