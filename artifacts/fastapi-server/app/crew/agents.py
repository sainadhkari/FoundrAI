from crewai import Agent, LLM
from app.crew.tools import financial_calculator

# All agents share a single OpenAI-backed LLM. crewai/litellm read OPENAI_API_KEY
# from the environment automatically; the model is pinned explicitly so behavior
# is predictable rather than relying on crewai's default.
_llm = LLM(model="gpt-4o-mini")


def create_market_agent() -> Agent:
    return Agent(
        role="Market Intelligence Analyst",
        goal="Analyze market demand and market opportunity for startup ideas.",
        backstory=(
            "Expert market analyst specializing in startup markets, demand forecasting, "
            "industry trends, and opportunity analysis."
        ),
        llm=_llm,
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
        llm=_llm,
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
        llm=_llm,
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
        llm=_llm,
        verbose=True,
        allow_delegation=False,
    )
