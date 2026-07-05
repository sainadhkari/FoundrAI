import { Router, type IRouter } from "express";

const router: IRouter = Router();

function getCrewConfig() {
  const baseUrl = process.env.CREWAI_BASE_URL;
  const token = process.env.CREWAI_BEARER_TOKEN;
  if (!baseUrl || !token) {
    throw new Error("CrewAI is not configured (missing CREWAI_BASE_URL or CREWAI_BEARER_TOKEN)");
  }
  return {
    baseUrl: baseUrl.replace(/\/$/, ""),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
}

router.post("/kickoff", async (req, res) => {
  try {
    const { baseUrl, headers } = getCrewConfig();
    const crewRes = await fetch(`${baseUrl}/kickoff`, {
      method: "POST",
      headers,
      body: JSON.stringify({ inputs: req.body?.inputs ?? {} }),
    });
    const data = await crewRes.json().catch(() => ({}));
    if (!crewRes.ok) {
      res.status(crewRes.status).json({ error: "CrewAI kickoff failed", details: data });
      return;
    }
    res.json(data);
  } catch (err) {
    req.log?.error({ err }, "CrewAI kickoff error");
    res.status(502).json({ error: err instanceof Error ? err.message : "CrewAI kickoff failed" });
  }
});

router.get("/status/:kickoffId", async (req, res) => {
  try {
    const { baseUrl, headers } = getCrewConfig();
    const crewRes = await fetch(`${baseUrl}/status/${encodeURIComponent(req.params.kickoffId)}`, {
      headers,
    });
    const data = await crewRes.json().catch(() => ({}));
    if (!crewRes.ok) {
      res.status(crewRes.status).json({ error: "CrewAI status check failed", details: data });
      return;
    }
    res.json(data);
  } catch (err) {
    req.log?.error({ err }, "CrewAI status error");
    res.status(502).json({ error: err instanceof Error ? err.message : "CrewAI status check failed" });
  }
});

export default router;
