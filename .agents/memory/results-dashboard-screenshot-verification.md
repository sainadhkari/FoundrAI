---
  name: Results dashboard content-authenticated screenshotting
  description: How to verify a protected page (auth + localStorage-gated content) with the screenshot tool without leaving debug code behind
  ---

  To visually verify a route gated behind localStorage-based auth/data (e.g. FoundrAI's `foundrai_user` / `foundrai_results` contract), the screenshot tool cannot inject localStorage or click through a login form.

  **How to apply:** temporarily add a DEV-only seed block in the app entrypoint (guarded by `import.meta.env.DEV` and a query param like `?__seed=1`) that writes the required localStorage keys before render, screenshot the target route with that query param, then immediately revert the entrypoint file once verified. Never leave the seed block in committed code — it's a throwaway verification aid, not a feature.
  