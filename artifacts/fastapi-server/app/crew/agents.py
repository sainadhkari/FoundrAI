from crewai import Agent


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
