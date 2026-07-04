from crewai import Agent
from app.crew.tools import financial_calculator


def create_market_agent() -> Agent:
    return Agent(
        role="Market Intelligence Analyst",
        goal="Analyze market demand and market opportunity for startup ideas.",
        backstory=(
            "Expert market analyst specializing in startup markets, demand forecasting, "
            "industry trends, and opportunity analysis."
        ),
        verbose=True,
        allow_delegation=False,
    )


def create_competitor_agent() -> Agent:
    return Agent(
        role="Competitor Intelligence Analyst",
        goal="Analyze competition for startup ideas and identify major competitors.",
        backstory=(
            "Expert competitor analyst specializing in startup ecosystems, market positioning, "
            "pricing analysis, and competitive differentiation."
        ),
        verbose=True,
        allow_delegation=False,
    )


def create_finance_agent() -> Agent:
    return Agent(
        role="Financial Risk Analyst",
        goal="Analyze financial viability, burn rate, and financial risk of startup ideas.",
        backstory=(
            "Expert startup financial analyst specializing in runway planning, burn rate analysis, "
            "startup budgeting, and financial risk evaluation."
        ),
        tools=[financial_calculator],
        verbose=True,
        allow_delegation=False,
    )


def create_ceo_agent() -> Agent:
    return Agent(
        role="Chief Executive AI",
        goal="Review outputs from all other agents and make the final strategic decision.",
        backstory=(
            "Elite CEO and startup strategist with deep expertise in startup execution, "
            "product-market fit, fundraising, scaling, and strategic decision-making."
        ),
        verbose=True,
        allow_delegation=False,
    )
