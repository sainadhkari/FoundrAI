from fastapi import APIRouter

from app.models.analyze import StartupAnalysisRequest, StartupAnalysisResponse
from app.services.analysis_service import analyze_startup

router = APIRouter()


@router.post("/analyze", response_model=StartupAnalysisResponse)
def analyze(request: StartupAnalysisRequest) -> StartupAnalysisResponse:
    """Analyze a submitted startup idea and return AI boardroom scores + verdict."""
    return analyze_startup(request)
