"""
Startup analysis service.

This module currently returns mock analysis data. It is structured so that
each score/verdict can later be swapped out for real AI-agent-driven logic
(e.g. via CrewAI) without changing the API layer.
"""

from app.models.analyze import StartupAnalysisRequest, StartupAnalysisResponse


def analyze_startup(request: StartupAnalysisRequest) -> StartupAnalysisResponse:
    """
    Run (mock) analysis on a startup submission.

    Phase 1: returns static mock scores regardless of input.
    Phase 2 (future): route through CrewAI agents (market, competitor,
    finance, risk, growth, execution, CEO) and aggregate real results here.
    """
    return StartupAnalysisResponse(
        market_score=8.7,
        competition_score=6.2,
        financial_score=7.9,
        risk_score=4.8,
        verdict="Proceed with Caution",
    )
