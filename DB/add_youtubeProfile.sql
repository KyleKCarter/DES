UPDATE media
SET youtube_profile_id = $2
WHERE user_id = $1
RETURNING *;