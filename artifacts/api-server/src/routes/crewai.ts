import { Router, type IRouter } from "express";

const router: IRouter = Router();

// The AI analysis pipeline runs locally in the FastAPI service (OpenAI-backed
// CrewAI agents), not the external hosted CrewAI deployment — that hosted
// deployment hit its monthly execution quota. This proxy keeps the same
// `/kickoff` + `/status/:id` contract the frontend already speaks, so
// Analyze.tsx needs no changes; it just forwards to the internal service.
function getFastApiBaseUrl(): string {
  const port = process.env.FASTAPI_PORT ?? "8000";
  return `http://127.0.0.1:${port}/fastapi`;
}

router.post("/kickoff", async (req, res) => {
  try {
    const baseUrl = getFastApiBaseUrl();
    const inputs = req.body?.inputs ?? {};
    const analyzeRes = await fetch(`${baseUrl}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startup_name: inputs.startup_name ?? "",
        startup_idea: inputs.startup_idea ?? "",
        industry: inputs.industry ?? "",
        budget: inputs.budget ?? "",
        timeline: inputs.timeline ?? "",
      }),
    });
    const data = await analyzeRes.json().catch(() => ({}));
    if (!analyzeRes.ok) {
      res.status(analyzeRes.status).json({ error: "Analysis kickoff failed", details: data });
      return;
    }
    res.json({ kickoff_id: data.job_id, status: data.status });
  } catch (err) {
    req.log?.error({ err }, "Analysis kickoff error");
    res.status(502).json({ error: err instanceof Error ? err.message : "Analysis kickoff failed" });
  }
});

router.get("/status/:kickoffId", async (req, res) => {
  try {
    const baseUrl = getFastApiBaseUrl();
    const statusRes = await fetch(`${baseUrl}/status/${encodeURIComponent(req.params.kickoffId)}`);
    const data = await statusRes.json().catch(() => ({}));
    if (!statusRes.ok) {
      res.status(statusRes.status).json({ error: "Analysis status check failed", details: data });
      return;
    }
    if (data.status === "completed") {
      res.json({ state: "SUCCESS", status: "completed", result: data.result });
      return;
    }
    res.json({ state: "RUNNING", status: data.status ?? "running" });
  } catch (err) {
    req.log?.error({ err }, "Analysis status error");
    res.status(502).json({ error: err instanceof Error ? err.message : "Analysis status check failed" });
  }
});

export default router;
