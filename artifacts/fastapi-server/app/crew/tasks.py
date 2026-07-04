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
