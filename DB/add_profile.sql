INSERT INTO media (twitch_profile_id)
VALUES ($1)
RETURNING *;