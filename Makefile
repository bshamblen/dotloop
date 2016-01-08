test:
	./node_modules/.bin/mocha $(T) --async-only test/*.test.js

.PHONY: test