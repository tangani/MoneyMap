CREATE TABLE goals (
                       id UUID PRIMARY KEY,
                       user_id UUID NOT NULL,
                       name VARCHAR(255) NOT NULL,
                       target_amount NUMERIC(19,2) NOT NULL,
                       current_amount NUMERIC(19,2) NOT NULL DEFAULT 0,
                       created_at TIMESTAMP NOT NULL,
                       updated_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_goals_user_id
    ON goals(user_id);