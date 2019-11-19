SELECT r.*, u.username, u.img
FROM reviews AS r
JOIN users AS u
ON r.user_id = u.user_id
WHERE entertainment_service = $1