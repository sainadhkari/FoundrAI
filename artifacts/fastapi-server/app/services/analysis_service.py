"""
Startup analysis service.

Phase 1: Runs the CrewAI Market Agent and prints its output to the terminal/logs.
The API response still returns static mock scores while real agent scoring is
wired up in later phases.
"""

from app.models.analyze import StartupAnalysisRequest, StartupAnalysisResponse
from app.crew.crew_setup import run_market_crew


def analyze_startup(request: StartupAnalysisRequest) -> StartupAnalysisResponse:
    """
    Run CrewAI market analysis on a startup submission.

    Phase 1:
      - Executes the Market Intelligence Analyst agent via CrewAI.
      - Prints CrewAI output to terminal/logs.
      - Returns static mock scores (real scoring wired in Phase 2+).
    """
    crew_output = run_market_crew(
        startup_name=request.startup_name,
        startup_idea=request.startup_idea,
        industry=request.industry,
        budget=request.budget,
        timeline=request.timeline,
    )

    print("\n========== CrewAI Market Agent Output ==========")
    print(crew_output)
    print("=================================================\n")

    return StartupAnalysisResponse(
        market_score=8.7,
        competition_score=6.2,
        financial_score=7.9,
        risk_score=4.8,
        verdict="Proceed with Caution",
    )
