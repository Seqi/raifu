class NotFoundError extends Error {}
class BadRequestError extends Error {}
class ForbidError extends Error {}

module.exports = {
	NotFoundError,
	BadRequestError,
	ForbidError
}