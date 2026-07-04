from crewai import Task
from crewai import Agent


def create_market_task(agent: Agent, startup_name: str, startup_idea: str, industry: str, budget: str, timeline: str) -> Task:
    description = f"""
Analyze the following startup and evaluate its market opportunity:

- Startup Name: {startup_name}
- Idea: {startup_idea}
- Industry: {industry}
- Budget: {budget}
- Timeline: {timeline}

Provide:
1. A market score out of 10
2. A short reasoning about the market opportunity
"""
    return Task(
        description=description,
        agent=agent,
        expected_output=(
            "A market score out of 10 and a brief reasoning about the "
            "market opportunity for the startup."
        ),
    )


def create_competitor_task(agent: Agent, startup_name: str, startup_idea: str, industry: str, budget: str, timeline: str) -> Task:
    description = f"""
Analyze the competitive landscape for the following startup:

- Startup Name: {startup_name}
- Idea: {startup_idea}
- Industry: {industry}
- Budget: {budget}
- Timeline: {timeline}

Provide:
1. A competition score out of 10 (10 = least competitive / easiest entry, 1 = most competitive / hardest entry)
2. List of major competitors in this space
3. Competition intensity (Low / Medium / High)
4. Key differentiation opportunities for this startup
"""
    return Task(
        description=description,
        agent=agent,
        expected_output=(
            "A competition score out of 10, a list of major competitors, "
            "competition intensity level, and key differentiation opportunities."
        ),
    )
