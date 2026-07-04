import threading
import uuid

from fastapi import APIRouter, HTTPException

from app.models.analyze import StartupAnalysisRequest, StartupAnalysisResponse
from app.services.analysis_service import analyze_startup

router = APIRouter()

jobs: dict = {}


def _run_crew(job_id: str, request: StartupAnalysisRequest) -> None:
    try:
        result: StartupAnalysisResponse = analyze_startup(request)
        jobs[job_id] = {
            "status": "completed",
            "result": result.model_dump(),
        }
    except Exception as exc:
        jobs[job_id] = {
            "status": "failed",
            "error": str(exc),
        }


@router.post("/analyze")
def analyze(request: StartupAnalysisRequest) -> dict:
    """Start async CrewAI analysis. Returns job_id immediately."""
    job_id = str(uuid.uuid4())
    jobs[job_id] = {"status": "running", "result": None}
    thread = threading.Thread(target=_run_crew, args=(job_id, request), daemon=True)
    thread.start()
    return {"job_id": job_id, "status": "running"}


@router.get("/status/{job_id}")
def status(job_id: str) -> dict:
    """Poll analysis job status."""
    job = jobs.get(job_id)
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    if job["status"] == "running":
        return {"status": "running"}
    if job["status"] == "failed":
        raise HTTPException(status_code=500, detail=job.get("error", "Analysis failed"))
    return {"status": "completed", "result": job["result"]}
