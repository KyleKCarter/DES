INSERT INTO media (twitch_profile_id, user_id)
VALUES ($1, $2)
RETURNING *;