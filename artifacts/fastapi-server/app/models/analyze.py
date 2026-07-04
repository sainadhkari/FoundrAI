from pydantic import BaseModel, Field


class StartupAnalysisRequest(BaseModel):
    startup_name: str = Field(..., description="Name of the startup")
    startup_idea: str = Field(..., description="Short description of the startup idea")
    industry: str = Field(..., description="Industry the startup operates in")
    budget: str = Field(..., description="Available budget for the startup")
    timeline: str = Field(..., description="Expected timeline to launch/validate")


class StartupAnalysisResponse(BaseModel):
    market_score: float
    competition_score: float
    financial_score: float
    risk_score: float
    verdict: str
