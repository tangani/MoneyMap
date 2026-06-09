CREATE TABLE budget_goals (
                              id UUID PRIMARY KEY,
                              budget_id UUID NOT NULL,
                              name VARCHAR(255) NOT NULL,
                              target_amount DECIMAL(12,2) NOT NULL,
                              monthly_contribution DECIMAL(12,2) NOT NULL,
                              created_at TIMESTAMP NOT NULL,
                              updated_at TIMESTAMP NOT NULL,

                              CONSTRAINT fk_budget_goal_budget
                                  FOREIGN KEY (budget_id)
                                      REFERENCES budgets(id)
                                      ON DELETE CASCADE
);