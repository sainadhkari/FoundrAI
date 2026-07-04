from crewai import Crew, Process
from app.crew.agents import create_market_agent
from app.crew.tasks import create_market_task


def run_market_crew(
    startup_name: str,
    startup_idea: str,
    industry: str,
    budget: str,
    timeline: str,
) -> str:
    market_agent = create_market_agent()
    market_task = create_market_task(
        agent=market_agent,
        startup_name=startup_name,
        startup_idea=startup_idea,
        industry=industry,
        budget=budget,
        timeline=timeline,
    )

    crew = Crew(
        agents=[market_agent],
        tasks=[market_task],
        process=Process.sequential,
        verbose=True,
    )

    result = crew.kickoff()
    return str(result)
