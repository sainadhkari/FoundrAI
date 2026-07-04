"""
Startup analysis service.

Phase 3: Runs Market, Competitor, and Finance CrewAI agents sequentially.
The Finance Agent uses real tool calling (Financial Calculator) to compute
burn rate and feasibility. All outputs are printed to terminal/logs.
API response returns static mock scores while real scoring is wired in Phase 4+.
"""

from app.models.analyze import StartupAnalysisRequest, StartupAnalysisResponse
from app.crew.crew_setup import run_foundrai_crew


def analyze_startup(request: StartupAnalysisRequest) -> StartupAnalysisResponse:
    """
    Run CrewAI market + competitor + finance analysis on a startup submission.

    Phase 3:
      - Market Intelligence Analyst    → market demand & opportunity.
      - Competitor Intelligence Analyst → competitive landscape.
      - Financial Risk Analyst          → burn rate via tool calling + financial risk.
      - All outputs printed to terminal/logs.
      - Returns static mock scores (real scoring wired in Phase 4+).
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

    print("\n========== CrewAI Finance Agent Output ==========")
    print(crew_outputs["finance"])
    print("==================================================\n")

    return StartupAnalysisResponse(
        market_score=8.7,
        competition_score=6.2,
        financial_score=7.9,
        risk_score=4.8,
        verdict="Proceed with Caution",
    )
