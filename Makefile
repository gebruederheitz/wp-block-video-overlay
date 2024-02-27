install:
	asdf exec npm i

build: install
	asdf exec npm run build

test: install
	asdf exec npm run lint

dev: install
	asdf exec npm run build

release: install
	asdf exec npm run release

prerelease:
	asdf exec npm run beta-release
