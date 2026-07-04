from crewai import Crew, Process
from app.crew.agents import create_market_agent, create_competitor_agent, create_finance_agent
from app.crew.tasks import create_market_task, create_competitor_task, create_finance_task


def run_foundrai_crew(
    startup_name: str,
    startup_idea: str,
    industry: str,
    budget: str,
    timeline: str,
) -> dict:
    market_agent = create_market_agent()
    competitor_agent = create_competitor_agent()
    finance_agent = create_finance_agent()

    market_task = create_market_task(
        agent=market_agent,
        startup_name=startup_name,
        startup_idea=startup_idea,
        industry=industry,
        budget=budget,
        timeline=timeline,
    )
    competitor_task = create_competitor_task(
        agent=competitor_agent,
        startup_name=startup_name,
        startup_idea=startup_idea,
        industry=industry,
        budget=budget,
        timeline=timeline,
    )
    finance_task = create_finance_task(
        agent=finance_agent,
        startup_name=startup_name,
        startup_idea=startup_idea,
        industry=industry,
        budget=budget,
        timeline=timeline,
    )

    crew = Crew(
        agents=[market_agent, competitor_agent, finance_agent],
        tasks=[market_task, competitor_task, finance_task],
        process=Process.sequential,
        verbose=True,
    )

    result = crew.kickoff()

    task_outputs = result.tasks_output if hasattr(result, "tasks_output") else []
    market_output = str(task_outputs[0]) if len(task_outputs) > 0 else str(result)
    competitor_output = str(task_outputs[1]) if len(task_outputs) > 1 else ""
    finance_output = str(task_outputs[2]) if len(task_outputs) > 2 else ""

    return {
        "market": market_output,
        "competitor": competitor_output,
        "finance": finance_output,
    }
