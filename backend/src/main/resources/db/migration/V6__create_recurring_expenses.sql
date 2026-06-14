CREATE TABLE recurring_expenses (
                                    id UUID PRIMARY KEY,
                                    user_id UUID NOT NULL,
                                    name VARCHAR(255) NOT NULL,
                                    category VARCHAR(255) NOT NULL,
                                    amount_in_cents BIGINT NOT NULL,
                                    frequency VARCHAR(50) NOT NULL,
                                    next_payment_date DATE NOT NULL,
                                    created_at TIMESTAMP NOT NULL
);