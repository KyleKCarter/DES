INSERT INTO reviews (user_id, entertainment_service, review_title, username, review_text)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;