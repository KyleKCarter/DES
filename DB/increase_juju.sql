UPDATE juju
SET juju = $3
WHERE review_id = $1 AND user_id = $2
RETURNING *;