UPDATE reviews
SET review_title = $2, review_text = $3
WHERE review_id = $1
RETURNING *;