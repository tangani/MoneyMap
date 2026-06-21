CREATE TABLE transactions (
                              id UUID PRIMARY KEY,
                              user_id UUID NOT NULL,
                              description VARCHAR(255) NOT NULL,
                              category VARCHAR(100),
                              amount_in_cents BIGINT NOT NULL,
                              type VARCHAR(20) NOT NULL,
                              source VARCHAR(20) NOT NULL,
                              transaction_date DATE NOT NULL,
                              created_at TIMESTAMP NOT NULL,
                              updated_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_transactions_user_id
    ON transactions(user_id);

CREATE INDEX idx_transactions_transaction_date
    ON transactions(transaction_date);

CREATE INDEX idx_transactions_user_date
    ON transactions(user_id, transaction_date DESC);