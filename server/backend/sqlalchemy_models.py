from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy_config import Base
from datetime import datetime

class AgentCts(Base):
    __tablename__ = 'backend_agentcts'  # Ensure this matches your actual database table name

    id = Column(Integer, primary_key=True, autoincrement=True)
    call_type = Column(String(100), nullable=True)  # Optional field
    account_type = Column(String(250), nullable=True)
    case_id = Column(String(250), nullable=True)
    area = Column(String(250), nullable=True)
    sub_area = Column(String(250), nullable=True)
    transfer_call = Column(String(250), nullable=True)
    transfer_destination = Column(String(250), nullable=True)
    transfer_attuid = Column(String(250), nullable=True)
    issue_resolved = Column(String(250), nullable=True)
    is_customer_happy = Column(String(250), nullable=True)
    provide_credit = Column(String(250), nullable=True)
    credit_amount = Column(String(250), nullable=True)
    credit_attuid = Column(String(250), nullable=True)
    appointment_sameday = Column(String(250), nullable=True)
    appointment_sameday_2 = Column(String(250), nullable=True)
    focus_driver = Column(String(250), nullable=True)
    focus_driver_2 = Column(String(250), nullable=True)
    repeat_prediction = Column(String(250), nullable=True)
    pplan_close = Column(String(250), nullable=True)
    pplan_close_2 = Column(String(250), nullable=True)
    dispatch_call = Column(String(250), nullable=True)
    due_date = Column(String(250), nullable=True)
    select_time = Column(String(250), nullable=True)
    dispatch_equipment = Column(String(250), nullable=True)
    wmt = Column(String(250), nullable=True)
    wmt_2 = Column(String(250), nullable=True)
    tool_issue = Column(String(250), nullable=True)
    tool_issue_2 = Column(String(250), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    created_by = Column(String(150), nullable=False)
    updated_by = Column(String(150), nullable=False)
    date_created = Column(DateTime, default=datetime.utcnow)
    date_updated = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    full_name = Column(String(150), nullable=True)
    region = Column(String(150), nullable=True)
    tl_name = Column(String(150), nullable=True)
    tl_hrid = Column(String(150), nullable=True)
    om_name = Column(String(150), nullable=True)
    om_hrid = Column(String(150), nullable=True)
    projectId = Column(String(150), nullable=True)

    def __repr__(self):
        return f"<AgentCts(case_id='{self.case_id}')>"
