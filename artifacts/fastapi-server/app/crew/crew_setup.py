from crewai import Crew, Process
from app.crew.agents import (
    create_market_agent,
    create_competitor_agent,
    create_finance_agent,
    create_ceo_agent,
)
from app.crew.tasks import (
    create_market_task,
    create_competitor_task,
    create_finance_task,
    create_ceo_task,
)


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
    ceo_agent = create_ceo_agent()

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
    ceo_task = create_ceo_task(
        agent=ceo_agent,
        startup_name=startup_name,
        context_tasks=[market_task, competitor_task, finance_task],
    )

    crew = Crew(
        agents=[market_agent, competitor_agent, finance_agent, ceo_agent],
        tasks=[market_task, competitor_task, finance_task, ceo_task],
        process=Process.sequential,
        verbose=True,
    )

    result = crew.kickoff()

    task_outputs = result.tasks_output if hasattr(result, "tasks_output") else []
    market_output = str(task_outputs[0]) if len(task_outputs) > 0 else ""
    competitor_output = str(task_outputs[1]) if len(task_outputs) > 1 else ""
    finance_output = str(task_outputs[2]) if len(task_outputs) > 2 else ""
    ceo_output = str(task_outputs[3]) if len(task_outputs) > 3 else str(result)

    return {
        "market": market_output,
        "competitor": competitor_output,
        "finance": finance_output,
        "ceo": ceo_output,
    }
