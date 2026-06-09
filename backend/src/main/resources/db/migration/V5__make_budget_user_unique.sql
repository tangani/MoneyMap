ALTER TABLE budgets
    ADD CONSTRAINT uq_budgets_user_id
        UNIQUE (user_id);