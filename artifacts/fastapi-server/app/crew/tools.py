import re
from crewai.tools import tool


@tool("Financial Calculator")
def financial_calculator(budget: str, timeline: str) -> str:
    """
    Calculate monthly burn rate and financial feasibility for a startup.

    Args:
        budget: The startup budget as a string (e.g. '$100,000' or '100000').
        timeline: The startup timeline as a string (e.g. '9 months' or '12').

    Returns:
        A financial summary with monthly burn rate, budget sufficiency, and feasibility.
    """
    budget_clean = re.sub(r"[^\d.]", "", str(budget))
    budget_amount = float(budget_clean) if budget_clean else 0.0

    timeline_match = re.search(r"(\d+(?:\.\d+)?)", str(timeline))
    timeline_months = float(timeline_match.group(1)) if timeline_match else 1.0

    if timeline_months <= 0:
        timeline_months = 1.0

    monthly_burn = budget_amount / timeline_months

    if monthly_burn <= 5_000:
        sufficiency = "Very tight — high risk of running out before traction."
    elif monthly_burn <= 15_000:
        sufficiency = "Lean but workable — requires strict cost discipline."
    elif monthly_burn <= 30_000:
        sufficiency = "Moderate — sufficient for a small focused team."
    elif monthly_burn <= 60_000:
        sufficiency = "Comfortable — room for team + marketing spend."
    else:
        sufficiency = "Well-funded — strong runway for iteration and growth."

    if budget_amount >= 50_000 and timeline_months <= 18:
        feasibility = "Feasible"
    elif budget_amount >= 20_000 and timeline_months <= 12:
        feasibility = "Marginally Feasible"
    else:
        feasibility = "High Risk — budget or timeline may be insufficient"

    result = (
        f"=== Financial Calculator Results ===\n"
        f"Budget: ${budget_amount:,.0f}\n"
        f"Timeline: {timeline_months:.0f} months\n"
        f"Monthly Burn Rate: ${monthly_burn:,.0f}/month\n"
        f"Budget Sufficiency: {sufficiency}\n"
        f"Financial Feasibility: {feasibility}\n"
        f"====================================="
    )
    return result
