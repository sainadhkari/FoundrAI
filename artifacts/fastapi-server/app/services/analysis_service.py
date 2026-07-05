"""
Startup analysis service.

Phase 4: Runs all 4 CrewAI agents sequentially.
  - Market Intelligence Analyst    → market demand & opportunity
  - Competitor Intelligence Analyst → competitive landscape
  - Financial Risk Analyst          → burn rate via tool calling + financial risk
  - Chief Executive AI              → synthesizes all reports, delivers final verdict

The CEO verdict is used as the real API verdict. Scores are parsed from agent
outputs where possible; defaults are used as fallback.
"""

import re
from app.models.analyze import StartupAnalysisRequest, StartupAnalysisResponse
from app.crew.crew_setup import run_foundrai_crew


def _parse_score(text: str, pattern: str, default: float) -> float:
    """Extract a numeric score from agent output text."""
    match = re.search(pattern, text, re.IGNORECASE)
    if match:
        try:
            return float(match.group(1))
        except (ValueError, IndexError):
            pass
    return default


def _parse_verdict(ceo_output: str) -> str:
    """Extract the CEO's VERDICT line from structured output."""
    match = re.search(r"VERDICT\s*:\s*(Proceed|Pivot|Reject)", ceo_output, re.IGNORECASE)
    if match:
        return match.group(1).capitalize()
    for keyword in ("Proceed", "Pivot", "Reject"):
        if keyword.lower() in ceo_output.lower():
            return keyword
    return "Proceed with Caution"


def _parse_section(text: str, label: str, default: str) -> str:
    """Extract a labeled section (e.g. REASONING:, RECOMMENDATION:) from CEO output.

    Stops at the next ALL-CAPS label line or end of text.
    """
    match = re.search(
        rf"{label}\s*:\s*(.+?)(?=\n[A-Z][A-Z ]+:|\Z)",
        text,
        re.IGNORECASE | re.DOTALL,
    )
    if match:
        cleaned = match.group(1).strip()
        if cleaned:
            return cleaned
    return default


def analyze_startup(request: StartupAnalysisRequest) -> StartupAnalysisResponse:
    """
    Run all 4 CrewAI agents and return real CEO verdict + parsed scores.

    Phase 4:
      - Market Intelligence Analyst    → market_score
      - Competitor Intelligence Analyst → competition_score
      - Financial Risk Analyst          → financial_score (tool calling)
      - Chief Executive AI              → verdict + confidence as risk_score
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

    print("\n========== CrewAI CEO Agent Output ==========")
    print(crew_outputs["ceo"])
    print("==============================================\n")

    market_score = _parse_score(
        crew_outputs["market"],
        r"[Mm]arket\s+[Ss]core\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*/\s*10",
        default=7.5,
    )
    competition_score = _parse_score(
        crew_outputs["competitor"],
        r"[Cc]ompetition\s+[Ss]core\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*/\s*10",
        default=6.0,
    )
    financial_score = _parse_score(
        crew_outputs["finance"],
        r"[Ff]inancial\s+[Ss]core\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*/\s*10",
        default=7.0,
    )
    confidence_score = _parse_score(
        crew_outputs["ceo"],
        r"CONFIDENCE\s*:\s*(\d+(?:\.\d+)?)\s*/\s*10",
        default=7.0,
    )

    verdict = _parse_verdict(crew_outputs["ceo"])
    executive_summary = _parse_section(
        crew_outputs["ceo"],
        "REASONING",
        default=crew_outputs["ceo"][:500] or "Analysis completed.",
    )
    recommendation = _parse_section(
        crew_outputs["ceo"],
        "RECOMMENDATION",
        default="Continue validating with real customers before scaling spend.",
    )

    return StartupAnalysisResponse(
        market_score=market_score,
        competition_score=competition_score,
        financial_score=financial_score,
        risk_score=confidence_score,
        verdict=verdict,
        executive_summary=executive_summary,
        recommendation=recommendation,
    )
