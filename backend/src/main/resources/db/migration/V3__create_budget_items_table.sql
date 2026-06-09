CREATE TABLE budget_items (
                              id UUID PRIMARY KEY,
                              budget_id UUID NOT NULL,
                              name VARCHAR(255) NOT NULL,
                              category VARCHAR(100) NOT NULL,
                              amount DECIMAL(12,2) NOT NULL,
                              created_at TIMESTAMP NOT NULL,
                              updated_at TIMESTAMP NOT NULL,

                              CONSTRAINT fk_budget_item_budget
                                  FOREIGN KEY (budget_id)
                                      REFERENCES budgets(id)
                                      ON DELETE CASCADE
);