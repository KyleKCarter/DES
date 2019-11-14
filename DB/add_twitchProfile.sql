UPDATE media
SET twitch_profile_id = $2
WHERE user_id = $1
RETURNING *;