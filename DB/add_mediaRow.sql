INSERT INTO media (user_id)
VALUES ($1)
RETURNING *;