INSERT INTO reviews (user_id, entertainment_service, review_title, review_text)
VALUES ($1, $2, $3, $4)
RETURNING *;