from sqlalchemy_config import SessionLocal
from models import AgentCts

def filter_backend_agents(department_filter, status_filter):
    # Start a session
    session = SessionLocal()
    try:
        # Query with filters
        agents = session.query(AgentCts).filter(
            AgentCts.department == department_filter,
            AgentCts.status == status_filter
        ).all()

        # Convert results to a list of dictionaries
        result = [{"id": agent.id, "name": agent.name} for agent in agents]
        return result
    finally:
        session.close()
