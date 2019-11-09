INSERT INTO media (user_id, twitch_profile_id)
VALUES ($1, $2)
RETURNING *;

-- UPDATE media
-- SET twitch_profile_id = $2
-- WHERE user_id = $1
-- RETURNING *;