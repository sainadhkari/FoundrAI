from typing import List
from crewai import Task, Agent


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


def create_finance_task(agent: Agent, startup_name: str, startup_idea: str, industry: str, budget: str, timeline: str) -> Task:
    description = f"""
You are analyzing the financial viability of the following startup:

- Startup Name: {startup_name}
- Idea: {startup_idea}
- Industry: {industry}
- Budget: {budget}
- Timeline: {timeline}

IMPORTANT: You MUST use the Financial Calculator tool by calling it with:
  budget="{budget}"
  timeline="{timeline}"

After running the tool, provide:
1. Financial score out of 10
2. Estimated monthly burn rate (from tool output)
3. Financial risk level (Low / Medium / High)
4. Recommendation for the founder
"""
    return Task(
        description=description,
        agent=agent,
        expected_output=(
            "A financial score out of 10, the monthly burn rate calculated by the tool, "
            "a financial risk level, and a recommendation for the founder."
        ),
    )


def create_ceo_task(agent: Agent, startup_name: str, context_tasks: List[Task]) -> Task:
    description = f"""
You are the Chief Executive AI for FoundrAI's executive war room.

You have received analysis reports from three specialized agents for the startup: {startup_name}

Review the context provided by:
1. Market Intelligence Analyst — market opportunity and score
2. Competitor Intelligence Analyst — competitive landscape and score
3. Financial Risk Analyst — burn rate, financial score, and risk level

Based on ALL three reports, deliver your final executive decision:

1. Final Verdict: Choose ONE of — Proceed / Pivot / Reject
2. Confidence Score: out of 10
3. Strategic Reasoning: 2-3 sentences synthesizing all three reports
4. Final Recommendation: concrete next steps for the founder

Format your response EXACTLY as:
VERDICT: [Proceed/Pivot/Reject]
CONFIDENCE: [X]/10
REASONING: [your reasoning]
RECOMMENDATION: [your recommendation]
"""
    return Task(
        description=description,
        agent=agent,
        context=context_tasks,
        expected_output=(
            "A final verdict (Proceed/Pivot/Reject), confidence score out of 10, "
            "strategic reasoning, and a concrete recommendation for the founder."
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
