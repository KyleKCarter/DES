UPDATE users
SET username = $2, bio = $3
WHERE user_id = $1
RETURNING *;