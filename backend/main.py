# # backend/main.py
# import os
# from typing import List, Optional, Literal
# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from dotenv import load_dotenv
# from openai import AzureOpenAI

# load_dotenv()

# client = AzureOpenAI(
#     api_key=os.getenv("OPENAI_API_KEY"),
#     api_version=os.getenv("AZURE_OPENAI_API_VERSION", "2024-02-15-preview"),
#     azure_endpoint=os.getenv("OPENAI_API_BASE_URL") # type: ignore
# )

# app = FastAPI(title="Digital Maturity API")

# origins = os.getenv("ALLOWED_ORIGINS", "").split(",")
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[o.strip() for o in origins if o.strip()],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # ---------- Models ----------
# Dimension = Literal["Strategy","Data & Analytics","Automation","Cybersecurity","Workforce"]

# class Message(BaseModel):
#     role: Literal["user","assistant","system"]
#     content: str

# class ChatRequest(BaseModel):
#     dimension: Dimension
#     history: List[Message] = []
#     input: str

# class ScoreRequest(BaseModel):
#     dimension: Dimension
#     transcript: List[Message]

# # ---------- Prompts ----------
# DIMENSION_GUIDANCE = {
#     "Strategy": """You are a Digital Maturity Assessment assistant for the Strategy dimension.
# Ask one question at a time to understand: strategy development & comms, digital integration level, and how success is measured.
# Keep responses concise and actionable. When the user asks for 'Show Example' or 'Best Practices', provide tailored content.""",
#     "Data & Analytics": """Focus on data governance, platform, data quality, access, analytics adoption, literacy, and value delivery.""",
#     "Automation": """Explore process discovery, RPA, orchestration, integration, AI/ML automation, scale, and governance.""",
#     "Cybersecurity": """Cover policies, identity & access, vulnerability mgmt, incident response, security-by-design, and compliance.""",
#     "Workforce": """Assess skills, learning culture, change mgmt, collaboration, talent, and org structures for digital.""",
# }

# SCORING_RUBRIC = """
# You are an evaluator. Given the transcript for one dimension, output a JSON object only:
# {
#   "level": 1|2|3|4,
#   "rationale": "<3-6 sentences>",
#   "top_gaps": ["gap1","gap2","gap3"],
#   "next_quarter_actions": ["action1","action2","action3"]
# }
# Use this guidance:
# Level 1: ad-hoc, limited process/ownership.
# Level 2: pockets of success, not enterprise-wide, emerging governance.
# Level 3: clear roadmap, standardized practices, measurable execution.
# Level 4: fully aligned with business goals, metrics-driven outcomes, continuous improvement at scale.
# Be conservative and base on evidence in the transcript. Do not include any text outside JSON.
# """

# def build_messages(dimension: str, history: List[Message], user_input: str):
#     msgs = [
#         {"role": "system", "content": DIMENSION_GUIDANCE[dimension]},
#         {"role": "assistant", "content":
#          f"Let's evaluate your {dimension}. Briefly describe your current practices. I will ask questions step by step."}
#     ]
#     # include prior turns (if any)
#     msgs.extend([m.model_dump() for m in history])
#     # append the new user input
#     msgs.append({"role": "user", "content": user_input})
#     return msgs

# # ---------- Routes ----------

# @app.get("/health")
# def health(): return {"status": "ok"}

# @app.post("/chat")
# def chat(req: ChatRequest):
#     try:
#         completion = client.chat.completions.create(
#             model=os.getenv("DEPLOYMENT_NAME"), # type: ignore
#             temperature=0.2,
#             messages=build_messages(req.dimension, req.history, req.input), # type: ignore
#         )
#         content = completion.choices[0].message.content
#         return {"reply": content}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# EXAMPLES = {
#     "Strategy": "Example answer: We have a 3-year digital roadmap approved by the exec team. Each quarter we fund OKRs for CX, data platform, and automation. Success is tracked via NPS, cycle time, and digital revenue share.",
#     "Data & Analytics": "Example: Central data platform on Azure; governed domains; 85% critical data with quality SLAs; BI self-service adoption at 60%.",
#     "Automation": "Example: We have an automation CoE, RPA plus API-first integrations; 120 bots in prod with runbooks and monitoring.",
#     "Cybersecurity": "Example: Zero Trust baseline, EDR deployed org-wide, monthly patch SLAs, tabletop exercises twice a year.",
#     "Workforce": "Example: Role-based learning paths, hack days each quarter, change champions embedded in business units.",
# }
# BEST_PRACTICES = {
#     "Strategy": [
#         "Tie digital initiatives to measurable business outcomes",
#         "Publish a one-page strategy and update quarterly",
#         "Fund via product/OKR model; stop low-value work quickly",
#     ],
#     "Data & Analytics": [
#         "Data contracts & domain ownership",
#         "Platform with governed self-service",
#         "Value tracking per analytics product",
#     ],
#     "Automation": [
#         "Discover automation via value stream mapping",
#         "Combine RPA with APIs/events; measure end-to-end",
#         "Run an automation CoE with reuse patterns",
#     ],
#     "Cybersecurity": [
#         "Identity-first (MFA, least privilege, PAM)",
#         "Shift-left security & SBOMs",
#         "Continuous detection/response with drills",
#     ],
#     "Workforce": [
#         "Skills matrix and learning budget",
#         "Communities of practice",
#         "Transparent change comms & enablement",
#     ],
# }

# @app.get("/examples/{dimension}")
# def get_example(dimension: Dimension):
#     return {"dimension": dimension, "example": EXAMPLES[dimension]}

# @app.get("/best-practices/{dimension}")
# def get_best_practices(dimension: Dimension):
#     return {"dimension": dimension, "items": BEST_PRACTICES[dimension]}

# @app.post("/score")
# def score(req: ScoreRequest):
#     try:
#         # flatten transcript into one string to reduce tokens
#         text = "\n".join([f"{m.role.upper()}: {m.content}" for m in req.transcript])
#         completion = client.chat.completions.create(
#             model=os.getenv("DEPLOYMENT_NAME"), # type: ignore
#             temperature=0.1,
#             messages=[
#                 {"role":"system","content": SCORING_RUBRIC},
#                 {"role":"user","content": f"Dimension: {req.dimension}\nTranscript:\n{text}"}
#             ],
#             response_format={"type":"json_object"},
#         )
#         payload = completion.choices[0].message.content
#         return {"dimension": req.dimension, "evaluation": payload}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
    

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)


#####################################################################################

# backend/main.py
# import os
# import uuid
# from typing import List, Optional, Literal, Dict
# from datetime import datetime
# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from dotenv import load_dotenv
# from openai import AzureOpenAI

# load_dotenv()

# client = AzureOpenAI(
#     api_key=os.getenv("OPENAI_API_KEY"),
#     api_version=os.getenv("AZURE_OPENAI_API_VERSION", "2024-02-15-preview"),
#     azure_endpoint=os.getenv("OPENAI_API_BASE_URL") # type: ignore
# )

# app = FastAPI(title="Digital Maturity API")

# # CORS Configuration
# origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[o.strip() for o in origins if o.strip()],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # ---------- In-Memory Storage (Replace with DB in production) ----------
# sessions: Dict[str, Dict] = {}

# # ---------- Models ----------
# Dimension = Literal["Strategy","Data & Analytics","Automation","Cybersecurity","Workforce"]

# class Message(BaseModel):
#     role: Literal["user","assistant"]
#     content: str
#     timestamp: Optional[str] = None

# class ChatRequest(BaseModel):
#     session_id: str
#     dimension: str
#     message: str
#     conversation_history: List[Message] = []

# class ChatResponse(BaseModel):
#     response: str
#     dimension_score: Optional[int] = None
#     is_complete: bool = False
#     next_dimension: Optional[str] = None

# class DimensionInfo(BaseModel):
#     id: str
#     label: str
#     order: int

# class MaturityLevel(BaseModel):
#     level: int
#     title: str
#     description: str

# # ---------- Constants ----------
# DIMENSIONS = [
#     {"id": "strategy", "label": "Strategy", "order": 1},
#     {"id": "data-analytics", "label": "Data & Analytics", "order": 2},
#     {"id": "automation", "label": "Automation", "order": 3},
#     {"id": "cybersecurity", "label": "Cybersecurity", "order": 4},
#     {"id": "workforce", "label": "Workforce", "order": 5}
# ]

# MATURITY_LEVELS = {
#     "strategy": [
#         {"level": 1, "title": "Level 1", "description": "Digital is ad-hoc, no strategy."},
#         {"level": 2, "title": "Level 2", "description": "Digital is aligned with operations but not enterprise-wide."},
#         {"level": 3, "title": "Level 3", "description": "Clear digital roadmap, partial execution."},
#         {"level": 4, "title": "Level 4", "description": "Fully aligned with business goals, measurable outcomes."}
#     ],
#     "data-analytics": [
#         {"level": 1, "title": "Level 1", "description": "Data is siloed, no governance."},
#         {"level": 2, "title": "Level 2", "description": "Some data platforms exist, limited adoption."},
#         {"level": 3, "title": "Level 3", "description": "Centralized data platform with quality standards."},
#         {"level": 4, "title": "Level 4", "description": "Data-driven culture with self-service analytics."}
#     ],
#     "automation": [
#         {"level": 1, "title": "Level 1", "description": "Manual processes, no automation."},
#         {"level": 2, "title": "Level 2", "description": "Pilot automation projects in pockets."},
#         {"level": 3, "title": "Level 3", "description": "Automation CoE with standardized tools."},
#         {"level": 4, "title": "Level 4", "description": "Enterprise automation with AI/ML integration."}
#     ],
#     "cybersecurity": [
#         {"level": 1, "title": "Level 1", "description": "Basic security, reactive approach."},
#         {"level": 2, "title": "Level 2", "description": "Security policies exist but inconsistent."},
#         {"level": 3, "title": "Level 3", "description": "Proactive security with monitoring."},
#         {"level": 4, "title": "Level 4", "description": "Zero Trust, continuous compliance, drills."}
#     ],
#     "workforce": [
#         {"level": 1, "title": "Level 1", "description": "No digital skills program."},
#         {"level": 2, "title": "Level 2", "description": "Ad-hoc training, low engagement."},
#         {"level": 3, "title": "Level 3", "description": "Learning paths and communities exist."},
#         {"level": 4, "title": "Level 4", "description": "Culture of continuous learning and innovation."}
#     ]
# }

# # ---------- Prompts ----------
# DIMENSION_GUIDANCE = {
#     "strategy": """You are a Digital Maturity Assessment assistant for the Strategy dimension.
# Ask one question at a time to understand: strategy development & comms, digital integration level, and how success is measured.
# Keep responses concise and actionable.""",
#     "data-analytics": """Focus on data governance, platform, data quality, access, analytics adoption, literacy, and value delivery.""",
#     "automation": """Explore process discovery, RPA, orchestration, integration, AI/ML automation, scale, and governance.""",
#     "cybersecurity": """Cover policies, identity & access, vulnerability mgmt, incident response, security-by-design, and compliance.""",
#     "workforce": """Assess skills, learning culture, change mgmt, collaboration, talent, and org structures for digital.""",
# }

# # ---------- Helper Functions ----------
# def get_or_create_session(session_id: str) -> Dict:
#     if session_id not in sessions:
#         sessions[session_id] = {
#             "id": session_id,
#             "created_at": datetime.utcnow().isoformat(),
#             "current_dimension": "strategy",
#             "conversations": {},
#             "scores": {}
#         }
#     return sessions[session_id]

# def build_chat_messages(dimension: str, history: List[Message], user_message: str):
#     msgs = [
#         {"role": "system", "content": DIMENSION_GUIDANCE.get(dimension, DIMENSION_GUIDANCE["strategy"])},
#         {"role": "assistant", "content": f"Let's evaluate your {dimension.replace('-', ' ').title()}. Briefly describe your current practices."}
#     ]
#     # Add conversation history
#     msgs.extend([{"role": m.role, "content": m.content} for m in history])
#     # Add new user message
#     msgs.append({"role": "user", "content": user_message})
#     return msgs

# def check_dimension_complete(conversation: List[Message]) -> bool:
#     """Simple heuristic: consider complete after 3+ exchanges"""
#     user_messages = [m for m in conversation if m.role == "user"]
#     return len(user_messages) >= 3

# def get_next_dimension(current: str) -> Optional[str]:
#     """Get next dimension in sequence"""
#     current_order = next((d["order"] for d in DIMENSIONS if d["id"] == current), 0)
#     next_dim = next((d for d in DIMENSIONS if d["order"] == current_order + 1), None)
#     return next_dim["id"] if next_dim else None

# # ---------- Routes ----------
# @app.get("/health")
# def health():
#     return {"status": "ok", "version": "2.0"}

# @app.post("/api/assessment/start")
# def start_assessment(session_id: Optional[str] = None):
#     """Initialize or resume an assessment session"""
#     if not session_id:
#         session_id = str(uuid.uuid4())
    
#     session = get_or_create_session(session_id)
    
#     return {
#         "session_id": session["id"],
#         "current_dimension": session["current_dimension"],
#         "message": "Assessment started. Let's begin with Strategy."
#     }

# @app.get("/api/dimensions")
# def get_dimensions():
#     """Get all assessment dimensions"""
#     return {"dimensions": DIMENSIONS}

# @app.get("/api/maturity-levels")
# def get_maturity_levels(dimension: Optional[str] = None):
#     """Get maturity level definitions"""
#     if dimension:
#         levels = MATURITY_LEVELS.get(dimension, [])
#         return {"dimension": dimension, "levels": levels}
#     return {"maturity_levels": MATURITY_LEVELS}

# @app.post("/api/chat")
# async def chat(req: ChatRequest):
#     """Handle chat interaction for a dimension"""
#     try:
#         session = get_or_create_session(req.session_id)
        
#         # Store conversation in session
#         if req.dimension not in session["conversations"]:
#             session["conversations"][req.dimension] = []
        
#         # Add user message to history
#         session["conversations"][req.dimension].append({
#             "role": "user",
#             "content": req.message,
#             "timestamp": datetime.utcnow().isoformat()
#         })
        
#         # Build messages for OpenAI
#         messages = build_chat_messages(
#             req.dimension,
#             req.conversation_history,
#             req.message
#         )
        
#         # Call Azure OpenAI
#         completion = client.chat.completions.create(
#             model=os.getenv("DEPLOYMENT_NAME"), # type: ignore
#             temperature=0.2,
#             messages=messages, # type: ignore
#         )
        
#         assistant_response = completion.choices[0].message.content or ""
        
#         # Store assistant response
#         session["conversations"][req.dimension].append({
#             "role": "assistant",
#             "content": assistant_response,
#             "timestamp": datetime.utcnow().isoformat()
#         })
        
#         # Check if dimension is complete
#         all_messages = req.conversation_history + [Message(role="user", content=req.message)]
#         is_complete = check_dimension_complete(all_messages)
        
#         # Get next dimension if complete
#         next_dim = None
#         if is_complete:
#             session["current_dimension"] = get_next_dimension(req.dimension) or req.dimension
#             next_dim = session["current_dimension"]
        
#         return ChatResponse(
#             response=assistant_response,
#             is_complete=is_complete,
#             next_dimension=next_dim
#         )
        
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")

# @app.get("/api/examples/{dimension}")
# def get_example(dimension: str):
#     """Get example answers for a dimension"""
#     EXAMPLES = {
#         "strategy": "We have a 3-year digital roadmap approved by the exec team. Each quarter we fund OKRs for CX, data platform, and automation. Success is tracked via NPS, cycle time, and digital revenue share.",
#         "data-analytics": "Central data platform on Azure; governed domains; 85% critical data with quality SLAs; BI self-service adoption at 60%.",
#         "automation": "We have an automation CoE, RPA plus API-first integrations; 120 bots in prod with runbooks and monitoring.",
#         "cybersecurity": "Zero Trust baseline, EDR deployed org-wide, monthly patch SLAs, tabletop exercises twice a year.",
#         "workforce": "Role-based learning paths, hack days each quarter, change champions embedded in business units."
#     }
#     return {"dimension": dimension, "example": EXAMPLES.get(dimension, "No example available")}

# @app.get("/api/best-practices/{dimension}")
# def get_best_practices(dimension: str):
#     """Get best practices for a dimension"""
#     BEST_PRACTICES = {
#         "strategy": [
#             "Tie digital initiatives to measurable business outcomes",
#             "Publish a one-page strategy and update quarterly",
#             "Fund via product/OKR model; stop low-value work quickly"
#         ],
#         "data-analytics": [
#             "Data contracts & domain ownership",
#             "Platform with governed self-service",
#             "Value tracking per analytics product"
#         ],
#         "automation": [
#             "Discover automation via value stream mapping",
#             "Combine RPA with APIs/events; measure end-to-end",
#             "Run an automation CoE with reuse patterns"
#         ],
#         "cybersecurity": [
#             "Identity-first (MFA, least privilege, PAM)",
#             "Shift-left security & SBOMs",
#             "Continuous detection/response with drills"
#         ],
#         "workforce": [
#             "Skills matrix and learning budget",
#             "Communities of practice",
#             "Transparent change comms & enablement"
#         ]
#     }
#     return {"dimension": dimension, "items": BEST_PRACTICES.get(dimension, [])}

# @app.post("/api/score")
# def score_dimension(session_id: str, dimension: str):
#     """Score a completed dimension assessment"""
#     try:
#         session = sessions.get(session_id)
#         if not session:
#             raise HTTPException(status_code=404, detail="Session not found")
        
#         conversation = session["conversations"].get(dimension, [])
#         if not conversation:
#             raise HTTPException(status_code=400, detail="No conversation found for dimension")
        
#         # Build transcript for scoring
#         transcript = "\n".join([f"{m['role'].upper()}: {m['content']}" for m in conversation])
        
#         # Scoring prompt
#         SCORING_PROMPT = """You are an evaluator. Given the transcript for one dimension, output a JSON object only:
# {
#   "level": 1|2|3|4,
#   "rationale": "<3-6 sentences>",
#   "top_gaps": ["gap1","gap2","gap3"],
#   "next_quarter_actions": ["action1","action2","action3"]
# }
# Use this guidance:
# Level 1: ad-hoc, limited process/ownership.
# Level 2: pockets of success, not enterprise-wide, emerging governance.
# Level 3: clear roadmap, standardized practices, measurable execution.
# Level 4: fully aligned with business goals, metrics-driven outcomes, continuous improvement at scale.
# Be conservative and base on evidence in the transcript."""

#         completion = client.chat.completions.create(
#             model=os.getenv("DEPLOYMENT_NAME"), # type: ignore
#             temperature=0.1,
#             messages=[
#                 {"role": "system", "content": SCORING_PROMPT},
#                 {"role": "user", "content": f"Dimension: {dimension}\nTranscript:\n{transcript}"}
#             ],
#             response_format={"type": "json_object"},
#         )
        
#         score_data = completion.choices[0].message.content
#         session["scores"][dimension] = score_data
        
#         return {
#             "dimension": dimension,
#             "evaluation": score_data,
#             "session_id": session_id
#         }
        
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Scoring error: {str(e)}")

# @app.get("/api/session/{session_id}")
# def get_session(session_id: str):
#     """Retrieve session data"""
#     session = sessions.get(session_id)
#     if not session:
#         raise HTTPException(status_code=404, detail="Session not found")
#     return session

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

# backend/main.py
import os
import uuid
import json
import sqlite3
from typing import List, Optional, Literal, Dict
from datetime import datetime
from contextlib import contextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import AzureOpenAI

load_dotenv()

client = AzureOpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    api_version=os.getenv("AZURE_OPENAI_API_VERSION", "2024-02-15-preview"),
    azure_endpoint=os.getenv("OPENAI_API_BASE_URL") # type: ignore
)

app = FastAPI(title="Digital Maturity API")

# CORS Configuration
origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in origins if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Database Setup ----------
DATABASE_PATH = "assessment.db"

def init_db():
    """Initialize SQLite database with tables"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    # Sessions table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS sessions (
            id TEXT PRIMARY KEY,
            created_at TEXT NOT NULL,
            current_dimension TEXT NOT NULL,
            completed_dimensions TEXT DEFAULT '[]'
        )
    """)
    
    # Messages table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            dimension TEXT NOT NULL,
            role TEXT NOT NULL,
            content TEXT NOT NULL,
            timestamp TEXT NOT NULL,
            FOREIGN KEY (session_id) REFERENCES sessions(id)
        )
    """)
    
    # Scores table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS scores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            dimension TEXT NOT NULL,
            level INTEGER NOT NULL,
            rationale TEXT NOT NULL,
            top_gaps TEXT NOT NULL,
            next_quarter_actions TEXT NOT NULL,
            scored_at TEXT NOT NULL,
            FOREIGN KEY (session_id) REFERENCES sessions(id)
        )
    """)
    
    conn.commit()
    conn.close()

@contextmanager
def get_db():
    """Context manager for database connections"""
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

# Initialize database on startup
init_db()

# ---------- Models ----------
Dimension = Literal["strategy","data-analytics","automation","cybersecurity","workforce"]

class Message(BaseModel):
    role: Literal["user","assistant"]
    content: str
    timestamp: Optional[str] = None

class ChatRequest(BaseModel):
    session_id: str
    dimension: str
    message: str
    conversation_history: List[Message] = []

class ChatResponse(BaseModel):
    response: str
    dimension_score: Optional[int] = None
    is_complete: bool = False
    next_dimension: Optional[str] = None

class DimensionInfo(BaseModel):
    id: str
    label: str
    order: int

class ScoreData(BaseModel):
    level: int
    rationale: str
    top_gaps: List[str]
    next_quarter_actions: List[str]

# ---------- Constants ----------
DIMENSIONS = [
    {"id": "strategy", "label": "Strategy", "order": 1},
    {"id": "data-analytics", "label": "Data & Analytics", "order": 2},
    {"id": "automation", "label": "Automation", "order": 3},
    {"id": "cybersecurity", "label": "Cybersecurity", "order": 4},
    {"id": "workforce", "label": "Workforce", "order": 5}
]

# ---------- Prompts ----------
DIMENSION_GUIDANCE = {
    "strategy": """You are a Digital Maturity Assessment assistant for the Strategy dimension.
Ask one question at a time to understand: strategy development & comms, digital integration level, and how success is measured.
Keep responses concise and actionable.""",
    "data-analytics": """Focus on data governance, platform, data quality, access, analytics adoption, literacy, and value delivery.""",
    "automation": """Explore process discovery, RPA, orchestration, integration, AI/ML automation, scale, and governance.""",
    "cybersecurity": """Cover policies, identity & access, vulnerability mgmt, incident response, security-by-design, and compliance.""",
    "workforce": """Assess skills, learning culture, change mgmt, collaboration, talent, and org structures for digital.""",
}

# ---------- Helper Functions ----------
def get_or_create_session(session_id: str) -> Dict:
    """Get existing session or create new one"""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM sessions WHERE id = ?", (session_id,))
        row = cursor.fetchone()
        
        if row:
            return {
                "id": row["id"],
                "created_at": row["created_at"],
                "current_dimension": row["current_dimension"],
                "completed_dimensions": json.loads(row["completed_dimensions"])
            }
        else:
            cursor.execute(
                "INSERT INTO sessions (id, created_at, current_dimension) VALUES (?, ?, ?)",
                (session_id, datetime.utcnow().isoformat(), "strategy")
            )
            conn.commit()
            return {
                "id": session_id,
                "created_at": datetime.utcnow().isoformat(),
                "current_dimension": "strategy",
                "completed_dimensions": []
            }

def save_message(session_id: str, dimension: str, role: str, content: str):
    """Save a message to the database"""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO messages (session_id, dimension, role, content, timestamp) VALUES (?, ?, ?, ?, ?)",
            (session_id, dimension, role, content, datetime.utcnow().isoformat())
        )
        conn.commit()

def get_conversation_history(session_id: str, dimension: str) -> List[Dict]:
    """Retrieve conversation history for a dimension"""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT role, content, timestamp FROM messages WHERE session_id = ? AND dimension = ? ORDER BY id",
            (session_id, dimension)
        )
        return [{"role": row["role"], "content": row["content"], "timestamp": row["timestamp"]} 
                for row in cursor.fetchall()]

def build_chat_messages(dimension: str, history: List[Message], user_message: str):
    msgs = [
        {"role": "system", "content": DIMENSION_GUIDANCE.get(dimension, DIMENSION_GUIDANCE["strategy"])},
        {"role": "assistant", "content": f"Let's evaluate your {dimension.replace('-', ' ').title()}. Briefly describe your current practices."}
    ]
    msgs.extend([{"role": m.role, "content": m.content} for m in history])
    msgs.append({"role": "user", "content": user_message})
    return msgs

def check_dimension_complete(conversation: List[Message]) -> bool:
    """Simple heuristic: consider complete after 3+ user messages"""
    user_messages = [m for m in conversation if m.role == "user"]
    return len(user_messages) >= 3

def get_next_dimension(current: str) -> Optional[str]:
    """Get next dimension in sequence"""
    current_order = next((d["order"] for d in DIMENSIONS if d["id"] == current), 0)
    next_dim = next((d for d in DIMENSIONS if d["order"] == current_order + 1), None)
    return next_dim["id"] if next_dim else None

# ---------- Routes ----------
@app.get("/health")
def health():
    return {"status": "ok", "version": "2.0"}

@app.post("/api/assessment/start")
def start_assessment(session_id: Optional[str] = None):
    """Initialize or resume an assessment session"""
    if not session_id:
        session_id = str(uuid.uuid4())
    
    session = get_or_create_session(session_id)
    
    return {
        "session_id": session["id"],
        "current_dimension": session["current_dimension"],
        "message": "Assessment started. Let's begin with Strategy."
    }

@app.get("/api/dimensions")
def get_dimensions():
    """Get all assessment dimensions"""
    return {"dimensions": DIMENSIONS}

@app.post("/api/chat")
async def chat(req: ChatRequest):
    """Handle chat interaction for a dimension"""
    try:
        session = get_or_create_session(req.session_id)
        
        # Save user message
        save_message(req.session_id, req.dimension, "user", req.message)
        
        # Build messages for OpenAI
        messages = build_chat_messages(req.dimension, req.conversation_history, req.message)
        
        # Call Azure OpenAI
        completion = client.chat.completions.create(
            model=os.getenv("DEPLOYMENT_NAME"), # type: ignore
            temperature=0.2,
            messages=messages, # type: ignore
        )
        
        assistant_response = completion.choices[0].message.content or ""
        
        # Save assistant response
        save_message(req.session_id, req.dimension, "assistant", assistant_response)
        
        # Check if dimension is complete
        all_messages = req.conversation_history + [Message(role="user", content=req.message)]
        is_complete = check_dimension_complete(all_messages)
        
        # Get next dimension if complete
        next_dim = None
        if is_complete:
            next_dim = get_next_dimension(req.dimension)
            with get_db() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    "UPDATE sessions SET current_dimension = ? WHERE id = ?",
                    (next_dim or req.dimension, req.session_id)
                )
                conn.commit()
        
        return ChatResponse(
            response=assistant_response,
            is_complete=is_complete,
            next_dimension=next_dim
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")

@app.get("/api/examples/{dimension}")
def get_example(dimension: str):
    """Get example answers for a dimension"""
    EXAMPLES = {
        "strategy": "We have a 3-year digital roadmap approved by the exec team. Each quarter we fund OKRs for CX, data platform, and automation. Success is tracked via NPS, cycle time, and digital revenue share.",
        "data-analytics": "Central data platform on Azure; governed domains; 85% critical data with quality SLAs; BI self-service adoption at 60%.",
        "automation": "We have an automation CoE, RPA plus API-first integrations; 120 bots in prod with runbooks and monitoring.",
        "cybersecurity": "Zero Trust baseline, EDR deployed org-wide, monthly patch SLAs, tabletop exercises twice a year.",
        "workforce": "Role-based learning paths, hack days each quarter, change champions embedded in business units."
    }
    return {"dimension": dimension, "example": EXAMPLES.get(dimension, "No example available")}

@app.get("/api/best-practices/{dimension}")
def get_best_practices(dimension: str):
    """Get best practices for a dimension"""
    BEST_PRACTICES = {
        "strategy": [
            "Tie digital initiatives to measurable business outcomes",
            "Publish a one-page strategy and update quarterly",
            "Fund via product/OKR model; stop low-value work quickly"
        ],
        "data-analytics": [
            "Data contracts & domain ownership",
            "Platform with governed self-service",
            "Value tracking per analytics product"
        ],
        "automation": [
            "Discover automation via value stream mapping",
            "Combine RPA with APIs/events; measure end-to-end",
            "Run an automation CoE with reuse patterns"
        ],
        "cybersecurity": [
            "Identity-first (MFA, least privilege, PAM)",
            "Shift-left security & SBOMs",
            "Continuous detection/response with drills"
        ],
        "workforce": [
            "Skills matrix and learning budget",
            "Communities of practice",
            "Transparent change comms & enablement"
        ]
    }
    return {"dimension": dimension, "items": BEST_PRACTICES.get(dimension, [])}

@app.post("/api/score")
def score_dimension(session_id: str, dimension: str):
    """Score a completed dimension assessment"""
    try:
        # Get conversation history
        conversation = get_conversation_history(session_id, dimension)
        
        if not conversation:
            raise HTTPException(status_code=400, detail="No conversation found for dimension")
        
        # Build transcript for scoring
        transcript = "\n".join([f"{m['role'].upper()}: {m['content']}" for m in conversation])
        
        # Scoring prompt
        SCORING_PROMPT = """You are an evaluator. Given the transcript for one dimension, output a JSON object only:
{
  "level": 1|2|3|4,
  "rationale": "<3-6 sentences>",
  "top_gaps": ["gap1","gap2","gap3"],
  "next_quarter_actions": ["action1","action2","action3"]
}
Use this guidance:
Level 1: ad-hoc, limited process/ownership.
Level 2: pockets of success, not enterprise-wide, emerging governance.
Level 3: clear roadmap, standardized practices, measurable execution.
Level 4: fully aligned with business goals, metrics-driven outcomes, continuous improvement at scale.
Be conservative and base on evidence in the transcript."""

        completion = client.chat.completions.create(
            model=os.getenv("DEPLOYMENT_NAME"), # type: ignore
            temperature=0.1,
            messages=[
                {"role": "system", "content": SCORING_PROMPT},
                {"role": "user", "content": f"Dimension: {dimension}\nTranscript:\n{transcript}"}
            ],
            response_format={"type": "json_object"},
        )
        
        score_json = completion.choices[0].message.content
        score_data = json.loads(score_json or "{}")
        
        # Save score to database
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """INSERT INTO scores (session_id, dimension, level, rationale, top_gaps, next_quarter_actions, scored_at)
                   VALUES (?, ?, ?, ?, ?, ?, ?)""",
                (session_id, dimension, score_data["level"], score_data["rationale"],
                 json.dumps(score_data["top_gaps"]), json.dumps(score_data["next_quarter_actions"]),
                 datetime.utcnow().isoformat())
            )
            conn.commit()
        
        return {
            "dimension": dimension,
            "evaluation": score_data,
            "session_id": session_id
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Scoring error: {str(e)}")

@app.get("/api/session/{session_id}")
def get_session(session_id: str):
    """Retrieve session data"""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM sessions WHERE id = ?", (session_id,))
        row = cursor.fetchone()
        
        if not row:
            raise HTTPException(status_code=404, detail="Session not found")
        
        return {
            "id": row["id"],
            "created_at": row["created_at"],
            "current_dimension": row["current_dimension"],
            "completed_dimensions": json.loads(row["completed_dimensions"])
        }

@app.get("/api/analytics/overview")
def get_analytics_overview():
    """Get analytics overview data"""
    with get_db() as conn:
        cursor = conn.cursor()
        
        # Total sessions
        cursor.execute("SELECT COUNT(*) as count FROM sessions")
        total_sessions = cursor.fetchone()["count"]
        
        # Total scores
        cursor.execute("SELECT COUNT(*) as count FROM scores")
        total_assessments = cursor.fetchone()["count"]
        
        # Average scores by dimension
        cursor.execute("""
            SELECT dimension, AVG(level) as avg_level, COUNT(*) as count
            FROM scores
            GROUP BY dimension
        """)
        dimension_stats = [{"dimension": row["dimension"], "avg_level": round(row["avg_level"], 2), 
                           "count": row["count"]} for row in cursor.fetchall()]
        
        # Recent sessions
        cursor.execute("""
            SELECT id, created_at, current_dimension
            FROM sessions
            ORDER BY created_at DESC
            LIMIT 10
        """)
        recent_sessions = [{"id": row["id"], "created_at": row["created_at"], 
                           "current_dimension": row["current_dimension"]} for row in cursor.fetchall()]
        
        return {
            "total_sessions": total_sessions,
            "total_assessments": total_assessments,
            "dimension_stats": dimension_stats,
            "recent_sessions": recent_sessions
        }

@app.get("/api/analytics/scores")
def get_all_scores():
    """Get all assessment scores"""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT s.id, s.session_id, s.dimension, s.level, s.rationale, 
                   s.top_gaps, s.next_quarter_actions, s.scored_at,
                   ses.created_at as session_created_at
            FROM scores s
            JOIN sessions ses ON s.session_id = ses.id
            ORDER BY s.scored_at DESC
        """)
        
        scores = []
        for row in cursor.fetchall():
            scores.append({
                "id": row["id"],
                "session_id": row["session_id"],
                "dimension": row["dimension"],
                "level": row["level"],
                "rationale": row["rationale"],
                "top_gaps": json.loads(row["top_gaps"]),
                "next_quarter_actions": json.loads(row["next_quarter_actions"]),
                "scored_at": row["scored_at"],
                "session_created_at": row["session_created_at"]
            })
        
        return {"scores": scores}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)