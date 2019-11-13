UPDATE media
SET google_profile_id = $2
WHERE user_id = $1
RETURNING *;