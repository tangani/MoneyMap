CREATE TABLE budgets (
                         id UUID PRIMARY KEY,
                         user_id UUID NOT NULL,
                         monthly_income DECIMAL(12,2) NOT NULL,
                         created_at TIMESTAMP NOT NULL,
                         updated_at TIMESTAMP NOT NULL,

                         CONSTRAINT fk_budget_user
                             FOREIGN KEY (user_id)
                                 REFERENCES users(id)
                                 ON DELETE CASCADE
);