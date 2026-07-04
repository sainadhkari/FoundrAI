"""
Startup analysis service.

Phase 2: Runs the CrewAI Market Agent and Competitor Agent sequentially,
printing both outputs to terminal/logs. API response returns static mock
scores while real scoring is wired in Phase 3+.
"""

from app.models.analyze import StartupAnalysisRequest, StartupAnalysisResponse
from app.crew.crew_setup import run_foundrai_crew


def analyze_startup(request: StartupAnalysisRequest) -> StartupAnalysisResponse:
    """
    Run CrewAI market + competitor analysis on a startup submission.

    Phase 2:
      - Market Intelligence Analyst evaluates market demand and opportunity.
      - Competitor Intelligence Analyst evaluates competitive landscape.
      - Both outputs are printed to terminal/logs.
      - Returns static mock scores (real scoring wired in Phase 3+).
    """
    crew_outputs = run_foundrai_crew(
        startup_name=request.startup_name,
        startup_idea=request.startup_idea,
        industry=request.industry,
        budget=request.budget,
        timeline=request.timeline,
    )

    print("\n========== CrewAI Market Agent Output ==========")
    print(crew_outputs["market"])
    print("=================================================\n")

    print("\n========== CrewAI Competitor Agent Output ==========")
    print(crew_outputs["competitor"])
    print("=====================================================\n")

    return StartupAnalysisResponse(
        market_score=8.7,
        competition_score=6.2,
        financial_score=7.9,
        risk_score=4.8,
        verdict="Proceed with Caution",
    )
