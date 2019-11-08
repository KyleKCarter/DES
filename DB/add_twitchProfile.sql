INSERT INTO media (user_id, twitch_profile_id)
VALUES ($1, $2)
RETURNING *;