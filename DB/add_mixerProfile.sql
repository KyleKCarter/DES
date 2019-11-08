INSERT INTO media (user_id, mixer_profile_id)
VALUES ($1, $2)
RETURNING *;