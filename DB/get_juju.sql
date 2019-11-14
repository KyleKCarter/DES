SELECT COUNT(juju) FROM juju
WHERE review_id = $1
AND juju = true;